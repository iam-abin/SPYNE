import { body } from "express-validator";
import { handleValidationErrors } from "./validation.errors.js";

export const logBody = (req, res, next)=>{
    console.log(req.file);
    console.log(req.body);
    next()
}

export const createPostInputValidator = [
	body("text")
		.notEmpty()
		.withMessage("text is required field")
		.trim()
		.escape()
];