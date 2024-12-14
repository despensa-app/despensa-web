import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListProductsRes} from '@app/models/find-all-shopping-list-products-res';
import {SaveShoppingListProductReq} from '@app/models/save-shopping-list-product-req';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _shoppingListProductsURI = `${environment.DESPENSA_REST_API_URL}/products/shopping-list`;

  constructor(private httpClient: HttpClient) {
  }

  findAllShoppingList(id: number) {
    return this.httpClient.get<FindAllShoppingListProductsRes>(`${this._shoppingListProductsURI}/${id}`);
  }

  saveShoppingList(request: SaveShoppingListProductReq) {
    return this.httpClient.post(this._shoppingListProductsURI, request);
  }

}
