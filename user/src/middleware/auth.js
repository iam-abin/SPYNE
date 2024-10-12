import { User } from "../database/model/user.model.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("UnAuthorized Request");
        const decoded = verifyJwtToken(token);
        const user = await User.findById(decoded.user.userId);
        if (!user) throw new Error("User Not found");
        if (!user.isDeleted) throw new Error("Blocked user");
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
