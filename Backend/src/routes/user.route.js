import { Router } from "express";
import { signup, login, logout, getAllUser, deleteUser } from "../controllers/user.controllers.js";
import authUser from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), signup);
router.route("/login").post(login);
router.route("/logout").get(authUser, logout);
router.route("/delete").delete(authUser, deleteUser);
router.route("/all-users").get(getAllUser)

export default router;
