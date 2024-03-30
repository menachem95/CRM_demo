"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = exports.getAllCarts = void 0;
const config_1 = __importDefault(require("../config/config"));
const module_1 = require("../module");
const getAllCarts = async () => {
    try {
        const carts = await module_1.Cart.findAll();
        console.log(carts);
        return carts;
    }
    catch (error) {
        console.error("error:", error);
        return error;
    }
};
exports.getAllCarts = getAllCarts;
const createCart = async (customer_id) => {
    const result = await config_1.default.transaction(async (t) => {
        const cart = await module_1.Cart.create({ customer_id }, { transaction: t });
        console.log(cart);
        const cart_id = cart.dataValues.cart_id;
        console.log("//////////////////////////////////////////////////////////*");
        console.log("cart_id: ", cart_id);
        const deal = await module_1.Deal.create({ cart_id, customer_id }, { transaction: t });
        return cart;
    });
    return result;
};
exports.createCart = createCart;
