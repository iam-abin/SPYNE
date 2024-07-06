import { PostRepository } from "../database/repository/post.repository.js";
import { filterAndNormalizeHashtags } from "../utils/checkHashtags.js";

const postRepository = new PostRepository();

const createPost = async (req, res, next) => {
	try {
		const { text, image, hashTags } = req.body;
		const { userId } = req.user;
		let hashTagsArray = [];
		if (hashTags) {
			hashTagsArray = filterAndNormalizeHashtags(hashTags);
		}

		const newPost = await postRepository.createPost({
			text,
			image,
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
		const { postId } = req.params;
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
