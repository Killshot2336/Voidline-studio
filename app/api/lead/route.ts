import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, business, project, contact } = body ?? {};

    if (!name || !project || !contact) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // send as JSON instead (more stable)
    await fetch("https://formsubmit.co/ajax/voidline.studio.dev@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: "New Voidline Lead",
        Name: name,
        Business: business,
        Project: project,
        Contact: contact,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
