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

    const { about, goal, goalDescription, audience, branding, feeling, designDirection, designDescription, support, timeline, budget, extra } = body;

    await resend.emails.send({
      from: "Burning Lamb Contact <hi@burninglamb.eu>",
      to: [process.env.CONTACT_EMAIL || "hi@burninglamb.eu"],
      subject: `New website inquiry from ${name}`,
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name / Company:</strong> ${name || "—"}</p>
        <p><strong>Contact via:</strong> ${contactMethod || "—"}: ${contact || "—"}</p>
        <hr/>
        <p><strong>Website about:</strong> ${about || "—"}</p>
        <p><strong>Main goal:</strong> ${goal || "—"}${goalDescription ? ` — ${goalDescription}` : ""}</p>
        <p><strong>Target audience:</strong> ${audience || "—"}</p>
        <p><strong>Branding materials:</strong> ${branding || "—"}</p>
        <p><strong>Feeling/tone:</strong> ${feeling || "—"}</p>
        <p><strong>Design direction:</strong> ${designDirection || "—"}${designDescription ? ` — ${designDescription}` : ""}</p>
        <p><strong>Ongoing support:</strong> ${support || "—"}</p>
        <p><strong>Timeline:</strong> ${timeline || "—"}</p>
        <p><strong>Budget:</strong> ${budget || "—"}</p>
        <p><strong>Additional notes:</strong> ${extra || "—"}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
