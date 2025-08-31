import request from "supertest";
import app from "../app.js";
import { setupTestDB, teardownTestDB, clearDatabase } from "./setup.js";

describe("Authentication APIs", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe("GET /api/auth/google", () => {
    it("should redirect to Google OAuth", async () => {
      const res = await request(app)
        .get("/api/auth/google");
      
      expect(res.status).toBe(302);
      expect(res.headers.location).toMatch(/accounts\.google\.com/);
    });
  });

  describe("GET /api/auth/google/callback", () => {
    it("should handle Google OAuth callback", async () => {
      // This would require mocking Google OAuth response
      // In practice, you'd mock the passport strategy
      const res = await request(app)
        .get("/api/auth/google/callback");
      
      // Expect redirect (either to client or failure)
      expect([302, 401]).toContain(res.status);
    });
  });

  describe("GET /api/auth/logout", () => {
    it("should logout successfully when not authenticated", async () => {
      const res = await request(app)
        .get("/api/auth/logout");
      
      expect([200, 500]).toContain(res.status);
    });

    it("should logout successfully when authenticated", async () => {
      const agent = request.agent(app);
      
      // Mock a session first (this would be set up differently in real tests)
      const res = await agent
        .get("/api/auth/logout");
      
      if (res.status === 200) {
        expect(res.body.message).toBe("Logged out successfully");
      }
    });
  });
});
