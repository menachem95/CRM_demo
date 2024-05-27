"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeeting = void 0;
const module_1 = require("../module");
// export const getAllUsers = async () => {
//   try {
//     const users = await User.findAll();
//     console.log(users);
//     return users;
//   } catch (error) {
//     console.error("error:", error);
//     return error;
//   }
// };
// export const getUser = async (user_id: string) => {
//   try {
//     const user = await User.findByPk(user_id);
//     console.log(user);
//     return user;
//   } catch (error) {
//     console.error("error:", error);
//     return error;
//   }
// };
const createMeeting = async (meeting) => {
    try {
        const newMeeting = await module_1.Meeting.create(meeting);
        return newMeeting;
    }
    catch (error) {
        console.error("error: ", error);
        return error;
    }
};
exports.createMeeting = createMeeting;
