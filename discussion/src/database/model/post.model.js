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
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
				delete ret.password;
			},
		},
	}
);

export const Post = mongoose.model("Post", postSchema);
