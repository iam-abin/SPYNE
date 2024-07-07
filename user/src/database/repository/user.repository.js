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

	async getUserById(id) {
		const user = await User.findById(id);
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
		const user = await User.find({
			name: { $regex: name, $options: "i" },
			isDeleted: false,
		});
		return user;
	}

	async updateUser(userId, userData) {
		const user = await User.findByIdAndUpdate(userId, userData, {
			new: true,
		});
		return user;
	}

	async followAUser(userId, otherUserId) {
		// Updaing following list of current user
		const following = await User.findByIdAndUpdate(
		  userId,
		  { $addToSet: { following: new mongoose.Types.ObjectId(otherUserId) } },
		  { new: true }
		);
		// Updaing followers list of other user
		const follower = await User.findByIdAndUpdate(
		  otherUserId,
		  { $addToSet: { followers: new mongoose.Types.ObjectId(userId) } },
		  { new: true }
		);
	  
		return { following, follower };
	  }
	  

	async unFollowAUser(userId, otherUserId) {
		// Updaing following list of current user
		const following = await User.findByIdAndUpdate(
		  userId,
		  { $pull: { following: new mongoose.Types.ObjectId(otherUserId) } },
		  { new: true }
		);
	  
		// Updaing followers list of other user
		const follower = await User.findByIdAndUpdate(
		  otherUserId,
		  { $pull: { followers: new mongoose.Types.ObjectId(userId) } },
		  { new: true }
		);
	  
		return { following, follower };
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
