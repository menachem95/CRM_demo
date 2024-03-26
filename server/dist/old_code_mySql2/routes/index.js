"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const meetings_1 = __importDefault(require("./meetings"));
const login_1 = __importDefault(require("./login"));
const products_1 = __importDefault(require("./products"));
const deals_1 = __importDefault(require("./deals"));
const router = (0, express_1.Router)();
router.use("/login", login_1.default);
router.use("/users", users_1.default);
router.use("/meetings", meetings_1.default);
router.use("/products", products_1.default);
router.use("/deals", deals_1.default);
exports.default = router;
