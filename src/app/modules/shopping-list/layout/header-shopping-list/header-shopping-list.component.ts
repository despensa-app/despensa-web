import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {HeaderComponent} from '@app/layout/header/header.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';

@Component({
  selector: 'app-header-shopping-list',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TabViewModule
  ],
  templateUrl: './header-shopping-list.component.html',
  styleUrl: './header-shopping-list.component.css'
})
export class HeaderShoppingListComponent {

  isNew = input<boolean>();

  shoppingList = input.required<FindByIdShoppingListRes>();

  showEdit = signal<boolean | null>(null);

  @Output() updateShoppingList = new EventEmitter<FindByIdShoppingListRes>();

  shoppingListForm = this.formBuilder.nonNullable.group({
    name: [''],
    id: [0]
  });

  constructor(private formBuilder: FormBuilder) {
  }

  editEvent() {
    //Comprueba el ID para conservar el valor anterior, en caso de cancelar.
    if (this.shoppingListForm.value.id != this.shoppingList().id) {
      this.shoppingListForm.setValue({
        name: this.shoppingList().name,
        id: this.shoppingList().id
      });
    }

    this.showEdit.set(true);
  }

  cancelEditEvent() {
    this.showEdit.set(false);
  }

  saveShoppingListEvent() {
    const response: FindByIdShoppingListRes = {
      ...this.shoppingList(),
      name: this.shoppingListForm.value.name!
    };

    this.updateShoppingList.emit(response);
    this.showEdit.set(null);
  }

}
