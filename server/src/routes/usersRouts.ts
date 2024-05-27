import { Router } from "express";
import controlers from "../controlers";
import User, { UserAttributes } from "../module/User";
import bcrypt from "bcrypt";
import { UserRelationshipAttributes } from "../module/UserRelationship";
import { Op } from 'sequelize';


const router = Router();

router.post("/create_user", async (req, res) => {
  try {
    const newUser: UserAttributes = { ...req.body };
    newUser.user_password = await bcrypt.hash("123123", 10);
    const result = (await controlers.user.createUser(
      newUser
    )) as UserAttributes;

    if (req.query.add_relations) {
      const new_relation: UserRelationshipAttributes = {
        agent_id: +req.query.add_relations,
        customer_id: result.user_id,
      };
      console.log("new_relation: ", new_relation);

      const new_relation_result = (await controlers.user.createRelationShip(
        new_relation
      )) as UserRelationshipAttributes;
      console.log("new_relation_result", new_relation_result);
    }
    res.json(result);
  } catch (error) {
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


// router.get("/get_current_cart/:customer_id", async (req, res) => {
//   try {
//     const customer_id = req.params.customer_id;
//     console.log("customer_id: ", customer_id)
//     const cartItems = await User.getCurrentCartInProgres(+customer_id);
//    console.log("cartItems", cartItems)
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ error, message: "error" });
//   }
// });

router.get("/get_current_cart/:customer_id", async (req, res) => {
  try {
    const customer_id = +req.params.customer_id;
    console.log("customer_id: ", customer_id);
    const cartItems = await User.getCurrentCartInProgres(customer_id);
    console.log("cartItems", cartItems);
    res.json(cartItems);
  } catch (error: any) {
    console.error("error: ", error);
    res.status(500).json({ message: error.message || "An error occurred" });
  }
});


router.get("/get_all_user_info/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const users = await controlers.user.getUser(user_id);
    console.log("users: ", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await controlers.user.
    // getAllUsers();
    getUsers(req, res);
    console.log("users: ", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});



export default router;
