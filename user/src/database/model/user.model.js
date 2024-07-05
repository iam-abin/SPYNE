import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false
		},
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

userSchema.pre("save", async function (next) {
	try {
		// Only hash the password if it has been modified (or is new)
		if (!this.isModified("password")) return next();

		// Generate a salt
		const salt = await bcrypt.genSalt(10);

		// Hash the password using the salt
		const hashedPassword = await bcrypt.hash(this.password, salt);
		// Replace the plain text password with the hasherrored password
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

export const User = mongoose.model("User", userSchema);
