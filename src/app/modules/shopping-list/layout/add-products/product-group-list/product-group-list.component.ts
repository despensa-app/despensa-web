import {Component, EventEmitter, input, Output} from '@angular/core';
import {ProductInstantSearch} from '@app/modules/shopping-list/models/product-instant-search';

@Component({
  selector: 'app-product-group-list',
  imports: [],
  templateUrl: './product-group-list.component.html',
  styleUrl: './product-group-list.component.css'
})
export class ProductGroupListComponent {

  products = input.required<Array<ProductInstantSearch>>();

  @Output() showDialogSelectProduct = new EventEmitter<ProductInstantSearch>();

  @Output() addProduct = new EventEmitter<{ product: ProductInstantSearch, unitsPerProduct: number }>();

  showDialogSelectProductEvent(product: ProductInstantSearch) {
    this.showDialogSelectProduct.emit(product);
  }

  addProductEvent(product: ProductInstantSearch, number: number) {
    this.addProduct.emit({
      product,
      unitsPerProduct: number
    });
  }
}
