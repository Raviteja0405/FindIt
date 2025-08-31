// server.js
import app from "./app.js";
import connectDB from "./utils/connectDB.util.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch((err) => {
  console.error("Failed to connect to the database", err);
});