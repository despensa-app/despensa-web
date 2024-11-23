import {Component, computed, input} from '@angular/core';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';

@Component({
  selector: 'app-totals-summary',
  standalone: true,
  imports: [],
  templateUrl: './totals-summary.component.html',
  styleUrl: './totals-summary.component.css'
})
export class TotalsSummaryComponent {

  shoppingList = input.required<FindByIdShoppingListRes>();

  totalPriceSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalPriceSelectedProducts / this.shoppingList().totalPrice * 100;
  });

  totalSelectedProductPercent = computed<number>(() => {
    return this.shoppingList().totalSelectedProducts / this.shoppingList().totalProducts * 100;
  });

}
