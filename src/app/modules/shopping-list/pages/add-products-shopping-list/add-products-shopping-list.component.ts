import {AfterContentInit, Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {HeaderShoppingListComponent} from '../../layout/header-shopping-list/header-shopping-list.component';
import {ImageModule} from 'primeng/image';
import {NavbarShoppingListComponent} from '../../layout/navbar-shopping-list/navbar-shopping-list.component';
import {PageComponent} from '../../../../layout/page/page.component';
import {
  AddProductsNavbarShoppingListComponent
} from '../../layout/add-products-navbar-shopping-list/add-products-navbar-shopping-list.component';
import {
  AddProductHeaderShoppingListComponent
} from '../../layout/add-product-header-shopping-list/add-product-header-shopping-list.component';
import {ProductsService} from '../../../../services/products/products.service';
import {map, tap} from 'rxjs';
import {UnitTypesService} from '../../../../services/unit-types/unit-types.service';
import {FindAllUnitTypesRes} from '../../../../models/find-all-unit-types-res';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaveShoppingListProductReq} from '../../../../models/save-shopping-list-product-req';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {NgClass} from '@angular/common';
import {AlgoliaService} from '../../../../services/algolia.service';
import {connectHits, connectSearchBox} from 'instantsearch.js/es/connectors';
import {SearchBoxRenderState} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import {HitsRenderState} from 'instantsearch.js/es/connectors/hits/connectHits';
import {configure} from 'instantsearch.js/es/widgets';
import {ProductInstantSearch} from '../../models/product-instant-search';
import {FindAllShoppingListProductsRes} from '../../../../models/find-all-shopping-list-products-res';

@Component({
  selector: 'app-add-products-shopping-list',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    DialogModule,
    HeaderShoppingListComponent,
    ImageModule,
    NavbarShoppingListComponent,
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
    NgClass
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

  @Input('id') idShoppingList: number = 0;

  visibleProductDialog: boolean = false;

  saveShoppingListProductForm = this.formBuilder.nonNullable.group({
    productId: [0],
    shoppingListId: [0],
    unitsPerProduct: [0],
    unitType: [
      {
        id: 0,
        name: ''
      }
    ],
    unitTypeId: [0]
  });

  nameProductFormControl = new FormControl('', {nonNullable: true});

  constructor(
    private productsService: ProductsService,
    private unitTypesService: UnitTypesService,
    private formBuilder: FormBuilder,
    private algoliaService: AlgoliaService
  ) {
  }

  ngOnInit(): void {
    this.saveShoppingListProductForm.get('unitType')!
      .valueChanges
      .pipe(
        map(value => value.id),
        tap(value => {
          this.saveShoppingListProductForm.get('unitTypeId')!
            .setValue(value, {emitEvent: false});
        })
      )
      .subscribe();
    //TODO: Implementación temporal
    this.saveShoppingListProductForm.get('unitType')!
      .disable({onlySelf: true});
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
    this.visibleProductDialog = true;
    const unitType = this.findAllUnityTypesRes().content[0];//TODO: ver ngOnInit()
    this.saveShoppingListProductForm.setValue({
      productId: product.id,
      shoppingListId: Number(this.idShoppingList),
      unitsPerProduct: 1,
      unitTypeId: unitType.id,
      unitType: {
        id: unitType.id,
        name: unitType.name
      }
    }, {emitEvent: false});
  }

  autoCompleteUnitTypeEvent($event: AutoCompleteCompleteEvent) {
    this.unitTypesService.findAll()
        .pipe(
          tap(unitTypes => this.findAllUnityTypesRes.set(unitTypes))
        )
        .subscribe();
  }

  addProductsSubmit() {
    this.visibleProductDialog = false;
    const request: SaveShoppingListProductReq = {
      productId: this.saveShoppingListProductForm.value.productId!,
      shoppingListId: this.saveShoppingListProductForm.value.shoppingListId!,
      unitsPerProduct: this.saveShoppingListProductForm.value.unitsPerProduct!,
      unitTypeId: this.saveShoppingListProductForm.value.unitTypeId!
    };

    this.productsService.saveShoppingList(request)
        .subscribe();
  }

  private findAllShoppingList() {
    this.productsService.findAllShoppingList(this.idShoppingList)
        .pipe(
          tap(shoppingList => {
            this.shoppingListProductsRes.set(shoppingList);
            this.initAlgolia();
          })
        )
        .subscribe();
  }

  private initAlgolia() {
    const searchBox = (renderOptions: SearchBoxRenderState): void => {
      const {refine} = renderOptions;

      this.nameProductFormControl.valueChanges
          .subscribe(value => {
            refine(value);
          });
    };
    const hits = (renderOptions: HitsRenderState): void => {
      const {items} = renderOptions;
      const itemsMap = items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imgUrl: item.img_url,
        nameHighlight: item._highlightResult.name.value
      }));

      this.products.set(itemsMap);
    };

    this.algoliaService.productsAddWidgets([
      connectSearchBox(searchBox)({}),
      connectHits(hits)({
        escapeHTML: false
      }),
      configure({
        highlightPreTag: '<em class="bg-gray-light text-bold">',
        highlightPostTag: '</em>'
      })
    ]);
  }
}
