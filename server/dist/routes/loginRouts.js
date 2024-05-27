"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_1 = require("../module");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await module_1.User.authenticate(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600000,
        });
        res.status(200).send(user);
    }
    catch (error) {
        res.status(401).json({ error, message: "error" });
    }
});
exports.default = router;
