"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlers_1 = __importDefault(require("../controlers"));
const router = (0, express_1.Router)();
router.post("/create_product", async (req, res) => {
    try {
        const newProduct = { ...req.body };
        const result = await controlers_1.default.product.createProduct(newProduct);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.post("/add_product_to_cart", async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const customer_id = req.body.customer_id;
        let cart_id = req.body.cart_id;
        console.log("***************************");
        console.log("product_id: ", product_id);
        console.log("customer_id: ", +customer_id);
        console.log("cart_id: ", cart_id);
        //אם אין עגלה אז צריך ליצור עגלה חדשה וזה אומר ליצור גם דיל חדש וזה אומר גם להשיג את ה איידי של הלקוח
        // let cart_Item_id = req.query.cart_Item_id;
        if (!cart_id) {
            const cart = await controlers_1.default.cart.createCart(+customer_id);
            console.log("cart.dataValues.cart_id: ", cart.dataValues.cart_id);
            cart_id = cart.dataValues.cart_id;
        }
        console.log("cart_id: ", cart_id);
        const result = await controlers_1.default.product.addProductToCart({
            product_id,
            cart_id,
        });
        console.log(result);
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
router.get("/", async (req, res) => {
    try {
        const products = (await controlers_1.default.product.getAllProducts());
        console.log("products: ", products);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
exports.default = router;
