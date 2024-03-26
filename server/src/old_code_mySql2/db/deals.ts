import type { RowDataPacket } from "mysql2";

import { SelectQuery, ModifyQuery } from "./queryUtils";

export type UserRole = "AGENT" | "CUSTOMER";

export interface UserRow extends RowDataPacket {
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: UserRole;
  password: string;
}

export interface UserRelationshipsRow extends RowDataPacket {
  customer_id: string;
  agent_id: string;
}

export interface DealRow extends UserRelationshipsRow, RowDataPacket {
  created_at: string;
  completed_at: string;
  cart_id: string;
  deales_id: string;
}

//GET
export function getAllDeals() {
  const queryString = "select * from deals";
  return SelectQuery<DealRow>(queryString);
}

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
export function createCartAndDeal(user_id: string) {
  const queryString = `
  BEGIN
  INSERT INTO carts (customer_id) VALUES (?)
  INSERT INTO deals (cart_id, customer_id, deals_date) VALUES (LAST_INSERT_ID(), ?, CURDATE())
  COMMIT
  `;
  return ModifyQuery(queryString, [user_id, user_id]);
}

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
