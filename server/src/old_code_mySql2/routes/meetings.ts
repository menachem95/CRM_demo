import { Router } from "express";

import db from "../db";
import type { MeetingRow } from "../db/meetings";
import { UserRole } from "../db/users";

const router = Router();

router.post("/add_meeting", async (req, res) => {
  try {
    const newMeeting: MeetingRow = { ...req.body };
    const result = await db.meetinges.insertMeeting(newMeeting);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update_meeting/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMeeting: MeetingRow = { ...req.body };
    const result = await db.meetinges.updateMeeting(updatedMeeting, id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const user_role = req.params.user_role as UserRole;
    const meetings = await db.meetinges.getAllYourMeetingsByUserId(
      id,
      // user_role
    );
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const meetings = await db.meetinges.getAllMeetings();
   console.log("meetings: ", meetings);
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

export default router;
