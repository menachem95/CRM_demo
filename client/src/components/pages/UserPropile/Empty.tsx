import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getUserCurrentCart } from "../../../functions/userInfo";
import { CartItemsFromTheServer } from "../../../typs/products_and_carts";

interface Props {
  user_id: string;
  icon: () => JSX.Element;
  message: string;
  action: () => JSX.Element;
}

const Empty: FC<Props> = ({ user_id, action, message, icon }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      {icon()}
      <Box>
        <Typography variant="subtitle1">{message}</Typography>
      </Box>
      {action()}
    </Box>
  );
};

export default Empty;
