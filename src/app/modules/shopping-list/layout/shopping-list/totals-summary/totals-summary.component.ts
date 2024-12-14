import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';
import {NgClass} from '@angular/common';
import {ViewTypeProductList} from '@app/modules/shopping-list/models/view-type-product-list';

@Component({
  selector: 'app-totals-summary',
  imports: [
    NgClass
  ],
  templateUrl: './totals-summary.component.html',
  styleUrl: './totals-summary.component.css'
})
export class TotalsSummaryComponent {

  shoppingList = input.required<FindByIdShoppingListRes>();

  viewTypeProductListSelected = input<ViewTypeProductList>();

  @Output() viewTypeProductListSelect = new EventEmitter<ViewTypeProductList>();

  viewTypeProductListEnum = ViewTypeProductList;

  totalPriceSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalPriceSelectedProducts / this.shoppingList().totalPrice * 100;
  });

  totalSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalSelectedProducts / this.shoppingList().totalProducts * 100;
  });

  viewProductListEvent(selected: ViewTypeProductList) {
    this.viewTypeProductListSelect.emit(selected);
  }

  isViewTypeProductList(value: ViewTypeProductList) {
    return this.viewTypeProductListSelected() === value;
  }
}
