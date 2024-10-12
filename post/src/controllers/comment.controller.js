import { CommentRepository } from "../database/repository/comment.repository.js";
import { PostRepository } from "../database/repository/post.repository.js";

const commentRepository = new CommentRepository();
const postRepository = new PostRepository();

const addComment = async (req, res, next) => {
	try {
		const { comment, postId, parentCommentId } = req.body;
		const { userId } = req.user;
		const existPost = await postRepository.getPostById(postId);
		if (!existPost) throw new Error("Post does not exist");
		if (parentCommentId) {
			const existParentComment = await commentRepository.getCommentById(
				parentCommentId
			);
			if (!existParentComment)
				throw new Error("Parent comment does not exist");
		}
		const newComment = await commentRepository.createComment({
			comment,
			postId,
			commentedBy: userId,
			replyTo: parentCommentId,
		});
		res.status(201).json(newComment);
	} catch (error) {
		next(error);
	}
};

const updateComment = async (req, res, next) => {
	try {
		const { commentId } = req.params;
		const { userId } = req.user;

		const existComment = await commentRepository.getCommentById(commentId);
		// Checking the comment is of the current user
		if (existComment?.commentedBy.toString() !== userId)
			throw new Error("You dont have such comment exist");
		const comment = await commentRepository.updateComment(
			commentId,
			req.body
		);
		res.status(200).json(comment);
	} catch (error) {
		next(error);
	}
};

const removeComment = async (req, res, next) => {
	try {
		const { commentId } = req.params;
		const { userId } = req.user;

		const existComment = await commentRepository.getCommentById(commentId);

		// Checking the comment is of the current user
		if (existComment?.commentedBy.toString() !== userId)
			throw new Error("You dont have such comment exist");

		const deleted = await commentRepository.deleteComment(commentId);
		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
};


export { addComment, updateComment, removeComment };
