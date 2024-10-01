import {Component} from '@angular/core';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

}
