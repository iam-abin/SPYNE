import { Post } from "../model/post.model.js";

export class PostRepository {
	async createPost(postData) {
		const post = await Post.create(postData);
		return post;
	}

	async getPostsByHashTags(hashtagArray) {
		console.log(hashtagArray);
		const posts = await Post.find({ hashTags: { $in: hashtagArray } });
		console.log(posts);
		return posts;
	}

	async getPostsByText(text) {
		console.log(text);
		const post = await Post.find({ text: text, isDeleted: false });
		return post;
	}

	async updatePost(postId, updatedPostData) {
		const post = await Post.findByIdAndUpdate(postId, updatedPostData, {
			new: true,
		});
		console.log("post updated ",post);
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
