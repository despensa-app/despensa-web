import {Component, EventEmitter, input, Output} from '@angular/core';
import {DspDividerComponent} from '@app/shared/components/dsp-divider/dsp-divider.component';
import {DspOptionComponent} from '@app/shared/components/dsp-option/dsp-option.component';
import {DspSheetComponent} from '@app/shared/components/dsp-sheet/dsp-sheet.component';
import {ShoppingList} from '@app/models/find-all-shopping-list-res';

@Component({
  selector: 'app-shopping-list-card-sheet',
  imports: [
    DspDividerComponent,
    DspOptionComponent,
    DspSheetComponent
  ],
  templateUrl: './shopping-list-card-sheet.component.html',
  styleUrl: './shopping-list-card-sheet.component.css'
})
export class ShoppingListCardSheetComponent {

  sheetId = input.required<string>();

  response = input.required<ShoppingList>();

  @Output() deleteShoppingList = new EventEmitter<number>();

  deleteSelectedShoppingListEvent() {
    this.deleteShoppingList.emit(this.response().id);
  }
}
