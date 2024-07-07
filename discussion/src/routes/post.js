import express from "express";

import { auth } from "../middleware/auth.js";
import {
	createPost,
	updatePost,
	deletePost,
	searchPostsByHashTags,
	searchPostsByText
} from "../controllers/post.controller.js";
import { likePost, likeComment, removePostLike, removeCommentLike } from "../controllers/like.controller.js";
import { addComment, removeComment, updateComment } from "../controllers/comment.controller.js";

import { updateInputValidator } from "../middleware/validations/validate.update.js";
import { createPostInputValidator } from "../middleware/validations/validate.insert.js";


const router = express.Router();

router.post("/", auth, createPostInputValidator, createPost);
router.patch("/:postId", auth, updateInputValidator, updatePost);
router.delete("/:postId", auth, deletePost);

router.post("/search-by-tags", auth, searchPostsByHashTags);
router.get("/search/:text", auth, searchPostsByText);

router.post("/like-post/:postId", auth, likePost);
router.post("/like-comment/:commentId", auth, likeComment);
router.delete("/like/:postId", auth, removePostLike);
router.delete("/like/:commentId", auth, removeCommentLike);

router.post("/comment", auth, addComment);
router.patch("/comment/:commentId", auth, updateComment);
router.delete("/comment/:commentId", auth, removeComment);

export default router;
