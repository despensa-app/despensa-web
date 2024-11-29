import {FindByIdProductListRes} from '@app/models/find-by-id-product-list-res';

export interface FindByIdShoppingListRes {
  id: number;
  name: string;
  totalProducts: number;
  totalPrice: number;
  totalUnitsPerProducts: number;
  totalSelectedProducts: number;
  totalPriceSelectedProducts: number;
  productList: FindByIdProductListRes;
  selectProductOption: SelectProductOption[];
}

export interface SelectProductOption {
  value: string;
  label: string;
  selected: boolean;
}
