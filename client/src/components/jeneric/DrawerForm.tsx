import { Close } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface User {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: string;
}

const API_URI = process.env.REACT_APP_API_SERVER as string;



const DrawerForm: FC<any> = ({ CloseDrawer, isOpen, onClickHandler }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<User>>();
  // const [open, setopen] = useState(isOpen);
 
  const addUser = async (data: Partial<User>) => {
    try {
      const response = await fetch(`${API_URI}users/add_user`, {
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
     
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  
  };
  // פונקציה שתפעל בשליחת הטופס
  const onSubmit = async (data: Partial<User>) => {
    console.log("data", data);
    onClickHandler()
    CloseDrawer();
    try {
      await addUser({ ...data, user_role: "CUSTOMER" });
      console.log("User added successfully");
    } catch (error) {
      console.error("Failed to add user:", error);
    } 
 };

  return (
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
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
      >
        <IconButton sx={{ ml: "auto", mr: 0 }} onClick={CloseDrawer()}>
          <Close />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          הוסף משתמש חדש
        </Typography>
        <Controller
          name="user_name"
          control={control}
          defaultValue=""
          rules={{ required: "שדה זה הוא שדה חובה" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="שם מלא"
              variant="filled"
              fullWidth
              margin="normal"
              error={!!errors.user_name}
              helperText={errors.user_name ? errors.user_name.message : ""}
            />
          )}
        />
        <Controller
          name="user_phone"
          control={control}
          defaultValue=""
          rules={{
            required: "שדה זה הוא שדה חובה",

            pattern: {
              value: /^[0-9]{10}$/,
              message: "מספר הטלפון צריך להכיל ספרות בלבד",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="פלאפון"
              error={!!errors.user_phone}
              helperText={errors.user_phone ? errors.user_phone.message : ""}
            />
          )}
        />
        <Controller
          name="user_email"
          control={control}
          defaultValue=""
          rules={{
            required: "שדה זה הוא שדה חובה",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "כתובת האימייל אינה תקינה",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="דואר אלקטרוני"
              error={!!errors.user_email}
              helperText={errors.user_email ? errors.user_email.message : ""}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          הוסף משתמש
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerForm;
