import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
		commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] 
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

export const Comment = mongoose.model("Comment", commentSchema);
