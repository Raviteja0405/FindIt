import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

dotenv.config();
console.log(process.env.MONGO_URI);

import connectDb from './utils/connectDB.util.js';
import './config/passport.js';

import authRoutes from './routes/auth.route.js';
import itemRoutes from './routes/item.route.js';
import userRoutes from './routes/user.route.js';

import errorHandler from './middlewares/errorHandler.middleware.js';

connectDb();

const app = express();

// === Middlewares ===
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // 🔐 Allow sending cookies
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// === Session Middleware (required for passport sessions) ===
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// === Passport Setup ===
app.use(passport.initialize());
app.use(passport.session());

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// === Error Handler ===
app.use(errorHandler);

// === Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
