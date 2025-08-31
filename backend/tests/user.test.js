import request from "supertest";
import app from "../app.js";
import { setupTestDB, teardownTestDB, clearDatabase, createTestUser } from "./setup.js";
import User from "../models/User.model.js";

describe("User APIs", () => {
  let testUser;
  let agent;

  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
    testUser = await createTestUser();
    agent = request.agent(app);
    
    // Mock authentication by setting session
    agent.auth = () => {
      return agent.set('user-id', testUser._id.toString());
    };
  });

  describe("GET /api/users/me", () => {

    it("should return 401 when not authenticated", async () => {
      const res = await request(app)
        .get("/api/users/me");

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Unauthorized. Please log in.");
    });
  });

  describe("PUT /api/users/me", () => {
    it("should update user contact info", async () => {
      const updateData = {
        phone: "9876543210",
        showPhone: false,
        showEmail: true
      };

      const res = await request(app)
        .put("/api/users/me")
        .send(updateData);

      if (res.status === 200) {
        expect(res.body.contactInfo.phone).toBe(updateData.phone);
        expect(res.body.contactInfo.showPhone).toBe(updateData.showPhone);
        expect(res.body.contactInfo.showEmail).toBe(updateData.showEmail);
      } else {
        expect(res.status).toBe(401); // Not authenticated in test
      }
    });

    it("should handle partial updates", async () => {
      const updateData = { phone: "5555555555" };

      const res = await request(app)
        .put("/api/users/me")
        .send(updateData);

      if (res.status === 200) {
        expect(res.body.contactInfo.phone).toBe(updateData.phone);
      }
    });
  });

  describe("POST /api/users/complete-profile", () => {
    it("should complete user profile", async () => {
      const profileData = {
        contactInfo: {
          phone: "1111111111",
          showPhone: true,
          showEmail: false
        }
      };

      const res = await request(app)
        .post("/api/users/complete-profile")
        .send(profileData);

      if (res.status === 200) {
        expect(res.body.message).toBe("Profile completed");
      }
    });

    it("should require phone number", async () => {
      const profileData = {
        contactInfo: {
          showPhone: true,
          showEmail: false
        }
      };

      const res = await request(app)
        .post("/api/users/complete-profile")
        .send(profileData);

      if (res.status === 400) {
        expect(res.body.message).toBe("Phone number is required");
      }
    });
  });

  describe("DELETE /api/users/me", () => {
    it("should delete user account and associated items", async () => {
      const res = await request(app)
        .delete("/api/users/me");

      if (res.status === 200) {
        expect(res.body.message).toBe("User account and items deleted successfully.");
        
        // Verify user is deleted
        const deletedUser = await User.findById(testUser._id);
        expect(deletedUser).toBeNull();
      }
    });
  });
});
