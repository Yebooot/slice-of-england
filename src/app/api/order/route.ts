import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { box, city, firstName, lastName, phone, email, address, deliveryDate } = body;

    const { data, error } = await resend.emails.send({
      from: 'Slice of England <onboarding@resend.dev>',
      to: [process.env.ORDER_RECIPIENT_EMAIL || 'dankova.nikoleta@gmail.com'],
      subject: `Nová Objednávka: ${box} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a202c; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nová Objednávka</h1>
            <p style="margin: 5px 0 0; color: #cbd5e0;">Slice of England</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #2d3748; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-top: 0;">Detail produktu</h2>
            <p style="font-size: 18px;"><strong>Box:</strong> ${box}</p>
            
            <h2 style="color: #2d3748; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-top: 30px;">Doručenie</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #718096; width: 120px;">Mesto:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: bold;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096;">Dátum:</td>
                <td style="padding: 8px 0; color: #2d3748; font-weight: bold;">${deliveryDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096;">Čas:</td>
                <td style="padding: 8px 0; color: #2d3748;">12:00 - 14:00</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096;">Adresa:</td>
                <td style="padding: 8px 0; color: #2d3748;">${address}</td>
              </tr>
            </table>

            <h2 style="color: #2d3748; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-top: 30px;">Kontaktné údaje</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #718096; width: 120px;">Meno:</td>
                <td style="padding: 8px 0; color: #2d3748;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096;">Telefón:</td>
                <td style="padding: 8px 0; color: #2d3748;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096;">E-mail:</td>
                <td style="padding: 8px 0; color: #2d3748;">${email}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f7fafc; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
            Toto je automaticky generovaný e-mail z vašej webstránky.
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
