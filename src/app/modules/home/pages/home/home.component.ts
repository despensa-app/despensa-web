import {Component, OnInit, signal} from '@angular/core';
import {tap} from 'rxjs';
import {ShoppingListsService} from '../../../../services/pages/shopping-lists.service';
import {FindAllShoppingListRes, ShoppingList} from '../../../../models/find-all-shopping-list-res';
import {ShoppingListCardComponent} from '../../components/shopping-list-card/shopping-list-card.component';
import {NavbarHomeComponent} from '../../layout/navbar-home/navbar-home.component';
import {HeaderHomeComponent} from '../../layout/header-home/header-home.component';
import {PageComponent} from '../../../../layout/page/page.component';
import {UpdateShoppingListReq} from '@app/models/update-shopping-list-req';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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

  public updateShoppingListEvent(response: ShoppingList) {
    const request: UpdateShoppingListReq = {
      name: response.name
    };

    this.shoppingListsRes.update(shoppingLists => {
      const index = shoppingLists.content.findIndex(shoppingList => shoppingList.id === response.id);

      shoppingLists.content[index] = response;

      return shoppingLists;
    });

    this.shoppingListsService.update(response.id, request)
        .subscribe();
  }

}
