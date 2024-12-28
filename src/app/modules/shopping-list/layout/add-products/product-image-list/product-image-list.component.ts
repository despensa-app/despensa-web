import {Component, EventEmitter, input, Output} from '@angular/core';
import {Image} from 'primeng/image';
import {ProductInstantSearch} from '@app/modules/shopping-list/models/product-instant-search';

@Component({
  selector: 'app-product-image-list',
  imports: [
    Image
  ],
  templateUrl: './product-image-list.component.html',
  styleUrl: './product-image-list.component.css'
})
export class ProductImageListComponent {

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
