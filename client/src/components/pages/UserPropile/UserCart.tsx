import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getUserCurrentCart } from "../../../functions/userInfo";
import { CartItemsFromTheServer } from "../../../typs/products_and_carts";
import Empty from "./Empty";
import { setSnackbar } from "../../../store/snackbarSlice";
import { addProductToCart, createCart } from "../../../functions/cart&Product";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { User } from "../../../store/userSlice";

interface Props {
  user: User;
}

const UserCart: FC<Props> = ({ user }) => {
  const [cart, setCart] = useState<CartItemsFromTheServer>();
  const dispatch = useDispatch();

  const onCreateCartHandel = async () => {
    await createCart(
      user.user_id as string,
      (cart) => {
        console.log("cart: ", cart);
        // getUserCurrentCart(
        //   user_id as string,
        //   (CartItem) => {
        //     console.log("cartItems: ", CartItem);
        //     setCart(CartItem);
        //     dispatch(
        //       setSnackbar({
        //         snackbarOpen: true,
        //         snackbarType: "success",
        //         snackbarMessage: `${CartItem} imported successfully `,
        //       })
        //     );
        //   },
        //   (errer) => {
        //     dispatch(
        //       setSnackbar({
        //         snackbarOpen: true,
        //         snackbarType: "error",
        //         snackbarMessage: ` error ${errer} `,
        //       })
        //     );
        //   }
        // );
        // dispatch(
        //   setSnackbar({
        //     snackbarOpen: true,
        //     snackbarType: "success",
        //     snackbarMessage: `${cart} imported successfully `,
        //   })
        // );
      },
      (errer) => {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: ` error ${errer} `,
          })
        );
      }
    );
  };

  useEffect(() => {
    getUserCurrentCart(
      user.user_id,
      (CartItem) => {
        console.log("cartItems: ", CartItem);

        setCart(CartItem);

        // dispatch(
        //   setSnackbar({
        //     snackbarOpen: true,
        //     snackbarType: "success",
        //     snackbarMessage: `${CartItem} imported successfully `,
        //   })
        // );
      },
      (error) => {
        console.log(error);
        // dispatch(
        //   setSnackbar({
        //     snackbarOpen: true,
        //     snackbarType: "error",
        //     snackbarMessage: ` error ${error} `,
        //   })
        // );
      }
    );
  }, []);

  // const onAddProduct = async () => {
  //   addProductToCart(body: {})
  //   ;
  // };

  const cartNotEmpty = `Cart Id: ${cart?.cart_id}`;
  const cartEmpty = `Cart Id: ${cart?.cart_id} - No Items Found`;

  return (
    <Paper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
      }}
    >
      {cart?.items ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* <AccountCircleIcon color="action" sx={{ mr: 1 }} /> */}
            <Box>
              <Typography variant="subtitle1">
                {cart.items.length === 0 ? cartEmpty : cartNotEmpty}
              </Typography>
            </Box>
          </Box>
          {/* <Divider  /> */}
          <Divider textAlign="right">
            <Button
              variant="contained"
              sx={{
                mt: 1,
                mr: 1,
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={onCreateCartHandel}
            >
Add products            </Button>
          </Divider>
          {cart?.items?.map((product) => {
            return (
              <List dense key={product.product_id}>
                <ListItem>
                  <ListItemText
                    primary="Product Name"
                    secondary={product?.Product?.product_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Product Price"
                    secondary={product?.Product?.product_price}
                  />
                </ListItem>
              </List>
            );
          })}
        </>
      ) : (
        <Empty
          user={user}
          icon={() => <ShoppingCartIcon />}
          message={`No cart found for ${user.user_name}`}
          action={() => (
            <Button
              variant="contained"
              sx={{
                mt: 1,
                mr: 1,
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={onCreateCartHandel}
            >
creat a deal            </Button>
          )}
        />
        // <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        //   <Box>
        //     <Typography variant="subtitle1">no cart</Typography>
        //   </Box>
        // </Box>
      )}
    </Paper>
  );
};

export default UserCart;
