import Operator from "./components/Operator";
import TimeTheme from "./components/TimeTheme";

const systems = [
  {
    title: "Elite Roofing",
    desc: "High-conversion roofing website built to turn traffic into booked inspections and real revenue.",
    tags: ["Lead generation", "Conversion-focused", "Mobile optimized"]
  },
  {
    title: "Cyber Arena",
    desc: "Interactive cybersecurity training platform designed for speed, accuracy, and pressure-tested performance.",
    tags: ["Training system", "Competition-ready", "Real-time interaction"]
  },
  {
    title: "NULLNET",
    desc: "System-driven interactive platform built for depth, engagement, and long-term scalability.",
    tags: ["Advanced systems", "Replayability", "High-retention design"]
  }
];

const certGroups = [
  {
    title: "Development",
    items: [
      "IT Specialist: Software Development",
      "IT Specialist: Java",
      "IT Specialist: Python"
    ]
  },
  {
    title: "Infrastructure",
    items: [
      "IT Specialist: Networking",
      "IT Specialist: Network Security",
      "IT Specialist: Cloud Computing"
    ]
  },
  {
    title: "Security",
    items: ["IT Specialist: Cybersecurity"]
  },
  {
    title: "Competition",
    items: ["CyberPatriot XVIII Semifinal Round Qualifier"]
  }
];

export default function Home() {
  return (
    <main className="site-shell">
      <TimeTheme />
      <div className="ambient-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="scanline" />

      <section className="hero section">
        <div className="eyebrow">PRIVATE SYSTEMS / HIGH-PERFORMANCE BUILDS</div>
        <h1>VOIDLINE</h1>
        <h2>Precision-Built Systems. Ruthless Performance.</h2>
        <p className="hero-copy">
          Voidline builds high-performance websites, applications, and automation systems engineered to convert,
          scale, and operate cleanly under pressure.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#systems">View Systems</a>
          <a className="btn btn-secondary" href="#access">Start a Project</a>
        </div>

        <div className="proof-strip">
          <span>Built for performance, not decoration.</span>
          <span>Certified across software, infrastructure, and cybersecurity.</span>
          <span>Designed to convert, scale, and hold up under pressure.</span>
        </div>
      </section>

      <section id="systems" className="section">
        <div className="section-head">
          <div className="eyebrow">SELECTED SYSTEMS</div>
          <h3>Selected Systems</h3>
        </div>

        <div className="card-grid">
          {systems.map((system) => (
            <article key={system.title} className="card">
              <div className="card-topline">SYSTEM / ACTIVE</div>
              <h4>{system.title}</h4>
              <p>{system.desc}</p>
              <div className="tag-row">
                {system.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="eyebrow">CAPABILITIES</div>
          <h3>What Voidline Builds</h3>
        </div>

        <div className="split-panel">
          <ul className="clean-list">
            <li>High-conversion websites</li>
            <li>Full-stack web applications</li>
            <li>Automation systems and workflows</li>
            <li>Custom dashboards and tools</li>
          </ul>
          <ul className="clean-list">
            <li>Payment and lead systems</li>
            <li>Advanced UI and interaction design</li>
            <li>Performance optimization</li>
            <li>Interactive digital experiences</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="eyebrow">CREDENTIALS</div>
          <h3>Verified Across Development, Infrastructure, and Security</h3>
        </div>

        <p className="section-copy">
          Certified across software, infrastructure, and cybersecurity systems. Proven under competition.
        </p>

        <div className="credential-grid">
          {certGroups.map((group) => (
            <article key={group.title} className="card compact">
              <div className="card-topline">{group.title.toUpperCase()}</div>
              <ul className="clean-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="eyebrow">OVERVIEW</div>
          <h3>Built Around Performance</h3>
        </div>

        <div className="overview-panel">
          <p>
            Voidline is built around one standard: performance. Every system is designed with intent—whether the goal
            is generating leads, reducing friction, improving workflows, or delivering a sharper user experience.
          </p>
          <p>
            The result is simple: fast builds, clean execution, and systems that do their job without breaking under
            pressure.
          </p>
        </div>
      </section>

      <section id="access" className="section">
        <div className="section-head">
          <div className="eyebrow">ACCESS</div>
          <h3>Let’s Build Something Serious</h3>
        </div>

        <div className="access-panel">
          <div>
            <div className="access-label">Call / Text</div>
            <a href="tel:9453085157" className="access-value">945-308-5157</a>
          </div>
          <div>
            <div className="access-label">Email</div>
            <a href="mailto:voidline.studio.dev@gmail.com" className="access-value">voidline.studio.dev@gmail.com</a>
          </div>
          <div>
            <div className="access-label">Response Window</div>
            <div className="access-value">24–48 hours</div>
          </div>
          <div>
            <div className="access-label">Base</div>
            <div className="access-value">Fort Worth, TX</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-mark">VOIDLINE</div>
        <div className="footer-copy">Private systems, high-performance builds, and controlled execution.</div>
        <div className="footer-meta">© 2026 Voidline. All rights reserved.</div>
      </footer>

      <Operator />
    </main>
  );
}
