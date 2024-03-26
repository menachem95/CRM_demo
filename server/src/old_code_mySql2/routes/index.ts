import { Router } from "express";
import usersRouter from "./users";
import meetingsRouter from "./meetings";
import loginRouter from "./login";
import productsRouter from "./products";
import dealsRouter from "./deals";

const router = Router();


router.use("/login", loginRouter )
router.use("/users", usersRouter);
router.use("/meetings", meetingsRouter);
router.use("/products", productsRouter);
router.use("/deals", dealsRouter);




export default router