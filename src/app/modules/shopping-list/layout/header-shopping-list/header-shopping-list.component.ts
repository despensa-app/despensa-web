import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header-shopping-list',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    NgClass
  ],
  templateUrl: './header-shopping-list.component.html',
  styleUrl: './header-shopping-list.component.css'
})
export class HeaderShoppingListComponent {

}
