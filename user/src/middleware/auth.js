import jwt from "jsonwebtoken";
// import {User} from "../database/model/user.model.js"

export const auth = async(req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) throw new Error("UnAuthorized Request");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await User.findById(decoded.user.userId)
		// if (!user.isDeleted) throw new Error("Blocked user");
		req.user = decoded;
		console.log("req.user", req.user);

		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
};
