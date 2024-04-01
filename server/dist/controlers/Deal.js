"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDeals = void 0;
const module_1 = require("../module");
const getAllDeals = async () => {
    try {
        const carts = await module_1.Deal.findAll();
        console.log(carts);
        return carts;
    }
    catch (error) {
        console.error("error:", error);
        return error;
    }
};
exports.getAllDeals = getAllDeals;
