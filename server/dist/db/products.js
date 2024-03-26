"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const queryUtils_1 = require("./queryUtils");
//GET
function getAllProducts() {
    const queryString = "select * from product";
    return (0, queryUtils_1.SelectQuery)(queryString);
}
exports.getAllProducts = getAllProducts;
// export function getOneUser(id: string) {
//   const queryString = "select * from users where user_id = ?";
//   return SelectQuery<UserRow>(queryString, [id]);
// }
// export function getUserRelationship(id: string, user_role: UserRole) {
//   const roleColumnForQuery = user_role === "AGENT" ? "agent_id" : "customer_id";
//   const targetRoleColumn = user_role === "AGENT" ? "customer_id" : "agent_id";
//   const queryString = `
//   SELECT users.* 
//   FROM user_relationships 
//   JOIN users 
//   ON users.user_id = user_relationships.${targetRoleColumn} 
//   WHERE user_relationships.${roleColumnForQuery} = ?
//   `;
//   return SelectQuery<UserRelationshipsRow>(queryString, [id]);
// }
// //POST
// export function insertUser(newUser: UserRow) {
//   const queryString = "INSERT INTO users SET ?";
//   return ModifyQuery(queryString, [newUser]);
// }
// export function insertUserRelationship(newRelationship: UserRelationshipsRow) {
//   const queryString = "INSERT INTO user_relationships SET ?";
//   return ModifyQuery(queryString, [newRelationship]);
// }
// //PUT
// export function updateUser(updatedUser: Partial<UserRow>, user_id: string) {
//   const queryString = "UPDATE users SET ? WHERE user_id = ?";
//   return ModifyQuery(queryString, [updatedUser, user_id]);
// }
// //DELETE
// export function deleteUser(user_id: string) {
//   const queryString = "DELETE FROM users WHERE user_id = ?";
//   return ModifyQuery(queryString, [user_id]);
// }
