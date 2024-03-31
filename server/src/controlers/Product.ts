import { Cart, CartItem, Product } from "../module";
import { ProductAttributes } from "../module/Product";
import { CartItemAttributes } from "../module/CartItem";


export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    console.log(products);
    return products
  } catch (error) {
    console.error("שגיאה בשליפת המוצרים:", error);
    return error
  }
};


export const createProduct = async (product: ProductAttributes) => {
  try {
   const newProduct = await Product.create(product)
   return newProduct;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};


export const addProductToCart = async (cartItem: CartItemAttributes) => {
  try {
    const cart_id = cartItem.cart_id
   await CartItem.create(cartItem)
   let items = await Cart.getItemsForCart(cart_id); 
   
   console.log("items: ", items);
     return {cart_id, items};
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};




