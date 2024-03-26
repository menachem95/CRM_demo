import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { TransitionProps } from "@mui/material/transitions";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "@mui/material";
import { closeSnackbar } from "../../store/snackbarSlice";

import { useDispatch, useSelector } from "react-redux";


import { RootState } from "../../store/store";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackbar: React.FC = () => {
  const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(
    (state: RootState) => state.snackbar
  );
  const dispatch = useDispatch()
 

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => dispatch(closeSnackbar())}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={snackbarType}  onClose={() => dispatch(closeSnackbar())} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
