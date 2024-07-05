import express from "express";
import {
	userSignup,
	deleteUser,
	followAUser,
	getAllUsers,
	userSignin,
	searchUser,
	updateUser,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
import { signinInputValidator } from "../middleware/validations/validate.signin.js";
import { signupInputValidator } from "../middleware/validations/validate.signup.js";
import { updateInputValidator } from "../middleware/validations/validate.update.js";

const router = express.Router();

router.post("/signup", signupInputValidator, userSignup);
router.post("/signin",signinInputValidator, userSignin);
router.patch("/", auth, updateInputValidator, updateUser);

router.get("/all-users", auth, getAllUsers);
router.get("/search/:name", searchUser);

router.patch("/follow", auth, followAUser);

// Can perform operation such as delete user account.
router.delete("/", auth, deleteUser);

export default router;
