"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlers_1 = __importDefault(require("../controlers"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post("/create_user", async (req, res) => {
    try {
        const newUser = { ...req.body };
        newUser.user_password = await bcrypt_1.default.hash("123123", 10);
        const result = (await controlers_1.default.user.createUser(newUser));
        if (req.query.add_relations) {
            const new_relation = {
                agent_id: +req.query.add_relations,
                customer_id: result.user_id,
            };
            console.log("new_relation: ", new_relation);
            const new_relation_result = (await controlers_1.default.user.createRelationShip(new_relation));
            console.log("new_relation_result", new_relation_result);
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// router.put("/update_meeting/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedMeeting: MeetingRow = { ...req.body };
//     const result = await db.meetinges.updateMeeting(updatedMeeting, id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error, message: "error" });
//   }
// });
// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // const user_role = req.params.user_role as UserRole;
//     const meetings = await db.meetinges.getAllYourMeetingsByUserId(
//       id,
//       // user_role
//     );
//     res.json(meetings);
//   } catch (error) {
//     res.status(500).json({ error, message: "error" });
//   }
// });
router.get("/get_all_user_info/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const users = await controlers_1.default.user.getUser(user_id);
        console.log("users: ", users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await controlers_1.default.user.getAllUsers();
        console.log("users: ", users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
exports.default = router;
