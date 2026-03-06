import { useState, useEffect } from "react";
import homeImage from "../mocks/image/login.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; overflow-x: hidden; }
  .vvs-root { font-family: 'DM Sans', sans-serif; }

  @keyframes slideUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer   { 0% { background-position:-600px 0; } 100% { background-position:600px 0; } }
  @keyframes pulseDot  { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.35; transform:scale(0.7); } }
  @keyframes scanline  { 0%{ top:-4px; } 100%{ top:102%; } }
  @keyframes floatOrb  { 0%,100%{ transform:translateY(0) scale(1); } 50%{ transform:translateY(-18px) scale(1.04); } }
  @keyframes rotateSlow{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
  @keyframes slideInCard{ from{ opacity:0; transform:translateY(22px) scale(0.98); } to{ opacity:1; transform:translateY(0) scale(1); } }

  .anim-slideUp { animation: slideUp 0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-card    { animation: slideInCard 0.55s cubic-bezier(.22,1,.36,1) both; }
  .d1{animation-delay:0.1s} .d2{animation-delay:0.2s} .d3{animation-delay:0.3s}
  .d4{animation-delay:0.42s} .d5{animation-delay:0.54s}

  .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

  .scanline-wrap { position:relative; overflow:hidden; }
  .scanline-wrap::after {
    content:''; position:absolute; left:0; right:0; height:3px;
    background:linear-gradient(90deg,transparent,rgba(185,214,242,0.38),transparent);
    animation:scanline 5s linear infinite; pointer-events:none; z-index:2;
  }

  .glass-card {
    background:rgba(255,255,255,0.55);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(3,83,164,0.15);
    transition:box-shadow 0.3s ease;
  }

  .feature-card {
    background:rgba(255,255,255,0.6); border:1px solid rgba(3,83,164,0.12);
    border-radius:14px; padding:14px; transition:all 0.25s ease; cursor:default;
  }
  .feature-card:hover {
    background:#eef4fb; border-color:rgba(3,83,164,0.3);
    transform:translateY(-3px); box-shadow:0 10px 28px rgba(3,83,164,0.11);
  }

  .stat-tile {
    background:rgba(255,255,255,0.09); border:1px solid rgba(185,214,242,0.14);
    border-radius:10px; padding:10px 12px;
    display:flex; align-items:center; gap:8px; transition:background 0.22s ease;
  }
  .stat-tile:hover { background:rgba(3,83,164,0.22); }

  .login-role-btn {
    width:100%; background:rgba(255,255,255,0.7); border:1.5px solid rgba(3,83,164,0.18);
    border-radius:12px; padding:11px 14px; display:flex; align-items:center; gap:12px;
    cursor:pointer; text-align:left; transition:all 0.22s ease; font-family:'DM Sans',sans-serif;
  }
  .login-role-btn:hover {
    background:#eef4fb; border-color:#0353A4;
    transform:translateY(-2px); box-shadow:0 8px 28px rgba(3,83,164,0.14);
  }
  .login-role-btn:active { transform:scale(0.98); }

  .btn-primary {
    position:relative; overflow:hidden; background:#0353A4; color:white;
    border:none; border-radius:10px; cursor:pointer; font-family:'DM Sans',sans-serif;
    font-weight:600; transition:all 0.22s ease;
  }
  .btn-primary::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.13),transparent);
    background-size:600px 100%; opacity:0; transition:opacity 0.3s;
  }
  .btn-primary:hover::after { opacity:1; animation:shimmer 0.9s ease; }
  .btn-primary:hover { background:#003559; transform:translateY(-1px); box-shadow:0 8px 28px rgba(3,83,164,0.38); }
  .btn-primary:active { transform:scale(0.97); }

  .nav-link {
    position:relative; background:none; border:none;
    cursor:pointer; font-family:'DM Sans',sans-serif; transition:color 0.2s;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:-3px; left:0; right:0;
    height:2px; background:#B9D6F2; transform:scaleX(0); transform-origin:left;
    transition:transform 0.25s ease; border-radius:2px;
  }
  .nav-link:hover::after { transform:scaleX(1); }

  .orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }
  .orb-1 { width:300px; height:300px; background:radial-gradient(circle,rgba(3,83,164,0.16) 0%,transparent 70%); top:-80px; right:-80px; animation:floatOrb 7s ease-in-out infinite; }
  .orb-2 { width:200px; height:200px; background:radial-gradient(circle,rgba(0,109,170,0.13) 0%,transparent 70%); bottom:40px; left:-60px; animation:floatOrb 9s ease-in-out infinite reverse; }
  .orb-3 { width:130px; height:130px; background:radial-gradient(circle,rgba(185,214,242,0.28) 0%,transparent 70%); top:42%; right:8%; animation:floatOrb 6s ease-in-out infinite 2s; }

  .ring-rotate     { animation:rotateSlow 20s linear infinite; }
  .ring-rotate-rev { animation:rotateSlow 26s linear infinite reverse; }

  .grid-bg {
    position:absolute; inset:0; pointer-events:none;
    background-image:linear-gradient(rgba(185,214,242,0.05) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(185,214,242,0.05) 1px,transparent 1px);
    background-size:44px 44px;
  }

  .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(3,83,164,0.18),transparent); margin:10px 0; }

  .badge-pill {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(3,83,164,0.28); border:1px solid rgba(185,214,242,0.25);
    border-radius:20px; padding:4px 12px; font-size:10px; font-weight:700;
    color:#B9D6F2; letter-spacing:0.1em; text-transform:uppercase;
  }
  .tag-chip {
    display:inline-flex; align-items:center;
    background:rgba(185,214,242,0.1); border:1px solid rgba(185,214,242,0.18);
    border-radius:8px; padding:3px 9px; font-size:9.5px; color:rgba(185,214,242,0.7); font-weight:600;
  }

  .contact-row { display:flex; align-items:center; gap:12px; padding:9px 10px; border-radius:10px; transition:background 0.18s ease; }
  .contact-row:hover { background:#eef4fb; }
  .contact-row a { color:#0353A4; text-decoration:none; font-weight:600; font-size:13px; }
  .contact-row a:hover { text-decoration:underline; }

  /* ═══ LAYOUT ═══ */
  .main-grid {
    flex:1; display:grid; grid-template-columns:1fr 1fr; min-height:0; align-items:stretch;
  }
  .stats-grid    { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
  .feature-grid  { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; }
  .flow-grid     { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
  .hero-heading  { font-size:42px; }
  .about-heading { font-size:23px; }
  .right-panel-inner { padding:28px 36px; }
  .welcome-outer { padding:14px 36px; }
  .nav-subtitle  { display:block; }
  .nav-clock     { display:flex; }
  .footer-right  { display:flex; }
  .footer-right-alt { display:none; }

  /* ═══ TABLET ≤1024px ═══ */
  @media (max-width:1024px) {
    .hero-heading  { font-size:32px; }
    .about-heading { font-size:19px; }
    .right-panel-inner { padding:20px 22px; }
    .welcome-outer     { padding:10px 22px; }
    .nav-subtitle  { display:none; }
    .nav-clock     { display:none; }
    .orb-3         { display:none; }
    .orb-1 { width:200px; height:200px; }
    .orb-2 { width:140px; height:140px; }
  }

  /* ═══ MOBILE ≤768px ═══ */
  @media (max-width:768px) {
    /* Stack: hero on top, content below */
    .main-grid {
      grid-template-columns:1fr;
      grid-template-rows:auto 1fr;
    }

    /* Hero becomes compact top banner */
    .hero-panel {
      min-height:unset !important;
      align-items:center !important;
    }
    .hero-content { padding:20px 20px 24px !important; }
    .hero-heading { font-size:26px !important; }
    .hero-sub     { font-size:12px !important; margin-bottom:16px !important; max-width:100% !important; }
    .stats-grid   { grid-template-columns:repeat(4,1fr) !important; gap:7px !important; margin-bottom:0 !important; }
    .stat-tile    { padding:8px 7px !important; flex-direction:column !important; align-items:flex-start !important; gap:3px !important; }
    .stat-icon    { font-size:14px !important; }
    .stat-val     { font-size:13px !important; }
    .stat-label   { font-size:8px !important; }
    .hero-tags    { display:none !important; }
    .hero-rings   { display:none !important; }
    .orb-1,.orb-2,.orb-3 { display:none !important; }

    /* Right panel: normal scroll on mobile */
    .right-panel        { overflow:auto !important; }
    .right-panel-inner  { padding:18px 16px; }
    .welcome-outer      { padding:16px; overflow:auto !important; }

    /* Feature 2-col on tablet-mobile */
    .feature-grid  { grid-template-columns:1fr 1fr; gap:9px; }
    .about-heading { font-size:17px; }

    /* Flow 2x2 */
    .flow-grid { grid-template-columns:1fr 1fr; gap:10px; }
    .flow-connector { display:none !important; }

    /* Navbar */
    .nav-inner      { padding:0 16px !important; height:58px !important; }
    .nav-brand-title { font-size:13px !important; }
    .nav-subtitle   { display:none !important; }
    .nav-clock      { display:none !important; }
    .nav-help-btn   { padding:6px 10px !important; font-size:12px !important; }
    .nav-login-btn  { padding:7px 14px !important; font-size:12px !important; }

    /* Footer */
    .footer-inner { flex-direction:column; align-items:center; text-align:center; gap:6px; }
    .footer-right     { display:none !important; }
    .footer-right-alt { display:flex !important; align-items:center; gap:6px; font-size:10px; color:rgba(185,214,242,0.5); }
    .footer-pad { padding:10px 16px !important; }
  }

  /* ═══ SMALL PHONE ≤480px ═══ */
  @media (max-width:480px) {
    .hero-heading  { font-size:21px !important; }
    .stats-grid    { grid-template-columns:1fr 1fr !important; gap:7px !important; }
    .feature-grid  { grid-template-columns:1fr !important; }
    .flow-grid     { grid-template-columns:1fr 1fr !important; }
    .right-panel-inner { padding:14px 12px; }
    .welcome-outer     { padding:12px; }
    .badge-pill { font-size:9px; padding:3px 10px; }
    .hero-content { padding:16px 14px 20px !important; }
  }
`;

function AccentBar() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
      <div style={{ width:44, height:3, borderRadius:2, background:"#0353A4" }} />
      <div style={{ width:14, height:3, borderRadius:2, background:"#B9D6F2" }} />
      <div style={{ width:6,  height:3, borderRadius:2, background:"rgba(3,83,164,0.28)" }} />
    </div>
  );
}

function PulseDot({ color="#4ade80", size=7 }) {
  return <span className="pulse-dot" style={{ width:size, height:size, borderRadius:"50%", background:color, display:"inline-block", flexShrink:0 }} />;
}

function HelpCard({ onBack }) {
  const contacts = [
    { icon:"📞", bg:"rgba(3,83,164,0.10)",  label:"Helpdesk Hotline", value:"+91 1800-111-950",   sub:"Toll-free · Mon–Sat, 9 AM – 6 PM",               href:"tel:+911800111950" },
    { icon:"📧", bg:"rgba(0,109,170,0.10)", label:"Email Support",    value:"support@eci.gov.in", sub:"Response within 24 hours",                        href:"mailto:support@eci.gov.in" },
    { icon:"🌐", bg:"rgba(3,83,164,0.08)",  label:"Official Website", value:"eci.gov.in",          sub:"Manuals, FAQs & updates",                         href:"https://eci.gov.in" },
    { icon:"📍", bg:"rgba(0,109,170,0.08)", label:"District Office",  value:"Contact your DEO",   sub:"District Election Officer for on-ground support", href:null },
  ];
  return (
    <div className="glass-card anim-card" style={{ maxWidth:440, width:"100%", background:"rgba(235,243,251,0.92)", padding:"22px 20px", borderRadius:18, boxShadow:"0 20px 60px rgba(3,83,164,0.13)" }}>
      <div className="anim-slideUp d1">
        <AccentBar />
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#061A40", margin:"8px 0 3px" }}>Help &amp; Support</h2>
        <p style={{ fontSize:12, color:"#4B6080", lineHeight:1.6, marginBottom:14 }}>Reach out to the Election Commission through any channel below.</p>
      </div>
      <div className="divider" />
      <div className="anim-slideUp d2" style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:12 }}>
        {contacts.map((c,i) => (
          <div key={i} className="contact-row">
            <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:c.bg, border:"1px solid rgba(3,83,164,0.14)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{c.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:9, color:"#8096B0", fontWeight:700, letterSpacing:"0.08em", marginBottom:1, textTransform:"uppercase" }}>{c.label}</div>
              {c.href ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer">{c.value}</a>
                      : <span style={{ color:"#061A40", fontWeight:600, fontSize:12 }}>{c.value}</span>}
              <div style={{ fontSize:10, color:"#9BAABB", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="anim-slideUp d3" style={{ background:"rgba(3,83,164,0.06)", border:"1px solid rgba(3,83,164,0.13)", borderRadius:10, padding:"10px 12px", marginBottom:14, display:"flex", alignItems:"flex-start", gap:8 }}>
        <span style={{ fontSize:14, flexShrink:0 }}>🚨</span>
        <p style={{ fontSize:11, color:"#374151", lineHeight:1.55, margin:0 }}>For <strong>polling day emergencies</strong> — call the hotline immediately and notify your Presiding Officer.</p>
      </div>
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"#0353A4", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',sans-serif" }}>
        ← Back to Home
      </button>
    </div>
  );
}

export default function Home() {
  const [view, setView]   = useState("about");
  const [time, setTime]   = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  const dateStr = time.toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"short", year:"numeric" });

  const panel = {
    about:   { badge:"SYSTEM ACTIVE",  heading:<>One Person.<br/><span style={{color:"#B9D6F2"}}>One Vote.</span></>,     sub:"Real-time duplicate vote detection powered by facial recognition." },
    welcome: { badge:"SECURE ACCESS",  heading:<>Select<br/><span style={{color:"#B9D6F2"}}>Your Role</span></>,          sub:"Access your dashboard and manage booth operations with full confidence." },
    help:    { badge:"SUPPORT CENTRE", heading:<>We're Here<br/><span style={{color:"#B9D6F2"}}>to Help.</span></>,       sub:"Contact our helpdesk for technical support, access issues, or emergencies." },
  }[view];

  const stats = [
    { val:"142",  label:"Booths",   icon:"🏛️" },
    { val:"8.3K", label:"Verified", icon:"✅" },
    { val:"17",   label:"Blocked",  icon:"🛡️" },
    { val:"99.8%",label:"Uptime",   icon:"⚡" },
  ];

  const features = [
    { icon:"🪪", title:"Face Recognition",       desc:"Instant biometric matching against registered voter records." },
    { icon:"🗳️", title:"One Person, One Vote",   desc:"System permanently flags the voter after verification." },
    { icon:"⚡", title:"Real-Time Detection",     desc:"Cross-references every scan against live voted registry." },
    { icon:"🔒", title:"Officer Authentication", desc:"Only authorised officers can access verification terminals." },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="vvs-root" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"linear-gradient(148deg,#EBF3FB 0%,#D6E9F8 50%,#C0D9F4 100%)" }}>

        {/* ══ NAVBAR ══ */}
        <nav style={{ background:"#061A40", boxShadow:"0 2px 28px rgba(6,26,64,0.55)", position:"relative", zIndex:100, flexShrink:0 }}>
          <div className="nav-inner" style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px", display:"flex", justifyContent:"space-between", alignItems:"center", height:66 }}>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, background:"linear-gradient(135deg,#0353A4,#006DAA)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 14px rgba(3,83,164,0.6)", flexShrink:0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.95"/>
                  <path d="M9 12l2 2 4-4" stroke="#061A40" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="nav-brand-title" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:14.5, color:"white", letterSpacing:"0.02em", lineHeight:1.2 }}>Voter Verification System</div>
                <div className="nav-subtitle"     style={{ fontSize:8.5, color:"rgba(185,214,242,0.5)", letterSpacing:"0.1em", marginTop:1 }}>ELECTION COMMISSION OF INDIA · AI-POWERED</div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="nav-clock" style={{ flexDirection:"column", alignItems:"flex-end", background:"rgba(185,214,242,0.07)", border:"1px solid rgba(185,214,242,0.12)", borderRadius:9, padding:"5px 12px", marginRight:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <PulseDot color="#4ade80" size={6}/>
                  <span style={{ fontFamily:"monospace", fontSize:13, color:"white", letterSpacing:"0.06em", fontWeight:600 }}>{timeStr}</span>
                </div>
                <div style={{ fontSize:8.5, color:"rgba(185,214,242,0.45)", letterSpacing:"0.04em", marginTop:1 }}>{dateStr}</div>
              </div>
              <button className="nav-link nav-help-btn" onClick={() => setView(view==="help"?"about":"help")} style={{ fontSize:12.5, fontWeight:500, padding:"7px 12px", borderRadius:8, color:view==="help"?"#B9D6F2":"rgba(255,255,255,0.65)" }}>
                {view==="help"?"← Home":"Help"}
              </button>
              <button className="btn-primary nav-login-btn" onClick={() => setView("welcome")} style={{ padding:"8px 20px", fontSize:13, letterSpacing:"0.03em", borderRadius:9 }}>
                Login →
              </button>
            </div>
          </div>
        </nav>

        {/* ══ MAIN ══ */}
        <div className="main-grid">

          {/* LEFT HERO */}
          <div className="scanline-wrap hero-panel" style={{ background:"#003559", position:"relative", overflow:"hidden", minHeight:540, display:"flex", alignItems:"flex-end" }}>
            <img src={homeImage} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.32 }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(162deg,rgba(6,26,64,0.48) 0%,rgba(0,53,89,0.82) 55%,rgba(6,26,64,0.98) 100%)" }}/>
            <div className="grid-bg"/>
            <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>

            <div className="hero-rings" style={{ position:"absolute", top:20, right:20, opacity:0.07 }}>
              <svg width="150" height="150" viewBox="0 0 150 150" className="ring-rotate">
                <circle cx="75" cy="75" r="70" stroke="#B9D6F2" strokeWidth="1.5" strokeDasharray="8 5" fill="none"/>
                <circle cx="75" cy="75" r="50" stroke="#B9D6F2" strokeWidth="1"   strokeDasharray="5 8" fill="none"/>
                <circle cx="75" cy="75" r="28" stroke="#B9D6F2" strokeWidth="0.8" fill="none"/>
              </svg>
            </div>

            <div className="hero-content" style={{ position:"relative", zIndex:10, padding:"0 40px 44px", width:"100%" }}>
              <div className="anim-slideUp d1" style={{ marginBottom:12 }}>
                <span className="badge-pill"><PulseDot color="#4ade80" size={6}/>{panel.badge}</span>
              </div>
              <h2 className="anim-slideUp d2 hero-heading" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"white", lineHeight:1.06, letterSpacing:"-0.02em", marginBottom:12 }}>
                {panel.heading}
              </h2>
              <AccentBar/>
              <p className="anim-slideUp d3 hero-sub" style={{ color:"rgba(185,214,242,0.76)", fontSize:13, lineHeight:1.65, maxWidth:280, fontStyle:"italic", marginTop:9, marginBottom:20 }}>
                {panel.sub}
              </p>
              <div className="anim-slideUp d4 stats-grid">
                {stats.map(({val,label,icon}) => (
                  <div key={label} className="stat-tile">
                    <span className="stat-icon" style={{ fontSize:18 }}>{icon}</span>
                    <div>
                      <div className="stat-val"   style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:"white", lineHeight:1.1 }}>{val}</div>
                      <div className="stat-label" style={{ fontSize:9, color:"rgba(185,214,242,0.55)", letterSpacing:"0.05em", marginTop:1 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="anim-slideUp d5 hero-tags" style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:14 }}>
                {["Facial Recognition","AES-256 Encrypted","Real-Time","ECI Certified"].map(t => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel" style={{ display:"flex", flexDirection:"column", background:"rgba(185,214,242,0.1)", overflow:"hidden", position:"relative" }}>

            {/* HELP */}
            {view==="help" && (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"22px 18px", flex:1, overflow:"auto" }}>
                <HelpCard onBack={() => setView("about")}/>
              </div>
            )}

            {/* WELCOME */}
            {view==="welcome" && (
              <div className="welcome-outer" style={{ display:"flex", alignItems:"center", justifyContent:"center", flex:1, overflow:"hidden" }}>
                <div key="welcome" className="glass-card anim-card" style={{ width:"100%", maxWidth:460, background:"rgba(235,243,251,0.92)", borderRadius:18, padding:"20px 22px", boxShadow:"0 20px 60px rgba(3,83,164,0.13)" }}>
                  <div className="anim-slideUp d1">
                    <AccentBar/>
                    <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#061A40", margin:"7px 0 3px" }}>Select Your Role</h2>
                    <p style={{ color:"#4B6080", fontSize:11.5, lineHeight:1.5 }}>Choose your officer type to securely access your dashboard.</p>
                  </div>
                  <div className="divider"/>
                  <div className="anim-slideUp d2" style={{ display:"flex", flexDirection:"column", gap:9 }}>
                    <button type="button" className="login-role-btn" onClick={() => { window.location.href="/login-data-entry"; }}>
                      <div style={{ width:42, height:42, borderRadius:11, flexShrink:0, background:"linear-gradient(135deg,#0353A4,#006DAA)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, boxShadow:"0 4px 14px rgba(3,83,164,0.32)" }}>📋</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#061A40", marginBottom:2 }}>Data Entry Officer</div>
                        <div style={{ fontSize:11, color:"#6B80A0" }}>Voter registration &amp; records management</div>
                      </div>
                      <div style={{ width:26, height:26, borderRadius:7, background:"rgba(3,83,164,0.09)", display:"flex", alignItems:"center", justifyContent:"center", color:"#0353A4", fontSize:13, flexShrink:0 }}>→</div>
                    </button>
                    <button type="button" className="login-role-btn" onClick={() => { window.location.href="/login"; }}>
                      <div style={{ width:42, height:42, borderRadius:11, flexShrink:0, background:"linear-gradient(135deg,#003559,#0353A4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, boxShadow:"0 4px 14px rgba(0,53,89,0.32)" }}>🗳️</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#061A40", marginBottom:2 }}>Booth Officer</div>
                        <div style={{ fontSize:11, color:"#6B80A0" }}>Polling booth voter verification</div>
                      </div>
                      <div style={{ width:26, height:26, borderRadius:7, background:"rgba(3,83,164,0.09)", display:"flex", alignItems:"center", justifyContent:"center", color:"#0353A4", fontSize:13, flexShrink:0 }}>→</div>
                    </button>
                  </div>
                  <div className="divider"/>
                  <div style={{ background:"rgba(3,83,164,0.05)", border:"1px solid rgba(3,83,164,0.12)", borderRadius:10, padding:"9px 12px", display:"flex", alignItems:"center", gap:9 }}>
                    <span style={{ fontSize:14, flexShrink:0 }}>🔐</span>
                    <p style={{ fontSize:10.5, color:"#5A7090", lineHeight:1.5, margin:0 }}>Secured with <strong style={{color:"#0353A4"}}>AES-256 encryption</strong>. Authorised officers only. Sessions are logged and audited.</p>
                  </div>
                  <div className="divider" style={{ marginBottom:2 }}/>
                  <button onClick={() => setView("about")} style={{ background:"none", border:"none", cursor:"pointer", color:"#0353A4", fontSize:11.5, fontWeight:700, display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',sans-serif" }}>
                    ← Back to Home
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT */}
            {view==="about" && (
              <div key="about" className="anim-card right-panel-inner" style={{ flex:1, display:"flex", flexDirection:"column", background:"transparent", overflow:"auto" }}>
                <div className="anim-slideUp d1" style={{ marginBottom:14 }}>
                  <AccentBar/>
                  <h2 className="about-heading" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#061A40", letterSpacing:"-0.01em", margin:"8px 0 5px" }}>About the System</h2>
                  <p style={{ fontSize:12.5, color:"#4B6080", lineHeight:1.65 }}>
                    The <strong style={{color:"#061A40"}}>Voter Verification System</strong> uses real-time facial recognition and duplicate-detection to uphold electoral integrity across every polling booth in India.
                  </p>
                </div>
                <div className="divider"/>
                <div className="anim-slideUp d2 feature-grid">
                  {features.map(({icon,title,desc}) => (
                    <div key={title} className="feature-card">
                      <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:12.5, fontWeight:700, color:"#0353A4", marginBottom:4 }}>{title}</div>
                      <div style={{ fontSize:11.5, color:"#5A7090", lineHeight:1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
                <div className="divider"/>
                <div className="anim-slideUp d3" style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9.5, fontWeight:700, color:"#8096B0", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:13 }}>Verification Flow</div>
                  <div className="flow-grid">
                    {[
                      {n:"01",t:"Officer Logs In",d:"Authenticated via secure credentials.",icon:"🔑"},
                      {n:"02",t:"Voter Face Scan",d:"Camera captures biometric data.",icon:"📷"},
                      {n:"03",t:"Registry Match", d:"Cross-checks national voter database.",icon:"🔍"},
                      {n:"04",t:"Vote Recorded",  d:"Duplicates blocked instantly.",icon:"✅"},
                    ].map(({n,t,d,icon},i,arr) => (
                      <div key={n} style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                        {i < arr.length-1 && (
                          <div className="flow-connector" style={{ position:"absolute", top:19, left:"calc(50% + 19px)", right:"calc(-50% + 19px)", height:1, background:"linear-gradient(90deg,rgba(3,83,164,0.25),rgba(3,83,164,0.08))", zIndex:0 }}/>
                        )}
                        <div style={{ width:38, height:38, borderRadius:10, background:"rgba(3,83,164,0.09)", border:"1.5px solid rgba(3,83,164,0.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, marginBottom:7, position:"relative", zIndex:1 }}>{icon}</div>
                        <div style={{ fontSize:8.5, fontWeight:800, color:"#0353A4", letterSpacing:"0.05em", marginBottom:3 }}>{n}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:"#061A40", marginBottom:2 }}>{t}</div>
                        <div style={{ fontSize:10, color:"#7090B0", lineHeight:1.4 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="divider"/>
                <div className="anim-slideUp d5" style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingTop:12, borderTop:"1px solid rgba(3,83,164,0.1)", gap:10 }}>
                  <button onClick={() => setView("help")} style={{ background:"none", border:"none", cursor:"pointer", color:"#0353A4", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>❓ Help</button>
                  <button className="btn-primary" onClick={() => setView("welcome")} style={{ padding:"8px 22px", fontSize:12.5, borderRadius:9 }}>Login →</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer style={{ background:"#061A40", borderTop:"1px solid rgba(185,214,242,0.08)", flexShrink:0 }}>
          <div className="footer-inner footer-pad" style={{ padding:"12px 36px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <div style={{ width:20, height:20, background:"rgba(3,83,164,0.45)", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.9"/></svg>
              </div>
              <span style={{ fontSize:10.5, color:"rgba(185,214,242,0.4)" }}>© 2026 Election Commission of India · Voter Verification System · v2.4.1</span>
            </div>
            <div className="footer-right" style={{ alignItems:"center", gap:16 }}>
              <span style={{ fontSize:10.5, color:"rgba(185,214,242,0.35)" }}>Powered by AI Biometrics</span>
              <span style={{ display:"flex", alignItems:"center", gap:6, fontSize:10.5, color:"rgba(185,214,242,0.5)" }}><PulseDot color="#4ade80" size={6}/>All systems operational</span>
            </div>
            <div className="footer-right-alt"><PulseDot color="#4ade80" size={6}/><span>All systems operational</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}