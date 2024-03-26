"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = exports.createProduct = exports.getAllProducts = void 0;
const module_1 = require("../module");
const getAllProducts = async () => {
    try {
        const products = await module_1.Product.findAll();
        console.log(products);
        return products;
    }
    catch (error) {
        console.error("שגיאה בשליפת המוצרים:", error);
        return error;
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (product) => {
    try {
        const newProduct = await module_1.Product.create(product);
        return newProduct;
    }
    catch (error) {
        console.error("error: ", error);
        return error;
    }
};
exports.createProduct = createProduct;
const addProductToCart = async (cartItem) => {
    try {
        const newCartItem = await module_1.CartItem.create(cartItem);
        return newCartItem;
    }
    catch (error) {
        console.error("error: ", error);
        return error;
    }
};
exports.addProductToCart = addProductToCart;
