"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartAndDeal = exports.getAllDeals = void 0;
const queryUtils_1 = require("./queryUtils");
//GET
function getAllDeals() {
    const queryString = "select * from deals";
    return (0, queryUtils_1.SelectQuery)(queryString);
}
exports.getAllDeals = getAllDeals;
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
//POST
function createCartAndDeal(user_id) {
    const queryString = `
  BEGIN
  INSERT INTO carts (customer_id) VALUES (?)
  INSERT INTO deals (cart_id, customer_id, deals_date) VALUES (LAST_INSERT_ID(), ?, CURDATE())
  COMMIT
  `;
    return (0, queryUtils_1.ModifyQuery)(queryString, [user_id, user_id]);
}
exports.createCartAndDeal = createCartAndDeal;
// export function insertUserRelationship(newRelationship: UserRelationshipsRow) {
//   const queryString = "INSERT INTO user_relationships SET ?";
//   return ModifyQuery(queryString, [newRelationship]);
// }
//PUT
// export function updateUser(updatedUser: Partial<UserRow>, user_id: string) {
//   const queryString = "UPDATE users SET ? WHERE user_id = ?";
//   return ModifyQuery(queryString, [updatedUser, user_id]);
// }
// //DELETE
// export function deleteUser(user_id: string) {
//   const queryString = "DELETE FROM users WHERE user_id = ?";
//   return ModifyQuery(queryString, [user_id]);
// }
