import { Router, Request, Response } from "express";

import db from "../db";
// import type { UserRow, UserRole, UserRelationshipsRow } from "../db/users";
import bcrypt from 'bcrypt';
import { DealRow } from "../db/deals";


const router = Router();

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
    const deals = await db.deals.getAllDeals();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.post("/create_cart/:user_id", async (req, res) => {
  try {
    const user_id: string = req.params.user_id;;
    const result = await db.deals.createCartAndDeal(user_id);
    res.json(result);
  } catch (error) {
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

export default router;
