import React, { useEffect, useState, FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "../table/Table";
import JenericPage from "./JenericPage";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { setSnackbar } from "../../store/snackbarSlice";
import { RootState } from "../../store/store";

interface User {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: string;
  add_relations?: boolean;
}



const columns: GridColDef[] = [
  { field: "user_name", headerName: "Name", width: 150 },
  { field: "user_email", headerName: "Email", width: 150 },
  { field: "user_phone", headerName: "Phone", width: 150 },
  {
    field: "user_role",
    headerName: "Role",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "agent", headerName: "Agent", width: 150 },
];

// const rows = fetchUsers()

const API_URI = process.env.REACT_APP_API_SERVER as string;

const CustomersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {user_name, user_id} = useSelector((state: RootState) => state.user.userInfo)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<User>>();
  const dispatch = useDispatch()

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URI}users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: User[] = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
      for (let i = 0; i < data.length; i++) {
        data[i].id = data[i].user_id;
      }
     
      setUsers(data);

    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const val = {
    rows: users,
    columns: columns,
    title: "Customers",
    buttonTitle: "Add customer",
  };

  const addUser = async (data: Partial<User>) => {
    const {add_relations} = data
    console.log("data: ", data);
    delete data.add_relations
    console.log("data: ", data);
    
    console.log("add_relations: ", add_relations)
    console.log(`${API_URI}users/add_user${add_relations ? `?${user_id}` : ""}`);
    
    try {
      const response = await fetch(`${API_URI}users/create_user${add_relations ? `?add_relations=${user_id}` : ""}`, {
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
      console.log("User added successfully");
      handleDrawerClose();
      reset();
      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "User added successfully"}));
      fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
     dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Failed to add user"}));
    } 
  };
  // פונקציה שתפעל בשליחת הטופס
  const onSubmit = async (data: Partial<User>) => {
    console.log("data", data);

    addUser({ ...data, user_role: "CUSTOMER" });
  };

  return (
    <>
      <Box sx={{ padding: 3, bgcolor: "white", m: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            {val.title}
          </Typography>
          <Button
            onClick={handleDrawerOpen}
            // onKeyDown={toggleDrawer(false)}
            variant="contained"
            color="primary"
            // onClick={onClickHandler}
          >
            {val.buttonTitle}
          </Button>
          {/* <Button onClick={toggleDrawer(true)}>פתח טופס</Button> */}
        </Box>
        {/* <TableContainer sx={{marginLeft: 0, height: 500 */}
        {/* }} > */}
        <Table rows={val.rows} columns={val.columns} />
        {/* </TableContainer> */}
      </Box>
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
        >
          <IconButton sx={{ ml: "auto", mr: 0 }} onClick={handleDrawerClose}>
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
                variant="filled"
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
                variant="filled"
                label="דואר אלקטרוני"
                error={!!errors.user_email}
                helperText={errors.user_email ? errors.user_email.message : ""}
              />
            )}
          />
        <Controller
        name="add_relations"
        control={control}
        
        render={({ field }) =><FormControlLabel control={<Checkbox {...field}/>} label="שייך לקוח ישירות אלי" /> }
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
    </>
  );
};

export default CustomersPage;

// const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", agent: "moshe", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", agent: "ido", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", agent: "moshe", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", agent: "menachem", age: 16 },
//     {
//       id: 5,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 6, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     {
//       id: 7,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "menachem",
//       age: 44,
//     },
//     { id: 8, lastName: "Frances", firstName: "Rossini", agent: "moshe", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", agent: "moshe", age: 65 },
//     { id: 10, lastName: "Stark", firstName: "Arya", agent: "natan", age: 16 },
//     {
//       id: 11,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 12, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     { id: 13, lastName: "Clifford", firstName: "Ferrara", agent: "ido", age: 44 },
//     {
//       id: 14,
//       lastName: "Frances",
//       firstName: "Rossini",
//       agent: "moshe",
//       age: 36,
//     },
//     { id: 15, lastName: "Stark", firstName: "Arya", agent: "moshe", age: 16 },
//     {
//       id: 16,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     {
//       id: 17,
//       lastName: "Melisandre",
//       firstName: null,
//       agent: "menachem",
//       age: 150,
//     },
//     {
//       id: 18,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "moshe",
//       age: 44,
//     },
//     { id: 19, lastName: "Frances", firstName: "Rossini", agent: "levi", age: 36 },
//     { id: 20, lastName: "Stark", firstName: "Arya", agent: "moshe", age: 16 },
//     {
//       id: 21,
//       lastName: "Targaryen",
//       firstName: "Daenerys",
//       agent: "moshe",
//       age: null,
//     },
//     { id: 22, lastName: "Melisandre", firstName: null, agent: "moshe", age: 150 },
//     {
//       id: 23,
//       lastName: "Clifford",
//       firstName: "Ferrara",
//       agent: "moshe",
//       age: 44,
//     },
//     {
//       id: 24,
//       lastName: "Frances",
//       firstName: "Rossini",
//       agent: "moshe",
//       age: 36,
//     },
//   ];
