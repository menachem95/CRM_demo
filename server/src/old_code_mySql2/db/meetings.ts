import type { RowDataPacket } from "mysql2";

import { SelectQuery, ModifyQuery } from "./queryUtils";
import type { UserRole } from "./users";


export interface MeetingRow extends RowDataPacket {
  meeting_agent: string,
  meeting_customer: string,
  metingdate: Date
}

export function insertMeeting(newMeeeting: MeetingRow) {
  const queryString = "INSERT INTO meetings SET ?";
  return ModifyQuery(queryString, [newMeeeting]);
}

export function updateMeeting(updatedMeeeting: Partial<MeetingRow>, meeting_id: string) {
  const queryString = "UPDATE meetings SET ? WHERE meeting_id = ?";
  return ModifyQuery(queryString, [updatedMeeeting, meeting_id]);
}


export function getAllYourMeetingsByUserId(id: string, user_role?: UserRole) {
  // let user = user_role === "AGENT" ? "meeting_agent" : "meeting_customer";
  // console.log("user", user)
  // if (user_role === "CUSTOMER") user = "meeting_customer";
  const queryString = `SELECT m.*, u.*
  FROM meetings m
  JOIN users u ON u.user_id = CASE WHEN m.meeting_agent = ? THEN  m.meeting_customer ELSE m.meeting_agent END
  WHERE ? IN (m.meeting_agent, m.meeting_customer); `;
  return SelectQuery<MeetingRow>(queryString, [id, id]);
}

export function getAllMeetings() {
  // const queryString = `
  // SELECT users.*
  // FROM meetings
  // JOIN users
  // ON users.user_id = meetings.customer_id
  // `;
  // return SelectQuery<MeetingRow>(queryString);
}

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