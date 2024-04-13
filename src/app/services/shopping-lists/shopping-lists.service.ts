import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListRes} from '../../models/find-all-shopping-list-res';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  private baseUrl = 'http://localhost:8080/api/shopping-lists';

  constructor(private httpClient: HttpClient) {
  }

  getShoppingLists() {
    return this.httpClient.get<FindAllShoppingListRes>(`${this.baseUrl}`);
  }

}
