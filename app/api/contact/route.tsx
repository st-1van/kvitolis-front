import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  try {
    const data = await resend.emails.send({
      from: 'Хочу бути меценатом Квітолісу <onboarding@resend.dev>', // або власний домен
      to: ['st.ivan.k.k@gmail.com'], // куди надсилати
      subject: `Повідомлення від ${name}`,
      html: `<p><strong>Ім’я:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Повідомлення:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
