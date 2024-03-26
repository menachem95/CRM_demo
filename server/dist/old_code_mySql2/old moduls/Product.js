"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(type, date, price, quantity) {
        this.type = type;
        this.date = date;
        this.price = price;
        this.quantity = quantity;
        this.totalPrice = price * quantity;
    }
}
exports.default = Product;
