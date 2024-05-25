import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListProductsRes} from '../../models/find-all-shopping-list-products-res';
import {SaveShoppingListProductReq} from '../../models/save-shopping-list-product-req';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _shoppingListProductsURI = `${environment.DESPENSA_REST_API_URL}/products/shopping-list`;

  constructor(private httpClient: HttpClient) {
  }

  findAllShoppingList(id: number) {
    const queryParams = {
      'exclude_shopping_list_id': id
    };

    return this.httpClient.get<FindAllShoppingListProductsRes>(this._shoppingListProductsURI, {
      params: queryParams
    });
  }

  saveShoppingList(request: SaveShoppingListProductReq) {
    return this.httpClient.post(this._shoppingListProductsURI, request);
  }

}
