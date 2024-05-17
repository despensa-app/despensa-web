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
import {tap} from 'rxjs';
import {FindAllShoppingListProductsRes, Product} from '../../../../models/find-all-shopping-list-products-res';
import {UnitTypesService} from '../../../../services/unit-types/unit-types.service';
import {FindAllUnitTypesRes} from '../../../../models/find-all-unit-types-res';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';

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
    InputNumberModule
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
    price: 0
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


  constructor(
    private productsService: ProductsService,
    private unitTypesService: UnitTypesService
  ) {
  }

  ngOnInit(): void {
    this.productsService.findAllShoppingList(this.idShoppingList)
        .pipe(
          tap(shoppingList => this.shoppingListProductsRes.set(shoppingList))
        )
        .subscribe();
  }

  showDialogSelectProductEvent(product: Product) {
    this.selectedProduct.set(product);
    this.visibleProductDialog = true;
  }

  autoCompleteUnitTypeEvent($event: AutoCompleteCompleteEvent) {
    this.unitTypesService.findAll()
        .pipe(
          tap(unitTypes => this.findAllUnityTypesRes.set(unitTypes))
        )
        .subscribe();
  }

  hideDialogSelectProductEvent() {
    this.visibleProductDialog = false;
  }

}
