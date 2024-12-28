import {Component, EventEmitter, input, Output} from '@angular/core';
import {ViewTypeProductList} from '@app/modules/shopping-list/models/view-type-product-list';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-view-type-product-list',
  imports: [
    NgClass
  ],
  templateUrl: './view-type-product-list.component.html',
  styleUrl: './view-type-product-list.component.css'
})
export class ViewTypeProductListComponent {

  protected readonly viewTypeProductListEnum = ViewTypeProductList;

  viewTypeProductListSelected = input.required<ViewTypeProductList>();

  @Output() viewTypeProductListSelect = new EventEmitter<ViewTypeProductList>();

  viewProductListEvent(selected: ViewTypeProductList) {
    this.viewTypeProductListSelect.emit(selected);
  }

  isViewTypeProductList(value: ViewTypeProductList) {
    return this.viewTypeProductListSelected() === value;
  }

}
