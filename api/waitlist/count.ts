import type { VercelRequest, VercelResponse } from "@vercel/node";
import { count } from "drizzle-orm";
import { db } from "../_db";
import { waitlistEntries } from "../../shared/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [result] = await db.select({ count: count() }).from(waitlistEntries);
    return res.json({ count: result.count });
  } catch (error) {
    console.error("Waitlist count error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
