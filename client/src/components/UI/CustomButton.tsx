import {  Button } from "@mui/material";
import React from "react";

const CustomButton: React.FC<{action: () => void, text: string}> = () => {
  return (
    //   <></>
    // <Box>
      <Button
            onClick={() => {}}
            // onKeyDown={toggleDrawer(false)}
            variant="contained"
            color="primary"
            // onClick={onClickHandler}
          >
            {"dsds"}
          </Button>
    // </Box>
  );
};

export default CustomButton;
