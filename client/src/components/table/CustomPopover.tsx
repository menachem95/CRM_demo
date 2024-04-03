import { Paper, Typography, Button } from "@mui/material";
import React, { FC } from "react";

interface PopoverProps {

}

const CustomPopover: FC<PopoverProps> = () => {
  return (
    <Paper>
      <Typography>
      יוחנן
      </Typography>
      <Typography>
        סמבוסק
      </Typography>
    </Paper>
  );
};

export default CustomPopover;
