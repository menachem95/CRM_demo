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
import { Meeting } from "../../../typs/meetings";
import { getUserMeeting } from "../../../functions/meetings";

interface Props {
  user: User;
}

const UserMeetings: FC<Props> = ({ user }) => {
  const [meetings, setMeetings] = useState<Meeting[]>();
  const dispatch = useDispatch();

  // const onCreateCartHandel = async () => {
  //   await createCart(
  //     user.user_id as string,
  //     (cart) => {
  //       console.log("cart: ", cart);
  //     },
  //     (errer) => {
  //       dispatch(
  //         setSnackbar({
  //           snackbarOpen: true,
  //           snackbarType: "error",
  //           snackbarMessage: ` error ${errer} `,
  //         })
  //       );
  //     }
  //   );
  // };

  useEffect(() => {
    getUserMeeting(
     user.user_id,
      user.user_role,
      (meetings) => {
        setMeetings(meetings.map(meeting => {
          return {...meeting, user_name: "df", id: meeting.meeting_id}}));
      },
      () => {}
    );
  }, []);

  // const onAddProduct = async () => {
  //   addProductToCart(body: {})
  //   ;
  // };

  

  return (
    <Paper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
      }}
    >
      {meetings ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* <AccountCircleIcon color="action" sx={{ mr: 1 }} /> */}
            <Box>
              <Typography variant="subtitle1">
             {`${user.user_name} Meetings`}  {`(${meetings.length})`}
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
              // onClick={onCreateCartHandel}
            >
Add Meeting            </Button>
          </Divider>
          {meetings?.map((meeting) => {
            return (
              <>
              <List dense key={meeting.meeting_id}>
                <ListItem>
                  <ListItemText
                    primary="Title"
                    secondary={meeting.meeting_title}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Summary"
                    secondary={meeting.meeting_summary}
                  />
                </ListItem>
              </List>
                <Divider />
                </>
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
              // onClick={onCreateCartHandel}
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

export default UserMeetings;
