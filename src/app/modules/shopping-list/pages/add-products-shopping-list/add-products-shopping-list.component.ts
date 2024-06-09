import {Component, Input, OnInit, signal} from '@angular/core';
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
import {FindAllShoppingListProductsRes, Product} from '../../../../models/find-all-shopping-list-products-res';
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
export class AddProductsShoppingListComponent implements OnInit {

  private readonly _initShoppingListProductsRes: FindAllShoppingListProductsRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0
  };

  private readonly _initProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: ''
  };

  private readonly _initFindAllUnitTypesRes: FindAllUnitTypesRes = {
    content: [],
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    total: 0
  };

  shoppingListProductsRes = signal<FindAllShoppingListProductsRes>(this._initShoppingListProductsRes);

  selectedProduct = signal<Product>(this._initProduct);

  findAllUnityTypesRes = signal<FindAllUnitTypesRes>(this._initFindAllUnitTypesRes);

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
    this.findAllShoppingList();

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

    this.initAlgolia();
  }

  showDialogSelectProductEvent(product: Product) {
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
        .subscribe({
          complete: () => this.findAllShoppingList()
        });
  }

  private findAllShoppingList() {
    this.productsService.findAllShoppingList(this.idShoppingList)
        .pipe(
          tap(shoppingList => this.shoppingListProductsRes.set(shoppingList))
        )
        .subscribe();
  }

  private initAlgolia() {
    this.algoliaService.productsStartSearch({
      searchBox: (renderOptions: any, isFirstRender: any) => {
        const {refine} = renderOptions;

        this.nameProductFormControl.valueChanges
            .subscribe(value => {
              refine(value);
            });
      },
      hits: (renderOptions: any, isFirstRender: any) => {
        const {hits} = renderOptions;

        this.shoppingListProductsRes.set({
          content: hits.map((hit: any) => ({
            id: hit.id,
            name: hit.name,
            price: hit.price,
            imgUrl: hit.img_url
          })),
          currentPage: 0,
          pageSize: 0,
          totalPages: 0,
          total: 0
        });
      }
    });
  }
}
