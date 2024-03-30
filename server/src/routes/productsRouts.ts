import { Router } from "express";
import controlers from "../controlers";
import { Cart, CartItem, Product } from "../module";
import { ProductAttributes } from "../module/Product";
import { CartItemAttributes } from "../module/CartItem";

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

router.post("/add_product_to_cart", async (req, res) => {
  try {
    const product_id: number = req.body.product_id;
    const customer_id: number = req.body.customer_id;
    let cart_id: number = req.body.cart_id;
    console.log("***************************");
    console.log("product_id: ", product_id);
    console.log("customer_id: ", +customer_id);
    console.log("cart_id: ", cart_id);
    //אם אין עגלה אז צריך ליצור עגלה חדשה וזה אומר ליצור גם דיל חדש וזה אומר גם להשיג את ה איידי של הלקוח

    // let cart_Item_id = req.query.cart_Item_id;
    if (!cart_id) {
      try {
        const cart = (await controlers.cart.createCart(+customer_id)) as Cart;
        console.log("cart.dataValues.cart_id: ", cart.dataValues.cart_id);
        cart_id = cart.dataValues.cart_id;
      } catch (error) {
        console.error("Error creating cart and deal:", error);
      }
    }
    console.log("cart_id: ", cart_id);
    const result = await controlers.product.addProductToCart({
      product_id,
      cart_id,
    });
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
    const products = (await controlers.product.getAllProducts()) as Product[];
    console.log("products: ", products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error, message: "error" });
  }
});

export default router;
