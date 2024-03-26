"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
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
async function SelectQuery(queryString) {
    const [results] = await pool.execute(queryString);
    return results;
}
async function ModifyQuery(queryString) {
    const [results] = await pool.execute(queryString);
    return results;
}
function getAllUsers() {
    return SelectQuery("select * from users;");
}
exports.db = {
    users: {
        getAll: getAllUsers,
    },
};
exports.db.users
    .getAll()
    .then((users) => console.log(users))
    .catch((err) => console.log(err));
// SelectQuery<UserRow>('select * from users;')
//   .then(users => console.log(users))
//   .catch(err => console.log(err))
// ModifyQuery('update users Set user_name = "Shalom" WHERE user_id = 2')
exports.default = pool;
