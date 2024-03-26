"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyQuery = exports.SelectQuery = void 0;
const connections_1 = __importDefault(require("./connections"));
//select
async function SelectQuery(queryString, params) {
    const [results] = await connections_1.default.execute(queryString, params);
    return results;
}
exports.SelectQuery = SelectQuery;
// insert / update / delete
async function ModifyQuery(queryString, params) {
    const [results] = await connections_1.default.query(queryString, params);
    return results;
}
exports.ModifyQuery = ModifyQuery;
// pool.beginTransaction
