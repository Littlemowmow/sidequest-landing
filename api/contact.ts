import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@sidequest.app";

    await resend.emails.send({
      from: fromEmail,
      to: "muhahadi@umich.edu",
      subject: `SideQuest Inquiry from ${name.trim()}`,
      replyTo: email.trim().toLowerCase(),
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;">
        <tr><td style="padding:0 0 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0"><tr>
            <td style="width:36px;height:36px;background:linear-gradient(135deg,#f97316,#d97706);border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:18px;">S</td>
            <td style="padding-left:10px;font-size:20px;font-weight:700;color:#f9f9f9;letter-spacing:-0.02em;">SideQuest Inquiry</td>
          </tr></table>
        </td></tr>
        <tr><td style="background-color:#1a1a1a;border-radius:20px;padding:32px;border:1px solid #2a2a2a;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:0.1em;">From</p>
          <p style="margin:0 0 16px;color:#f9f9f9;font-size:16px;font-weight:600;">${name.trim()} &lt;${email.trim().toLowerCase()}&gt;</p>
          <div style="height:1px;background:#2a2a2a;margin:0 0 16px;"></div>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <p style="margin:0;color:#d4d4d8;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message.trim()}</p>
        </td></tr>
        <tr><td style="padding:20px 0 0;text-align:center;">
          <p style="margin:0;color:#52525b;font-size:12px;">Reply directly to this email to respond to ${name.trim()}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
