import {Component} from '@angular/core';
import {HeaderComponent} from '../../../../layout/header/header.component';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

}
