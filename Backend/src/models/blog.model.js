import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "God",
      "Technology",
      "Health",
      "Finance",
      "Lifestyle",
      "Education",
      "Travel",
      "Food",
      "Fashion",
      "Sports",
      "Entertainment",
    ],
  },
  about: {
    type: String,
    require: true,
  },
  blogPost: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
