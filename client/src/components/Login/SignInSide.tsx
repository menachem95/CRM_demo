import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


import logo from "../../img/logo.png";
import { setUserInfo, User } from "../../store/userSlice";
import { RootState } from "../../store/store";

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

interface LoginForm {
  email: string;
  password: string;
}



export default function SignInSide() {
  const [errorMsg, setErrorMsg] = React.useState<string>()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const {isLoading} = useSelector((state: RootState) => state.user);
  // React.useEffect(() => {
  //   if (isLoading) {
  //     navigate("/home");
  //   }
    
  // }, [isLoading, navigate])

  async function loginUser(loginForm: LoginForm) {
    // const passwordHash = await bcrypt.hash(loginForm.password, 10)
    try {
      const response: Response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
        credentials: "include", // כדי לאפשר קבלת קוקיז בתגובה
      });
      console.log("response:", response);
      if (!response.ok) {
        // throw new Error(response);
        // console.log("response", await response.json());
        const errorMessage = await response.text();
        setErrorMsg(errorMessage)
      }
      console.log("response:", response);
      const userData = await response.json();
      console.log("Logged in successfully:", userData);
      // ניתן לשמור את המצב של המשתמש כמחובר כאן, אם צריך
      // dispatch(startLoading())
      // localStorage.setItem('userData', JSON.stringify(userData));
      dispatch(setUserInfo(userData))
      // navigate("/home");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log("data: ", data);
    loginUser({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  const userData = localStorage.getItem('userData');
  React.useEffect(() => {
    
    
    if (userData) {
      const user: User = JSON.parse(userData)
      
       dispatch(setUserInfo(user));
       navigate("/home");
    }
  }, [dispatch, navigate, userData]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          // backgroundImage: "url(../../img/logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onClick={() => setErrorMsg("")}
            />
            <TextField
              onClick={() => setErrorMsg("")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             {errorMsg && <p>{errorMsg}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}


