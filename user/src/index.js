import "dotenv/config";

import { app } from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
	console.log(`User service is listening on port ${PORT}...`)
);
