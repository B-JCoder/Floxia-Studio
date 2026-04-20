import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const SECTIONS = [
  {
    title: "Business Information",
    fields: {
      f_name: "Full Name",
      f_role: "Role",
      f_bname: "Business Name",
      f_industry: "Industry",
      f_email: "Email Address",
      f_phone: "Phone Number",
      f_website: "Existing Website",
      f_desc: "Business Description",
      f_audience: "Target Audience",
    },
  },
  {
    title: "Project Goals & Requirements",
    fields: {
      f_sitetype: "Website Type",
      f_goals: "Primary Goals",
      f_pages: "Pages Needed",
      f_integrations: "Features & Integrations",
      f_launch: "Launch Timeline",
      f_budget: "Project Budget",
    },
  },
  {
    title: "Branding & Visual Identity",
    fields: {
      f_haslogo: "Brand Assets Status",
      f_colors: "Preferred Colors",
      f_vibe: "Brand Vibe/Feeling",
      f_fonts: "Typography Preference",
      f_inspo: "Design Inspiration",
      f_avoid: "Things to Avoid",
    },
  },
  {
    title: "Content & Strategy",
    fields: {
      f_copy: "Copywriting Status",
      f_images: "Image Assets",
      f_video: "Video Content",
      f_blog: "Blog/Content Hub",
      f_seo: "SEO Strategy",
      f_languages: "Languages",
      f_addcontent: "Additional Content Info",
    },
  },
  {
    title: "Technical & Final Details",
    fields: {
      f_platform: "Preferred Platform",
      f_hosting: "Hosting Status",
      f_domain: "Domain Status",
      f_maintain: "Maintenance Plan",
      f_competitors: "Top Competitors",
      f_anything: "Additional Project Info",
      f_hear: "Referral Source",
    },
  },
];

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const fullName = formData.f_name || "Unknown Client";
    const businessName = formData.f_bname || "Unknown Business";
    const email = formData.f_email || "Unknown Email";

    // 1. Save to Supabase (onboarding_clients)
    const { error: dbError } = await supabase
      .from("onboarding_clients")
      .insert([
        {
          company_name: businessName,
          industry: formData.f_industry || "",
          current_revenue: formData.f_budget || "",
          target_goals: formData.f_goals || "",
          amazon_store_link: formData.f_website || "",
        },
      ]);

    if (dbError) {
      console.error("Database error (Onboarding):", dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 },
      );
    }

    // 1.5 Save to Supabase (leads) so it shows up in dashboard
    const { error: leadDbError } = await supabase.from("leads").insert([
      {
        first_name: fullName.split(" ")[0] || "Unknown",
        last_name: fullName.split(" ").slice(1).join(" ") || "",
        email: email,
        service: formData.f_industry || "Onboarding",
        budget: formData.f_budget || "",
        status: "New",
      },
    ]);

    if (leadDbError) {
      console.error("Database error (Leads):", leadDbError);
    }
    let emailHtml = SECTIONS.map((section) => {
      const sectionRows = Object.entries(section.fields)
        .map(([key, label]) => {
          const rawValue = formData[key];
          const displayValue = Array.isArray(rawValue)
            ? rawValue.join(", ")
            : rawValue;

          return `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 200px; vertical-align: top;">
              <span style="color: #666; font-size: 12px; font-weight: 600; text-transform: uppercase;">${label}</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111; font-size: 14px;">
              ${displayValue || '<span style="color: #ccc;">Not provided</span>'}
            </td>
          </tr>
        `;
        })
        .join("");

      return `
        <div style="margin-bottom: 30px;">
          <h3 style="background: #f8f8f8; padding: 10px 15px; border-radius: 8px; font-size: 16px; color: #000; margin-bottom: 10px; border-left: 4px solid #000;">${section.title}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${sectionRows}
          </table>
        </div>
      `;
    }).join("");

    // 3. Send Comprehensive Email via Resend
    const { data, error: emailError } = await resend.emails.send({
      from: "Floxia Studio <onboarding@resend.dev>",
      to: "floxiastudio@gmail.com",
      subject: `🚀 New Project Inquiry: ${businessName} (${fullName})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .wrapper { background-color: #f4f4f4; padding: 40px 20px; }
              .container { max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
              .header { background: #000000; padding: 50px 40px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
              .header p { color: #888; margin: 10px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; }
              .body { padding: 40px; }
              .footer { background: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #eee; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <h1>Floxia Studio</h1>
                  <p>Onboarding Questionnaire</p>
                </div>
                <div class="body">
                  <p style="font-size: 18px; margin-bottom: 30px;">You have received a new project inquiry. Here are the full details from the onboarding questionnaire:</p>
                  
                  ${emailHtml}

                  <div style="margin-top: 40px; padding: 25px; background: #000; color: #fff; border-radius: 15px; text-align: center;">
                    <p style="margin: 0; font-size: 16px; font-weight: 600;">Next Action: Prepare proposal & schedule discovery call</p>
                  </div>
                </div>
                <div class="footer">
                  <p>Sent via Floxia Studio Automation</p>
                  <p>&copy; 2026 Floxia Studio</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      return NextResponse.json({ error: emailError }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
