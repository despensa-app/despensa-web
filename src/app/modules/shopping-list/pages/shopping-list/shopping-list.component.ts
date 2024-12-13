import {Component, Input, signal} from '@angular/core';
import {tap} from 'rxjs';
import {FindByIdShoppingListRes} from '../../../../models/find-by-id-shopping-list-res';
import {ShoppingListsService} from '../../../../services/pages/shopping-lists.service';
import {NavbarShoppingListComponent} from '../../layout/navbar-shopping-list/navbar-shopping-list.component';
import {HeaderShoppingListComponent} from '../../layout/header-shopping-list/header-shopping-list.component';
import {PageComponent} from '../../../../layout/page/page.component';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ButtonGroupModule} from 'primeng/buttongroup';
import {DialogModule} from 'primeng/dialog';
import {ImageModule} from 'primeng/image';
import {
  ProductShoppingList as ProductUpdateShoppingListReq,
  UpdateShoppingListReq
} from '../../../../models/update-shopping-list-req';
import {DeleteProductsShoppingListReq} from '../../../../models/delete-products-shopping-list-req';
import {SaveShoppingListReq} from '../../../../models/save-shopping-list-req';
import {Router} from '@angular/router';
import {
  TotalsSummaryComponent
} from '@app/modules/shopping-list/layout/shopping-list/totals-summary/totals-summary.component';
import {
  ProductListComponent
} from '@app/modules/shopping-list/layout/shopping-list/product-list/product-list.component';
import {FindByIdProductListRes, ProductShoppingList} from '@app/models/find-by-id-product-list-res';
import {
  SelectedProductsComponent
} from '@app/modules/shopping-list/layout/shopping-list/selected-products/selected-products.component';
import {FindByIdProductListReq} from '@app/models/find-by-id-product-list-req';
import {ProductsSelectedReq} from '@app/models/products-selected-req';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NavbarShoppingListComponent,
    HeaderShoppingListComponent,
    PageComponent,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    DialogModule,
    ImageModule,
    ReactiveFormsModule,
    TotalsSummaryComponent,
    ProductListComponent,
    SelectedProductsComponent
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
    totalUnitsPerProducts: 0,
    totalPriceSelectedProducts: 0,
    totalSelectedProducts: 0,
    productList: {
      content: [],
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      total: 0
    },
    selectProductOption: []
  };

  shoppingListRes = signal(this._initShoppingList);

  isNew = signal(false);

  private currentSelectedProductOption = signal<string>('NO');

  @Input()
  set id(id: number) {
    if (id) {
      this.shoppingListsService.findById(id, {
        selected: this.currentSelectedProductOption(),
        sort: 'product_id,desc'
      })
          .pipe(
            tap(shoppingList => {
              const selectedOption = shoppingList.selectProductOption.find(value => value.selected);

              this.currentSelectedProductOption.set(selectedOption!.value);
              this.shoppingListRes.set(shoppingList);
            })
          )
          .subscribe();
    }

    this.isNew.set(!id);
  }

  constructor(
    private shoppingListsService: ShoppingListsService,
    private router: Router
  ) {
  }

  deleteProductEvent(response: ProductShoppingList) {
    const request: DeleteProductsShoppingListReq = {
      productsId: [
        response.product.id
      ]
    };

    this.shoppingListsService.deleteProducts(this.shoppingListRes().id, request)
        .pipe(
          tap(() => this.shoppingListRes.update(value => ({
              ...value,
              productList: {
                ...value.productList,
                content: value.productList
                              .content
                              .filter(product => product.product.id !== response.product.id)
              }
            })
          ))
        )
        .subscribe();
  }

  private updateShoppingList(products: ProductUpdateShoppingListReq[]) {
    const request: UpdateShoppingListReq = {
      name: this.shoppingListRes().name,
      products
    };

    this.shoppingListsService.update(this.shoppingListRes().id, request)
        .subscribe({
          complete: () => this.updateProductsView(products)
        });
  }

  goToAddProductsEvent() {
    if (this.shoppingListRes().id) {
      this.goToAddProducts(this.shoppingListRes().id);

      return;
    }

    const request: SaveShoppingListReq = {
      name: this.shoppingListRes().name
    };

    this.shoppingListsService.save(request)
        .pipe(
          tap(shoppingList => {
            this.goToAddProducts(shoppingList.id);
          })
        )
        .subscribe();
  }

  private goToAddProducts(id: number) {
    this.router.navigate([
      'shopping-list', id, 'add-products'
    ]);
  }

  deleteShoppingListEvent() {
    this.shoppingListsService.delete(this.shoppingListRes().id)
        .pipe(
          tap(() => this.router.navigate(['']))
        )
        .subscribe();
  }

  updateShoppingListEvent($event: FindByIdShoppingListRes) {
    this.shoppingListRes.update(value => ({
        ...value,
        ...$event
      })
    );

    if (this.shoppingListRes().id) {
      this.updateShoppingList([]);

      return;
    }

    const request: SaveShoppingListReq = {
      name: this.shoppingListRes().name
    };

    this.shoppingListsService.save(request)
        .pipe(
          tap(shoppingList => {
            this.router.navigate(['shopping-list', shoppingList.id])
                .then();
          })
        )
        .subscribe();
  }

  selectedProductOptionEvent($event: string) {
    const request: FindByIdProductListReq = {
      selected: $event,
      sort: 'product_id,desc'
    };

    this.currentSelectedProductOption.set($event);

    this.shoppingListsService.findAllProducts(this.shoppingListRes().id, request)
        .pipe(
          tap(shoppingList => {
            this.shoppingListRes.update(value => ({
                ...value,
                productList: shoppingList
              })
            );
          })
        )
        .subscribe();
  }

  removeUpdateProductListEvent($event: ProductUpdateShoppingListReq) {
    this.removeAllProducts([$event.productId]);
    this.updateShoppingList([$event]);
  }

  deselectAllProductsEvent() {
    const request: ProductsSelectedReq = {
      action: 'DESELECT'
    };
    const selectedProducts: ProductUpdateShoppingListReq[] = this.shoppingListRes()
                                                                 .productList
                                                                 .content
                                                                 .filter(product => product.selected)
                                                                 .map(product => ({
                                                                   selected: !product.selected,
                                                                   productId: product.product.id,
                                                                   unitTypeId: product.unitType.id
                                                                 }));

    this.removeAllProducts(selectedProducts.map(product => product.productId));
    this.shoppingListsService.updateSelectedProducts(this.shoppingListRes().id, request)
        .subscribe({
          complete: () => this.updateProductsView(selectedProducts)
        });
  }

  private updateProductsView(productUpdate: ProductUpdateShoppingListReq[]) {
    //Si hay registros solo actualizo visualmente la lista
    if (this.shoppingListRes().productList.content.length) {
      this.updateShoppingListResView(productUpdate);

      return;
    }

    //Si no hay registros, obtengo nuevos productos.
    const request: FindByIdProductListReq = {
      selected: this.currentSelectedProductOption(),
      sort: 'product_id,desc'
    };

    this.shoppingListsService.findAllProducts(this.shoppingListRes().id, request)
        .pipe(
          tap(shoppingList => {
            this.shoppingListRes.update(value => ({
                ...value,
                productList: shoppingList
              })
            );
          })
        )
        .subscribe();
  }

  private updateShoppingListResView(productsReq: ProductUpdateShoppingListReq[]) {
    this.shoppingListRes.update(value => {
      const products = value.productList
                            .content
                            .map(product => {

                              const findProduct = productsReq.find(productReq => productReq.productId === product.product.id);

                              if (findProduct) {
                                return {
                                  ...product,
                                  selected: findProduct.selected!
                                };
                              }

                              return product;
                            });

      const selectedProducts = products.filter(product => product.selected);
      const totalPriceSelectedProducts = selectedProducts
        .map(product => product.totalPrice)
        .reduce((totalPrice, currentPrice) => totalPrice + currentPrice, 0);

      return {
        ...value,
        totalSelectedProducts: selectedProducts.length,
        totalPriceSelectedProducts,
        productList: {
          ...value.productList,
          content: products
        }
      };
    });
  }

  removeAllProducts(productsId: number[]) {
    if (this.currentSelectedProductOption() === 'ALL') {
      return;
    }

    const some = (id: number) => productsId.some(productId => productId === id);

    this.shoppingListRes.update(value => ({
        ...value,
        productList: {
          ...value.productList,
          content: value.productList
                        .content
                        .filter(product => !some(product.product.id))
        }
      })
    );
  }

  nextFindAllProductsEvent($event: FindByIdProductListRes) {
    const request: FindByIdProductListReq = {
      page: $event.currentPage + 1,
      sort: 'product_id,desc',
      selected: this.currentSelectedProductOption()
    };

    console.log('next', request, this.shoppingListRes());

    this.shoppingListsService.findAllProducts(this.shoppingListRes().id, request)
        .pipe(
          tap(response => {
            this.shoppingListRes.update(value => ({
              ...value,
              productList: {
                ...value.productList,
                ...response,
                content: [
                  ...value.productList.content,
                  ...response.content
                ]
              }
            }));
            console.log('next2', this.shoppingListRes());
          })
        )
        .subscribe();
  }
}
