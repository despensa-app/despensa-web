export interface FindByIdShoppingListRes {
  id: number;
  name: string;
  totalProducts: number;
  totalPrice: number;
  totalUnitsPerProducts: number;
  totalSelectedProducts: number;
  totalPriceSelectedProducts: number;
  products: ProductShoppingList[];
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


