import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItemsFromTheServer } from "../typs/products_and_carts";

type UserRole = "AGENT" | "CUSTOMER";

export interface User {
  user_name: string;
  user_role: UserRole;
  user_id: string;
}



const userInfo: User = {
  user_name: "",
  user_id: "",
  user_role: "CUSTOMER",
};

const cart: Cart = {
  cart_id: "",
  cartItems: [
    {
      product_id: "",
      product_price: "",
      product_description: "",
      product_name: "",
    },
  ],
};

const initialState = {
  userInfo,
  cart,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // startLoading: (state) => {
    //   state.isLoading = true;
    // },
    setUserInfo: (state, action: PayloadAction<User>) => {
      console.log("action.payload: ", action.payload);
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      console.log(state.userInfo);
      // state.isLoading = false;
    },
    resetUserInfo: (state) => {
      state.userInfo = userInfo;
    },
    createCart: (
      state,
      action: PayloadAction<CartItemsFromTheServer>
      // <Cart>
    ) => {
      console.log("action.payload: ", action.payload);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart_id: cart.cart_id,
          cartItems: [action.payload.items],
        })
      );
      state.cart = { ...state.cart, ...action.payload};
      console.log(state.cart);
      // state.isLoading = false;
    },
    // updateCart: (state, action: PayloadAction<CartItem>) => {
    //   console.log("action.payload: ", action.payload);
    //   localStorage.setItem("cart", JSON.stringify({...state.cart, ...action.payload}));
    //   state.cart.cartItems.push(action.payload);
    //   console.log(state.userInfo);
    //   // state.isLoading = false;
    // },
  },
});

export const { setUserInfo, resetUserInfo, createCart } = userSlice.actions;

export default userSlice.reducer;
