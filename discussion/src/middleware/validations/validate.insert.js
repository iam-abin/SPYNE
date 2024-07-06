import { body } from "express-validator";
import { handleValidationErrors } from "./validation.errors.js";

export const createPostInputValidator = [
	body("text")
		.notEmpty()
		.withMessage("text is required field")
		.trim()
		.escape(),
	handleValidationErrors,
];
