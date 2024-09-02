import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  connectInfiniteHits,
  connectSearchBox,
} from 'instantsearch.js/es/connectors';
import { InfiniteHitsRenderState } from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';
import { SearchBoxRenderState } from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import { configure } from 'instantsearch.js/es/widgets';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { map, tap } from 'rxjs';
import { PageComponent } from '../../../../layout/page/page.component';
import { FindAllShoppingListProductsRes } from '../../../../models/find-all-shopping-list-products-res';
import { FindAllUnitTypesRes } from '../../../../models/find-all-unit-types-res';
import { SaveShoppingListProductReq } from '../../../../models/save-shopping-list-product-req';
import { AlgoliaService } from '../../../../services/external/algolia.service';
import { ProductsService } from '../../../../services/pages/products.service';
import { UnitTypesService } from '../../../../services/pages/unit-types.service';
import { AddProductHeaderShoppingListComponent } from '../../layout/add-product-header-shopping-list/add-product-header-shopping-list.component';
import { AddProductsNavbarShoppingListComponent } from '../../layout/add-products-navbar-shopping-list/add-products-navbar-shopping-list.component';
import { HeaderShoppingListComponent } from '../../layout/header-shopping-list/header-shopping-list.component';
import { NavbarShoppingListComponent } from '../../layout/navbar-shopping-list/navbar-shopping-list.component';
import { ProductInstantSearch } from '../../models/product-instant-search';

@Component({
  selector: 'app-add-products-shopping-list',
  standalone: true,
  imports: [
    ToggleButtonModule,
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
    NgClass,
  ],
  templateUrl: './add-products-shopping-list.component.html',
  styleUrl: './add-products-shopping-list.component.css',
})
export class AddProductsShoppingListComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  private readonly _initShoppingListProductsRes: FindAllShoppingListProductsRes =
    {
      content: [],
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      total: 0,
    };

  private readonly _initProduct: ProductInstantSearch = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: '',
    nameHighlight: '',
  };

  private readonly _initFindAllUnitTypesRes: FindAllUnitTypesRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0,
  };

  shoppingListProductsRes = signal<FindAllShoppingListProductsRes>(
    this._initShoppingListProductsRes
  );

  selectedProduct = signal<ProductInstantSearch>(this._initProduct);

  findAllUnityTypesRes = signal<FindAllUnitTypesRes>(
    this._initFindAllUnitTypesRes
  );

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
        name: '',
      },
    ],
    unitTypeId: [0],
  });

  nameProductFormControl = new FormControl('', { nonNullable: true });

  showMoreButton = {
    disabled: signal(false),
    render: signal(false),
    click: () => {},
  };

  constructor(
    private productsService: ProductsService,
    private unitTypesService: UnitTypesService,
    private formBuilder: FormBuilder,
    private algoliaService: AlgoliaService
  ) {}

  ngOnInit(): void {
    this.saveShoppingListProductForm
      .get('unitType')!
      .valueChanges.pipe(
        map((value) => value.id),
        tap((value) => {
          this.saveShoppingListProductForm
            .get('unitTypeId')!
            .setValue(value, { emitEvent: false });
        })
      )
      .subscribe();
    //TODO: Implementación temporal
    this.saveShoppingListProductForm
      .get('unitType')!
      .disable({ onlySelf: true });
    this.unitTypesService
      .findAll()
      .pipe(tap((unitTypes) => this.findAllUnityTypesRes.set(unitTypes)))
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
    const unitType = this.findAllUnityTypesRes().content[0]; //TODO: ver ngOnInit()
    this.saveShoppingListProductForm.setValue(
      {
        productId: product.id,
        shoppingListId: Number(this.idShoppingList),
        unitsPerProduct: 1,
        unitTypeId: unitType.id,
        unitType: {
          id: unitType.id,
          name: unitType.name,
        },
      },
      { emitEvent: false }
    );
  }

  autoCompleteUnitTypeEvent($event: AutoCompleteCompleteEvent) {
    this.unitTypesService
      .findAll()
      .pipe(tap((unitTypes) => this.findAllUnityTypesRes.set(unitTypes)))
      .subscribe();
  }

  addProductsSubmit() {
    this.visibleProductDialog = false;
    const request: SaveShoppingListProductReq = {
      productId: this.saveShoppingListProductForm.value.productId!,
      shoppingListId: this.saveShoppingListProductForm.value.shoppingListId!,
      unitsPerProduct: this.saveShoppingListProductForm.value.unitsPerProduct!,
      unitTypeId: this.saveShoppingListProductForm.value.unitTypeId!,
    };

    this.productsService
      .saveShoppingList(request)
      .pipe(
        tap(() => {
          this.shoppingListProductsRes.update((value) => {
            value.content.push(this.selectedProduct());

            return value;
          });

          this.addOrUpdateConfigureAlgolia(this.shoppingListProductsRes());
        })
      )
      .subscribe();
  }

  private addOrUpdateConfigureAlgolia(
    shoppingListProductsRes: FindAllShoppingListProductsRes
  ) {
    const filters = shoppingListProductsRes.content
      .map((product) => product.id)
      .map((id) => `NOT id=${id}`)
      .join(' AND ');

    this.algoliaService.productsAddWidgets([
      configure({
        highlightPreTag: '<em class="bg-gray-light text-bold">',
        highlightPostTag: '</em>',
        filters: filters,
      }),
    ]);
  }

  private findAllShoppingList() {
    this.productsService
      .findAllShoppingList(this.idShoppingList)
      .pipe(
        tap((shoppingList) => {
          this.shoppingListProductsRes.set(shoppingList);
          this.initAlgolia(shoppingList);
        })
      )
      .subscribe();
  }

  private initAlgolia(shoppingListProductsRes: FindAllShoppingListProductsRes) {
    const searchBox = (renderOptions: SearchBoxRenderState): void => {
      const { refine } = renderOptions;

      this.nameProductFormControl.valueChanges.subscribe((value) => {
        refine(value);
      });
    };
    const infiniteHits = (
      renderOptions: InfiniteHitsRenderState,
      isFirstRender: boolean
    ): void => {
      const { items, showMore, isLastPage } = renderOptions;
      const itemsMap = items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imgUrl: item.img_url,
        nameHighlight: item._highlightResult.name.value,
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
        escapeHTML: false,
      }),
    ]);

    this.addOrUpdateConfigureAlgolia(shoppingListProductsRes);
  }
}
