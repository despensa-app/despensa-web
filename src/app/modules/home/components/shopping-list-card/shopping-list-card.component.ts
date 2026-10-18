import {Component, EventEmitter, input, Output} from '@angular/core';
import {ShoppingList} from '@app/models/find-all-shopping-list-res';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DspCardComponent} from '@app/shared/components/dsp-card/dsp-card.component';
import {DspCardHeadComponent} from '@app/shared/components/dsp-card-head/dsp-card-head.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-shopping-list-card',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    DspCardComponent,
    DspCardHeadComponent,
    DecimalPipe
  ],
  templateUrl: './shopping-list-card.component.html',
  styleUrl: './shopping-list-card.component.css'
})
export class ShoppingListCardComponent {

  response = input.required<ShoppingList>();

  @Output() selectedShoppingList = new EventEmitter<ShoppingList>();

  @Output() openActions = new EventEmitter<void>();

  constructor() {
  }

  openActionsEvent() {
    this.selectedShoppingList.emit(this.response());
    this.openActions.emit();
  }

}
