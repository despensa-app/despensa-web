import {Component, effect, Input, signal} from '@angular/core';
import {tap} from 'rxjs';
import {FindByIdShoppingListRes, ProductShoppingList} from '../../../../models/find-by-id-shopping-list-res';
import {ShoppingListsService} from '../../../../services/shopping-lists/shopping-lists.service';
import {AsyncPipe} from '@angular/common';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {NavbarShoppingListComponent} from '../../layout/navbar-shopping-list/navbar-shopping-list.component';
import {HeaderShoppingListComponent} from '../../layout/header-shopping-list/header-shopping-list.component';
import {PageComponent} from '../../../../layout/page/page.component';
import {CheckboxModule} from 'primeng/checkbox';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ButtonGroupModule} from 'primeng/buttongroup';
import {DialogModule} from 'primeng/dialog';
import {ImageModule} from 'primeng/image';
import {UpdateShoppingListReq} from '../../../../models/update-shopping-list-req';
import {DeleteProductsShoppingListReq} from '../../../../models/delete-products-shopping-list-req';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent,
    NavbarShoppingListComponent,
    HeaderShoppingListComponent,
    PageComponent,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    DialogModule,
    ImageModule,
    ReactiveFormsModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  private readonly _initShoppingList: FindByIdShoppingListRes = {
    id: 0,
    name: '',
    totalProducts: 0,
    totalPrice: 0,
    products: []
  };

  private readonly _initProduct: ProductShoppingList = {
    product: {
      id: 0,
      name: '',
      price: 0
    },
    unitType: {
      id: 0,
      name: ''
    },
    unitsPerProduct: 0,
    totalPrice: 0,
    selected: false
  };

  shoppingListRes = signal(this._initShoppingList);

  isEdit = signal(false);

  selectedProduct = signal<ProductShoppingList>(this._initProduct);

  visibleProductDetails = false;

  productShoppingListForm = this.formBuilder.nonNullable.group({
    productsShoppingListForm: this.formBuilder.array<FormGroup<{
      selected: FormControl<boolean>;
      productId: FormControl<number>;
      unitTypeId: FormControl<number>;
    }>>([])
  });

  @Input()
  set id(id: number) {
    this.shoppingListsService.findById(id)
        .pipe(
          tap(shoppingList => this.shoppingListRes.set(shoppingList))
        )
        .subscribe();
  }

  constructor(
    private shoppingListsService: ShoppingListsService,
    private formBuilder: FormBuilder
  ) {
    effect(() => {
      this.shoppingListRes()
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
                       const request: UpdateShoppingListReq = {
                         name: this.shoppingListRes().name,
                         products: [
                           {
                             selected: value.selected!,
                             productId: value.productId!,
                             unitTypeId: value.unitTypeId!
                           }
                         ]
                       };

                       this.updateShoppingList(request);
                     })
                   )
                   .subscribe();

            this.productsShoppingListForm.push(control, {emitEvent: false});
          });
    });
  }

  get productsShoppingListForm() {
    return this.productShoppingListForm.get('productsShoppingListForm') as FormArray;
  }

  editEvent() {
    this.isEdit.set(!this.isEdit());
  }

  showProductDetailsEvent(product: ProductShoppingList) {
    this.selectedProduct.set(product);
    this.visibleProductDetails = !this.visibleProductDetails;
  }

  saveEvent() {
    const request: UpdateShoppingListReq = {
      name: this.shoppingListRes().name
    };

    this.isEdit.set(!this.isEdit());

    this.shoppingListsService.update(this.shoppingListRes().id, request)
        .subscribe({
          error: error => {
            console.log(error);
          }
        });
  }

  nameShoppingListChangeEvent($event: string) {
    this.shoppingListRes.update(value => ({
        ...value,
        name: $event
      })
    );
  }

  deleteEvent(response: ProductShoppingList) {
    const request: DeleteProductsShoppingListReq = {
      productsId: [
        response.product.id
      ]
    };

    this.shoppingListsService.deleteProducts(this.shoppingListRes().id, request)
        .pipe(
          tap(() => this.shoppingListRes.update(value => ({
              ...value,
              products: value.products
                             .filter(product => product.product.id !== response.product.id)
            })
          ))
        )
        .subscribe();
  }

  private updateShoppingList(request: UpdateShoppingListReq) {
    this.shoppingListsService.update(this.shoppingListRes().id, request)
        .subscribe();
  }

}
