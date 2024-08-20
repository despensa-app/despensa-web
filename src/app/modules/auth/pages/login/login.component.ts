import {Component} from '@angular/core';
import {PageComponent} from '../../../../layout/page/page.component';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../../../../layout/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PageComponent,
    NavbarComponent,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
