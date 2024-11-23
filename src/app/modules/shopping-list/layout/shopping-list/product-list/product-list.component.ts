import {Component, EventEmitter, input, OnChanges, Output, signal, SimpleChanges} from '@angular/core';
import {FindByIdShoppingListRes, ProductShoppingList} from '@app/models/find-by-id-shopping-list-res';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {ProductShoppingList as ProductUpdateShoppingListReq} from '@app/models/update-shopping-list-req';
import {
  ProductModalShoppingListComponent
} from '@app/modules/shopping-list/layout/product-modal-shopping-list/product-modal-shopping-list.component';
import {tap} from 'rxjs';

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
    if (!this.shoppingList().id || this.productsForm.length > 0) {
      return;
    }

    this.shoppingList()
        .products
        .forEach(productShoppingList => {
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

}
