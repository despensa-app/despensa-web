import {PagingAndSortingRes} from './paging-and-sorting-res';

export interface FindAllShoppingListRes extends PagingAndSortingRes<ShoppingList> {

}

export interface ShoppingList {
  id: number;
  name: string;
  totalProducts: number;
  createdAt: string;
}
