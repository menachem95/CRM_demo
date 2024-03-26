"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import usersRouter from "../old_code_mySql2/routes/users";
// import meetingsRouter from "../old_code_mySql2/routes/meetings";
// import loginRouter from "../old_code_mySql2/routes/login";
const productsRouts_1 = __importDefault(require("./productsRouts"));
const cartsRouts_1 = __importDefault(require("./cartsRouts"));
const usersRouts_1 = __importDefault(require("./usersRouts"));
// import dealsRouter from "./deals";
const router = (0, express_1.Router)();
// router.use("/login", loginRouter )
// router.use("/users", usersRouter);
// router.use("/meetings", meetingsRouter);
router.use("/products", productsRouts_1.default);
router.use("/carts", cartsRouts_1.default);
router.use("/users", usersRouts_1.default);
// router.use("/deals", dealsRouter);
exports.default = router;
