import { Router } from "express";
import controlers from "../controlers";

const router = Router();

// router.post("/add_meeting", async (req, res) => {
//   try {
//     const newMeeting: MeetingRow = { ...req.body };
//     const result = await db.meetinges.insertMeeting(newMeeting);
//     console.log(result);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

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

router.get("/", async (req, res) => {
  try {
    console.log("carts");
    const carts = await controlers.cart.getAllCarts();
    console.log("carts: ", carts);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

router.delete("/:cart_id", async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    await controlers.cart.removeCart(+cart_id);
    res.json(`${cart_id} removed`);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

export default router;
