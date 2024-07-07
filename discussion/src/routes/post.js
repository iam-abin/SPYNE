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
import { uploadFile } from "../middleware/multer.js";
import { handleValidationErrors } from "../middleware/validations/validation.errors.js";


const router = express.Router();

router.post("/", auth, uploadFile, createPostInputValidator, handleValidationErrors, createPost);
router.patch("/:postId", auth, updateInputValidator, updatePost);
router.delete("/:postId", auth, deletePost);

router.post("/search-by-tags", auth, searchPostsByHashTags);
router.get("/search/:text", auth, searchPostsByText);

router.post("/like-post/:postId", auth, likePost);
router.delete("/like-post/:likeId", auth, removePostLike);
router.post("/like-comment/:commentId", auth, likeComment);
router.delete("/like-comment/:likeId", auth, removeCommentLike);

router.post("/comment", auth, addComment);
router.patch("/comment/:commentId", auth, updateComment);
router.delete("/comment/:commentId", auth, removeComment);

export default router;