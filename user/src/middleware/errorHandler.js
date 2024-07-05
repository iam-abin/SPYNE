const errorHandler = (err, req, res, next) => {
	console.log("==================================");
	console.log(err.stack || err);
	console.log("==================================");
	const errStatus = err.statusCode || 500;
	const errMessage = err.message || "Something went wrong";
	res.status(errStatus).send({
		errors: [{ message: errMessage }],
	});
};

export default errorHandler;
