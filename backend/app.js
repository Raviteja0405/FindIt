// app.js
import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import "./config/passport.js";
import authRoutes from "./routes/auth.route.js";
import itemRoutes from "./routes/item.route.js";
import userRoutes from "./routes/user.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use(errorHandler);

export default app;
