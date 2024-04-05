import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getUserCurrentCart } from "../../../functions/userInfo";
import { CartItemsFromTheServer } from "../../../typs/products_and_carts";
import Empty from "./Empty";
import { setSnackbar } from "../../../store/snackbarSlice";
import { createCart } from "../../../functions/createCart";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


interface Props {
  user_id: string;
}

const UserCart: FC<Props> = ({ user_id }) => {
  const [cart, setCart] = useState<CartItemsFromTheServer>();
  const dispatch = useDispatch();

  const onCreateCartHandel = async () => {
    await createCart(
      user_id as string,
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
      user_id,
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
                {cart.items.length === 0 ? "אין פריטים בעגלה" : cart?.cart_id}
              </Typography>
            </Box>
          </Box>

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
          user_id={user_id}
          icon={() => <ShoppingCartIcon />}
          message={"message"}
          action={() => (
            <Button
              variant="outlined"
              sx={{
                mt: 1,
                mr: 1,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
              onClick={onCreateCartHandel}
            >
              Create a Deal
            </Button>
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
