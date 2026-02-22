import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../_db";
import { sendWaitlistConfirmationEmail } from "../_email";
import { waitlistEntries, waitlistRequestSchema } from "../../shared/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsed = waitlistRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    parsed.data.email = parsed.data.email.toLowerCase().trim();

    const [existing] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.email, parsed.data.email));

    if (existing) {
      return res.status(409).json({ error: "already_registered", referralCode: existing.referralCode });
    }

    if (parsed.data.referredBy) {
      const [referrer] = await db
        .select()
        .from(waitlistEntries)
        .where(eq(waitlistEntries.referralCode, parsed.data.referredBy));

      if (!referrer) {
        parsed.data.referredBy = null;
      }
    }

    const referralCode = randomBytes(4).toString("hex");
    const [entry] = await db
      .insert(waitlistEntries)
      .values({
        ...parsed.data,
        referralCode,
      })
      .returning();

    sendWaitlistConfirmationEmail({
      email: entry.email,
      destination: entry.destination,
      referralCode: entry.referralCode,
    }).catch((err) => {
      console.error("Background email send failed:", err);
    });

    return res.status(201).json({ referralCode: entry.referralCode });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
