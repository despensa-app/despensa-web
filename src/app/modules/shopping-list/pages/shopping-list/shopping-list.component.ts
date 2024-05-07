import {Component, Input, signal} from '@angular/core';
import {tap} from 'rxjs';
import {FindByIdShoppingListRes} from '../../../../models/find-by-id-shopping-list-res';
import {ShoppingListsService} from '../../../../services/shopping-lists/shopping-lists.service';
import {AsyncPipe} from '@angular/common';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {NavbarShoppingListComponent} from '../../layout/navbar-shopping-list/navbar-shopping-list.component';
import {HeaderShoppingListComponent} from '../../layout/header-shopping-list/header-shopping-list.component';
import {PageComponent} from '../../../../layout/page/page.component';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ButtonGroupModule} from 'primeng/buttongroup';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent,
    NavbarShoppingListComponent,
    HeaderShoppingListComponent,
    PageComponent,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  private readonly _initShoppingList: FindByIdShoppingListRes = {
    id: 0,
    name: '',
    totalProducts: 0,
    totalPrice: 0,
    items: []
  };

  shoppingListRes = signal(this._initShoppingList);

  isEdit = signal(false);

  @Input()
  set id(id: number) {
    this.shoppingListsService.findById(id)
        .pipe(
          tap(shoppingList => this.shoppingListRes.set(shoppingList))
        )
        .subscribe();
  }

  constructor(private shoppingListsService: ShoppingListsService) {
  }

  editEvent() {
    this.isEdit.set(!this.isEdit());
  }
}
