import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { getResend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const createdAt = new Date().toISOString();

    // 1. Store the message in Firestore.
    await getDb().collection("contact_messages").add({
      name,
      email,
      message,
      createdAt,
    });

    // 2. Notify the site owner.
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1f1e1c; max-width: 480px; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <p><strong>Submitted:</strong> ${createdAt}</p>
        </div>
      `,
    });

    // 3. Send a short confirmation to the sender.
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Got your message",
      html: `
        <div style="font-family: Georgia, serif; color: #1f1e1c; max-width: 480px; margin: 0 auto; padding: 32px 0; line-height: 1.6;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out — I've received your message and will get back to you soon.</p>
          <p>— AK</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}