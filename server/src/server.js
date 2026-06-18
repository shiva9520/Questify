import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import dns from 'node:dns'
dns.setServers(["8.8.8.8", "1.1.1.1"])
const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
