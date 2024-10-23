import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Authorization: Bearer <your_token>
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // the decoded token contains the payload (which has the document id)

      // we are creating a new property "user" on the request object
      req.user = await User.findById(decoded.id).select("-password");
      // select(-"password") excludes the password field

      next(); // moves on to the next function (in our case the controller)
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
});

export default protect;
