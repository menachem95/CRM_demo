"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.MYSQL_HOST);
// const pool: Pool = mysql.createPool({
//   host: process.env.MYSQL_HOST as string,
//   user: process.env.MYSQL_USER as string,
//   password: process.env.MYSQL_PASSWORD as string,
//   database: process.env.MYSQL_DATABASE as string,
// });
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
exports.default = pool;
