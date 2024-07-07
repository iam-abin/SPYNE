import { body } from "express-validator";

export const createPostInputValidator = [
	body("text")
		.notEmpty()
		.withMessage("text is required field")
		.trim()
		.escape(),
];
