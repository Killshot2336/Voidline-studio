const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);
revealItems.forEach((item) => observer.observe(item));

const headerLinks = document.querySelectorAll(".nav-links a, .btn, .contact-meta a, .footer-row a");
headerLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (!cursorGlow) return;
    cursorGlow.style.width = "390px";
    cursorGlow.style.height = "390px";
  });
  link.addEventListener("mouseleave", () => {
    if (!cursorGlow) return;
    cursorGlow.style.width = "320px";
    cursorGlow.style.height = "320px";
  });
});

const magneticItems = document.querySelectorAll(".magnetic");
magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});

const tiltCards = document.querySelectorAll(".tilt-card");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

const output = document.getElementById("terminalOutput");
const form = document.getElementById("assistantForm");
const input = document.getElementById("assistantInput");

let leadStep = "none";
const lead = { name: "", project: "", contact: "" };

function addLine(text, type = "assistant-line") {
  if (!output) return;
  const line = document.createElement("div");
  line.className = type;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function respond(message) {
  const msg = message.toLowerCase().trim();

  if (leadStep === "name") {
    lead.name = message.trim();
    leadStep = "project";
    return `Locked. What are you trying to build, ${lead.name}?`;
  }

  if (leadStep === "project") {
    lead.project = message.trim();
    leadStep = "contact";
    return "What is the best contact info to reach you at? Email or phone works.";
  }

  if (leadStep === "contact") {
    lead.contact = message.trim();
    leadStep = "none";
    const subject = encodeURIComponent(`Voidline lead: ${lead.name}`);
    const body = encodeURIComponent(
      `Name: ${lead.name}\nProject: ${lead.project}\nContact: ${lead.contact}\n\nSent from the Voidline portfolio operator.`
    );
    window.location.href = `mailto:voidline.studio.dev@gmail.com?subject=${subject}&body=${body}`;
    return "Lead packet ready. Your email app should open now so this can be sent directly to Voidline.";
  }

  if (msg.includes("build") || msg.includes("start a project") || msg.includes("need a website") || msg.includes("need an app")) {
    leadStep = "name";
    return "Good. Let's move. What is your name?";
  }

  if (msg.includes("what do you build") || msg.includes("services") || msg.includes("offer") || msg.includes("can you build")) {
    return "Voidline builds high-performance websites, custom web apps, automation systems, dashboards, lead workflows, and interactive digital products.";
  }

  if (msg.includes("website") || msg.includes("site")) {
    return "Yes. Voidline builds high-end websites for businesses, portfolios, landing pages, and branded front-end experiences designed to look expensive and convert.";
  }

  if (msg.includes("app") || msg.includes("dashboard") || msg.includes("tool")) {
    return "Yes. Voidline can build browser-based apps, dashboards, utilities, and custom workflow tools with real logic and usable structure.";
  }

  if (msg.includes("automation") || msg.includes("system")) {
    return "Voidline builds systems that organize information, reduce manual work, route leads, and support cleaner business workflow.";
  }

  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much")) {
    return "Pricing depends on scope, but Voidline is positioned for serious builds rather than throwaway work. Use the contact section or start a project in this operator for exact discussion.";
  }

  if (msg.includes("certification") || msg.includes("certiport") || msg.includes("credentials")) {
    return "Voidline is backed by 7 IT Specialist certifications — Cybersecurity, Networking, Network Security, Cloud Computing, Software Development, Java, and Python — plus CyberPatriot XVIII Semifinal Round qualification.";
  }

  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
    return "Call or text 945-308-5157, or email voidline.studio.dev@gmail.com.";
  }

  if (msg.includes("help")) {
    return "Try asking: what do you build, can you build websites, apps, automation, certifications, price, or start a project.";
  }

  return `Voidline specializes in premium websites, custom web apps, automation systems, and interactive builds. If you're asking about "${message}", there is a strong chance it fits inside that range.`;
}

if (form && input) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addLine(`> ${value}`, "user-line");
    const reply = respond(value);
    addLine(reply, "assistant-line");
    input.value = "";
  });
}
