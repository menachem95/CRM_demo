"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.post("/add_meeting", async (req, res) => {
    try {
        const newMeeting = { ...req.body };
        const result = await db_1.default.meetinges.insertMeeting(newMeeting);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/update_meeting/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMeeting = { ...req.body };
        const result = await db_1.default.meetinges.updateMeeting(updatedMeeting, id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // const user_role = req.params.user_role as UserRole;
        const meetings = await db_1.default.meetinges.getAllYourMeetingsByUserId(id);
        res.json(meetings);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.get("/", async (req, res) => {
    try {
        const meetings = await db_1.default.meetinges.getAllMeetings();
        console.log("meetings: ", meetings);
        res.json(meetings);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
exports.default = router;
