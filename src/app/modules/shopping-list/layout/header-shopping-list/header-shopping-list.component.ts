import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-header-shopping-list',
  standalone: true,
  imports: [
    RouterLink,
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

  @Input() isEditOrNew: boolean = false;

  @Input({required: true})
  set nameShoppingList(value: string) {
    this.nameShoppingListFormControl.setValue(value, {emitEvent: false});
  };

  @Output() nameShoppingListChange = new EventEmitter<string>();

  @Output() deleteShoppingList = new EventEmitter<void>();

  nameShoppingListFormControl = new FormControl('', {nonNullable: true});

  visibleOptionsDialog: boolean = false;

  constructor() {
    this.nameShoppingListFormControl
        .valueChanges
        .subscribe(value => {
          this.nameShoppingListChange.emit(value);
        });
  }

  showOptionsDialog() {
    this.visibleOptionsDialog = !this.visibleOptionsDialog;
  }

  deleteEvent() {
    this.deleteShoppingList.emit();
  }
}
