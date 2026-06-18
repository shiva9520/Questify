import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://questify-p7uh.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || 
                        origin.endsWith(".vercel.app") ||
                        (process.env.CLIENT_ORIGIN && origin === process.env.CLIENT_ORIGIN) ||
                        /^http:\/\/localhost:\d+$/.test(origin);
                        
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Questify API is running" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
});

export default app;
