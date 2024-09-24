import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ModalNavbarComponent} from '../../shared/components/modal-navbar/modal-navbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ModalNavbarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor() {
  }
}
