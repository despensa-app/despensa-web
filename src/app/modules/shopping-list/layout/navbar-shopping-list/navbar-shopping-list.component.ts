import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-navbar-shopping-list',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    ButtonModule
  ],
  templateUrl: './navbar-shopping-list.component.html',
  styleUrl: './navbar-shopping-list.component.css'
})
export class NavbarShoppingListComponent {

  @Input() isEdit: boolean = false;

  @Input() idShoppingList: number = 0;

  @Output() editEvent = new EventEmitter<void>();

  editClickEvent() {
    this.editEvent.emit();
  }
}
