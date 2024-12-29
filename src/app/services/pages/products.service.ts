import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {FindAllShoppingListProductsRes} from '@app/models/find-all-shopping-list-products-res';
import {SaveShoppingListProductReq} from '@app/models/save-shopping-list-product-req';
import {tap} from 'rxjs';
import {MessagePrimeNgService} from '@app/services/external/message-prime-ng.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _shoppingListProductsURI = `${environment.DESPENSA_REST_API_URL}/products/shopping-list`;

  constructor(
    private httpClient: HttpClient,
    private messagePrimeNgService: MessagePrimeNgService
  ) {
  }

  findAllShoppingList(id: number) {
    return this.httpClient.get<FindAllShoppingListProductsRes>(`${this._shoppingListProductsURI}/${id}`)
               .pipe(
                 tap({
                   error: ({error}) => this.messagePrimeNgService.showError(error.error.detail)
                 })
               );
  }

  saveShoppingList(request: SaveShoppingListProductReq) {
    return this.httpClient.post(this._shoppingListProductsURI, request)
               .pipe(
                 tap({
                   error: ({error}) => this.messagePrimeNgService.showError(error.error.detail),
                   complete: () => this.messagePrimeNgService.showSuccess('Producto agregado')
                 })
               );
  }

}
