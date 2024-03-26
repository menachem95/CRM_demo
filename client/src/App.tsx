import React, { useEffect } from "react";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Customers from "./components/pages/Customers";
import Meetings from "./components/pages/Meetings";
import CustomSnackbar from "./components/UI/CustomSnackbar";
import SignInSide from "./components/Login/SignInSide";
import Products from "./components/pages/Products";
// import { useDispatch } from "react-redux";
// import { User, setUserInfo } from "./store/userSlice";

//c

function App() {
 
  return (
    <>
   
      
      <CustomSnackbar />
      <Routes>
        
        <Route path="/" element={<SignInSide />} />
       <Route element={<Header />}>
         <Route path="/home" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/products" element={<Products />} />

       </Route>
       
       
      </Routes>
    </>
  );
}

export default App;
