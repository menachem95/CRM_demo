import { Router } from "express";
import controlers from "../controlers";
import { MeetingAttributes } from "../module/Meeting";
import { User } from "../module";

const router = Router();

router.post("/create_meeting", async (req, res) => {
  console.log("router", req.body);
  
  try {
    const newMeeting: MeetingAttributes = { ...req.body };
    const result = await controlers.meetings.createMeeting(newMeeting);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_my_meeting/:user_id/:user_role", async (req, res) => {
  const { user_id, user_role } = req.params;

  
  try {
    const meetings = await User.getMyMeetings(+user_id, user_role);
    console.log(meetings);
    res.json(meetings);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
