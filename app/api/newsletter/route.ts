import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { getResend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { newsletterSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // 1. Store the subscriber in Firestore.
    await getDb().collection("newsletter_subscribers").add({
      email,
      subscribedAt: new Date().toISOString(),
    });

    // 2. Notify the site owner.
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: "New newsletter subscriber",
      text: `New subscriber: ${email}`,
    });

    // 3. Send a minimal confirmation email to the subscriber.
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to AK",
      html: `
        <div style="font-family: Georgia, serif; color: #26241f; max-width: 480px; margin: 0 auto; padding: 32px 0; line-height: 1.6;">
          <p>Hi,</p>
          <p>Thank you for subscribing.</p>
          <p>You'll occasionally receive thoughtful notes on technology, business, finance, and building products — nothing more frequent than that.</p>
          <p>Glad to have you here.</p>
          <p>— AK</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
