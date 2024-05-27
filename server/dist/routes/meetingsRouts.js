"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlers_1 = __importDefault(require("../controlers"));
const module_1 = require("../module");
const router = (0, express_1.Router)();
router.post("/create_meeting", async (req, res) => {
    console.log("router", req.body);
    try {
        const newMeeting = { ...req.body };
        const result = await controlers_1.default.meetings.createMeeting(newMeeting);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/get_my_meeting/:user_id/:user_role", async (req, res) => {
    const { user_id, user_role } = req.params;
    try {
        const meetings = await module_1.User.getMyMeetings(+user_id, user_role);
        console.log(meetings);
        res.json(meetings);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = router;
