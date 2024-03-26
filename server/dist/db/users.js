"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.insertUserRelationship = exports.insertUser = exports.getUserRelationship = exports.getOneUser = exports.getAllUsers = void 0;
const queryUtils_1 = require("./queryUtils");
//GET
function getAllUsers() {
    const queryString = "select * from users";
    return (0, queryUtils_1.SelectQuery)(queryString);
}
exports.getAllUsers = getAllUsers;
function getOneUser(id) {
    const queryString = "select * from users where user_id = ?";
    return (0, queryUtils_1.SelectQuery)(queryString, [id]);
}
exports.getOneUser = getOneUser;
function getUserRelationship(id, user_role) {
    const roleColumnForQuery = user_role === "AGENT" ? "agent_id" : "customer_id";
    const targetRoleColumn = user_role === "AGENT" ? "customer_id" : "agent_id";
    const queryString = `
  SELECT users.* 
  FROM user_relationships 
  JOIN users 
  ON users.user_id = user_relationships.${targetRoleColumn} 
  WHERE user_relationships.${roleColumnForQuery} = ?
  `;
    return (0, queryUtils_1.SelectQuery)(queryString, [id]);
}
exports.getUserRelationship = getUserRelationship;
//POST
function insertUser(newUser) {
    const queryString = "INSERT INTO users SET ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [newUser]);
}
exports.insertUser = insertUser;
function insertUserRelationship(newRelationship) {
    const queryString = "INSERT INTO user_relationships SET ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [newRelationship]);
}
exports.insertUserRelationship = insertUserRelationship;
//PUT
function updateUser(updatedUser, user_id) {
    const queryString = "UPDATE users SET ? WHERE user_id = ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [updatedUser, user_id]);
}
exports.updateUser = updateUser;
//DELETE
function deleteUser(user_id) {
    const queryString = "DELETE FROM users WHERE user_id = ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [user_id]);
}
exports.deleteUser = deleteUser;
