import {AfterContentInit, Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {ImageModule} from 'primeng/image';
import {PageComponent} from '@app/layout/page/page.component';
import {
  AddProductsNavbarShoppingListComponent
} from '../../layout/add-products-navbar-shopping-list/add-products-navbar-shopping-list.component';
import {
  AddProductHeaderShoppingListComponent
} from '../../layout/add-product-header-shopping-list/add-product-header-shopping-list.component';
import {ProductsService} from '@app/services/pages/products.service';
import {tap} from 'rxjs';
import {UnitTypesService} from '@app/services/pages/unit-types.service';
import {FindAllUnitTypesRes} from '@app/models/find-all-unit-types-res';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaveShoppingListProductReq} from '@app/models/save-shopping-list-product-req';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {AlgoliaService} from '@app/services/external/algolia.service';
import {connectInfiniteHits, connectSearchBox} from 'instantsearch.js/es/connectors';
import {SearchBoxRenderState} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import {configure} from 'instantsearch.js/es/widgets';
import {ProductInstantSearch} from '../../models/product-instant-search';
import {FindAllShoppingListProductsRes} from '@app/models/find-all-shopping-list-products-res';
import {InfiniteHitsRenderState} from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {
  ProductModalAddProductsComponent
} from '../../layout/product-modal-add-products/product-modal-add-products.component';
import {
  ProductGroupListComponent
} from '@app/modules/shopping-list/layout/add-products/product-group-list/product-group-list.component';
import {
  ProductImageListComponent
} from '@app/modules/shopping-list/layout/add-products/product-image-list/product-image-list.component';

@Component({
  selector: 'app-add-products-shopping-list',
  imports: [
    ButtonModule,
    CheckboxModule,
    DialogModule,
    ImageModule,
    PageComponent,
    AddProductsNavbarShoppingListComponent,
    AddProductHeaderShoppingListComponent,
    AutoCompleteModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ToggleButtonModule,
    ProductModalAddProductsComponent,
    ProductGroupListComponent,
    ProductImageListComponent
  ],
  templateUrl: './add-products-shopping-list.component.html',
  styleUrl: './add-products-shopping-list.component.css'
})
export class AddProductsShoppingListComponent implements OnInit, AfterContentInit, OnDestroy {

  private readonly _initShoppingListProductsRes: FindAllShoppingListProductsRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0
  };

  private readonly _initProduct: ProductInstantSearch = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: '',
    nameHighlight: ''
  };

  private readonly _initFindAllUnitTypesRes: FindAllUnitTypesRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0
  };

  shoppingListProductsRes = signal<FindAllShoppingListProductsRes>(this._initShoppingListProductsRes);

  selectedProduct = signal<ProductInstantSearch>(this._initProduct);

  findAllUnityTypesRes = signal<FindAllUnitTypesRes>(this._initFindAllUnitTypesRes);

  products = signal<Array<ProductInstantSearch>>([]);

  @Input('id') idShoppingList = 0;

  nameProductFormControl = new FormControl('', {nonNullable: true});

  showMoreButton = {
    disabled: signal(false),
    render: signal(false),
    click: () => {
    }
  };

  toggleProductsView = signal(false);

  constructor(
    private productsService: ProductsService,
    private unitTypesService: UnitTypesService,
    private formBuilder: FormBuilder,
    private algoliaService: AlgoliaService
  ) {
  }

  ngOnInit(): void {
    this.unitTypesService.findAll()
        .pipe(
          tap(unitTypes => this.findAllUnityTypesRes.set(unitTypes))
        )
        .subscribe();

    this.findAllShoppingList();
  }

  ngAfterContentInit() {
    this.algoliaService.productStart();
  }

  ngOnDestroy() {
    this.algoliaService.productDispose();
  }

  showDialogSelectProductEvent(product: ProductInstantSearch) {
    this.selectedProduct.set(product);
  }

  autoCompleteUnitTypeEvent($event: AutoCompleteCompleteEvent) {
    this.unitTypesService.findAll()
        .pipe(
          tap(unitTypes => this.findAllUnityTypesRes.set(unitTypes))
        )
        .subscribe();
  }

  addProductsSubmit(request: SaveShoppingListProductReq) {
    this.productsService.saveShoppingList(request)
        .pipe(
          tap(() => {
            this.shoppingListProductsRes.update(value => {
              value.content
                   .push(this.selectedProduct());

              return value;
            });

            this.addOrUpdateConfigureAlgolia(this.shoppingListProductsRes());
          })
        )
        .subscribe();
  }

  private addOrUpdateConfigureAlgolia(shoppingListProductsRes: FindAllShoppingListProductsRes) {
    const filters = shoppingListProductsRes.content
                                           .map(product => product.id)
                                           .map(id => `NOT id=${id}`)
                                           .join(' AND ');

    this.algoliaService.productsAddWidgets([
      configure({
        highlightPreTag: '<em class="bg-gray-light text-bold">',
        highlightPostTag: '</em>',
        filters: filters
      })
    ]);
  }

  private findAllShoppingList() {
    this.productsService.findAllShoppingList(this.idShoppingList)
        .pipe(
          tap(shoppingList => {
            this.shoppingListProductsRes.set(shoppingList);
            this.initAlgolia(shoppingList);
          })
        )
        .subscribe();
  }

  private initAlgolia(shoppingListProductsRes: FindAllShoppingListProductsRes) {
    const searchBox = (renderOptions: SearchBoxRenderState): void => {
      const {refine} = renderOptions;

      this.nameProductFormControl.valueChanges
          .subscribe(value => {
            refine(value);
          });
    };
    const infiniteHits = (renderOptions: InfiniteHitsRenderState, isFirstRender: boolean): void => {
      const {
        items,
        showMore,
        isLastPage
      } = renderOptions;
      const itemsMap = items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imgUrl: item.img_url,
        nameHighlight: item._highlightResult.name.value
      }));

      if (isFirstRender) {
        this.showMoreButton.click = showMore;

        //En la doc cuando usan "isFirstRender" siempre hacen el "return".
        return;
      }

      this.showMoreButton.disabled.set(isLastPage);
      this.showMoreButton.render.set(itemsMap.length > 0);
      this.products.set(itemsMap);
    };

    this.algoliaService.productsAddWidgets([
      connectSearchBox(searchBox)({}),
      connectInfiniteHits(infiniteHits)({
        escapeHTML: false
      })
    ]);

    this.addOrUpdateConfigureAlgolia(shoppingListProductsRes);
  }

  onToggleProductsViewChange() {
    this.toggleProductsView.set(!this.toggleProductsView());
  }

  addProductEvent($event: { product: ProductInstantSearch, unitsPerProduct: number }) {
    const request: SaveShoppingListProductReq = {
      productId: $event.product.id,
      shoppingListId: this.idShoppingList,
      unitsPerProduct: $event.unitsPerProduct,
      unitTypeId: this.findAllUnityTypesRes().content[0].id
    };

    this.showDialogSelectProductEvent($event.product);
    this.addProductsSubmit(request);
  }

}
