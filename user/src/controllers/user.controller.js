import bcrypt from "bcrypt";

import { UserRepository } from "../database/repository/user.repository.js";
import { createJwtToken } from "../utils/jwt.js";

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

		const samePassword = await bcrypt.compare(
			password,
			existingUser.password
		);

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
		const updatedUser = await userRepository.updateUser(userId, req.body);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const { userId } = req.user;
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
		const otherUser = await userRepository.getUserById(id)
		if(!otherUser && otherUser.isDeleted) throw new Error("Other user does not exist")
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
		const otherUser = await userRepository.getUserById(id)
		if(!otherUser && otherUser.isDeleted) throw new Error("Other user does not exist")
		const unFollowResult = await userRepository.unFollowAUser(userId, id);
		res.status(200).json(unFollowResult);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { userId } = req.user;
		const deleted = await userRepository.deleteUser(userId);
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
