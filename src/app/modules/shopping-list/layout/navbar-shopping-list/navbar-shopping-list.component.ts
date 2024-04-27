import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';

@Component({
  selector: 'app-navbar-shopping-list',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './navbar-shopping-list.component.html',
  styleUrl: './navbar-shopping-list.component.css'
})
export class NavbarShoppingListComponent {

}
