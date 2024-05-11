import {Component, Input} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-products-navbar-shopping-list',
  standalone: true,
  imports: [
    ButtonModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './add-products-navbar-shopping-list.component.html',
  styleUrl: './add-products-navbar-shopping-list.component.css'
})
export class AddProductsNavbarShoppingListComponent {

  @Input() idShoppingList!: number;

}
