import {Component, computed, EventEmitter, input, OnChanges, Output, signal, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {ProductShoppingList as ProductUpdateShoppingListReq} from '@app/models/update-shopping-list-req';
import {
  ProductModalShoppingListComponent
} from '@app/modules/shopping-list/layout/product-modal-shopping-list/product-modal-shopping-list.component';
import {tap} from 'rxjs';
import {ProductShoppingList} from '@app/models/find-by-id-product-list-res';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CheckboxModule,
    ReactiveFormsModule,
    ProductModalShoppingListComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges {

  private readonly _initProduct: ProductShoppingList = {
    product: {
      id: 0,
      name: '',
      price: 0,
      imgUrl: ''
    },
    unitType: {
      id: 0,
      name: ''
    },
    unitsPerProduct: 0,
    totalPrice: 0,
    selected: false
  };

  shoppingList = input.required<FindByIdShoppingListRes>();

  selectedProduct = signal<ProductShoppingList>(this._initProduct);

  @Output() updateProduct = new EventEmitter<ProductUpdateShoppingListReq>();

  @Output() deleteProduct = new EventEmitter<ProductShoppingList>();

  @Output() removeProductList = new EventEmitter<ProductShoppingList>();

  @Output() deselectAllProducts = new EventEmitter<void>();

  deselectAllDisabled = computed<boolean | null>(() => {
    const some = this.shoppingList()
                     .productList
                     .content
                     .some(product => product.selected);

    return some ? null : true;
  });

  productListForm = this.formBuilder.nonNullable.group({
    productsForm: this.formBuilder.array<FormGroup<{
      selected: FormControl<boolean>;
      productId: FormControl<number>;
      unitTypeId: FormControl<number>;
    }>>([])
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.removeNotExistingControls();

    this.shoppingList()
        .productList
        .content
        .forEach(productShoppingList => {
          if (this.updateExistingControl(productShoppingList)) {
            return;
          }

          this.pushNewControl(productShoppingList);
        });
  }

  get productsForm() {
    return this.productListForm.get('productsForm') as FormArray;
  }

  showProductDetailsEvent(product: ProductShoppingList) {
    this.selectedProduct.set(product);
  }

  deleteProductEvent(response: ProductShoppingList) {
    this.deleteProduct.emit(response);
  }

  selectedEvent(response: ProductShoppingList) {
    this.removeProductList.emit(response);
  }

  deselectAllEvent() {
    this.deselectAllProducts.emit();
  }

  private removeNotExistingControls() {
    const notExist = this.productsForm.controls
                         .filter(control =>
                           !this.shoppingList()
                                .productList
                                .content
                                .some(product => product.product.id === control.value.productId)
                         );

    notExist.forEach(control => {
      const index = this.productsForm.controls.indexOf(control);

      if (index !== -1) {
        this.productsForm.removeAt(index, {emitEvent: false});
      }
    });
  }

  private updateExistingControl(productShoppingList: ProductShoppingList) {
    const existingControl = this.productsForm.controls.find(
      control => control.value.productId === productShoppingList.product.id
    );

    if (existingControl) {
      existingControl.setValue({
        ...existingControl.value,
        selected: productShoppingList.selected
      }, {emitEvent: false});

      return true;
    }

    return false;
  }

  private pushNewControl(productShoppingList: ProductShoppingList) {
    const control = this.formBuilder.nonNullable.group({
      selected: productShoppingList.selected,
      productId: productShoppingList.product.id,
      unitTypeId: productShoppingList.unitType.id
    });

    control.valueChanges
           .pipe(
             tap(value => {
               const productReq: ProductUpdateShoppingListReq = {
                 selected: value.selected!,
                 productId: value.productId!,
                 unitTypeId: value.unitTypeId!
               };

               this.updateProduct.emit(productReq);
             })
           )
           .subscribe();

    this.productsForm.push(control, {emitEvent: false});
  }

}
