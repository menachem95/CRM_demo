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
import { Product, CartItemtoServer, CartItemsFromTheServer, Deal } from "../../typs/products_and_carts";



// const rows = fetchUsers()

const API_URI = process.env.REACT_APP_API_SERVER as string;

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Deal[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userInfo, cart } = useSelector((state: RootState) => state.user);

 
  const dispatch = useDispatch();

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${API_URI}deals`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Deal[] = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
      for (let i = 0; i < data.length; i++) {
        data[i].id = data[i].deal_id;
        // data[i].product_price = `${data[i].product_price} ₪`;
        // data[i].add_to_cart =
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchDeals();
  }, []);



  

  const columns: GridColDef[] = [
    { field: "deal_id", headerName: "deal_id", width: 150 },
    { field: "cart_id", headerName: "cart_id", width: 150 },
    { field: "customer_id", headerName: "costumer_id", width: 150 },
    { field: "agent_id", headerName: "agent_id", width: 150 },
   
    // {
    //   field: "add_to_cart",
    //   headerName: "Add to Cart",
    //   width: 70,
    //   renderCell: (params) => {
    //     return (
    //       <IconButton
    //         onClick={() => {
    //           console.log("params", params);
    //           const product_id = params.id as string;
    //           const customer_id = userInfo.user_id || "1";

    //           // addProductToCart({ product_id, customer_id });
    //         }}
    //       >
    //         <AddShoppingCartIcon />
    //       </IconButton>
    //     ); //<-- Mui icons should be put this way here.
    //   },
    // },
  ];

  const val = {
    rows: products,
    columns: columns,
    title: "Products",
    buttonTitle: "Add Product",
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
          <Button
            // onClick={handleDrawerOpen}
            // onKeyDown={toggleDrawer(false)}
            variant="contained"
            color="primary"
            // onClick={onClickHandler}
          >
            {val.buttonTitle}
          </Button>
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

export default ProductsPage;

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
