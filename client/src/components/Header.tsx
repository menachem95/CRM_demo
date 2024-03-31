import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { resetUserInfo } from '../store/userSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { ReactComponent as MyLogo } from '../img/43162.svg';
// import logo from "../img/logo.png"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string>("/");
  const location = useLocation();
  const navigate = useNavigate();
  const {user_name } = useSelector((state: RootState) => state.user.userInfo)  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate("/");
    resetUserInfo()
    setAnchorEl(null);
  }

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

   // הוספת מעקב אחרי כפתור שנלחץ
   const handleButtonClick = (path: string) => {
    setSelected(path);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: 'stretch' }}>
     
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
          Logo
        {/* <img src={logo} width={"40%"} /> */}
        </Typography>
        {/* <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}> */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          {['Home', 'Customers', 'Tasks', 'Products', 'Deals', 'Meetings'].map((text) => (
            <Button 
              key={text}
              color="inherit" 
              component={Link} 
              to={`/${text.toLowerCase()}`} 
              // sx={{ color: isSelected(`/${text.toLowerCase()}`) ? 'secondary.main' : 'inherit' }}
              onClick={() => handleButtonClick(`/${text.toLowerCase()}`)} // מעדכן את המצב עם הכתובת הנוכחית
              sx={{ 
                height: '100%',
                backgroundColor: isSelected(`/${text.toLowerCase()}`) ? 'rgba(255, 255, 255, 0.12)' : 'inherit', // שינוי צבע רקע בהתאם לכפתור שנבחר
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }
              }}
           >
              {text}
            </Button>
          ))}</Box>
          
          <Box sx={{display: "flex"}}>
          <IconButton >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
           {user_name}
        {/* <img src={logo} width={"40%"} /> */}
        </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
           
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// export default Header;

// import { Outlet } from 'react-router-dom';
// import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* מציג כאן את הקומפוננטות שהוגדרו בתוך ה-Route */}
    </>
  );
}

export default Layout;