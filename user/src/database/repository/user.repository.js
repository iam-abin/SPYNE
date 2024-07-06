import { User } from "../model/user.model.js";
import mongoose from "mongoose";

export class UserRepository {
	async createUser(userData) {
		const user = await User.create(userData);
		return user;
	}
	
	async getUserByEmail(email) {
		const user = await User.findOne({ email });
		return user;
	}

	async getAllUsers(userId) {
		const user = await User.aggregate([
			{
				$match: {
					_id: { $ne: new mongoose.Types.ObjectId(userId) },
					isDeleted: false,
				},
			},
		]);
		return user;
	}

	async searchUsers(name) {
		console.log(name);
		const user = await User.find({ name: { $regex: name, $options: "i" }, isDeleted: false });
		console.log(user);
		return user;
	}

	async updateUser(userId, userData) {
		const user = await User.findByIdAndUpdate(userId, userData, {
			new: true,
		});
		return user;
	}

	async deleteUser(userId) {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $set: { isDeleted: true } },
			{ new: true }
		);
		return user;
	}
}
