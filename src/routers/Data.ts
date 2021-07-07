import Express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const Data = require("../models/Data");
dotenv.config();

const router = Express.Router();


router.post('/',async (req: Request, res: Response)=> {
    const token:any = req.headers["token"];

    if (!token) {
        return res.status(401).json({
          auth: false,
          type: "post",
          message: "no token provided",
        });
      }
      const data = new Data({
          ...req.body
      })
      await data.save()
      res.status(200).json({data:'received'})
})  


router.get("/", async (req: Request, res: Response) => {
    const token:any = req.headers["token"];

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
        const posts = await Data.find();
        res.json(posts);
      } catch (error) {
          res.json({msg:error})
      }
  }else{
    res.send(404).json({ msg: "error token" });
  }
});

module.exports = router;
