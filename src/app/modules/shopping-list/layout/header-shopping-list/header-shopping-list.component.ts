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

  @Output() editEvent = new EventEmitter<void>();

  @Output() saveEvent = new EventEmitter<void>();

  @Input() isEditOrNew = false;

  @Input({required: true})
  set nameShoppingList(value: string) {
    this.nameShoppingListFormControl.setValue(value, {emitEvent: false});
  };

  @Output() nameShoppingListChange = new EventEmitter<string>();

  nameShoppingListFormControl = new FormControl('', {nonNullable: true});

  constructor() {
    this.nameShoppingListFormControl
        .valueChanges
        .subscribe(value => {
          this.nameShoppingListChange.emit(value);
        });
  }

  editClickEvent() {
    this.editEvent.emit();
  }

  saveClickEvent() {
    this.saveEvent.emit();
  }
}
