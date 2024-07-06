import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Discussion service connected to mongodb...");
	} catch (error) {
        console.log(error);
		throw new Error(error);
	}
};
