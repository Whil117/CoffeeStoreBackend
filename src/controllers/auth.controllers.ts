import Express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const Register = require("../models/User");
dotenv.config();

const router = Express.Router();

////////////////////////////////////////////////////////////////////////////
//USER
type Token = string;

router.get("/me", async (req: Request, res: Response) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      type: "post",
      message: "no token provided",
    });
  }
  const decoded: any = jwt.verify(token as Token, `${process.env.DB_KEY}`);

  const user = await Register.findById(decoded.id, { password: 0 });
  if (!user) {
    return res.status(404).send("no user found");
  }
  res.json(user);
});

////////////////////////////////////////////////////////////////////////////
//SIGN UP USER
router.post("/signup", async (req: Request, res: Response) => {
  const register = new Register({
    ...req.body,
  });
  register.password = await register.encryptPassword(register?.password);

  await register.save();
  const token = jwt.sign({ id: register._id }, `${process.env.DB_KEY}`);
  res.json({ auth: true, type: "Sign Up", username: register.username, token });
});

////////////////////////////////////////////////////////////////////////////
//SIGN IN USER
router.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await Register.findOne({ username: username });
  if (!user) {
    return res.status(404).send("user not found");
  }
  const passvalid = await user.validPass(password);
  if (!passvalid) {
    res.status(401).json({ auth: false, token: null, password: "incorrect" });
  }
  const token = await jwt.sign({ id: user._id }, `${process.env.DB_KEY}`);
  res.json({ auth: true,type:'Sign In', username: username, token });
});

module.exports = router;
