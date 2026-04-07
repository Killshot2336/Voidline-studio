"use client";

import { useMemo, useState } from "react";

type Stage = "chat" | "name" | "business" | "project" | "contact" | "done";

type Lead = {
  name?: string;
  business?: string;
  project?: string;
  contact?: string;
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function fuzzyCategory(input: string): string | null {
  const text = normalize(input);

  const categories: Record<string, string[]> = {
    services: [
      "what do you build", "what can you build", "services", "offer", "do you do", "can you build",
      "webiste", "website", "web app", "app", "automation", "dashboard", "tool", "system", "systems"
    ],
    pricing: ["pricing", "price", "cost", "quote", "rates", "how much", "prcing"],
    credentials: ["cert", "certs", "certification", "certifications", "credential", "experience", "proof", "cyberpatriot"],
    contact: ["contact", "phone", "email", "reach", "call", "text"],
    roofing: ["roofing", "roofer", "roofers"],
    apps: ["app", "application", "dashboard", "portal", "tool"],
    automation: ["automation", "automate", "workflow", "lead flow", "crm"],
    website: ["website", "site", "landing page", "business site", "webiste"],
    location: ["where are you", "location", "based", "fort worth"],
    response: ["response time", "how fast", "turnaround"],
    start: ["i need", "i want", "start project", "lets build", "let's build", "build me", "make me"]
  };

  for (const [key, terms] of Object.entries(categories)) {
    if (includesAny(text, terms)) return key;
  }
  return null;
}

function getReply(input: string): string {
  const category = fuzzyCategory(input);
  switch (category) {
    case "services":
      return "Voidline builds high-performance websites, full-stack web applications, automation systems, lead workflows, dashboards, and custom business tools designed to convert, scale, and operate cleanly.";
    case "pricing":
      return "Pricing depends on scope, speed, and system depth. Smaller business sites land lower. Premium custom systems land higher. If you describe the build, the operator can route the right next step.";
    case "credentials":
      return "Voidline is backed by IT Specialist certifications in Cybersecurity, Networking, Network Security, Cloud Computing, Software Development, Java, and Python, plus CyberPatriot XVIII Semifinal Round qualification.";
    case "contact":
      return "You can reach Voidline at 945-308-5157 or voidline.studio.dev@gmail.com. If you want, the operator can also take your project request here.";
    case "roofing":
      return "Yes. Voidline can build a conversion-focused roofing site designed around trust, local proof, inspections, service pages, and cleaner lead flow.";
    case "apps":
      return "Yes. Voidline builds custom apps, dashboards, internal tools, and interactive systems with a focus on clarity, speed, and real utility.";
    case "automation":
      return "Yes. Voidline can build automation workflows, lead routing, intake systems, and operational tools that reduce manual work and clean up business flow.";
    case "website":
      return "Yes. Voidline builds premium business websites engineered for credibility, speed, mobile performance, and conversion.";
    case "location":
      return "Voidline is based in Fort Worth, TX.";
    case "response":
      return "Standard response window is 24–48 hours.";
    case "start":
      return "Good. Describe the build and the operator will route the next step.";
    default:
      return "Voidline handles websites, applications, automation systems, and custom business builds. Describe what you need—even roughly—and the operator will guide the next step.";
  }
}

export default function Operator() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("chat");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [lead, setLead] = useState<Lead>({});
  const [messages, setMessages] = useState<string[]>([
    "Voidline Operator online.",
    "Describe the build. I’ll route it."
  ]);

  const quickPrompts = useMemo(
    () => ["What do you build?", "Do you make websites?", "Tell me about your credentials", "Start a project"],
    []
  );

  async function sendLead(payload: Lead) {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return Boolean(data?.ok);
  }

  async function handleSend(prefill?: string) {
    const raw = (prefill ?? input).trim();
    if (!raw || sending) return;

    setMessages((m) => [...m, `You: ${raw}`]);
    setInput("");

    if (stage === "name") {
      setLead((prev) => ({ ...prev, name: raw }));
      setMessages((m) => [...m, "Operator: What business or project is this for?"]);
      setStage("business");
      return;
    }

    if (stage === "business") {
      setLead((prev) => ({ ...prev, business: raw }));
      setMessages((m) => [...m, "Operator: What are you trying to build?"]);
      setStage("project");
      return;
    }

    if (stage === "project") {
      setLead((prev) => ({ ...prev, project: raw }));
      setMessages((m) => [...m, "Operator: Best contact method? Phone or email."]);
      setStage("contact");
      return;
    }

    if (stage === "contact") {
      const payload = { ...lead, contact: raw };
      setLead(payload);
      setSending(true);
      const ok = await sendLead(payload);
      setSending(false);
      if (ok) {
        setMessages((m) => [
          ...m,
          "Operator: Request received. Voidline will review it and reach out shortly."
        ]);
        setStage("done");
      } else {
        setMessages((m) => [
          ...m,
          "Operator: Intake was captured locally, but email delivery still needs configuration after deploy."
        ]);
        setStage("done");
      }
      return;
    }

    const reply = getReply(raw);
    setMessages((m) => [...m, `Operator: ${reply}`]);

    if (includesAny(normalize(raw), ["start project", "start a project", "build me", "i need", "i want", "lets build", "let's build"])) {
      setMessages((m) => [...m, "Operator: Good. What name should I put on the request?"]);
      setStage("name");
    }
  }

  return (
    <>
      <button
        aria-label="Open Voidline Operator"
        className="operator-launch"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="operator-launch-dot" />
        <span className="operator-launch-icon">◌</span>
      </button>

      <aside className={`operator-shell ${open ? "open" : ""}`}>
        <div className="operator-header">
          <div>
            <div className="eyebrow">VOIDLINE</div>
            <h3>Operator</h3>
          </div>
          <button className="operator-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <p className="operator-subtext">Describe the build. I’ll route it.</p>

        <div className="operator-quick-row">
          {quickPrompts.map((prompt) => (
            <button key={prompt} className="chip" onClick={() => handleSend(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        <div className="operator-feed">
          {messages.map((message, index) => (
            <div key={index} className={`bubble ${message.startsWith("You:") ? "user" : "system"}`}>
              {message}
            </div>
          ))}
        </div>

        {stage !== "done" ? (
          <div className="operator-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type here..."
              className="operator-input"
            />
            <button onClick={() => handleSend()} className="send-btn" disabled={sending}>
              {sending ? "..." : "Send"}
            </button>
          </div>
        ) : (
          <div className="operator-finished">
            <button
              className="chip"
              onClick={() => {
                setMessages([
                  "Voidline Operator online.",
                  "Describe the build. I’ll route it."
                ]);
                setLead({});
                setStage("chat");
              }}
            >
              New Request
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
