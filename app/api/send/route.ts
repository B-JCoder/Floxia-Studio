import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Save to Supabase (Leads Table)
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ');

    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
        first_name: firstName || 'Unknown', 
        last_name: lastName || '', 
        email, 
        service: subject, 
        message 
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: `Database error: ${dbError.message}` }, { status: 500 });
    }

    // 2. Send Email via Resend
    const data = await resend.emails.send({
      from: 'Floxia Studio <onboarding@resend.dev>',
      to: 'floxiastudio@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
            Sent from Floxia Studio Contact Form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
