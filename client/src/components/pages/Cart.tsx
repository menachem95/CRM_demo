import React, { useEffect, useState, FC } from "react";
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "../table/Table";
import JenericPage from "./JenericPage";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { setSnackbar } from "../../store/snackbarSlice";
import { RootState } from "../../store/store";
import { User, createCart, removeCart } from "../../store/userSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Product,
  CartItemtoServer,
  CartItemsFromTheServer,
} from "../../typs/products_and_carts";

import { jenericFetch as deleteCart } from "../../functions/jenericFetch";

// const rows = fetchUsers()


const Cart: FC = () => {
  const { cart } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("cart: ", cart);

  const handleSuccess = () => {
    dispatch(removeCart());
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Cart removed successfully",
      })
    );
    handleClose();
  };

  const handleError = () => {
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: "Failed to remove cart",
      })
    );
    handleClose();
  };

  const onClickHandler = () => {
    deleteCart<undefined, null>(
      {
        url: `carts/${cart.cart_id}`,
        method: "DELETE",
      },
      handleSuccess,
      handleError
    );
  };

  // const deleteCart = async () => {
  //   try {
  //     const response = await fetch(`${API_URI}carts/${cart.cart_id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json", // קביעת סוג התוכן ל-JSON
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const response1 = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
  //     dispatch(removeCart());
  //     dispatch(
  //       setSnackbar({
  //         snackbarOpen: true,
  //         snackbarType: "success",
  //         snackbarMessage: "Cart removed successfully",
  //       })
  //     );
  //     // fetchUsers();
  //   } catch (error) {
  //     console.error("Failed to remove cart:", error);
  //     dispatch(
  //       setSnackbar({
  //         snackbarOpen: true,
  //         snackbarType: "error",
  //         snackbarMessage: "Failed to remove cart",
  //       })
  //     );
  //   } finally {
  //     handleClose();
  //   }
  // };
  const dispatch = useDispatch();
  if (!cart.cart_id) {
    return <div>cart is ampty</div>;
  }
  let rows = [...cart.cartItems];

  rows = rows.map((row) => {
    return {
      ...row,
      id: Math.random().toString(),
      product_price: `${row.product_price} ₪`,
    };
    // row.id = row.product_id;
    // row.product_price = `${row.product_price} ₪`
  });

  console.log("rows: ", rows);
  // for (let i = 0; i < rows.length; i++) {
  //   rows[i].id = rows[i].product_id;
  //   rows[i].product_price = `${rows[i].product_price} ₪`;
  //   // data[i].add_to_cart =
  // }

  const columns: GridColDef[] = [
    { field: "product_name", headerName: "Name", width: 150 },
    { field: "product_price", headerName: "Price", width: 150 },
    { field: "product_description", headerName: "description", width: 250 },
  ];

  const val = {
    rows,
    columns: columns,
    title: "Cart",
  };

  return (
    <>
      <Box sx={{ padding: 3, bgcolor: "white", m: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            {val.title}
          </Typography>

          <Button variant="contained" color="primary">
            קניה
          </Button>
        </Box>
        {/* <TableContainer sx={{marginLeft: 0, height: 500 */}
        {/* }} > */}
        <Table rows={val.rows} columns={val.columns} cellType="" />
        {/* </TableContainer> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            alignItems: "right",
            marginBottom: 2,
          }}
        >
          <IconButton onClick={handleClickOpen}>
            <GridDeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ?האם אתה בטוח שברצונך למחוק את העגלה
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ?האם אתה בטוח שברצונך למחוק את העגלה
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button
            onClick={handleClose}
            //  autoFocus
          >
            ביטול{" "}
          </Button>
          <Button onClick={onClickHandler} variant="contained" color="primary">
            מחק עגלה
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
