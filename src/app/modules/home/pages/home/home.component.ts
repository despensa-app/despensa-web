import {Component, OnInit, signal} from '@angular/core';
import {tap} from 'rxjs';
import {ShoppingListsService} from '@app/services/pages/shopping-lists.service';
import {FindAllShoppingListRes, ShoppingList} from '@app/models/find-all-shopping-list-res';
import {DspAppbarComponent} from '@app/shared/components/dsp-appbar/dsp-appbar.component';
import {DspHeroComponent} from '@app/shared/components/dsp-hero/dsp-hero.component';
import {DspSectionComponent} from '@app/shared/components/dsp-section/dsp-section.component';
import {DspThemeToggleComponent} from '@app/shared/components/dsp-theme-toggle/dsp-theme-toggle.component';
import {ShoppingListCardComponent} from '@app/modules/home/components/shopping-list-card/shopping-list-card.component';
import {TabbarHomeComponent} from '@app/modules/home/components/tabbar-home/tabbar-home.component';
import {
  ShoppingListCardSheetComponent
} from '@app/modules/home/components/shopping-list-card-sheet/shopping-list-card-sheet.component';
import {DspButtonComponent} from '@app/shared/components/dsp-button/dsp-button.component';

@Component({
  selector: 'app-home',
  imports: [
    DspAppbarComponent,
    DspHeroComponent,
    DspSectionComponent,
    DspThemeToggleComponent,
    ShoppingListCardComponent,
    TabbarHomeComponent,
    ShoppingListCardSheetComponent,
    DspButtonComponent
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

  private readonly _initSelectedShoppingList: ShoppingList = {
    id: 0,
    name: '',
    totalProducts: 0,
    totalPrice: 0,
    createdAt: ''
  };

  selectedShoppingList = signal<ShoppingList>(this._initSelectedShoppingList);

  constructor(
    private shoppingListsService: ShoppingListsService
  ) {
  }

  openSheet(id: string): void {
    const element = document.getElementById(id);
    const bootstrap = (window as Window & {
      bootstrap?: {
        Offcanvas: {
          getOrCreateInstance: (element: Element) => { show: () => void }
        }
      }
    }).bootstrap;
    if (element && bootstrap) {
      bootstrap.Offcanvas.getOrCreateInstance(element)
               .show();
    }
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

  public selectedShoppingListEvent(response: ShoppingList) {
    this.selectedShoppingList.set(response);
  }


}
