import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private navbarService: NavbarService) {
  }

  getElements() {
    return this.navbarService.getElements();
  }

}
