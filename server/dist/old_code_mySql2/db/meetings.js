"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMeetings = exports.getAllYourMeetingsByUserId = exports.updateMeeting = exports.insertMeeting = void 0;
const queryUtils_1 = require("./queryUtils");
function insertMeeting(newMeeeting) {
    const queryString = "INSERT INTO meetings SET ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [newMeeeting]);
}
exports.insertMeeting = insertMeeting;
function updateMeeting(updatedMeeeting, meeting_id) {
    const queryString = "UPDATE meetings SET ? WHERE meeting_id = ?";
    return (0, queryUtils_1.ModifyQuery)(queryString, [updatedMeeeting, meeting_id]);
}
exports.updateMeeting = updateMeeting;
function getAllYourMeetingsByUserId(id, user_role) {
    // let user = user_role === "AGENT" ? "meeting_agent" : "meeting_customer";
    // console.log("user", user)
    // if (user_role === "CUSTOMER") user = "meeting_customer";
    const queryString = `SELECT m.*, u.*
  FROM meetings m
  JOIN users u ON u.user_id = CASE WHEN m.meeting_agent = ? THEN  m.meeting_customer ELSE m.meeting_agent END
  WHERE ? IN (m.meeting_agent, m.meeting_customer); `;
    return (0, queryUtils_1.SelectQuery)(queryString, [id, id]);
}
exports.getAllYourMeetingsByUserId = getAllYourMeetingsByUserId;
function getAllMeetings() {
    // const queryString = `
    // SELECT users.*
    // FROM meetings
    // JOIN users
    // ON users.user_id = meetings.customer_id
    // `;
    // return SelectQuery<MeetingRow>(queryString);
}
exports.getAllMeetings = getAllMeetings;
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
