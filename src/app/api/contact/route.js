import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contactMethod, contact } = body;

    if (!name || !contact) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
      about,
      goal,
      goalDescription,
      audience,
      branding,
      feeling,
      designDirection,
      designDescription,
      support,
      timeline,
      budget,
      budgetDescription,
      extra,
      services,
      project,
    } = body;

    // Long-form intake (11-step contact page) fields
    const detailedFields = [
      about && `<p><strong>Website about:</strong> ${about}</p>`,
      goal && `<p><strong>Main goal:</strong> ${goal}${goalDescription ? ` — ${goalDescription}` : ""}</p>`,
      audience && `<p><strong>Target audience:</strong> ${audience}</p>`,
      branding && `<p><strong>Branding materials:</strong> ${branding}</p>`,
      feeling && `<p><strong>Feeling/tone:</strong> ${feeling}</p>`,
      designDirection && `<p><strong>Design direction:</strong> ${designDirection}${designDescription ? ` — ${designDescription}` : ""}</p>`,
      support && `<p><strong>Ongoing support:</strong> ${support}</p>`,
      timeline && `<p><strong>Timeline:</strong> ${timeline}</p>`,
      budget && `<p><strong>Budget:</strong> ${budget}${budgetDescription ? ` — ${budgetDescription}` : ""}</p>`,
      extra && `<p><strong>Additional notes:</strong> ${extra}</p>`,
    ].filter(Boolean);

    // Quick launch form (bottom of homepage) fields
    const quickFields = [
      Array.isArray(services) && services.length > 0 && `<p><strong>Interested in:</strong> ${services.join(", ")}</p>`,
      project && `<p><strong>Project details:</strong> ${project}</p>`,
    ].filter(Boolean);

    const extraSections = [...detailedFields, ...quickFields];

    await resend.emails.send({
      from: "Burning Lamb Contact <hi@burninglamb.eu>",
      to: [process.env.CONTACT_EMAIL || "hi@burninglamb.eu"],
      subject: `New website inquiry from ${name}`,
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name / Company:</strong> ${name || "—"}</p>
        <p><strong>Contact via:</strong> ${contactMethod || "—"}: ${contact || "—"}</p>
        ${extraSections.length ? `<hr/>${extraSections.join("\n")}` : ""}
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
