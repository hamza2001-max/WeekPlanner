export {};
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

export const authorization = async (req: any, res: any, next: any) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await userModel.findOne({ _id }).select("_id");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Request is not authorized." });
    }
    //   jwt.verify(token, process.env.SECRET_KEY, async (err: any, user: any) => {
    //     if (err) {
    //       res.status(401).json("token did not get verified");
    //     }
    //     req.user = await user;
    //     next();
    //   });
    // } else {
    //   return res.status(401).json("token does not exist.");
    // }
  }
};
