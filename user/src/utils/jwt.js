import jwt from "jsonwebtoken";
import { JWT_EXPIRY_TIME } from "./constants.js";

export const createJwtToken = (payload) => {
    const jwtAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: JWT_EXPIRY_TIME,
    });

    return jwtAccessToken;
};

export const verifyJwtToken = (token) => {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    return decodedData;
};