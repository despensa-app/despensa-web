import {Component} from '@angular/core';
import {HeaderComponent} from '@app/layout/header/header.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-home',
  imports: [
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

}
