import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, business, project, contact } = body ?? {};

    if (!name || !project || !contact) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // Background email forwarding through FormSubmit.
    // After first deployment, FormSubmit may require a one-time email activation.
    const form = new FormData();
    form.append("_subject", "New Voidline Lead");
    form.append("_captcha", "false");
    form.append("Name", String(name));
    form.append("Business", String(business ?? ""));
    form.append("Project", String(project));
    form.append("Contact", String(contact));

    const forward = await fetch("https://formsubmit.co/ajax/voidline.studio.dev@gmail.com", {
      method: "POST",
      body: form
    });

    if (!forward.ok) {
      return NextResponse.json({ ok: false, error: "Forwarding failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
