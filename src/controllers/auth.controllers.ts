import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const Posts = require("../models/Post");



// function createTokenDoctor(key:string) {
//   return jwt.sign({
//     token:key
//   },'secret')
// }


export const verify = async (req: Request, res: Response) => {
  const {token} = req.body

  jwt.sign({token:'sdaf'},`${process.env.DB_KEY}`)

  // res.status(200).json({token:createTokenDoctor(`${process.env.DB_KEY}`)})
  // if (!token) {
  //   return res.status(400).json({ msg: "Please. Send all Information" });
  // }

  // const verify = jwt.verify(token,'secret');
  // if (verify) {
  //   try {
  //     return res.status(200).json({ msg: true });
  //   } catch (error) {
  //     console.log(error);
  //     //   return res.status(400).json(error);
  //   }
  // } else {
  //   return res.status(400).json({ msg: "Token Unvailable" });
  // }
};
