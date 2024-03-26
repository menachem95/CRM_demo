import { Router, Request, Response } from "express";

import db from "../db";
import type { UserRow, UserRole, UserRelationshipsRow } from "../db/users";
import bcrypt from 'bcrypt';


const router = Router();

router.get("/:id/:user_role", async (req, res) => {
  try {
    const id = req.params.id;
    const user_role = req.params.user_role as UserRole;
    const users = await db.users.getUserRelationship(id, user_role);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [user] = await db.users.getOneUser(id);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await db.users.getAllUsers();
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.post("/add_user", async (req, res) => {
  try {
    const newUser: UserRow = { ...req.body };
    newUser.password = await bcrypt.hash('123123', 10)
    const result = await db.users.insertUser(newUser);

    if (req.query.add_relations) {
      
      const new_relation: any = {
        agent_id: req.query.add_relations,
        customer_id: result.insertId,
      };
      console.log("new_relation: ", new_relation);
      
      const new_relation_result = await db.users.insertUserRelationship(new_relation);
      console.log("new_relation_result",new_relation_result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/add_relation", async (req, res) => {
  try {
    const new_relation: UserRelationshipsRow = { ...req.body };
    const result = await db.users.insertUserRelationship(new_relation);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.put("/update_user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const updatedUser: UserRow = { ...req.body };
    const result = await db.users.updateUser(updatedUser, user_id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete_user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const result = await db.users.deleteUser(user_id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
