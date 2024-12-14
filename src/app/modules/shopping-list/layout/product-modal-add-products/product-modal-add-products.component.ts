import {Component, effect, EventEmitter, input, OnInit, Output} from '@angular/core';
import {ProductInstantSearch} from '@app/modules/shopping-list/models/product-instant-search';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgClass} from '@angular/common';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ImageModule} from 'primeng/image';
import {SaveShoppingListProductReq} from '@app/models/save-shopping-list-product-req';
import {map, tap} from 'rxjs';
import {FindAllUnitTypesRes} from '@app/models/find-all-unit-types-res';

@Component({
  selector: 'app-product-modal-add-products',
  standalone: true,
  imports: [
    InputNumberModule,
    NgClass,
    AutoCompleteModule,
    ReactiveFormsModule,
    ImageModule
  ],
  templateUrl: './product-modal-add-products.component.html',
  styleUrl: './product-modal-add-products.component.css'
})
export class ProductModalAddProductsComponent implements OnInit {

  selectedProduct = input.required<ProductInstantSearch>();

  idShoppingList = input.required<number>();

  findAllUnityTypesRes = input.required<FindAllUnitTypesRes>();

  @Output() addProductsEvent = new EventEmitter<SaveShoppingListProductReq>();

  @Output() autoCompleteUnitTypeEvent = new EventEmitter<AutoCompleteCompleteEvent>();

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

  constructor(
    private formBuilder: FormBuilder
  ) {
    effect(() => {
      this.setFormWhenProductHasSelected();
    }, {allowSignalWrites: true});
  }

  ngOnInit() {
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
  }

  addProductsSubmit() {
    const request: SaveShoppingListProductReq = {
      productId: this.saveShoppingListProductForm.value.productId!,
      shoppingListId: this.saveShoppingListProductForm.value.shoppingListId!,
      unitsPerProduct: this.saveShoppingListProductForm.value.unitsPerProduct!,
      unitTypeId: this.saveShoppingListProductForm.value.unitTypeId!
    };

    this.addProductsEvent.emit(request);
  }

  autoCompleteUnitType($event: AutoCompleteCompleteEvent) {
    this.autoCompleteUnitTypeEvent.emit($event);
  }

  setFormWhenProductHasSelected() {
    if (!this.selectedProduct().id) {
      return;
    }

    const unitType = this.findAllUnityTypesRes().content[0];

    this.saveShoppingListProductForm.setValue({
      productId: this.selectedProduct().id,
      shoppingListId: Number(this.idShoppingList()),
      unitsPerProduct: 1,
      unitTypeId: unitType.id,
      unitType: {
        id: unitType.id,
        name: unitType.name
      }
    }, {emitEvent: false});
  }
}
