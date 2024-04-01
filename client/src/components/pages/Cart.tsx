import React, { useEffect, useState, FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
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
import { User, createCart } from "../../store/userSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Product,
  CartItemtoServer,
  CartItemsFromTheServer,
} from "../../typs/products_and_carts";


// const rows = fetchUsers()

const API_URI = process.env.REACT_APP_API_SERVER as string;

const Cart: FC = () => {
  const { userInfo, cart } = useSelector((state: RootState) => state.user);
   console.log("cart: ", cart);

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

          {/* <Button onClick={toggleDrawer(true)}>פתח טופס</Button> */}
        </Box>
        {/* <TableContainer sx={{marginLeft: 0, height: 500 */}
        {/* }} > */}
        <Table rows={val.rows} columns={val.columns} />
        {/* </TableContainer> */}
      </Box>
    </>
  );
};

export default Cart;

// const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", agent: "moshe", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", agent: "ido", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", agent: "moshe", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", agent: "menachem", age: 16 },
//     {
//       id: 5,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 6, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     {
//       id: 7,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "menachem",
//       age: 44,
//     },
//     { id: 8, lastName: "Frances", firstName: "Rossini", agent: "moshe", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", agent: "moshe", age: 65 },
//     { id: 10, lastName: "Stark", firstName: "Arya", agent: "natan", age: 16 },
//     {
//       id: 11,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 12, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     { id: 13, lastName: "Clifford", firstName: "Ferrara", agent: "ido", age: 44 },
//     {
//       id: 14,
//       lastName: "Frances",
//       firstName: "Rossini",
//       agent: "moshe",
//       age: 36,
//     },
//     { id: 15, lastName: "Stark", firstName: "Arya", agent: "moshe", age: 16 },
//     {
//       id: 16,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     {
//       id: 17,
//       lastName: "Melisandre",
//       firstName: null,
//       agent: "menachem",
//       age: 150,
//     },
//     {
//       id: 18,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "moshe",
//       age: 44,
//     },
//     { id: 19, lastName: "Frances", firstName: "Rossini", agent: "levi", age: 36 },
//     { id: 20, lastName: "Stark", firstName: "Arya", agent: "moshe", age: 16 },
//     {
//       id: 21,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 22, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     {
//       id: 23,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "moshe",
//       age: 44,
//     },
//     {
//       id: 24,
//       lastName: "Frances",
//       firstName: "Rossini",
//       agent: "moshe",
//       age: 36,
//     },
//   ];
