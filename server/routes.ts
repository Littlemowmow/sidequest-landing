import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { waitlistRequestSchema } from "@shared/schema";
import { randomBytes } from "crypto";
import { sendWaitlistConfirmationEmail, sendContactInquiryEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = waitlistRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      }

      parsed.data.email = parsed.data.email.toLowerCase().trim();

      const existing = await storage.getWaitlistEntryByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "already_registered", referralCode: existing.referralCode });
      }

      if (parsed.data.referredBy) {
        const referrer = await storage.getWaitlistEntryByReferralCode(parsed.data.referredBy);
        if (!referrer) {
          parsed.data.referredBy = null;
        }
      }

      const referralCode = randomBytes(4).toString("hex");
      const entry = await storage.createWaitlistEntry({
        ...parsed.data,
        referralCode,
      });

      sendWaitlistConfirmationEmail({
        email: entry.email,
        destination: entry.destination,
        referralCode: entry.referralCode,
      }).catch(err => {
        console.error("Background email send failed:", err);
      });

      res.status(201).json({ referralCode: entry.referralCode });
    } catch (error) {
      console.error("Waitlist error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({ error: "Message is required" });
      }
      if (message.length > 2000) {
        return res.status(400).json({ error: "Message too long (max 2000 characters)" });
      }

      const result = await sendContactInquiryEmail({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });

      if (result.success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  return httpServer;
}
