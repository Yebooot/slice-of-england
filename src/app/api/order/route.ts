import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "dankova.nikoleta@gmail.com";

export async function POST(request: Request) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { box, city, firstName, lastName, phone, email, address, deliveryDate } = body;

  const { error } = await resend.emails.send({
    from: "Slice of England <onboarding@resend.dev>",
    to: [TO_EMAIL],
    subject: `Nová objednávka: ${box} – ${firstName} ${lastName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a202c;color:#f5f0e8;padding:24px;text-align:center">
          <h1 style="margin:0;font-size:22px">Slice of England – Nová Objednávka</h1>
        </div>
        <div style="padding:28px;background:#fff">
          <h2 style="color:#1a202c;margin-top:0">📦 ${box}</h2>

          <h3 style="color:#b4914b;border-bottom:1px solid #eee;padding-bottom:8px">Doručenie</h3>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:6px 0;color:#718096;width:130px">Mesto:</td><td style="padding:6px 0;font-weight:bold">${city}</td></tr>
            <tr><td style="padding:6px 0;color:#718096">Dátum:</td><td style="padding:6px 0;font-weight:bold">${deliveryDate}</td></tr>
            <tr><td style="padding:6px 0;color:#718096">Čas:</td><td style="padding:6px 0">12:00 – 14:00</td></tr>
            <tr><td style="padding:6px 0;color:#718096;vertical-align:top">Adresa:</td><td style="padding:6px 0">${address}</td></tr>
          </table>

          <h3 style="color:#b4914b;border-bottom:1px solid #eee;padding-bottom:8px;margin-top:24px">Kontakt</h3>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:6px 0;color:#718096;width:130px">Meno:</td><td style="padding:6px 0">${firstName} ${lastName}</td></tr>
            <tr><td style="padding:6px 0;color:#718096">Telefón:</td><td style="padding:6px 0">${phone}</td></tr>
            <tr><td style="padding:6px 0;color:#718096">E-mail:</td><td style="padding:6px 0">${email}</td></tr>
          </table>
        </div>
        <div style="background:#f5f0e8;padding:16px;text-align:center;font-size:12px;color:#a0aec0">
          Automaticky generovaný e-mail z vašej webstránky sliceofengland.sk
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
