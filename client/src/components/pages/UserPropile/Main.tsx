import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router-dom";
import { jenericFetch as getUserInfo } from "../../../functions/jenericFetch";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../store/snackbarSlice";
import { User } from "../../../store/userSlice";
import { createCart } from "../../../functions/cart&Product";
import {
  CartItem,
  CartItemsFromTheServer,
} from "../../../typs/products_and_carts";
import { getUserCurrentCart } from "../../../functions/userInfo";
import UserCart from "./UserCart";
import Empty from "./Empty";
import CustomButton from "../../UI/CustomButton";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   flexGrow: 1,
// }));

const Main: FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();

  const { user_id } = useParams() as { user_id: string };

  useEffect(() => {
    const handleSuccess = (user: User) => {
      console.log(user);
      setUser(user);
      // dispatch(
      //   setSnackbar({
      //     snackbarOpen: true,
      //     snackbarType: "success",
      //     snackbarMessage: `${user.user_name} imported successfully `,
      //   })
      // );
    };

    const handleError = () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Failed to add user",
        })
      );
    };

    getUserInfo<undefined, any>(
      {
        url: `users/get_all_user_info/${user_id}`,
        method: "GET",
      },
      handleSuccess,
      handleError
    );
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3, paddingTop: 2 }}>
      <Paper
        sx={{
          my: 1,
          mx: "auto",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccountCircleIcon color="action" sx={{ mr: 1 }} />
          <Box>
            <Typography variant="subtitle1">{user?.user_name}</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {user?.user_role}
            </Typography>
          </Box>
        </Box>
        <Divider  />
        <List dense>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={user?.user_email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={user?.user_phone} />
          </ListItem>
        </List>
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
          startIcon={<MoreHorizIcon />}
        >
          More details
        </Button>
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
        <Button
          variant="outlined"
          sx={{
            mt: 1,
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          Schedule a meeting
        </Button>
      </Paper>

      {user && <UserCart user={user} />}

      {/* <Item
        sx={{
          my: 1,
          mx: "auto",
          p: 2,
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{"message"}</Typography>
          </Stack>
        </Stack>
      </Item> */}
    </Box>
  );
  //   <Box sx={{ width: "auto" }}>
  //   <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
  //     <Item>Item 1</Item>
  //     <Item>Item 2</Item>
  //     <Item>Long content</Item>
  //   </Stack>
  // </Box>;
};

export default Main;
