import {Component, EventEmitter, input, Input, Output, signal} from '@angular/core';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';

@Component({
  selector: 'app-header-shopping-list',
  standalone: true,
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

  @Output() saveEvent = new EventEmitter<void>();

  @Input() isEditOrNew = false;

  @Output() nameShoppingListChange = new EventEmitter<string>();

  nameShoppingListFormControl = new FormControl('', {nonNullable: true});

  shoppingList = input.required<FindByIdShoppingListRes>();

  showEdit = signal<boolean | null>(null);

  @Output() updateShoppingList = new EventEmitter<FindByIdShoppingListRes>();

  shoppingListForm = this.formBuilder.nonNullable.group({
    name: [''],
    id: [0]
  });

  constructor(private formBuilder: FormBuilder) {
    this.nameShoppingListFormControl
        .valueChanges
        .subscribe(value => {
          this.nameShoppingListChange.emit(value);
        });
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
