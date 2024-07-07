import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
	{
		postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
		commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
		likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
			},
		},
	}
);

export const Like = mongoose.model("Like", likeSchema);
