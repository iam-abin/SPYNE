import "dotenv/config";

import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

await connectDB();

const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>
	console.log(`Discussion service is listening on port ${PORT}...`)
);
