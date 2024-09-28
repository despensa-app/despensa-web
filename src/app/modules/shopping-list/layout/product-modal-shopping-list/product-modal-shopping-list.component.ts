import {Component, EventEmitter, input, Output} from '@angular/core';
import {ProductShoppingList} from '../../../../models/find-by-id-shopping-list-res';
import {ImageModule} from 'primeng/image';

@Component({
  selector: 'app-product-modal-shopping-list',
  standalone: true,
  imports: [
    ImageModule
  ],
  templateUrl: './product-modal-shopping-list.component.html',
  styleUrl: './product-modal-shopping-list.component.css'
})
export class ProductModalShoppingListComponent {

  selectedProduct = input.required<ProductShoppingList>();

  @Output() deleteProduct = new EventEmitter<ProductShoppingList>();

  deleteEvent(productShoppingList: ProductShoppingList) {
    this.deleteProduct.emit(productShoppingList);
  }
}
