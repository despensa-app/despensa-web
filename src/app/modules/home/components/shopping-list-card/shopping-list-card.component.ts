import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {ShoppingList} from '../../../../models/find-all-shopping-list-res';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-shopping-list-card',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './shopping-list-card.component.html',
  styleUrl: './shopping-list-card.component.css'
})
export class ShoppingListCardComponent {

  response = input.required<ShoppingList>();

  showEdit = signal<boolean | null>(null);

  @Output() updateShoppingList = new EventEmitter<ShoppingList>();

  shoppingListForm = this.formBuilder.nonNullable.group({
    name: [''],
    id: [0]
  });

  constructor(private formBuilder: FormBuilder) {
  }

  editEvent() {
    //Comprueba el ID para conservar el valor anterior, en caso de cancelar.
    if (this.shoppingListForm.value.id != this.response().id) {
      this.shoppingListForm.setValue({
        name: this.response().name,
        id: this.response().id
      });
    }

    this.showEdit.set(true);
  }

  cancelEvent() {
    this.showEdit.set(null);
  }

  saveShoppingListEvent() {
    const response: ShoppingList = {
      ...this.response(),
      name: this.shoppingListForm.value.name!
    };

    this.updateShoppingList.emit(response);
    this.showEdit.set(null);
  }
}
