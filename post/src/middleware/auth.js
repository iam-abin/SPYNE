// import { User } from "../database/model/user.model.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("UnAuthorized Request");
        const decoded = verifyJwtToken(token);
        // const user = await User.findById(decoded.user.userId);
        // if (!user) throw new Error("User Not found");
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
