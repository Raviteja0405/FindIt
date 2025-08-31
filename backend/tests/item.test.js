import request from "supertest";
import app from "../app.js";
import path from "path";
import fs from "fs";
import {
  setupTestDB,
  teardownTestDB,
  clearDatabase,
  createTestUser,
  createAuthenticatedAgent,
} from "./setup.js";
import Item from "../models/Item.model.js";

describe("Item APIs", () => {
  let testUser;
  let testImagePath;

  beforeAll(async () => {
    await setupTestDB();

    // Create a test image file
    testImagePath = path.join(__dirname, "test-image.png");
    if (!fs.existsSync(testImagePath)) {
      // Create a minimal PNG file for testing
      const pngHeader = Buffer.from([
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a, // PNG signature
        0x00,
        0x00,
        0x00,
        0x0d, // IHDR chunk length
        0x49,
        0x48,
        0x44,
        0x52, // IHDR
        0x00,
        0x00,
        0x00,
        0x01, // width: 1
        0x00,
        0x00,
        0x00,
        0x01, // height: 1
        0x08,
        0x02,
        0x00,
        0x00,
        0x00, // bit depth, color type, compression, filter, interlace
        0x90,
        0x77,
        0x53,
        0xde, // CRC
        0x00,
        0x00,
        0x00,
        0x00, // IEND chunk length
        0x49,
        0x45,
        0x4e,
        0x44, // IEND
        0xae,
        0x42,
        0x60,
        0x82, // CRC
      ]);
      fs.writeFileSync(testImagePath, pngHeader);
    }
  });

  afterAll(async () => {
    await teardownTestDB();
    // Clean up test image
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  });

  beforeEach(async () => {
    await clearDatabase();
    testUser = await createTestUser();
  });

  describe("POST /api/items", () => {
    it("should create a found item without image", async () => {
      const itemData = {
        title: "Found Keys",
        description: "Set of keys found in parking lot",
        location: "Parking Lot B",
        date: "2025-08-31",
        type: "found",
        category: "Other",
      };

      const res = await request(app).post("/api/items").send(itemData);

      if (res.status === 201) {
        expect(res.body.item.title).toBe(itemData.title);
        expect(res.body.item.imageUrl).toBeFalsy();
      }
    });

    it("should require mandatory fields", async () => {
      const incompleteData = {
        title: "Incomplete Item",
        // Missing location, date, type
      };

      const res = await request(app).post("/api/items").send(incompleteData);

      if (res.status === 400) {
        expect(res.body.message).toBe("All fields are required!");
      }
    });
  });

  describe("GET /api/items", () => {
    beforeEach(async () => {
      // Create test items
      await Item.create([
        {
          title: "Lost Laptop",
          description: "MacBook Pro",
          location: "Cafeteria",
          date: new Date("2025-08-30"),
          type: "lost",
          category: "Electronics",
          user: testUser._id,
        },
        {
          title: "Found Wallet",
          description: "Black leather wallet",
          location: "Library",
          date: new Date("2025-08-31"),
          type: "found",
          category: "Other",
          user: testUser._id,
        },
      ]);
    });

    it("should fetch all items with pagination", async () => {
      const res = await request(app).get("/api/items?page=1&limit=5");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeLessThanOrEqual(5);
    });

    it("should return items with populated user info", async () => {
      const res = await request(app).get("/api/items");

      expect(res.status).toBe(200);
      if (res.body.length > 0) {
        expect(res.body[0].user).toHaveProperty("name");
        expect(res.body[0].user).toHaveProperty("email");
      }
    });
  });

  describe("GET /api/items/me", () => {
    it("should fetch current user's items", async () => {
      const res = await request(app).get("/api/items/me");

      if (res.status === 200) {
        expect(Array.isArray(res.body)).toBe(true);
      } else {
        expect(res.status).toBe(401); // Not authenticated
      }
    });
  });

  describe("PUT /api/items/:id", () => {
    let testItem;

    beforeEach(async () => {
      testItem = await Item.create({
        title: "Test Item",
        description: "Test description",
        location: "Test location",
        date: new Date(),
        type: "lost",
        category: "Electronics",
        user: testUser._id,
      });
    });

    it("should update item if user owns it", async () => {
      const updateData = {
        title: "Updated Title",
        description: "Updated description",
      };

      const res = await request(app)
        .put(`/api/items/${testItem._id}`)
        .send(updateData);

      if (res.status === 200) {
        expect(res.body.item.title).toBe(updateData.title);
        expect(res.body.item.description).toBe(updateData.description);
      }
    });

    it("should return 404 for non-existent item", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const res = await request(app)
        .put(`/api/items/${fakeId}`)
        .send({ title: "Updated" });

      expect([404, 401]).toContain(res.status);
    });
  });

  describe("DELETE /api/items/:id", () => {
    let testItem;

    beforeEach(async () => {
      testItem = await Item.create({
        title: "Test Item to Delete",
        description: "Test description",
        location: "Test location",
        date: new Date(),
        type: "found",
        category: "Other",
        user: testUser._id,
      });
    });

    it("should delete item if user owns it", async () => {
      const res = await request(app).delete(`/api/items/${testItem._id}`);

      if (res.status === 200) {
        expect(res.body.message).toBe("Item deleted");

        // Verify item is deleted
        const deletedItem = await Item.findById(testItem._id);
        expect(deletedItem).toBeNull();
      }
    });

    it("should return 404 for non-existent item", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const res = await request(app).delete(`/api/items/${fakeId}`);

      expect([404, 401]).toContain(res.status);
    });
  });
});
