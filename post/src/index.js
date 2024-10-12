import "dotenv/config";

import { app } from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB();

const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>
	console.log(`post service is listening on port ${PORT}...`)
);
