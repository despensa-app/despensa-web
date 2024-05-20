import {Component, input} from '@angular/core';
import {ShoppingList} from '../../../../models/find-all-shopping-list-res';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-shopping-list-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './shopping-list-card.component.html',
  styleUrl: './shopping-list-card.component.css'
})
export class ShoppingListCardComponent {

  response = input.required<ShoppingList>();

}
