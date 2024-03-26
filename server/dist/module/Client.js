"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class Client extends User_1.default {
    constructor(name, email, phone) {
        super(name, email, phone, "CLIENT");
    }
    order() { }
}
exports.default = Client;
