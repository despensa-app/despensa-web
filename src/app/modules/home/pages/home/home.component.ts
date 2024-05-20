import {Component, OnInit, signal} from '@angular/core';
import {tap} from 'rxjs';
import {ShoppingListsService} from '../../../../services/shopping-lists/shopping-lists.service';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FindAllShoppingListRes} from '../../../../models/find-all-shopping-list-res';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {SidebarComponent} from '../../../../layout/sidebar/sidebar.component';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {ShoppingListCardComponent} from '../../components/shopping-list-card/shopping-list-card.component';
import {NavbarHomeComponent} from '../../layout/navbar-home/navbar-home.component';
import {HeaderHomeComponent} from '../../layout/header-home/header-home.component';
import {PageComponent} from '../../../../layout/page/page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    ShoppingListCardComponent,
    NavbarHomeComponent,
    HeaderHomeComponent,
    PageComponent
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

  constructor(
    private shoppingListsService: ShoppingListsService
  ) {
  }

  ngOnInit() {
    this.shoppingListsService.findAll()
        .pipe(
          tap(shoppingLists => this.shoppingListsRes.set(shoppingLists))
        )
        .subscribe();
  }

}
