export interface Product {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number | string;
  product_description: string;
}

export interface CartItemtoServer {
  product_id: string;
  customer_id: string;
  cart_id?: string;
  Product?: CartItem;
}

export interface CartItemsFromTheServer {
  items: CartItemtoServer[];
  cart_id: string;
}

export interface CartItem {
  id?: string;
  cart_id?: string;
  product_id: string;
  product_name: string;
  product_price: number | string;
  product_description: string;
}

export interface Cart {
  cart_id: string;
  cartItems: CartItem[];
}

export interface Deal {
  id: string;
  deal_id: string;
  cart_id: string;
  customer_id: string;
  agent_id: string;
}
