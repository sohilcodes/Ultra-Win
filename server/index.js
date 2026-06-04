import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/pathan", adminRoutes);

// DB CONNECT
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"));

// START SERVER
const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// SOCKET INIT
import { initSocket } from "./socket/socket.js";
initSocket(server);
