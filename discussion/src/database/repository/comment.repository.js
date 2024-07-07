import { Comment } from "../model/comment.model.js";

export class CommentRepository {
	async createComment(commentData) {
		const comment = await Comment.create(commentData);
		return comment;
	}

	async getCommentById(commentId) {
		const comment = await Comment.findById(commentId);
		return comment;
	}

	async updateComment(commentId, commentData) {
		const comment = await Comment.findByIdAndUpdate(commentId, commentData, {new: true});
		return comment;
	}

	async deleteComment(commentId) {
		const result = await Comment.findByIdAndDelete(commentId);
		return result;
	}
}