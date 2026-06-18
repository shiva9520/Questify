import app from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

// Ensure database connection is established
try {
  await connectDatabase();
} catch (error) {
  console.error("Database connection failed during initialization:", error);
}

export default app;
