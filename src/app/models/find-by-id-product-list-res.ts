import {PagingAndSortingRes} from '@app/models/paging-and-sorting-res';

export interface FindByIdProductListRes extends PagingAndSortingRes<ProductShoppingList> {
}

export interface ProductShoppingList {
  unitsPerProduct: number;
  selected: boolean;
  product: Product;
  unitType: UnitType;
  totalPrice: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export interface UnitType {
  id: number;
  name: string;
}
