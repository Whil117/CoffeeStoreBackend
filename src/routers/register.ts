import Express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

const Register = require("../models/register");
dotenv.config();

const router = Express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const register = new Register({
    ...req.body,
  });

  const token = jwt.sign({ _id: register._id }, `${process.env.DB_KEY}`);

  res.json({name:register.username, auth:true,token})
});


module.exports = router;