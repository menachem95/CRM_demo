import { useDispatch } from "react-redux";
import { setSnackbar } from "../store/snackbarSlice";
import { User } from "../store/userSlice";
import { CartItemsFromTheServer } from "../typs/products_and_carts";
import { jenericFetch } from "./jenericFetch";


export const createCart = async (
  customer_id: string,
  handleSuccess: (cart: CartItemsFromTheServer) => void,
  handleError: (error: Error) => void
) => {
    
  await jenericFetch<undefined, CartItemsFromTheServer>(
    {
      url: `carts/create_cart/${customer_id}`,
      method: "POST",
    },
    handleSuccess,
    handleError
  );
};

export const addProductToCart = async (
  body: {cart_id: string, costumer_id: string},
  handleSuccess: (cart: CartItemsFromTheServer) => void,
  handleError: (error: Error) => void
) => {
    
  await jenericFetch<{cart_id: string, costumer_id: string}, CartItemsFromTheServer>(
    {
      url: `products/add_product_to_cart`,
      method: "POST",
      body
    },
    handleSuccess,
    handleError
  );
};
