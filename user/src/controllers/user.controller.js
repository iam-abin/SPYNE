import { UserRepository } from "../database/repository/user.repository.js";
import { createJwtToken } from "../utils/jwt.js";
import { comparePasswords, hashPassword } from "../utils/password.js";

const userRepository = new UserRepository();

const userSignup = async (req, res, next) => {
	try {
		const { email } = req.body;
		const existingUser = await userRepository.getUserByEmail(email);

		if (existingUser) throw new Error("User already exist");
		const newUser = await userRepository.createUser(req.body);
		const payLoad = {
			userId: newUser._id,
			email: newUser.email,
		};
		const token = createJwtToken(payLoad);
		res.cookie("token", token, { httpOnly: true });
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

const userSignin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const existingUser = await userRepository.getUserByEmail(email);

		if (!existingUser) throw new Error("Invalid username or password");
		if (existingUser.isDeleted) throw new Error("Blocked Account");

		const samePassword = comparePasswords(password, existingUser.password);

		if (!samePassword) throw new Error("Invalid username or password");

		const payLoad = {
			userId: existingUser._id,
			email: existingUser.email,
		};

		const token = createJwtToken(payLoad);
		res.cookie("token", token, { httpOnly: true });
		res.status(200).json(existingUser);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { userId } = req.user;
		const updateData = req.body;
		if (updateData.password) {
			updateData.password = await hashPassword(updateData.password);
		}
		const updatedUser = await userRepository.updateUser(userId, updateData);
		res.status(200).json(updatedUser);
	} catch (error) {
		if (error.code === 11000) {
			const duplicateField = Object.keys(error.keyValue)[0];
			if (duplicateField === "email") {
				next({ message: "Email already exists" });
			} else if (duplicateField === "mobile") {
				next({ message: "Mobile already exists" });
			}
		}
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const { userId } = req.user;
		// Get all users except current user
		const allUsers = await userRepository.getAllUsers(userId);
		res.status(200).json(allUsers);
	} catch (error) {
		next(error);
	}
};

const searchUser = async (req, res, next) => {
	try {
		const { name } = req.params;
		const users = await userRepository.searchUsers(name);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const followAUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId } = req.user;
		if (id == userId) throw new Error("Cannot follow yourself");
		const otherUser = await userRepository.getUserById(id);
		if (!otherUser && otherUser.isDeleted)
			throw new Error("Other user does not exist");
		const followResult = await userRepository.followAUser(userId, id);
		res.status(200).json(followResult);
	} catch (error) {
		next(error);
	}
};

const unFollowAUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId } = req.user;
		if (id == userId)
			throw new Error("You cannot follow or unfollow yourself");
		const otherUser = await userRepository.getUserById(id);
		if (!otherUser && otherUser.isDeleted)
			throw new Error("Other user does not exist");
		const unFollowResult = await userRepository.unFollowAUser(userId, id);
		res.status(200).json(unFollowResult);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { userId } = req.user;
		// Here performing only soft delete
		const deleted = await userRepository.deleteUser(userId);
		// Cookie is no longer needed if the user is deleted
		res.clearCookie("token", { httpOnly: true });
		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
};

export {
	userSignup,
	userSignin,
	updateUser,
	getAllUsers,
	searchUser,
	followAUser,
	unFollowAUser,
	deleteUser,
};
