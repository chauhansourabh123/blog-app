import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return next(new ApiError(401, "Token not provided"));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

    if (!decodedToken) {
      return next(new ApiError(401, "Invalid token"));
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
