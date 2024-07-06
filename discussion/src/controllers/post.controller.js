import { PostRepository } from "../database/repository/post.repository.js";

const postRepository = new PostRepository();

const createPost = async (req, res, next) => {
	try {
		const { text, image } = req.body;
		const { userId } = req.user;
		const newPost = await postRepository.createPost({
			createdBy: userId,
			text,
			image,
		});
		res.status(201).json(newPost);
	} catch (error) {
		next(error);
	}
};

const updatePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const updatedUser = await postRepository.updatePost(postId, req.body);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

const searchPostsByText = async (req, res, next) => {
	try {
		const { text } = req.params;
		const posts = await postRepository.getPostsByText(text);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

const searchPostsByHashTags = async (req, res, next) => {
	try {
		const { hashTags } = req.body;
		const posts = await postRepository.getPostsByHashTags(hashTags);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const deletedPost = await postRepository.deletePost(postId);
		res.status(200).json(deletedPost);
	} catch (error) {
		next(error);
	}
};

export {
	createPost,
	updatePost,
	deletePost,
	searchPostsByText,
	searchPostsByHashTags,
};
