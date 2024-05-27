import { Router } from "express";
// import usersRouter from "../old_code_mySql2/routes/users";
// import meetingsRouter from "../old_code_mySql2/routes/meetings";
// import loginRouter from "../old_code_mySql2/routes/login";
import productsRouter from "./productsRouts";
import cartsRouter from "./cartsRouts"
import usersRouter from "./usersRouts"
import dealsRouter from "./dealsRouts";
import meetingsRouter from "./meetingsRouts"
import loginRouter from "./loginRouts"

const router = Router();


// router.use("/login", loginRouter )
// router.use("/users", usersRouter);
router.use("/meetings", meetingsRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/users", usersRouter);
router.use("/deals", dealsRouter);
router.use("/login", loginRouter);



export default router