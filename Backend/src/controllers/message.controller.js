import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import asyncHandler from "../utility/asyncHandler.js";
import Message from "../models/message.model.js";

const sendMessage = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ApiError(400, "All fields are required to fill."));
  }

  try {
    const newMessage = await Message.create({ name, email, message });

    if (!newMessage) {
      return next(new ApiError(500, "Message not created. Try again"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Message send successfully", newMessage));
  } catch (error) {
    next(error);
  }
});

export { sendMessage };
