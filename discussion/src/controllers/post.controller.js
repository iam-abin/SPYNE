import { PostRepository } from "../database/repository/post.repository.js";
import { filterAndNormalizeHashtags } from "../utils/checkHashtags.js";

const postRepository = new PostRepository();

const createPost = async (req, res, next) => {
	try {
		let { text, hashTags } = req.body;
		hashTags = JSON.parse(hashTags);
		const { userId } = req.user;
		let hashTagsArray = [];
		if (hashTags) {
			hashTagsArray = filterAndNormalizeHashtags(hashTags);
		}

		const newPost = await postRepository.createPost({
			text,
			image: req.file?.filename,
			hashTags: hashTagsArray,
			createdBy: userId,
		});
		res.status(201).json(newPost);
	} catch (error) {
		next(error);
	}
};

const updatePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const updateData = req.body;
		const existPost = await postRepository.getPostById(postId);
		if (existPost.createdBy.toString() !== userId)
			throw new Error("You dont have such post exist");
		if (hashTags) {
			let hashTagsArray = [];
			hashTagsArray = extractHashtags(hashTags);
			updateData.hashTags = hashTagsArray;
		}
		const updatedUser = await postRepository.updatePost(postId, updateData);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

const searchPostsByText = async (req, res, next) => {
	try {
		const { text } = req.params;
		const posts = await postRepository.getPostsByText(text);
		// Increase the view count since the user viewing the post
		await postRepository.increaseViewCount(posts);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

const searchPostsByHashTags = async (req, res, next) => {
	try {
		const { hashTags } = req.body;

		const posts = await postRepository.getPostsByHashTags(hashTags);
		// Increase the view count since the user viewing the post
		await postRepository.increaseViewCount(posts);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const { userId } = req.user;
		const existPost = await postRepository.getPostById(postId);
		if (existPost.createdBy.toString() !== userId)
			throw new Error("You dont have such post exist");

		// Here performing only soft delete
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
