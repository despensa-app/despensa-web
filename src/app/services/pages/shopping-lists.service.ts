import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListRes} from '@app/models/find-all-shopping-list-res';
import {FindByIdShoppingListRes} from '@app/models/find-by-id-shopping-list-res';
import {environment} from '@env/environment';
import {UpdateShoppingListReq} from '@app/models/update-shopping-list-req';
import {UpdateShoppingListRes} from '@app/models/update-shopping-list-res';
import {DeleteProductsShoppingListReq} from '@app/models/delete-products-shopping-list-req';
import {SaveShoppingListReq} from '@app/models/save-shopping-list-req';
import {SaveShoppingListRes} from '@app/models/save-shopping-list-res';
import {PagingAndSortingReq} from '@app/models/paging-and-sorting-req';
import {FindByIdProductListReq} from '@app/models/find-by-id-product-list-req';
import {FindByIdProductListRes} from '@app/models/find-by-id-product-list-res';
import {ProductsSelectedReq} from '@app/models/products-selected-req';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  private readonly _shoppingListsURI = `${environment.DESPENSA_REST_API_URL}/shopping-lists`;

  constructor(private httpClient: HttpClient) {
  }

  findAll(request: PagingAndSortingReq) {
    return this.httpClient.get<FindAllShoppingListRes>(this._shoppingListsURI, {
      params: {
        ...request
      }
    });
  }

  findById(id: number, request?: FindByIdProductListReq) {
    return this.httpClient.get<FindByIdShoppingListRes>(`${this._shoppingListsURI}/${id}`, {
      params: {
        ...request
      }
    });
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

  findAllProducts(id: number, request: FindByIdProductListReq) {
    return this.httpClient.get<FindByIdProductListRes>(`${this._shoppingListsURI}/${id}/products`, {
      params: {
        ...request
      }
    });
  }

  updateSelectedProducts(id: number, request: ProductsSelectedReq) {
    return this.httpClient.put<UpdateShoppingListRes>(`${this._shoppingListsURI}/${id}/products-selected`, request);
  }
}
