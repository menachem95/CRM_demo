import { Router } from "express";
import controlers from "../controlers";
import { Product } from "../module";
import { ProductAttributes } from "../module/Product";

const router = Router();

router.post("/create_product", async (req, res) => {
  try {
    const newProduct: ProductAttributes = { ...req.body };
    const result = await controlers.product.createProduct(newProduct);
    console.log(result);
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
    const products = await controlers.product.getAllProducts() as Product[];
    console.log("products: ", products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

export default router;
