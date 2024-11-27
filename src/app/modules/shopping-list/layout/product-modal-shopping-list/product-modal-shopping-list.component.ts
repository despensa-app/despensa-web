import {Component, EventEmitter, input, Output} from '@angular/core';
import {ImageModule} from 'primeng/image';
import {ProductShoppingList} from '@app/models/find-by-id-product-list-res';

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
