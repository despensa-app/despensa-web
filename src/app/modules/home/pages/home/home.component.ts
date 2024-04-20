import {Component, OnInit, signal} from '@angular/core';
import {tap} from 'rxjs';
import {ShoppingListsService} from '../../../../services/shopping-lists/shopping-lists.service';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FindAllShoppingListRes} from '../../../../models/find-all-shopping-list-res';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly _initShoppingList: FindAllShoppingListRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0
  };

  shoppingListsRes = signal<FindAllShoppingListRes>(this._initShoppingList);

  constructor(private shoppingListsService: ShoppingListsService) {
  }

  ngOnInit() {
    this.shoppingListsService.getShoppingLists()
        .pipe(
          tap(shoppingLists => this.shoppingListsRes.set(shoppingLists))
        )
        .subscribe();
  }

}
