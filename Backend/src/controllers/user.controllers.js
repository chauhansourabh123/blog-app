import User from "../models/user.model.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import asyncHandler from "../utility/asyncHandler.js";
import { OPTIONS } from "../constant.js";
import uploadOnCloudinary from "../utility/cloudinary.js";

const signup = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;
    const localAvatar = req.file?.path;

    console.log(name, email, role, password);

    if (!name || !email || !role || !password) {
      return next(new ApiError(401, "All fileds are required to signup."));
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(
        new ApiError(402, "User with this email already registered.")
      );
    }

    let avatar;
    if (localAvatar) {
      avatar = await uploadOnCloudinary(localAvatar);
      if (!avatar) {
        return next(new ApiError(500, "Avatar not uploaded to Cloudinary."));
      }
    }

    const user = await User.create({
      name,
      email,
      role,
      avatar: avatar?.url,
      password,
    });

    if (!user) {
      return next(new ApiError(402, "User not created. Try again"));
    }

    const token = await user.generateToken();

    if (!token) {
      return next(
        new ApiError(500, "Token generation failed. Please try again.")
      );
    }

    user.token = token;
    await user.save();

    const createdUser = await User.findById(user._id).select(
      "-password -token"
    );

    return res
      .status(200)
      .cookie("token", token, OPTIONS)
      .json(new ApiResponse(201, "Signup successfully", createdUser));
  } catch (error) {
    next(error);
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(401, "Email and password are required to login."));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(404, "User not registered. Please sign up."));
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    const token = await user.generateToken();
    if (!token) {
      return next(
        new ApiError(500, "Token generation failed. Please try again.")
      );
    }
    user.token = token;
    await user.save();
    const createdUser = await User.findById(user._id).select(
      "-password -token"
    );
    return res
      .status(200)
      .cookie("token", token, OPTIONS)
      .json(new ApiResponse(200, "Login successfully", createdUser));
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    user.token = null;
    await user.save();

    return res
      .status(201)
      .clearCookie("token", OPTIONS)
      .json(new ApiResponse(201, "Logout successfully"));
  } catch (error) {
    next(error);
  }
});

const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ role: "admin" });
    if (!users) {
      return next(new ApiError(401, "Users not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Users Fetched successfully", users));
  } catch (error) {
    next(error);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id : req.user._id})
    if(!user){
      return next(new ApiError(404, "User not found. Could not delete."))
    }
    return res.status(200).json(new ApiResponse(200, "User deleted successfully."))
  } catch (error) {
    next(error)
  }
})

export { signup, logout, login, getAllUser, deleteUser };
