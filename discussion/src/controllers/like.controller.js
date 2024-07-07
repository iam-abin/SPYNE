import { CommentRepository } from "../database/repository/comment.repository.js";
import { LikeRepository } from "../database/repository/like.repository .js";
import { PostRepository } from "../database/repository/post.repository.js";

const likeRepository = new LikeRepository();
const commentRepository = new CommentRepository();
const postRepository = new PostRepository();

const likePost = async (req, res, next) => {
	try {
		// There will be a post id if the like is giving to a post. Otherwise there will be commentId.
		const { postId } = req.params;
		const { userId } = req.user;
		const existPost = await postRepository.getPostById(postId);
		if (!existPost) throw new Error("Post does not exist");
		const likeExist = await likeRepository.getPostLike(userId, postId);
		if (likeExist) throw new Error("Already liked this post");
		const newLike = await likeRepository.createLike({
			postId,
			likedBy: userId,
		});

		res.status(201).json(newLike);
	} catch (error) {
		next(error);
	}
};

const likeComment = async (req, res, next) => {
	try {
		// There will be a post id if the like is giving to a post. Otherwise there will be commentId.
		const { commentId } = req.params;
		const { userId } = req.user;

		const existComment = await commentRepository.getCommentById(commentId);
		if (!existComment) throw new Error("Comment does not exist");

		const likeExist = await likeRepository.getCommentsLike(userId, commentId);
		if (likeExist) throw new Error("Already liked this post");

		const newLike = await likeRepository.createLike({
			commentId,
			likedBy: userId,
		});

		res.status(201).json(newLike);
	} catch (error) {
		next(error);
	}
};

const removePostLike = async (req, res, next) => {
	try {
		const { likeId } = req.params;
		const existLike = await likeRepository.getLikeById(likeId);
		if (!existLike) throw new Error("Like does not exist");
		const deleted = await likeRepository.deleteLike(likeId);

		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
};

const removeCommentLike = async (req, res, next) => {
	try {
		const { likeId } = req.params;
		const existLike = await likeRepository.getLikeById(likeId);
		if (!existLike) throw new Error("Like does not exist");
		const deleted = await likeRepository.deleteLike(likeId);

		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
};

// const getAllLikes = async (req, res, next) => {
// 	try {
// 		const { likeId } = req.params;
// 		const existLike = await likeRepository.getLikeById(likeId);
// 		if (!existLike) throw new Error("Like does not exist");
// 		const deleted = await likeRepository.deleteLike(likeId);

// 		res.status(200).json(deleted);
// 	} catch (error) {
// 		next(error);
// 	}
// };

export { likePost, likeComment, removePostLike, removeCommentLike };
