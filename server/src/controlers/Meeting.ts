import { Meeting, } from "../module";
import { MeetingAttributes } from "../module/Meeting";



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

export const createMeeting = async (meeting: MeetingAttributes) => {
  try {
   const newMeeting = await Meeting.create(meeting)
   return newMeeting;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};



