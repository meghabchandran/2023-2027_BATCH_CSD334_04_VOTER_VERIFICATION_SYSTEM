import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../mocks/image/login.jpg";

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  .vvs-root { font-family: 'DM Sans', sans-serif; }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.85); }
  }
  @keyframes scanline {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
  @keyframes dropdownOpen {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .animate-slideUp      { animation: slideUp 0.65s cubic-bezier(.22,1,.36,1) both; }
  .animate-fadeIn       { animation: fadeIn 0.5s ease both; }
  .animate-fadeSlideIn  { animation: fadeSlideIn 0.45s cubic-bezier(.22,1,.36,1) both; }
  .animate-dropdownOpen { animation: dropdownOpen 0.22s cubic-bezier(.22,1,.36,1) both; }

  .delay-1 { animation-delay: 0.08s; }
  .delay-2 { animation-delay: 0.16s; }
  .delay-3 { animation-delay: 0.24s; }
  .delay-4 { animation-delay: 0.32s; }

  .btn-primary {
    position: relative; overflow: hidden;
    transition: all 0.22s ease;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    background-size: 400px 100%; opacity: 0; transition: opacity 0.3s;
  }
  .btn-primary:hover::after { opacity: 1; animation: shimmer 0.8s ease; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(3,83,164,0.35); }
  .btn-primary:active { transform: scale(0.97); }

  .nav-link { position: relative; transition: color 0.2s; }
  .nav-link::after {
    content: ''; position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 1px; background: #B9D6F2;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.25s ease;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  .feature-row { transition: all 0.2s ease; }
  .feature-row:hover {
    background: rgba(3,83,164,0.06);
    border-radius: 10px;
    transform: translateX(4px);
  }

  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  .scanline-wrap { position: relative; overflow: hidden; }
  .scanline-wrap::after {
    content: ''; position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(185,214,242,0.5), transparent);
    animation: scanline 4s linear infinite;
    pointer-events: none;
  }

  .glass-card {
    background: rgba(255,255,255,0.38);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(3,83,164,0.18);
    transition: box-shadow 0.3s ease;
  }
  .glass-card:hover { box-shadow: 0 12px 40px rgba(3,83,164,0.12); }

  /* Login Dropdown */
  .login-dropdown {
    position: absolute; top: calc(100% + 8px); right: 0;
    min-width: 230px; background: #061A40;
    border: 1px solid rgba(185,214,242,0.18); border-radius: 12px;
    box-shadow: 0 16px 48px rgba(6,26,64,0.55);
    overflow: hidden; z-index: 100;
  }
  .login-role-btn {
    width: 100%; background: none; border: none; cursor: pointer;
    padding: 13px 16px; display: flex; align-items: center; gap: 12px;
    text-align: left; transition: background 0.18s ease;
    font-family: 'DM Sans', sans-serif;
    border-bottom: 1px solid rgba(185,214,242,0.08);
  }
  .login-role-btn:last-child { border-bottom: none; }
  .login-role-btn:hover { background: rgba(3,83,164,0.28); }
  .login-role-btn .role-label { font-size: 12.5px; font-weight: 700; color: white; letter-spacing: 0.01em; }
  .login-role-btn .role-sub   { font-size: 10px; color: rgba(185,214,242,0.6); margin-top: 1px; }
  .login-dropdown-arrow { display: inline-block; margin-left: 5px; transition: transform 0.2s ease; }
  .login-btn-open .login-dropdown-arrow { transform: rotate(180deg); }

  /* Contact row */
  .contact-row {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 14px; border-radius: 12px;
    transition: background 0.18s ease;
  }
  .contact-row:hover { background: rgba(3,83,164,0.06); }
  .contact-row a { color: #0353A4; text-decoration: none; font-weight: 600; font-size: 13px; }
  .contact-row a:hover { text-decoration: underline; }
`;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function AccentBar() {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div style={{ width: 36, height: 3, borderRadius: 2, background: "#0353A4" }} />
      <div style={{ width: 10, height: 3, borderRadius: 2, background: "#B9D6F2" }} />
    </div>
  );
}

function FeatureItem({ icon, title, desc, delay }) {
  return (
    <div className={`feature-row flex items-start gap-3 px-3 py-2.5 animate-fadeSlideIn ${delay}`}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(3,83,164,0.10)", border: "1px solid rgba(3,83,164,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#0353A4", marginBottom: 1, fontFamily: "'Syne', sans-serif" }}>{title}</p>
        <p style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── Login Dropdown ── */
function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const roles = [
    { icon: "📋", iconBg: "rgba(3,83,164,0.35)",  label: "Data Entry Officer", sub: "Voter registration & records", path: "/login-data-entry" },
    { icon: "🗳️", iconBg: "rgba(0,109,170,0.35)", label: "Booth Officer",       sub: "Polling booth verification",  path: "/login" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className={`btn-primary ${open ? "login-btn-open" : ""}`}
        onClick={() => setOpen(v => !v)}
        style={{ background: "#0353A4", color: "white", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 5 }}
      >
        Login
        <span className="login-dropdown-arrow" style={{ fontSize: 10 }}>▼</span>
      </button>

      {open && (
        <div className="login-dropdown animate-dropdownOpen">
          <div style={{ padding: "10px 14px 8px", fontSize: 10, color: "rgba(185,214,242,0.5)", letterSpacing: "0.1em", fontWeight: 600, borderBottom: "1px solid rgba(185,214,242,0.08)" }}>
            SELECT YOUR ROLE
          </div>
          {roles.map(role => (
            <button key={role.label} className="login-role-btn" onClick={() => { setOpen(false); navigate(role.path); }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: role.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                {role.icon}
              </div>
              <div>
                <div className="role-label">{role.label} Login</div>
                <div className="role-sub">{role.sub}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Help / Contact Card ── */
function HelpCard({ onBack }) {
  const contacts = [
    {
      icon: "📞",
      iconBg: "rgba(3,83,164,0.10)",
      label: "Helpdesk Hotline",
      value: "+91 1800-111-950",
      sub: "Toll-free · Mon–Sat, 9 AM – 6 PM",
      href: "tel:+911800111950",
    },
    {
      icon: "📧",
      iconBg: "rgba(0,109,170,0.10)",
      label: "Email Support",
      value: "support@eci.gov.in",
      sub: "Response within 24 hours",
      href: "mailto:support@eci.gov.in",
    },
    {
      icon: "🌐",
      iconBg: "rgba(3,83,164,0.08)",
      label: "Official Website",
      value: "eci.gov.in",
      sub: "Manuals, FAQs & updates",
      href: "https://eci.gov.in",
    },
    {
      icon: "📍",
      iconBg: "rgba(0,109,170,0.08)",
      label: "District Office",
      value: "Contact your DEO",
      sub: "District Election Officer for on-ground support",
      href: null,
    },
  ];

  return (
    <div key="help" className="glass-card animate-fadeIn rounded-2xl shadow-xl w-full max-w-md p-7"
      style={{ background: "rgba(227,242,253,0.75)" }}
    >
      <div className="animate-slideUp delay-1">
        <AccentBar />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", margin: "8px 0 4px" }}>
          Help &amp; Support
        </h2>
        <p style={{ fontSize: 12.5, color: "#4B5563", lineHeight: 1.65, marginBottom: 20 }}>
          Facing an issue? Reach out to the Election Commission support team through any of the channels below.
        </p>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(3,83,164,0.2), transparent)", marginBottom: 10 }} />

      {/* Contact rows */}
      <div className="animate-slideUp delay-2" style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 18 }}>
        {contacts.map((c, i) => (
          <div key={i} className="contact-row">
            <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: c.iconBg, border: "1px solid rgba(3,83,164,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {c.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#8096B0", fontWeight: 600, letterSpacing: "0.07em", marginBottom: 2, textTransform: "uppercase" }}>
                {c.label}
              </div>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {c.value}
                </a>
              ) : (
                <span style={{ color: "#061A40", fontWeight: 600, fontSize: 13 }}>{c.value}</span>
              )}
              <div style={{ fontSize: 11, color: "#9BAABB", marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(3,83,164,0.1)", marginBottom: 14 }} />

      {/* Emergency notice */}
      <div className="animate-slideUp delay-3"
        style={{ background: "rgba(3,83,164,0.06)", border: "1px solid rgba(3,83,164,0.14)", borderRadius: 10, padding: "11px 14px", marginBottom: 18, display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>🚨</span>
        <p style={{ fontSize: 11.5, color: "#374151", lineHeight: 1.55, margin: 0 }}>
          For <strong>polling day emergencies</strong> such as system outages or duplicate vote fraud, call the hotline immediately and notify your Presiding Officer.
        </p>
      </div>

      {/* Footer */}
      <div className="animate-slideUp delay-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif" }}
        >
          ← Back to Home
        </button>
        <LoginDropdown />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function Home() {
  // view: "welcome" | "about" | "help"
  const [view, setView] = useState("welcome");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const leftPanelText = {
    welcome: { badge: "SYSTEM ACTIVE",    heading: <>One Person.<br /><span style={{ color: "#B9D6F2" }}>One Vote.</span></>,       sub: "Real-time duplicate vote detection powered by facial recognition technology." },
    about:   { badge: "SYSTEM OVERVIEW",  heading: <>How the<br /><span style={{ color: "#B9D6F2" }}>System Works</span></>,         sub: "Biometric-grade facial recognition ensures every voice counts — exactly once." },
    help:    { badge: "SUPPORT CENTRE",   heading: <>We&apos;re here<br /><span style={{ color: "#B9D6F2" }}>to Help.</span></>,      sub: "Contact our helpdesk for technical support, access issues, or on-ground emergencies." },
  };
  const panel = leftPanelText[view];

  return (
    <>
      <style>{styles}</style>

      <div className="vvs-root min-h-screen flex flex-col"
        style={{ background: "linear-gradient(135deg, #EBF3FB 0%, #D6E9F8 50%, #B9D6F2 100%)" }}
      >
        {/* ── NAVBAR ── */}
        <nav style={{ background: "#061A40", boxShadow: "0 2px 20px rgba(6,26,64,0.4)", position: "relative", zIndex: 30 }}
          className="px-6 md:px-10 py-0 flex justify-between items-stretch"
        >
          <div className="flex items-center gap-3 py-4">
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #0353A4, #006DAA)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(3,83,164,0.5)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.95" />
                <path d="M9 12l2 2 4-4" stroke="#061A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "white", letterSpacing: "0.02em", lineHeight: 1.1 }}>
                Voter Verification System
              </h1>
              <p style={{ fontSize: 10, color: "#B9D6F2", letterSpacing: "0.08em", marginTop: 1 }}>REAL-TIME DUPLICATE DETECTION</p>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Live clock */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(185,214,242,0.08)", border: "1px solid rgba(185,214,242,0.15)", borderRadius: 8, padding: "4px 10px", marginRight: 8 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#B9D6F2", letterSpacing: "0.05em" }}>{timeStr}</span>
            </div>

            <button onClick={() => setView(view === "about" ? "welcome" : "about")} className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer", color: view === "about" ? "#B9D6F2" : "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, padding: "8px 12px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif" }}
            >
              {view === "about" ? "← Home" : "About"}
            </button>

            <LoginDropdown />

            <button onClick={() => setView(view === "help" ? "welcome" : "help")} className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer", color: view === "help" ? "#B9D6F2" : "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 400, padding: "8px 12px", fontFamily: "'DM Sans', sans-serif" }}
            >
              {view === "help" ? "← Home" : "Help"}
            </button>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <div className="flex-1 grid md:grid-cols-2" style={{ minHeight: 0 }}>

          {/* LEFT: Image Panel */}
          <div className="hidden md:flex scanline-wrap relative items-end justify-start overflow-hidden"
            style={{ background: "#003559", minHeight: 500 }}
          >
            <img src={homeImage} alt="Voter Verification"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(6,26,64,0.55) 0%, rgba(0,53,89,0.85) 60%, rgba(6,26,64,0.97) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(185,214,242,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(185,214,242,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10 px-10 pb-12 animate-slideUp">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(3,83,164,0.3)", border: "1px solid rgba(185,214,242,0.25)", borderRadius: 20, padding: "4px 12px", marginBottom: 16 }}>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                <span style={{ fontSize: 10, color: "#B9D6F2", letterSpacing: "0.12em", fontWeight: 600 }}>{panel.badge}</span>
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 12 }}>
                {panel.heading}
              </h2>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: "#0353A4", marginBottom: 8 }} />
              <p style={{ color: "rgba(185,214,242,0.75)", fontSize: 13, lineHeight: 1.6, maxWidth: 280, fontStyle: "italic" }}>{panel.sub}</p>

              <div style={{ position: "absolute", top: -40, right: -20, opacity: 0.12 }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="58" stroke="#B9D6F2" strokeWidth="2" strokeDasharray="6 4" />
                  <circle cx="60" cy="60" r="40" stroke="#B9D6F2" strokeWidth="1.5" strokeDasharray="4 6" />
                  <circle cx="60" cy="60" r="20" stroke="#B9D6F2" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Card Panel */}
          <div className="flex items-center justify-center p-6 md:p-10" style={{ background: "rgba(185,214,242,0.15)" }}>

            {/* HELP CARD */}
            {view === "help" && <HelpCard onBack={() => setView("welcome")} />}

            {/* ABOUT CARD */}
            {view === "about" && (
              <div key="about" className="glass-card animate-fadeIn rounded-2xl shadow-xl w-full max-w-md p-7"
                style={{ background: "rgba(227,242,253,0.75)" }}
              >
                <div className="animate-slideUp delay-1">
                  <AccentBar />
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", margin: "8px 0 4px" }}>
                    About the System
                  </h2>
                  <p style={{ fontSize: 12.5, color: "#4B5563", lineHeight: 1.65, marginBottom: 20 }}>
                    The <span style={{ fontWeight: 700, color: "#061A40" }}>Voter Verification System with Real-Time Duplicate Vote Detection</span> utilizes facial recognition technology to maintain electoral integrity across all booths.
                  </p>
                </div>
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(3,83,164,0.2), transparent)", marginBottom: 16 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 20 }}>
                  <FeatureItem delay="delay-1" icon="🪪" title="Face Recognition"             desc="Instant biometric matching to identify the voter against registered records." />
                  <FeatureItem delay="delay-2" icon="🗳️" title="One Person, One Vote"          desc="Once a face is logged as voted, the system permanently prevents re-entry." />
                  <FeatureItem delay="delay-3" icon="⚡" title="Real-Time Duplicate Detection"  desc="Cross-references every scan against the live voted registry instantly." />
                  <FeatureItem delay="delay-4" icon="🔒" title="Officer Authentication"         desc="Only authorized election officers can access and operate the verification terminal." />
                </div>
                <div style={{ height: 1, background: "rgba(3,83,164,0.1)", marginBottom: 16 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button onClick={() => setView("welcome")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ← Back to Home
                  </button>
                  <LoginDropdown />
                </div>
              </div>
            )}

            {/* WELCOME CARD */}
            {view === "welcome" && (
              <div key="welcome" className="glass-card animate-fadeIn rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="animate-slideUp delay-1">
                  <AccentBar />
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", marginBottom: 6, marginTop: 8 }}>
                    Welcome Back
                  </h2>
                  <p style={{ color: "#4B6080", fontSize: 13, lineHeight: 1.65, marginBottom: 28 }}>
                    Secure access point for election officers to manage booth operations and verify voter identities in real-time.
                  </p>
                </div>

                {/* Stats */}
                <div className="animate-slideUp delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
                  {[{ label: "Booths Active", val: "142" }, { label: "Verified Today", val: "8.3K" }, { label: "Duplicates Blocked", val: "17" }].map(({ label, val }) => (
                    <div key={label} style={{ background: "rgba(3,83,164,0.06)", border: "1px solid rgba(3,83,164,0.12)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#0353A4" }}>{val}</div>
                      <div style={{ fontSize: 10, color: "#6B7E99", marginTop: 2, letterSpacing: "0.04em" }}>{label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: "rgba(3,83,164,0.1)", marginBottom: 24 }} />

                {/* Two login buttons */}
                <div className="animate-slideUp delay-3">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button className="btn-primary" onClick={() => navigate("/login-data-entry")}
                      style={{ width: "100%", background: "#0353A4", color: "white", border: "none", borderRadius: 10, padding: "13px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ fontSize: 18 }}>📋</span>
                      <div style={{ textAlign: "left" }}>
                        <div>Data Entry Officer Login</div>
                        <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.75, fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>Voter registration &amp; records</div>
                      </div>
                      <span style={{ marginLeft: "auto", opacity: 0.7, fontSize: 14 }}>→</span>
                    </button>

                    <button className="btn-primary" onClick={() => navigate("/login")}
                      style={{ width: "100%", background: "#0353A4", color: "white", border: "none", borderRadius: 10, padding: "13px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ fontSize: 18 }}>🗳️</span>
                      <div style={{ textAlign: "left" }}>
                        <div>Booth Officer Login</div>
                        <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.65, fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>Polling booth verification</div>
                      </div>
                      <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: 14 }}>→</span>
                    </button>
                  </div>
                  <p style={{ textAlign: "center", fontSize: 11, color: "#8096B0", marginTop: 10 }}>
                    Authorized election officers only · Secured with end-to-end encryption
                  </p>
                </div>

                <div className="animate-slideUp delay-4" style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(3,83,164,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button onClick={() => setView("about")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Learn how the system works →
                  </button>
                  <button onClick={() => setView("help")}
                    style={{ background: "rgba(3,83,164,0.07)", border: "1px solid rgba(3,83,164,0.18)", cursor: "pointer", color: "#0353A4", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", borderRadius: 8, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, transition: "background 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(3,83,164,0.13)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(3,83,164,0.07)"; }}
                  >
                    ❓ Need Help?
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: "rgba(6,26,64,0.06)", borderTop: "1px solid rgba(3,83,164,0.12)", padding: "12px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#7090B0" }}>© 2026 Election Commission · Voter Verification System</span>
          <span style={{ fontSize: 11, color: "#7090B0", display: "flex", alignItems: "center", gap: 6 }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            All systems operational
          </span>
        </footer>
      </div>
    </>
  );
}