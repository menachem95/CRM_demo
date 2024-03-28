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
import { User } from "../../store/userSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface Product {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number | string;
  product_description: string;
}

interface CartItem {
  product_id: string;
  customer_id: string;
  cart_id?: string;
}

// const rows = fetchUsers()

const API_URI = process.env.REACT_APP_API_SERVER as string;

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user_name, user_id } = useSelector(
    (state: RootState) => state.user.userInfo
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Product>>();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URI}products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
      for (let i = 0; i < data.length; i++) {
        data[i].id = data[i].product_id;
        data[i].product_price = `${data[i].product_price} ₪`;
        // data[i].add_to_cart =
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const createProduct = async (data: Partial<Product>) => {
    try {
      const response = await fetch(`${API_URI}products/create_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // קביעת סוג התוכן ל-JSON
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const response1 = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
      console.log(response1);
      console.log("Product created successfully");
      handleDrawerClose();
      reset();
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Product created successfully",
        })
      );
      fetchProducts();
    } catch (error) {
      console.error("Failed to add user:", error);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Failed to create product",
        })
      );
    }
  };
  const addProductToCart = async (data: CartItem) => {
    try {
      const response = await fetch(`${API_URI}products/add_product_to_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // קביעת סוג התוכן ל-JSON
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: "Failed to add product",
          })
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const response1 = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
      console.log(response1);
      console.log("Product added to cart successfully");
      handleDrawerClose();
      reset();
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Product added to cart successfully",
        })
      );
      // fetchProducts();
    } catch (error) {
      console.error("Failed to add user:", error);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Failed to added product",
        })
      );
    }
  };
  // פונקציה שתפעל בשליחת הטופס
  const onSubmit = async (data: Partial<Product>) => {
    console.log("data", data);

    createProduct(data);
  };

  const columns: GridColDef[] = [
    { field: "product_name", headerName: "Name", width: 150 },
    { field: "product_price", headerName: "Price", width: 150 },
    { field: "product_description", headerName: "description", width: 250 },
    {
      field: "user_role",
      headerName: "Role",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "add_to_cart",
      headerName: "Add to Cart",
      width: 70,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              console.log("params", params);
              const product_id = params.id as string;
              const customer_id = user_id || "1";

              addProductToCart({ product_id, customer_id });
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        ); //<-- Mui icons should be put this way here.
      },
    },
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
            onClick={handleDrawerOpen}
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
      <Drawer
        anchor="right"
        open={isOpen}
        hideBackdrop={true}
        // onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": { width: "35%", maxWidth: 400 },
        }}
      >
        <Box
          sx={{
            width: "auto",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2, // מרווח בין האלמנטים
          }}
          role="presentation"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <IconButton sx={{ ml: "auto", mr: 0 }} onClick={handleDrawerClose}>
            <Close />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            הוסף מוצר חדש{" "}
          </Typography>
          <Controller
            name="product_name"
            control={control}
            defaultValue=""
            // rules={{ required: "שדה זה הוא שדה חובה" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="שם המוצר"
                variant="filled"
                fullWidth
                margin="normal"
                error={!!errors.product_name}
                helperText={
                  errors.product_name ? errors.product_name.message : ""
                }
              />
            )}
          />
          <Controller
            name="product_description"
            control={control}
            defaultValue=""
            rules={{
              required: "שדה זה הוא שדה חובה",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                label="תאור המוצר"
                error={!!errors.product_description}
                helperText={
                  errors.product_description
                    ? errors.product_description.message
                    : ""
                }
              />
            )}
          />
          <Controller
            name="product_price"
            control={control}
            defaultValue=""
            rules={{
              required: "שדה זה הוא שדה חובה",
              pattern: {
                value: /^\d+(\.\d+)?$/,
                message: "מספרים בלבד",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                // type="number"
                label="מחיר"
                error={!!errors.product_price}
                helperText={
                  errors.product_price ? errors.product_price.message : ""
                }
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            הוסף מוצר
          </Button>
        </Box>
      </Drawer>
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
