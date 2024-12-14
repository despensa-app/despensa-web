import {Component, OnInit, signal} from '@angular/core';
import {tap} from 'rxjs';
import {ShoppingListsService} from '@app/services/pages/shopping-lists.service';
import {FindAllShoppingListRes, ShoppingList} from '@app/models/find-all-shopping-list-res';
import {ShoppingListCardComponent} from '../../components/shopping-list-card/shopping-list-card.component';
import {NavbarHomeComponent} from '../../layout/navbar-home/navbar-home.component';
import {HeaderHomeComponent} from '../../layout/header-home/header-home.component';
import {PageComponent} from '@app/layout/page/page.component';
import {UpdateShoppingListReq} from '@app/models/update-shopping-list-req';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [
    ShoppingListCardComponent,
    NavbarHomeComponent,
    HeaderHomeComponent,
    PageComponent,
    Button
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

  showMoreButton = signal({
    disabled: false,
    render: false,
    click: () => {
    }
  });

  constructor(
    private shoppingListsService: ShoppingListsService
  ) {
  }

  ngOnInit() {
    this.shoppingListsService.findAll({sort: 'id,desc'})
        .pipe(
          tap(shoppingLists => this.shoppingListsRes.set(shoppingLists))
        )
        .subscribe({
          complete: () => {
            this.showMoreButton.update(value => ({
              ...value,
              render: this.shoppingListsRes().totalPages > 1,
              click: () => this.nextFindAllShoppingListEvent()
            }));
          }
        });
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

  deleteShoppingListEvent(id: number) {
    this.shoppingListsRes.update(shoppingLists => ({
        ...shoppingLists,
        content: shoppingLists.content.filter(shoppingList => shoppingList.id !== id)
      })
    );

    this.shoppingListsService.delete(id)
        .subscribe();
  }

  nextFindAllShoppingListEvent() {
    this.shoppingListsService.findAll({
      page: this.shoppingListsRes().currentPage + 1,
      sort: 'id,desc'
    })
        .pipe(
          tap(response => {
            this.shoppingListsRes.update(value => ({
              ...value,
              ...response,
              content: [
                ...value.content,
                ...response.content
              ]
            }));
          }),
          tap((response) => {
            this.showMoreButton.update(value => ({
              ...value,
              disabled: response.currentPage + 1 >= response.totalPages
            }));
          })
        )
        .subscribe();
  }

}
