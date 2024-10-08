import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListRes} from '../../models/find-all-shopping-list-res';
import {FindByIdShoppingListRes} from '../../models/find-by-id-shopping-list-res';
import {environment} from '../../../environments/environment';
import {UpdateShoppingListReq} from '../../models/update-shopping-list-req';
import {UpdateShoppingListRes} from '../../models/update-shopping-list-res';
import {DeleteProductsShoppingListReq} from '../../models/delete-products-shopping-list-req';
import {SaveShoppingListReq} from '../../models/save-shopping-list-req';
import {SaveShoppingListRes} from '../../models/save-shopping-list-res';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  private readonly _shoppingListsURI = `${environment.DESPENSA_REST_API_URL}/shopping-lists`;

  constructor(private httpClient: HttpClient) {
  }

  findAll() {
    const baseParams = {
      sort: 'id,desc'
    };

    return this.httpClient.get<FindAllShoppingListRes>(this._shoppingListsURI, {
      params: baseParams
    });
  }

  findById(id: number) {
    return this.httpClient.get<FindByIdShoppingListRes>(`${this._shoppingListsURI}/${id}`);
  }

  update(id: number, request: UpdateShoppingListReq) {
    return this.httpClient.put<UpdateShoppingListRes>(`${this._shoppingListsURI}/${id}`, request);
  }

  deleteProducts(id: number, request: DeleteProductsShoppingListReq) {
    return this.httpClient.delete(`${this._shoppingListsURI}/${id}/products`, {body: request});
  }

  save(request: SaveShoppingListReq) {
    return this.httpClient.post<SaveShoppingListRes>(this._shoppingListsURI, request);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this._shoppingListsURI}/${id}`);
  }
}
