import bcrypt from "bcrypt";
import { SALT } from "./constants.js";

export const hashPassword = async (password) => {
	// Generate a salt
	const salt = await bcrypt.genSalt(SALT);

	// Hash the password using the salt
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePasswords = async (inputPassword, encryptedPassword) => {
	const isSame = await bcrypt.compare(inputPassword, encryptedPassword);
	return isSame;
};
