import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent {

}
