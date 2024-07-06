import jwt from "jsonwebtoken";

export const createJwtToken = (payload) => {
	const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	return jwtToken;
};