import { CartItemsFromTheServer } from "../typs/products_and_carts";
import { jenericFetch } from "./jenericFetch";

export const getUserCurrentCart = async (
  customer_id: string,
  handleSuccess: (cart: CartItemsFromTheServer) => void,
  handleError: (error: Error) => void
) => {
    
  await jenericFetch<undefined, CartItemsFromTheServer>(
    {
      url: `users/get_current_cart/${customer_id}`,
      method: "GET",
    },
    handleSuccess,
    handleError
  );
};
