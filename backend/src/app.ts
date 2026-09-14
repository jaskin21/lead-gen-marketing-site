import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leadRoutes from "./routes/lead.route";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", leadRoutes);

app.use(errorHandler); // must be registered last

export default app;
