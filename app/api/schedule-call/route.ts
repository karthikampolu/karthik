import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { getResend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { callRequestSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = callRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { name, phone, message } = parsed.data;
    const createdAt = new Date().toISOString();

    await getDb().collection("call_requests").add({
      name,
      phone,
      message: message || "",
      createdAt,
    });

    await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New call request from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; color: #26241f; max-width: 480px; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message || "—"}</p>
          <p><strong>Submitted:</strong> ${createdAt}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Schedule call error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
