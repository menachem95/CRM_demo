"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connections_1 = __importDefault(require("../db/connections"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const rows = await connections_1.default.execute('SELECT * FROM users WHERE user_email = ?', [email]);
        console.log("rows", rows);
        if (rows[0].length === 0) {
            return res.status(401).send('Invalid username');
        }
        const user = rows[0][0];
        //  const isValid = password === user.password
        //  console.log("password", password);
        //  console.log("user.password", user.password);
        //  console.log("isValid", isValid);
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).send({ error: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id }, SECRET_KEY, { expiresIn: '1h' });
        console.log("token", token);
        res.cookie('token', token, {
            httpOnly: true, // הפוך את הקוקי לזמין רק לשרת
            // secure: process.env.NODE_ENV !== 'development', // שימוש ב-secure cookies בסביבת ייצור
            sameSite: 'strict', // הגבלת שליחת הקוקי רק לדומיין המקורי
            maxAge: 3600000, // זמן תפוגה של הקוקי במילישניות
        });
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).json({ error, message: "error" });
    }
});
// async function updatePasswordHashes() {
//   const users = await db.execute('SELECT user_id FROM users')  as RowDataPacket ;
//   for (const user of users[0]) {
//     console.log("user", user);
//     const passwordHash = await bcrypt.hash('123123', 10); // השתמש בסיסמה ברירת מחדל או נגזרת ייחודית לכל משתמש
//     await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [passwordHash, user.user_id]);
//   }
//   await db.end();
// }
// updatePasswordHashes().catch(console.error);
// const a = async () => {
//   try {
//     const insertQuery = `
//       INSERT INTO product (product_name, product_price, product_description)
//       VALUES ?;
//     `;
//     const products = [];
//     for (let i = 1; i <= 20; i++) {
//       products.push([`Product ${i}`, (10 + i).toFixed(2), `Description for product ${i}`]);
//     }
// console.log(products)
//     await db.query(insertQuery, [products]);
//     // res.send
//     console.log('20 products added successfully');
//   } catch (error) {
//     console.error('Error adding products:', error);
//     // res.status(500).send('Error adding products');
//   }
// }
// a()
exports.default = router;
