"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.get("/:id/:user_role", async (req, res) => {
    try {
        const id = req.params.id;
        const user_role = req.params.user_role;
        const users = await db_1.default.users.getUserRelationship(id, user_role);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [user] = await db_1.default.users.getOneUser(id);
        console.log(user);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await db_1.default.users.getAllUsers();
        // console.log(users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
router.post("/add_user", async (req, res) => {
    try {
        const newUser = { ...req.body };
        newUser.password = await bcrypt_1.default.hash('123123', 10);
        const result = await db_1.default.users.insertUser(newUser);
        if (req.query.add_relations) {
            const new_relation = {
                agent_id: req.query.add_relations,
                customer_id: result.insertId,
            };
            console.log("new_relation: ", new_relation);
            const new_relation_result = await db_1.default.users.insertUserRelationship(new_relation);
            console.log("new_relation_result", new_relation_result);
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.post("/add_relation", async (req, res) => {
    try {
        const new_relation = { ...req.body };
        const result = await db_1.default.users.insertUserRelationship(new_relation);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/update_user/:id", async (req, res) => {
    try {
        const user_id = req.params.id;
        const updatedUser = { ...req.body };
        const result = await db_1.default.users.updateUser(updatedUser, user_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.delete("/delete_user/:id", async (req, res) => {
    try {
        const user_id = req.params.id;
        const result = await db_1.default.users.deleteUser(user_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = router;
