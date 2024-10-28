import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Password save error:", error.message);
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log("Error generating token:", error.message);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
