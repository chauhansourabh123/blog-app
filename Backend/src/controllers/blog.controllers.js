import Blog from "../models/blog.model.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import asyncHandler from "../utility/asyncHandler.js";
import uploadOnCloudinary from "../utility/cloudinary.js";

const createBlog = asyncHandler(async (req, res, next) => {
  try {
    const role = req.user.role;
    const { title, category, about } = req.body;
    const localFile = req.file?.path;

    if (!req.user || role !== "admin") {
      return next(new ApiError(403, "Admin not authenticated."));
    }

    if (!title || !category || !about) {
      return next(new ApiError(400, "All fields are mandatory."));
    }

    let blogPost;
    if (localFile) {
      blogPost = await uploadOnCloudinary(localFile);
    }

    const blog = await Blog.create({
      title,
      category,
      about,
      blogPost: blogPost.secure_url,
      createdBy: req.user._id,
    });

    if (!blog) {
      return next(new ApiError(500, "Blog creation failed. Try again"));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Blog created successfully", blog));
  } catch (error) {
    next(error);
  }
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { newTitle, newCategory, newAbout } = req.body;

  try {
    if (!req.user || req.user.role !== "admin") {
      return next(new ApiError(401, "Admin not authenticated"));
    }

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return next(new ApiError(401, "Blog not found."));
    }

    const updateBlog = {
      title:
        newTitle && newTitle.trim().length > 0 ? newTitle : existingBlog.title,
      category:
        newCategory && newCategory.trim().length > 0
          ? newCategory
          : existingBlog.category,
      about:
        newAbout && newAbout.trim().length > 0 ? newAbout : existingBlog.about,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, {
      new: true,
    });

    if (!updatedBlog) {
      return next(new ApiError(401, "Blog not updated. Try again"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
  } catch (error) {
    next(error);
  }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== "admin") {
      return next(new ApiError(401, "Admin not authenticated"));
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
      return next(new ApiError(404, "Blog not found."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog deleted successfully"));
  } catch (error) {
    next(error);
  }
});

const getBlogs = asyncHandler(async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email avatar");

    if (!blogs.length) {
      return next(404, "No blogs found. Please try again.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blogs fetched successfully", blogs));
  } catch (error) {
    next(error);
  }
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(404, "Blog not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog found successfully", blog));
  } catch (error) {
    next(error);
  }
});

const myBlogs = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next(new ApiError(401, "Admin not authenticated."));
    }

    const myBlogs = await Blog.find({ createdBy: req.user._id });

    if (!myBlogs.length) {
      return next(new ApiError(401, "Blogs not found."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blogs found successfully", myBlogs));
  } catch (error) {
    next(error);
  }
});

export { createBlog, updateBlog, deleteBlog, getBlogs, getBlog, myBlogs };
