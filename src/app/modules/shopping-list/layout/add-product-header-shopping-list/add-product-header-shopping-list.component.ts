import {Component, Input} from '@angular/core';
import {HeaderComponent} from '@app/layout/header/header.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-product-header-shopping-list',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './add-product-header-shopping-list.component.html',
  styleUrl: './add-product-header-shopping-list.component.css'
})
export class AddProductHeaderShoppingListComponent {

  @Input() idShoppingList!: number;

}
