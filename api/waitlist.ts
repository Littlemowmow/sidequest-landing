import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_db";
import { waitlistEntries, waitlistRequestSchema } from "../shared/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsed = waitlistRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    parsed.data.email = parsed.data.email.toLowerCase().trim();

    const [existing] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.email, parsed.data.email));

    if (existing) {
      return res
        .status(409)
        .json({ error: "already_registered", referralCode: existing.referralCode });
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
      .values({ ...parsed.data, referralCode })
      .returning();

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@sidequest.app";
      resend.emails
        .send({
          from: fromEmail,
          to: entry.email,
          subject: "You're on the list - SideQuest",
          html: buildWaitlistEmailHtml({
            name: entry.email.split("@")[0],
            destination: entry.destination,
            referralCode: entry.referralCode,
          }),
        })
        .catch((err) => console.error("Background email send failed:", err));
    }

    return res.status(201).json({ referralCode: entry.referralCode });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

function buildWaitlistEmailHtml(params: {
  name: string;
  destination?: string | null;
  referralCode: string;
}): string {
  const { name, destination, referralCode } = params;
  const baseUrl = process.env.SITE_URL || "https://sidequest.app";
  const referralUrl = `${baseUrl}?ref=${referralCode}`;

  const destinationLine = destination
    ? `<p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;line-height:1.6;">We'll make sure <strong style="color:#f9f9f9;">${destination}</strong> is loaded with hidden gems before you get there.</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;">
        <tr><td style="padding:0 0 32px;">
          <table role="presentation" cellspacing="0" cellpadding="0"><tr>
            <td style="width:36px;height:36px;background:linear-gradient(135deg,#f97316,#d97706);border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:18px;">S</td>
            <td style="padding-left:10px;font-size:20px;font-weight:700;color:#f9f9f9;letter-spacing:-0.02em;">SideQuest</td>
          </tr></table>
        </td></tr>
        <tr><td style="background-color:#1a1a1a;border-radius:20px;padding:40px 32px;border:1px solid #2a2a2a;">
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#f9f9f9;letter-spacing:-0.02em;">You're in, ${name}!</h1>
          <p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;line-height:1.6;">You've secured your spot for early access to SideQuest.</p>
          ${destinationLine}
          <div style="height:1px;background:#2a2a2a;margin:0 0 24px;"></div>
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:0.1em;">Your Referral Link</p>
          <div style="background:#111;border:1px solid #2a2a2a;border-radius:12px;padding:14px 16px;margin:0 0 16px;">
            <a href="${referralUrl}" style="color:#fbbf24;font-size:14px;font-family:monospace;text-decoration:none;word-break:break-all;">${referralUrl}</a>
          </div>
          <p style="margin:0 0 24px;color:#71717a;font-size:13px;line-height:1.5;">Share this with your travel crew. The more friends who join, the higher you move on the waitlist.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
            <a href="${referralUrl}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#d97706);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;">Share with your travel crew</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:28px 0 0;text-align:center;">
          <p style="margin:0 0 4px;color:#52525b;font-size:12px;">Questions? Just reply to this email.</p>
          <p style="margin:0;color:#3f3f46;font-size:11px;">SideQuest Inc.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
