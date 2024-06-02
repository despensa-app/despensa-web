import {PagingAndSortingRes} from './paging-and-sorting-res';

export interface FindAllShoppingListProductsRes extends PagingAndSortingRes<Product> {

}

export interface Product {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}
