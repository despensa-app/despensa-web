import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListRes} from '../../models/find-all-shopping-list-res';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  private readonly _shoppingListsURI = `${environment.baseUrl}/shopping-lists`;

  constructor(private httpClient: HttpClient) {
  }

  getShoppingLists() {
    return this.httpClient.get<FindAllShoppingListRes>(`${this._shoppingListsURI}`);
  }

}
