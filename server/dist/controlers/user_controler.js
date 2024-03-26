"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const connections_1 = __importDefault(require("../db/connections"));
async function getAllUsers(req, res, next) {
    console.log("getAllUsers");
    try {
        const users = await connections_1.default.execute(`
      SELECT * FROM users;
      `);
        console.log(users);
        res.status(200).send(users);
        console.log(users);
    }
    catch (err) {
        next(err);
    }
}
exports.getAllUsers = getAllUsers;
