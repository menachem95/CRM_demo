import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { log } from "console";

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

const initialState = {
  userInfo,
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
      localStorage.setItem('userData', JSON.stringify(action.payload));
      state.userInfo = action.payload;
      console.log(state.userInfo);
      // state.isLoading = false;
    },
    resetUserInfo: (state) => {
      state.userInfo = userInfo
    }
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;

export default userSlice.reducer;
