import Product from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  quantity: number;
  price: number;
}
