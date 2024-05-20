export interface UpdateShoppingListReq {
  name: string;
  products?: ProductShoppingList[];
}

export interface ProductShoppingList {
  selected: boolean;
  productId: number;
  unitTypeId: number;
}
