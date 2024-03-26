import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface Snackbar {
  snackbarOpen: boolean;
  snackbarType: AlertColor;
  snackbarMessage: string;
}

const initialState: Snackbar = {
  snackbarOpen: false,
  snackbarType: "info",
  snackbarMessage: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<Snackbar>) => {
        state.snackbarOpen = action.payload.snackbarOpen;
        state.snackbarType = action.payload.snackbarType;
        state.snackbarMessage = action.payload.snackbarMessage;
    },
    closeSnackbar: (state) => {
       
     state.snackbarOpen = false
      
    }
  },
});

export const { setSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

// export const SET_SNACKBAR = "teamly/settings/SET_SNACKBAR";

// const initialState = {
//   snackbarOpen: false,
//   snackbarType: "success",
//   snackbarMessage: ""
// };

// // export default (state = initialState, action) => {
// //   switch (action.type) {
// //     case SET_SNACKBAR:
// //       const { snackbarOpen, snackbarMessage, snackbarType } = action;
// //       return {
// //         ...state,
// //         snackbarOpen,
// //         snackbarType,
// //         snackbarMessage
// //       };
// //     default:
// //       return state;
// //   }
// // };

// export const setSnackbar = (
//   snackbarOpen,
//   snackbarType = "success",
//   snackbarMessage = ""
// ) => ({
//   type: SET_SNACKBAR,
//   snackbarOpen,
//   snackbarType,
//   snackbarMessage
// });
