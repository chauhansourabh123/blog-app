import express, { Router } from "express";
import authUser from "../middleware/auth.middleware.js";
import { createBlog, updateBlog, deleteBlog, getBlogs, getBlog, myBlogs  } from "../controllers/blog.controllers.js";
import upload from "../middleware/multer.middleware.js"

const router = Router();

router.route("/create").post(authUser, upload.single('blogPost'), createBlog);
router.route("/update/:id").put(authUser, updateBlog);
router.route("/get-blogs").get(authUser, getBlogs);
router.route("/get-blog/:id").get(authUser, getBlog);
router.route("/my-blogs").get(authUser, myBlogs);
router.route("/delete/:id").delete(authUser, deleteBlog);

export default router;
