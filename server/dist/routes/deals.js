"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// router.get("/:id/:user_role", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user_role = req.params.user_role as UserRole;
//     const users = await db.users.getUserRelationship(id, user_role);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error, message: "error" });
//   }
// });
// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const [user] = await db.users.getOneUser(id);
//     console.log(user);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error, message: "error" });
//   }
// });
router.get("/", async (req, res) => {
    try {
        const deals = await db_1.default.deals.getAllDeals();
        res.json(deals);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.post("/create_cart/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        ;
        const result = await db_1.default.deals.createCartAndDeal(user_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// router.post("/add_relation", async (req, res) => {
//   try {
//     const new_relation: UserRelationshipsRow = { ...req.body };
//     const result = await db.users.insertUserRelationship(new_relation);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// router.put("/update_user/:id", async (req, res) => {
//   try {
//     const user_id = req.params.id;
//     const updatedUser: UserRow = { ...req.body };
//     const result = await db.users.updateUser(updatedUser, user_id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// router.delete("/delete_user/:id", async (req, res) => {
//   try {
//     const user_id = req.params.id;
//     const result = await db.users.deleteUser(user_id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
exports.default = router;
