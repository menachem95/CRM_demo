import { useDispatch } from "react-redux";
import { setSnackbar } from "../store/snackbarSlice";
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
