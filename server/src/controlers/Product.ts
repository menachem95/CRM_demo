import { CartItem, Product } from "../module";
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
   const newCartItem = await CartItem.create(cartItem)
   return newCartItem;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};




