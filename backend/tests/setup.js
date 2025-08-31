import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/User.model.js";
import Item from "../models/Item.model.js";

let mongoServer;

export const setupTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

export const teardownTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const createTestUser = async () => {
  const testUser = new User({
    googleId: "test-google-id-123",
    name: "Test User",
    email: "test@example.com",
    photo: "https://example.com/photo.jpg",
    contactInfo: {
      phone: "1234567890",
      showPhone: true,
      showEmail: true
    }
  });
  return await testUser.save();
};
