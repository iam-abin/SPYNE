import { Like } from "../model/like.model.js";

export class LikeRepository {
	async createLike(likeData) {
		const like = await Like.create(likeData);
		return like;
	}

	async getPostLike(userId, postId) {
		const like = await Like.findOne({ likedBy: userId, postId });
		return like;
	}

	async getCommentsLike(userId, commentId) {
		const like = await Like.findOne({ likedBy: userId, commentId });
		return like;
	}


	async getLikeById(likeId) {
		const like = await Like.findById(likeId);
		return like;
	}

	async deleteLike(likeId) {
		const result = await Like.findByIdAndDelete(likeId);
		return result;
	}
}
