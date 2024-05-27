import { Router } from "express";
import { User } from "../module";

const router = Router();
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await User.authenticate(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(401).json({ error, message: "error" });
  }
});



export default router;
