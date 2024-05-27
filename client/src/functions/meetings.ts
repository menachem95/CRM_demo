
import { jenericFetch } from "./jenericFetch";
import { Meeting } from "../typs/meetings";

export const createMeeting = async (
  body: Meeting,
  handleSuccess: (meeting: Meeting) => void,
  handleError: (error: Error) => void
) => {
  console.log("body",body);
  
  await jenericFetch<Meeting, Meeting>(
    {
      url: `meetings/create_meeting`,
      method: "POST",
      body: body,
    },
    handleSuccess,
    handleError
  );
};

export const getUserMeeting = async (
  user_id: string,
  user_role: string,
  handleSuccess: (meeting: Meeting) => void,
  handleError: (error: Error) => void
) => {
    
  await jenericFetch<undefined, Meeting>(
    {
      url: `meetings/get_my_meeting/${user_id}/${user_role}`,
      method: "GET",
    },
    handleSuccess,
    handleError
  );
};

