import { body } from "express-validator";
import { handleValidationErrors } from "./validation.errors.js";

export const signinInputValidator = [
	body("email").isEmail().withMessage("Email must be valid").trim().escape(),
	body("password")
		.notEmpty()
		.isLength({ min: 4 })
		.withMessage("You must supply a password with length atleast 4")
		.trim()
		.escape(),
	handleValidationErrors,

];