import express from "express";
import {
	createPost,
	updatePost,
	deletePost,
	searchPostsByHashTags,
	searchPostsByText,
} from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.js";

import { updateInputValidator } from "../middleware/validations/validate.update.js";
import { createPostInputValidator } from "../middleware/validations/validate.insert.js";

const router = express.Router();

router.post("/", auth, createPostInputValidator, createPost);
router.patch("/:postId", auth, updateInputValidator, updatePost);

router.delete("/", auth, deletePost);

router.get("/", auth, searchPostsByHashTags);
router.get("/search/:text", auth, searchPostsByText);

export default router;
