import { Post } from "../model/post.model.js";

export class PostRepository {
	async createPost(postData) {
		const post = await Post.create(postData);
		return post;
	}

	async getPostById(postId) {
		const post = await Post.findById(postId);
		return post;
	}

	async getPostsByHashTags(hashtagArray) {
		const posts = await Post.find({ hashTags: { $in: hashtagArray } });
		return posts;
	}

	async increaseViewCount(posts) {
		// Increment view count for each post
		const updatePosts = posts.map(async (post) => {
			post.views += 1;
			await post.save();
			return post;
		});
		const updatedPosts = await Promise.all(updatePosts);

		return updatedPosts;
	}

	async getPostsByText(text) {
		// Get all posts by avoiding deleted posts
		const post = await Post.find({ text: text, isDeleted: false });
		return post;
	}

	async updatePost(postId, updatedPostData) {
		const post = await Post.findByIdAndUpdate(postId, updatedPostData, {
			new: true,
		});
		return post;
	}

	async deletePost(postId) {
		const post = await Post.findByIdAndUpdate(
			postId,
			{ $set: { isDeleted: true } },
			{ new: true }
		);
		return post;
	}
}
