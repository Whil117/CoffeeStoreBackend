import Express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const Posts = require("../models/Post");
dotenv.config();

const router = Express.Router();

//SUBMIT POST
router.post("/", async (req: any, res: any) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      type: "post",
      message: "no token provided",
    });
  }
  const post = new Posts({
    ...req.body,
  });

  const decoded: any = jwt.verify(token, `${process.env.DB_KEY}`);

  if (decoded) {
    try {
      post.save();
      res.json({ post: post, auth: true });
    } catch (error) {
      res.sendStatus(500);
      console.log(error);
    }
  } else {
    res.send(404).json({ msg: "error token" });
  }
});

module.exports = router;

// GET BACK ALL THE POSTS

// router.get("/", async (req: any, res: any) => {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(401).json({
//       auth: false,
//       message: "no token provided",
//     });
//   }
//   const decoded: any = jwt.verify(token, `${process.env.DB_KEY}`);

//   if (decoded) {
//     const posts = await Posts.find();
//     res.json(posts);
//   }
// });
// //SPECIFIC POST
// router.get("/:postId", async (req: any, res: any) => {
//   try {
//     const post = await Posts.findById(req.params.postId);
//     res.json(post);
//   } catch (error) {
//     res.json({ msj: error });
//   }
// });

// //DELETE POST
// router.delete("/:postId", async (req: any, res: any) => {
//   try {
//     const removePost = await Posts.deleteOne({ _id: req.params.postId });
//     res.json(removePost);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //UPDATE POST
// router.patch("/:postId", async (req: any, res: any) => {
//   try {
//     const updatePost = await Posts.updateOne(
//       { _id: req.params.postId },
//       { $set: { title: req.body.title } }
//     );
//     res.json(updatePost);
//   } catch (error) {
//     console.log(error);
//   }
// });
