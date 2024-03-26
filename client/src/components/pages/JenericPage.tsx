import React, { FC, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Table from "../table/Table";
import { GridColDef } from "@mui/x-data-grid";
import DrawerForm from "../jeneric/DrawerForm";

interface JenericPageProps {
  rows: {}[];
  columns: GridColDef[];
  title: string;
  buttonTitle: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}



interface User {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: string;
}

// React.KeyboardEvent |

const JenericPage: FC<JenericPageProps> = ({rows, columns, title, buttonTitle, onClickHandler}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<Partial<User>>();

    // פונקציה שתפעל בשליחת הטופס
    const onSubmit = (data: Partial<User>) => {
      console.log(data);
    };

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
        // if (
        //     event.type === 'keydown' &&
        //     ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        //   ) {
        //     return;
        //   }
         console.log("toggleDrawer:", open);
         
          setIsOpen(open);
        };
    return(<>
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
          {title}
        </Typography>
        <Button
        onClick={toggleDrawer(true)}
          // onKeyDown={toggleDrawer(false)}
           variant="contained" color="primary"
            // onClick={onClickHandler}
            >
          {buttonTitle}
        </Button>
        {/* <Button onClick={toggleDrawer(true)}>פתח טופס</Button> */}
      </Box>
      {/* <TableContainer sx={{marginLeft: 0, height: 500 */}
      {/* }} > */}
      <Table rows={rows} columns={columns} />
      {/* </TableContainer> */}
    </Box>
    <DrawerForm CloseDrawer={() => toggleDrawer(false)} isOpen={isOpen} onClickHandler={onClickHandler}/>
   {/* <Drawer
anchor='right'
open={isOpen}
onClose={toggleDrawer(false)}
 sx={{
   '& .MuiDrawer-paper': { width: '35%', maxWidth: 400 }
 }}
>
<Box
  sx={{
    width: 'auto',
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // מרווח בין האלמנטים
  }}
  role="presentation"
  component="form"
  onSubmit={handleSubmit(onSubmit)}
  // onClick={toggleDrawer(false)}
  // onKeyDown={toggleDrawer(false)}
>
  <Typography variant="h5" gutterBottom>
    הוסף משתמש חדש
  </Typography>
  <Controller
        name="user_name"
        control={control}
        defaultValue=""
        
        rules={{ required: 'שדה זה הוא שדה חובה' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="שם מלא"
            variant="filled" fullWidth margin="normal"
            error={!!errors.user_name}
            helperText={errors.user_name ? errors.user_name.message : ''}
          />
        )}
      />
      <Controller
        name="user_phone"
        control={control}
        defaultValue=""

        rules={{
          required: 'שדה זה הוא שדה חובה',
          // minLength: {
          //   value: 10,
          //   message: 'מספר הטלפון צריך להיות בעל 10 ספרות',
          // },
          // maxLength: {
          //   value: 10,
          //   message: 'מספר הטלפון צריך להיות בעל 10 ספרות',
          // },

          pattern: {
            value: /^[0-9]{10}$/,
            message: 'מספר הטלפון צריך להכיל ספרות בלבד',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="פלאפון"
            error={!!errors.user_phone}
            helperText={errors.user_phone ? errors.user_phone.message : ''}
          />
        )}
      />
       <Controller
        name="user_email"
        control={control}
        defaultValue=""
        rules={{
          required: 'שדה זה הוא שדה חובה',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'כתובת האימייל אינה תקינה',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="דואר אלקטרוני"
            error={!!errors.user_email}
            helperText={errors.user_email ? errors.user_email.message : ''}
          />
        )}
      />
     
      

  <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
    הוסף משתמש
  </Button>
</Box>
</Drawer>  */}
  </>)
}



export default JenericPage

// const JenericPage: FC<JenericPageProps> = ({rows, columns, title, buttonTitle, onClickHandler}) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const toggleSlide = () => setIsOpen(!isOpen);

//   return (
//       <Box sx={{ display: 'flex', width: '100%' }}>
//           <Box sx={{ flexGrow: 1, bgcolor: "white", m: 4 }}>
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
//                   <Typography variant="h4" component="h1">{title}</Typography>
//                   <Button onClick={toggleSlide} variant="contained" color="primary">{buttonTitle}</Button>
//               </Box>
//               <Table rows={rows} columns={columns} />
//           </Box>
//           <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
//               <Box sx={{ width: 250, padding: 2,  bgcolor: 'background.paper' }}>
//                   <Typography variant="h6" gutterBottom>טופס</Typography>
//                   <TextField label="שדה 1" variant="outlined" fullWidth margin="normal" />
//                   <TextField label="שדה 2" variant="outlined" fullWidth margin="normal" />
//                   <Button variant="contained" color="primary">שלח</Button>
//               </Box>
//           </Slide>
//       </Box>
//   );
// }

// export default JenericPage;

// const JenericPage: FC<JenericPageProps> = ({rows, columns, title, buttonTitle, onClickHandler}) => {
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);

//   const toggleToolbar = () => setIsExpanded(!isExpanded);

//   return (
//       <Box sx={{ flexGrow: 1 }}>
//           <Toolbar>
//               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                   {title}
//               </Typography>
//               <IconButton onClick={toggleToolbar} color="inherit">
//                 כגדכד
//                   {/* {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
//               </IconButton>
//           </Toolbar>
//           <Collapse in={isExpanded}>
//               <Toolbar >
//                   <Typography variant="h6" component="div">טופס</Typography>
//                   {/* Place form fields or any other content you want inside the collapsible toolbar */}
//               </Toolbar>
//           </Collapse>
//           <Box component="main" sx={{ p: 3 }}>
//               <Table rows={rows} columns={columns} />
//           </Box>
//       </Box>
//   );
// }

// export default JenericPage;