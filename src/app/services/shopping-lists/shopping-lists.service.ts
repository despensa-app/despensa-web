import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListRes} from '../../models/find-all-shopping-list-res';
import {FindByIdShoppingListRes} from '../../models/find-by-id-shopping-list-res';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  private readonly _shoppingListsURI = `${environment.baseUrl}/shopping-lists`;

  constructor(private httpClient: HttpClient) {
  }

  findAll() {
    return this.httpClient.get<FindAllShoppingListRes>(this._shoppingListsURI);
  }

  findById(id: number) {
    return this.httpClient.get<FindByIdShoppingListRes>(`${this._shoppingListsURI}/${id}`);
  }

}
