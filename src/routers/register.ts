import Express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

const Register = require("../models/register");
dotenv.config();

const router = Express.Router();

//GET ALL USERS

router.get("/", async (req: Request, res: Response) => {
  const token: any = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      type: "post",
      message: "no token provided",
    });
  }
  const decoded: any = jwt.verify(token, `${process.env.DB_KEY}`);

  if (decoded) {
    try {
      const register = await Register.find();
      res.json(register);
    } catch (error) {
        res.json({msg:error})
    }
}else{
  res.send(404).json({ msg: "error token" });
}
});
//POST USER
router.post("/", async (req: Request, res: Response) => {
  const register = new Register({
    ...req.body,
  });

  const token = jwt.sign({ _id: register._id }, `${process.env.DB_KEY}`);
  if (token) {
    try {
      register.save();
      res.json({ username: register.username, auth: true, token });
    } catch (error) {
      res.sendStatus(500);
      console.log(error);
    }
  } else {
    res.send(404).json({ msg: "error token" });
  }
});

//DELETE USER
router.delete("/:id",async(req: Request, res: Response)=>{
  const token: any = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      type: "post",
      message: "no token provided",
    });
  }
  const decoded: any = jwt.verify(token, `${process.env.DB_KEY}`);

  if (decoded) {
    try {
      const removeUser = await Register.deleteOne({_id:req.params.id});
      res.json(removeUser);
    } catch (error) {
        res.json({msg:error})
    }
}else{
  res.send(404).json({ msg: "error token" });
}
})

module.exports = router;
