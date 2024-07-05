import { body } from "express-validator";
import { handleValidationErrors } from "./validation.errors.js";

// Regular expression for Indian mobile numbers
const indianMobileRegex = /^(?:\+91)?[7-9]\d{9}$/;

export const signupInputValidator = [
	body("name").notEmpty().withMessage("Name is requires").trim().escape(),
	body("email").isEmail().withMessage("Email must be valid").trim().escape().normalizeEmail(),
	body("mobile")
		.notEmpty()
		.trim()
		.escape()
        .notEmpty()
        .custom((value) => {
            // Custom validation for Indian mobile numbers
            return indianMobileRegex.test(value) || Promise.reject('Invalid Indian mobile number format');
        }),
	body("password")
		.notEmpty()
		.isLength({ min: 4 })
		.withMessage("You must supply a password with length atleast 4")
		.trim()
		.escape(),
	handleValidationErrors,
];
