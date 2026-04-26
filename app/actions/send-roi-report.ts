"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRoiReport(data: {
  email: string;
  practiceType: string;
  sessionRate: number;
  siteStatus: string;
  acceptingClients: string;
  revenueRange: string;
  annualLostRevenue: number;
}) {
  if (!data.email) {
    return { success: false, error: "Missing email" };
  }

  try {
    const result = await resend.emails.send({
      from: 'Floxia Studio <onboarding@resend.dev>',
      to: 'floxiastudio@gmail.com',
      subject: `New ROI Diagnostic Lead: ${data.email}`,
      replyTo: data.email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Practice Diagnostic Lead</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Practice Type:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.practiceType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Session Rate:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">$${data.sessionRate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Site Status:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.siteStatus}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Accepting Clients:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.acceptingClients || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Revenue Range:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.revenueRange || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #d97706;"><strong>Projected Lost Revenue:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #d97706; font-weight: bold;">$${data.annualLostRevenue.toLocaleString()}</td>
            </tr>
          </table>

          <p style="font-size: 11px; color: #999; margin-top: 30px; text-align: center;">
            This diagnostic report was generated via the Floxia Studio ROI Calculator.
          </p>
        </div>
      `,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: (error as Error).message };
  }
}
