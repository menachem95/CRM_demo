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
        const products = await controlers_1.default.product.getAllProducts();
        console.log("products: ", products);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
exports.default = router;
