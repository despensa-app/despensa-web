import {Component, EventEmitter, input, Output} from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {PaginatorModule} from 'primeng/paginator';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';
import {ProductShoppingList} from '@app/models/find-by-id-product-list-res';

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [
    CheckboxModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-group-list.component.html',
  styleUrl: './product-group-list.component.css'
})
export class ProductGroupListComponent {

  shoppingList = input.required<FindByIdShoppingListRes>();

  @Output() selectProduct = new EventEmitter<ProductShoppingList>();

  @Output() deleteProduct = new EventEmitter<ProductShoppingList>();

  productListForm = input.required<FormGroup<{
    productsForm: FormArray<FormGroup<{
      selected: FormControl<boolean>
      productId: FormControl<number>
      unitTypeId: FormControl<number>
    }>>
  }>>();

  selectProductEvent(response: ProductShoppingList) {
    this.selectProduct.emit(response);
  }

  deleteProductEvent(response: ProductShoppingList) {
    this.deleteProduct.emit(response);
  }

}
