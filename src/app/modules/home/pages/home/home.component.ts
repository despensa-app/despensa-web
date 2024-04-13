import {Component, OnInit} from '@angular/core';
import {FindAllShoppingListRes} from '../../../../models/find-all-shopping-list-res';
import {Observable} from 'rxjs';
import {ShoppingListsService} from '../../../../services/shopping-lists/shopping-lists.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  shoppingListsRes$ = new Observable<FindAllShoppingListRes>();

  constructor(private shoppingListsService: ShoppingListsService) {
  }

  ngOnInit() {
    this.shoppingListsRes$ = this.shoppingListsService.getShoppingLists();
  }

}
