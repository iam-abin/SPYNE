import { body } from "express-validator";
import { handleValidationErrors } from "./validation.errors.js";

export const updateInputValidator = [
	body("text")
		.optional({ checkFalsy: true }) // Mark as optional
		.notEmpty()
		.trim()
		.escape(),
	body("image")
		.optional({ checkFalsy: true })
		.isURL()
		.withMessage("Image must be a valid URL")
		.trim()
		.escape()
];