import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../mocks/image/login.jpg";

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .vvs-root { font-family: 'DM Sans', sans-serif; }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.35; transform: scale(0.7); }
  }
  @keyframes scanline {
    0%   { top: -4px; }
    100% { top: 102%; }
  }
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes borderGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(3,83,164,0); }
    50%       { box-shadow: 0 0 0 3px rgba(3,83,164,0.12); }
  }
  @keyframes slideInCard {
    from { opacity: 0; transform: translateY(22px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .anim-slideUp   { animation: slideUp 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fadeIn    { animation: fadeIn 0.55s ease both; }
  .anim-fadeSlide { animation: fadeSlideIn 0.5s cubic-bezier(.22,1,.36,1) both; }
  .anim-card      { animation: slideInCard 0.55s cubic-bezier(.22,1,.36,1) both; }

  .d0 { animation-delay: 0s; }
  .d1 { animation-delay: 0.1s; }
  .d2 { animation-delay: 0.2s; }
  .d3 { animation-delay: 0.3s; }
  .d4 { animation-delay: 0.42s; }
  .d5 { animation-delay: 0.54s; }

  .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

  .scanline-wrap { position: relative; overflow: hidden; }
  .scanline-wrap::after {
    content: ''; position: absolute;
    left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent 0%, rgba(185,214,242,0.38) 50%, transparent 100%);
    animation: scanline 5s linear infinite;
    pointer-events: none; z-index: 2;
  }

  .glass-card {
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(3,83,164,0.15);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .glass-card:hover {
    box-shadow: 0 20px 60px rgba(3,83,164,0.13);
  }

  .feature-card {
    background: rgba(255,255,255,0.6);
    border: 1px solid rgba(3,83,164,0.12);
    border-radius: 16px;
    padding: 16px;
    transition: all 0.25s ease;
    cursor: default;
  }
  .feature-card:hover {
    background: #eef4fb;
    border-color: rgba(3,83,164,0.3);
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(3,83,164,0.11);
  }

  .stat-tile {
    background: rgba(255,255,255,0.09);
    border: 1px solid rgba(185,214,242,0.14);
    border-radius: 12px;
    padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
    transition: background 0.22s ease;
  }
  .stat-tile:hover { background: rgba(3,83,164,0.22); }

  .login-role-btn {
    width: 100%;
    background: rgba(255,255,255,0.7);
    border: 1.5px solid rgba(3,83,164,0.18);
    border-radius: 14px;
    padding: 15px 18px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer; text-align: left;
    transition: all 0.22s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .login-role-btn:hover {
    background: #eef4fb;
    border-color: #0353A4;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(3,83,164,0.14);
  }
  .login-role-btn:active { transform: scale(0.98); }

  .btn-primary {
    position: relative; overflow: hidden;
    background: #0353A4; color: white;
    border: none; border-radius: 10px;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-weight: 600; transition: all 0.22s ease;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 50%, transparent 100%);
    background-size: 600px 100%; opacity: 0; transition: opacity 0.3s;
  }
  .btn-primary:hover::after { opacity: 1; animation: shimmer 0.9s ease; }
  .btn-primary:hover { background: #003559; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(3,83,164,0.38); }
  .btn-primary:active { transform: scale(0.97); }

  .nav-link {
    position: relative; background: none; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
    height: 2px; background: #B9D6F2;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.25s ease; border-radius: 2px;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  .orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
  .orb-1 { width: 340px; height: 340px; background: radial-gradient(circle, rgba(3,83,164,0.16) 0%, transparent 70%); top: -90px; right: -90px; animation: floatOrb 7s ease-in-out infinite; }
  .orb-2 { width: 220px; height: 220px; background: radial-gradient(circle, rgba(0,109,170,0.13) 0%, transparent 70%); bottom: 50px; left: -70px; animation: floatOrb 9s ease-in-out infinite reverse; }
  .orb-3 { width: 150px; height: 150px; background: radial-gradient(circle, rgba(185,214,242,0.28) 0%, transparent 70%); top: 42%; right: 8%; animation: floatOrb 6s ease-in-out infinite 2s; }

  .ring-rotate     { animation: rotateSlow 20s linear infinite; }
  .ring-rotate-rev { animation: rotateSlow 26s linear infinite reverse; }

  .grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(185,214,242,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(185,214,242,0.05) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(3,83,164,0.18), transparent); margin: 16px 0; }

  .badge-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(3,83,164,0.28); border: 1px solid rgba(185,214,242,0.25);
    border-radius: 20px; padding: 4px 12px;
    font-size: 10px; font-weight: 700; color: #B9D6F2;
    letter-spacing: 0.1em; text-transform: uppercase;
  }

  .tag-chip {
    display: inline-flex; align-items: center;
    background: rgba(185,214,242,0.1); border: 1px solid rgba(185,214,242,0.18);
    border-radius: 8px; padding: 3px 9px;
    font-size: 9.5px; color: rgba(185,214,242,0.7); font-weight: 600;
  }

  .contact-row { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 12px; transition: background 0.18s ease; }
  .contact-row:hover { background: #eef4fb; }
  .contact-row a { color: #0353A4; text-decoration: none; font-weight: 600; font-size: 13px; }
  .contact-row a:hover { text-decoration: underline; }

  .step-node { position: absolute; left: 0; top: 1px; width: 20px; height: 20px; border-radius: 6px; background: rgba(3,83,164,0.1); border: 1.5px solid rgba(3,83,164,0.25); display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; color: #0353A4; }
  .step-connector { position: absolute; left: 9px; top: 22px; bottom: -8px; width: 1px; background: linear-gradient(to bottom, rgba(3,83,164,0.25), transparent); }
`;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function AccentBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <div style={{ width: 44, height: 3, borderRadius: 2, background: "#0353A4" }} />
      <div style={{ width: 14, height: 3, borderRadius: 2, background: "#B9D6F2" }} />
      <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(3,83,164,0.28)" }} />
    </div>
  );
}

function PulseDot({ color = "#4ade80", size = 7 }) {
  return <span className="pulse-dot" style={{ width: size, height: size, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />;
}

/* ─────────────────────────────────────────────
   Help Card
───────────────────────────────────────────── */
function HelpCard({ onBack }) {
  const contacts = [
    { icon: "📞", bg: "rgba(3,83,164,0.10)",  label: "Helpdesk Hotline", value: "+91 1800-111-950",  sub: "Toll-free · Mon–Sat, 9 AM – 6 PM",             href: "tel:+911800111950" },
    { icon: "📧", bg: "rgba(0,109,170,0.10)", label: "Email Support",    value: "support@eci.gov.in", sub: "Response within 24 hours",                     href: "mailto:support@eci.gov.in" },
    { icon: "🌐", bg: "rgba(3,83,164,0.08)",  label: "Official Website", value: "eci.gov.in",         sub: "Manuals, FAQs & updates",                      href: "https://eci.gov.in" },
    { icon: "📍", bg: "rgba(0,109,170,0.08)", label: "District Office",  value: "Contact your DEO",   sub: "District Election Officer for on-ground support", href: null },
  ];
  return (
    <div className="glass-card anim-card rounded-2xl shadow-2xl w-full" style={{ maxWidth: 440, background: "rgba(235,243,251,0.92)", padding: "28px 26px" }}>
      <div className="anim-slideUp d1">
        <AccentBar />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", margin: "10px 0 4px" }}>Help &amp; Support</h2>
        <p style={{ fontSize: 12.5, color: "#4B6080", lineHeight: 1.65, marginBottom: 18 }}>Facing an issue? Reach out to the Election Commission through any channel below.</p>
      </div>
      <div className="divider" />
      <div className="anim-slideUp d2" style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 14 }}>
        {contacts.map((c, i) => (
          <div key={i} className="contact-row">
            <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: c.bg, border: "1px solid rgba(3,83,164,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, color: "#8096B0", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 2, textTransform: "uppercase" }}>{c.label}</div>
              {c.href ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{c.value}</a> : <span style={{ color: "#061A40", fontWeight: 600, fontSize: 13 }}>{c.value}</span>}
              <div style={{ fontSize: 11, color: "#9BAABB", marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="anim-slideUp d3" style={{ background: "rgba(3,83,164,0.06)", border: "1px solid rgba(3,83,164,0.13)", borderRadius: 12, padding: "11px 14px", marginBottom: 18, display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 15, flexShrink: 0 }}>🚨</span>
        <p style={{ fontSize: 11.5, color: "#374151", lineHeight: 1.6, margin: 0 }}>For <strong>polling day emergencies</strong> — outages or duplicate fraud — call the hotline immediately and notify your Presiding Officer.</p>
      </div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Sans',sans-serif" }}>
        ← Back to Home
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main
───────────────────────────────────────────── */
export default function Home() {
  const [view, setView] = useState("about");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = time.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  const panel = {
    about:   { badge: "SYSTEM ACTIVE", heading: <>One Person.<br /><span style={{ color: "#B9D6F2" }}>One Vote.</span></>,       sub: "Real-time duplicate vote detection powered by facial recognition technology." },
    welcome: { badge: "SECURE ACCESS",   heading: <>Select<br /><span style={{ color: "#B9D6F2" }}>Your Role</span></>,            sub: "Access your dashboard and manage booth operations with full confidence." },
    help:    { badge: "SUPPORT CENTRE",  heading: <>We're Here<br /><span style={{ color: "#B9D6F2" }}>to Help.</span></>,         sub: "Contact our helpdesk for technical support, access issues, or emergencies." },
  }[view];

  const stats = [
    { val: "142",  label: "Booths Active",     icon: "🏛️" },
    { val: "8.3K", label: "Verified Today",    icon: "✅" },
    { val: "17",   label: "Dupes Blocked",     icon: "🛡️" },
    { val: "99.8%",label: "System Uptime",     icon: "⚡" },
  ];

  const features = [
    { icon: "🪪", title: "Face Recognition",       desc: "Instant biometric matching against all registered voter records in milliseconds." },
    { icon: "🗳️", title: "One Person, One Vote",   desc: "Once verified, the system permanently flags the voter preventing any re-entry." },
    { icon: "⚡", title: "Real-Time Detection",     desc: "Cross-references every scan against the live voted registry instantly." },
    { icon: "🔒", title: "Officer Authentication", desc: "Only authorised election officers can access and operate verification terminals." },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="vvs-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(148deg, #EBF3FB 0%, #D6E9F8 50%, #C0D9F4 100%)" }}>

        {/* ══ NAVBAR ══ */}
        <nav style={{ background: "#061A40", boxShadow: "0 2px 28px rgba(6,26,64,0.55)", position: "relative", zIndex: 50 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 66 }}>

            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #0353A4 0%, #006DAA 100%)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 14px rgba(3,83,164,0.6)", flexShrink: 0 }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.95" />
                  <path d="M9 12l2 2 4-4" stroke="#061A40" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15.5, color: "white", letterSpacing: "0.02em", lineHeight: 1.15 }}>
                  Voter Verification System
                </div>
                <div style={{ fontSize: 9, color: "rgba(185,214,242,0.55)", letterSpacing: "0.1em", marginTop: 2 }}>
                  ELECTION COMMISSION OF INDIA · AI-POWERED DUPLICATE DETECTION
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Clock */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", background: "rgba(185,214,242,0.07)", border: "1px solid rgba(185,214,242,0.12)", borderRadius: 10, padding: "5px 13px", marginRight: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <PulseDot color="#4ade80" size={6} />
                  <span style={{ fontFamily: "monospace", fontSize: 13.5, color: "white", letterSpacing: "0.06em", fontWeight: 600 }}>{timeStr}</span>
                </div>
                <div style={{ fontSize: 9, color: "rgba(185,214,242,0.45)", letterSpacing: "0.04em", marginTop: 1 }}>{dateStr}</div>
              </div>

              <button className="nav-link" onClick={() => setView(view === "help" ? "about" : "help")} style={{ fontSize: 13, fontWeight: 500, padding: "8px 13px", borderRadius: 8, color: view === "help" ? "#B9D6F2" : "rgba(255,255,255,0.65)" }}>
                {view === "help" ? "← Home" : "Help"}
              </button>

              <button className="btn-primary" onClick={() => setView("welcome")} style={{ padding: "9px 24px", fontSize: 13.5, letterSpacing: "0.03em", borderRadius: 10 }}>
                Login →
              </button>
            </div>
          </div>
        </nav>

        {/* ══ MAIN ══ */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0, alignItems: "stretch" }}>

          {/* LEFT HERO */}
          <div className="scanline-wrap" style={{ background: "#003559", position: "relative", overflow: "hidden", minHeight: 560, display: "flex", alignItems: "flex-end" }}>
            <img src={homeImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(162deg, rgba(6,26,64,0.48) 0%, rgba(0,53,89,0.82) 55%, rgba(6,26,64,0.98) 100%)" }} />
            <div className="grid-bg" />
            <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

            {/* Decorative rings */}
            <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.07 }}>
              <svg width="170" height="170" viewBox="0 0 170 170" className="ring-rotate">
                <circle cx="85" cy="85" r="80" stroke="#B9D6F2" strokeWidth="1.5" strokeDasharray="8 5" fill="none" />
                <circle cx="85" cy="85" r="58" stroke="#B9D6F2" strokeWidth="1" strokeDasharray="5 8" fill="none" />
                <circle cx="85" cy="85" r="32" stroke="#B9D6F2" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
            <div style={{ position: "absolute", top: 68, right: 68, opacity: 0.05 }}>
              <svg width="82" height="82" viewBox="0 0 82 82" className="ring-rotate-rev">
                <circle cx="41" cy="41" r="38" stroke="#B9D6F2" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>
            </div>

            {/* Hero content */}
            <div style={{ position: "relative", zIndex: 10, padding: "0 44px 50px", width: "100%" }}>
              <div className="anim-slideUp d1" style={{ marginBottom: 16 }}>
                <span className="badge-pill"><PulseDot color="#4ade80" size={6} />{panel.badge}</span>
              </div>

              <h2 className="anim-slideUp d2" style={{ fontFamily: "'Syne',sans-serif", fontSize: 44, fontWeight: 800, color: "white", lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: 16 }}>
                {panel.heading}
              </h2>
              <AccentBar />
              <p className="anim-slideUp d3" style={{ color: "rgba(185,214,242,0.76)", fontSize: 13.5, lineHeight: 1.68, maxWidth: 300, fontStyle: "italic", marginTop: 10, marginBottom: 28 }}>
                {panel.sub}
              </p>

              {/* Stats grid */}
              <div className="anim-slideUp d4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {stats.map(({ val, label, icon }) => (
                  <div key={label} className="stat-tile">
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "white", lineHeight: 1.1 }}>{val}</div>
                      <div style={{ fontSize: 9.5, color: "rgba(185,214,242,0.55)", letterSpacing: "0.05em", marginTop: 1 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="anim-slideUp d5" style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {["Facial Recognition", "AES-256 Encrypted", "Real-Time", "ECI Certified"].map(t => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", background: "rgba(185,214,242,0.1)", overflow: "auto", position: "relative" }}>

            {/* HELP — centered card */}
            {view === "help" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "36px 44px", flex: 1 }}>
                <HelpCard onBack={() => setView("about")} />
              </div>
            )}

            {/* WELCOME / ROLE SELECT — centered card */}
            {view === "welcome" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "36px 44px", flex: 1 }}>
                <div key="welcome" className="glass-card anim-card rounded-2xl shadow-2xl w-full" style={{ maxWidth: 460, background: "rgba(235,243,251,0.92)", padding: "32px 28px" }}>
                  <div className="anim-slideUp d1">
                    <AccentBar />
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", margin: "10px 0 5px" }}>
                      Select Your Role
                    </h2>
                    <p style={{ color: "#4B6080", fontSize: 13, lineHeight: 1.6, marginBottom: 22 }}>
                      Choose your officer type to securely access your dashboard.
                    </p>
                  </div>
                  <div className="divider" />

                  <div className="anim-slideUp d2" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    <button type="button" className="login-role-btn" onClick={() => { window.location.href = "/login-data-entry"; }}>
                      <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg, #0353A4, #006DAA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0, boxShadow: "0 4px 14px rgba(3,83,164,0.32)" }}>📋</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14.5, fontWeight: 700, color: "#061A40", marginBottom: 3 }}>Data Entry Officer</div>
                        <div style={{ fontSize: 11.5, color: "#6B80A0" }}>Voter registration &amp; records management</div>
                      </div>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(3,83,164,0.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0353A4", fontSize: 15, flexShrink: 0 }}>→</div>
                    </button>

                    <button type="button" className="login-role-btn" onClick={() => { window.location.href = "/login"; }}>
                      <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg, #003559, #0353A4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0, boxShadow: "0 4px 14px rgba(0,53,89,0.32)" }}>🗳️</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14.5, fontWeight: 700, color: "#061A40", marginBottom: 3 }}>Booth Officer</div>
                        <div style={{ fontSize: 11.5, color: "#6B80A0" }}>Polling booth voter verification</div>
                      </div>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(3,83,164,0.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0353A4", fontSize: 15, flexShrink: 0 }}>→</div>
                    </button>
                  </div>

                  <div style={{ background: "rgba(3,83,164,0.05)", border: "1px solid rgba(3,83,164,0.12)", borderRadius: 11, padding: "11px 15px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 16 }}>🔐</span>
                    <p style={{ fontSize: 11, color: "#5A7090", lineHeight: 1.55, margin: 0 }}>
                      Secured with <strong style={{ color: "#0353A4" }}>AES-256 encryption</strong>. Authorised election officers only. All sessions are logged and audited.
                    </p>
                  </div>

                  <div className="divider" />
                  <button onClick={() => setView("about")} style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Sans',sans-serif" }}>
                    ← Back to Home
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT — fills the entire right panel */}
            {view === "about" && (
              <div key="about" className="anim-card" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "36px 44px", background: "transparent" }}>

                {/* Header */}
                <div className="anim-slideUp d1" style={{ marginBottom: 20 }}>
                  <AccentBar />
                  <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#061A40", letterSpacing: "-0.01em", margin: "10px 0 6px" }}>
                    About the System
                  </h2>
                  <p style={{ fontSize: 13, color: "#4B6080", lineHeight: 1.7, maxWidth: 520 }}>
                    The <strong style={{ color: "#061A40" }}>Voter Verification System</strong> uses real-time facial recognition and duplicate-detection to uphold electoral integrity across every polling booth in India.
                  </p>
                </div>

                <div className="divider" />

                {/* Feature 2×2 grid */}
                <div className="anim-slideUp d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                  {features.map(({ icon, title, desc }) => (
                    <div key={title} className="feature-card" style={{ borderRadius: 16, padding: "20px 18px" }}>
                      <div style={{ fontSize: 26, marginBottom: 11 }}>{icon}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "#0353A4", marginBottom: 5 }}>{title}</div>
                      <div style={{ fontSize: 12, color: "#5A7090", lineHeight: 1.55 }}>{desc}</div>
                    </div>
                  ))}
                </div>

                <div className="divider" />

                {/* Verification flow — horizontal steps */}
                <div className="anim-slideUp d3" style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#8096B0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Verification Flow</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                    {[
                      { n: "01", t: "Officer Logs In",  d: "Authenticated via secure credentials.", icon: "🔑" },
                      { n: "02", t: "Voter Face Scan",  d: "Camera captures biometric data.",        icon: "📷" },
                      { n: "03", t: "Registry Match",   d: "Cross-checks national voter database.",  icon: "🔍" },
                      { n: "04", t: "Vote Recorded",    d: "Duplicates blocked instantly.",           icon: "✅" },
                    ].map(({ n, t, d, icon }, i, arr) => (
                      <div key={n} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        {/* Connector line */}
                        {i < arr.length - 1 && (
                          <div style={{ position: "absolute", top: 20, left: "calc(50% + 20px)", right: "calc(-50% + 20px)", height: 1, background: "linear-gradient(90deg, rgba(3,83,164,0.25), rgba(3,83,164,0.08))", zIndex: 0 }} />
                        )}
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(3,83,164,0.09)", border: "1.5px solid rgba(3,83,164,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 8, position: "relative", zIndex: 1 }}>{icon}</div>
                        <div style={{ fontSize: 9, fontWeight: 800, color: "#0353A4", letterSpacing: "0.05em", marginBottom: 3 }}>{n}</div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#061A40", marginBottom: 3 }}>{t}</div>
                        <div style={{ fontSize: 10.5, color: "#7090B0", lineHeight: 1.4 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                {/* CTA footer — pushed to bottom */}
                <div className="anim-slideUp d5" style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingTop: 16, borderTop: "1px solid rgba(3,83,164,0.1)", gap: 10 }}>
                  <button onClick={() => setView("help")} style={{ background: "none", border: "none", cursor: "pointer", color: "#0353A4", fontSize: 12.5, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
                    ❓ Help
                  </button>
                  <button className="btn-primary" onClick={() => setView("welcome")} style={{ padding: "9px 24px", fontSize: 13, borderRadius: 10 }}>
                    Login →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer style={{ background: "#061A40", borderTop: "1px solid rgba(185,214,242,0.08)", padding: "13px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 22, height: 22, background: "rgba(3,83,164,0.45)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.9" /></svg>
            </div>
            <span style={{ fontSize: 11, color: "rgba(185,214,242,0.4)" }}>© 2026 Election Commission of India · Voter Verification System · v2.4.1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 11, color: "rgba(185,214,242,0.35)" }}>Powered by AI Biometrics</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(185,214,242,0.5)" }}>
              <PulseDot color="#4ade80" size={6} />All systems operational
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}