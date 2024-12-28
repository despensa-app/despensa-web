import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';
import {ViewTypeProductList} from '@app/modules/shopping-list/models/view-type-product-list';
import {
  ViewTypeProductListComponent
} from '@app/modules/shopping-list/layout/view-type-product-list/view-type-product-list.component';

@Component({
  selector: 'app-totals-summary',
  imports: [
    ViewTypeProductListComponent
  ],
  templateUrl: './totals-summary.component.html',
  styleUrl: './totals-summary.component.css'
})
export class TotalsSummaryComponent {

  shoppingList = input.required<FindByIdShoppingListRes>();

  viewTypeProductListSelected = input.required<ViewTypeProductList>();

  @Output() viewTypeProductListSelect = new EventEmitter<ViewTypeProductList>();

  totalPriceSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalPriceSelectedProducts / this.shoppingList().totalPrice * 100;
  });

  totalSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalSelectedProducts / this.shoppingList().totalProducts * 100;
  });

  viewTypeProductListSelectEvent($event: ViewTypeProductList) {
    this.viewTypeProductListSelect.emit($event);
  }
}
