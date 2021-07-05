// import Express, { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// const Posts = require("../models/Post");
// dotenv.config();

// const router = Express.Router();

// router.get("/", async (req: Request, res: Response) => {
//     const token:any = req.headers["x-access-token"];

//     if (!token) {
//       return res.status(401).json({
//         auth: false,
//         type: "post",
//         message: "no token provided",
//       });
//     }
//     const decoded: any = jwt.verify(token, `${process.env.DB_KEY}`);
    
//   if (decoded) {
//       try {
//         const posts = await Posts.find();
//         res.json(posts);
//       } catch (error) {
//           res.json({msg:error})
//       }
//   }else{
//     res.send(404).json({ msg: "error token" });
//   }
// });

// module.exports = router;
