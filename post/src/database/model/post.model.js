import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		text: String,
		image: String,
		hashTags: [String],
		isDeleted: {
			type: Boolean,
			default: false,
		},
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		views: {
			type: Number,
			default: 0,
		},
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

export const Post = mongoose.model("Post", postSchema);
