import { Like } from "../model/like.model.js";

export class LikeRepository {
	async createLike(likeData) {
		const like = await Like.create(likeData);
		return like;
	}

	async getLikeById(likeId) {
		const comment = await Comment.findById(likeId);
		return comment;
	}

	async deleteLike(likeId) {
		const result = await Like.findByIdAndDelete(likeId);
		return result;
	}
}
