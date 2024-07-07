import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
        comment: {type: String, required: true},
		postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
		commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null  },
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
