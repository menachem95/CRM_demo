
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
  }
  
  export interface CartItemsFromTheServer {
    items: CartItemtoServer[];
    cart_id: string;
  }

  export interface CartItem {
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