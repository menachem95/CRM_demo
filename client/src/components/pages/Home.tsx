import { FC } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { setUserInfo } from "../../store/userSlice";
import React, { useEffect } from "react";
import Cookies from "cookies-ts";

import { RootState } from "../../store/store";

import { useSelector, UseDispatch, useDispatch } from "react-redux";

const Home: FC = () => {
  // const { userName, userId, userRole } = useSelector(
  //   (state: RootState) => state.user.userInfo
  // );
  //   const {userInfo, isLoading} = useSelector((state: RootState) => state.user);
  //  console.log(userInfo, isLoading)

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  
  const { user_name, user_id, user_role } = userInfo;

  console.log(user_name, user_id, user_role);

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   // const token = new Cookies()
  //   // token.get('token'); // 'token' הוא שם הקוקי
  //   // console.log("token: ", token);

  //   // dispatch(setUserInfo(!!token)); // עדכון ה-state בהתבסס על קיום הקוקי
  // }, [dispatch]);

  // useEffect(() => {}, [isLoading]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          height: 60,
          textAlign: "center",
          p: 2,
        },
      }}
    >
      <Paper>
        <Typography>{`Hello ${user_name}`}</Typography>
        <Typography>{`your id is ${user_id}`}</Typography>
        <Typography>{`your role is ${user_role}`}</Typography>
      </Paper>
    </Box>
  );
};

export default Home;
