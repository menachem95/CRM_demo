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
import { User } from "../../../store/userSlice";

interface Props {
  user: User;
  icon: () => JSX.Element;
  message: string;
  action: () => JSX.Element;
}

const Empty: FC<Props> = ({ user, action, message, icon }) => {
  return (
    <>
      {" "}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="subtitle1">{message}</Typography>
        </Box>
      </Box>
      <Divider textAlign="right">{action()}</Divider>
    </>
  );
};

export default Empty;
