import "dotenv/config";

import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

await connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
	console.log(`User service is listening on port ${PORT}`)
);
