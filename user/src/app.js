import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// http request logger middleware
app.use(morgan("dev"));

app.use("/api/v1/user", userRouter);
app.all("*", (req, res) => {
	return res.status(404).json({
		errors: [{ message: "Route not found" }],
	});
});
app.use(errorHandler);

export { app };
