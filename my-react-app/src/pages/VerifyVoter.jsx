import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVoterById, verifyVoterFace, markVoterAsVoted } from "../api/voterApi";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1);    }
    50%      { opacity:.4; transform:scale(.75); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes scanline {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
  @keyframes ripple {
    0%   { transform: scale(0);   opacity: .35; }
    100% { transform: scale(4);   opacity: 0;   }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes slideRight {
    from { opacity:0; transform: translateX(-12px); }
    to   { opacity:1; transform: translateX(0);     }
  }
  @keyframes messageIn {
    from { opacity:0; transform: scale(.96) translateY(6px); }
    to   { opacity:1; transform: scale(1)   translateY(0);   }
  }
  .vv-root { font-family: 'DM Sans', sans-serif; }
  .vv-scanline { position:relative; overflow:hidden; }
  .vv-scanline::after {
    content:''; position:absolute; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, rgba(3,83,164,.2), transparent);
    animation: scanline 4s linear infinite; pointer-events:none;
  }
  .vv-avatar-ring { position:relative; display:inline-flex; align-items:center; justify-content:center; }
  .vv-avatar-ring::before {
    content:''; position:absolute; inset:-3px; border-radius:50%;
    background: conic-gradient(#0353A4 0deg, #B9D6F2 180deg, #006DAA 360deg);
    animation: spin 7s linear infinite; z-index:0;
  }
  .vv-avatar-ring > * { position:relative; z-index:1; }
  .vv-row {
    display:flex; align-items:center; gap:12px;
    padding:10px 12px; border-radius:10px;
    transition: background .18s, transform .18s;
    animation: slideRight .4s cubic-bezier(.22,1,.36,1) both;
    cursor:default;
  }
  .vv-row:hover { background:rgba(3,83,164,.05); transform:translateX(3px); }
  .vv-btn {
    display:flex; align-items:center; justify-content:center; gap:8px;
    border:none; border-radius:10px; cursor:pointer;
    font-family:'Syne',sans-serif; font-weight:700; letter-spacing:.04em;
    position:relative; overflow:hidden;
    transition: opacity .2s, transform .15s, box-shadow .2s;
  }
  .vv-btn:hover { opacity:.92; transform:translateY(-1px); }
  .vv-btn:active { transform:scale(.97); }
  .vv-btn .ripple {
    position:absolute; border-radius:50%; width:70px; height:70px;
    background:rgba(255,255,255,.22); pointer-events:none;
    transform:scale(0); animation: ripple .55s ease-out forwards;
  }
  .vv-btn-primary::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    background-size:600px 100%; opacity:0; transition:opacity .3s;
  }
  .vv-btn-primary:hover::before { opacity:1; animation:shimmer .8s ease; }
  .vv-dot { border-radius:50%; animation: pulse 2.2s ease-in-out infinite; }
  .vv-camera-frame {
    border-radius:16px; overflow:hidden;
    border:2px solid rgba(3,83,164,.25);
    transition: box-shadow .3s, border-color .3s;
    position:relative;
  }
  .vv-camera-frame.active {
    border-color: rgba(3,83,164,.5);
    box-shadow: 0 0 0 4px rgba(3,83,164,.10), 0 8px 32px rgba(3,83,164,.15);
  }
  .vv-camera-frame.captured {
    border-color: #10B981;
    box-shadow: 0 0 0 4px rgba(16,185,129,.12);
  }
  .vv-message {
    animation: messageIn .35s cubic-bezier(.22,1,.36,1) both;
    border-radius:12px; padding:14px 18px;
    display:flex; align-items:flex-start; gap:12px;
  }
  .vv-nav-btn {
    display:flex; align-items:center; gap:7px;
    background:rgba(255,255,255,.55); backdrop-filter:blur(12px);
    border:1.5px solid rgba(3,83,164,.18); border-radius:10px;
    padding:8px 16px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; color:#003559;
    transition: background .2s, transform .15s;
  }
  .vv-nav-btn:hover { background:rgba(255,255,255,.88); transform:translateY(-1px); }
  .vv-nav-btn:active { transform:scale(.97); }
`;

function AccentBar() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
      <div style={{ width:28, height:3, borderRadius:2, background:"#0353A4" }} />
      <div style={{ width:8,  height:3, borderRadius:2, background:"#B9D6F2" }} />
    </div>
  );
}

function InfoRow({ icon, label, value, mono, highlight, delay }) {
  return (
    <div className="vv-row" style={{ animationDelay: delay || "0s" }}>
      <div style={{
        width:34, height:34, borderRadius:8, flexShrink:0,
        background: highlight ? "rgba(3,83,164,.10)" : "rgba(3,83,164,.06)",
        border:`1px solid rgba(3,83,164,${highlight ? ".20" : ".10"})`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:15,
      }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10, color:"#8096B0", letterSpacing:".10em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>{label}</div>
        <div style={{
          fontSize:13, fontWeight: highlight ? 700 : 500,
          color: highlight ? "#0353A4" : "#061A40", marginTop:1,
          fontFamily: mono ? "'DM Mono',monospace" : "'DM Sans',sans-serif",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}>{value || "—"}</div>
      </div>
      {value && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, opacity:.28 }}>
          <path d="M5 13l4 4L19 7" stroke="#0353A4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function Step({ num, label, active, done }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{
        width:32, height:32, borderRadius:"50%",
        background: done ? "#0353A4" : active ? "rgba(3,83,164,.12)" : "rgba(3,83,164,.06)",
        border:`2px solid ${done || active ? "#0353A4" : "rgba(3,83,164,.20)"}`,
        display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s",
      }}>
        {done
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <span style={{ fontSize:12, fontWeight:700, fontFamily:"'DM Mono',monospace", color: active ? "#0353A4" : "#8096B0" }}>{num}</span>
        }
      </div>
      <span style={{ fontSize:9, color: active || done ? "#0353A4" : "#8096B0", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>
        {label}
      </span>
    </div>
  );
}

export default function VerifyVoter() {
  const { voterId } = useParams();
  const navigate    = useNavigate();
  const videoRef    = useRef(null);
  const canvasRef   = useRef(null);

  const [voter,         setVoter]         = useState(null);
  const [message,       setMessage]       = useState("");
  const [messageType,   setMessageType]   = useState("info");
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive,  setCameraActive]  = useState(false);
  const [verifying,     setVerifying]     = useState(false);
  const [verified,      setVerified]      = useState(false); // ← tracks successful verification
  const [ripples,       setRipples]       = useState([]);

  const step = !cameraActive ? 1 : !capturedImage ? 2 : 3;

  useEffect(() => {
    async function fetchVoter() {
      try {
        const data = await getVoterById(voterId);
        setVoter(data);
      } catch {
        showMessage("Error fetching voter details", "error");
      }
    }
    fetchVoter();
  }, [voterId]);

  const showMessage = (text, type = "info") => { setMessage(text); setMessageType(type); };

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left - 35, y: e.clientY - rect.top - 35 }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
  };

  const startCamera = async (e) => {
    addRipple(e);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraActive(true);
      setCapturedImage(null);
      showMessage("Camera ready — position your face clearly in the frame", "info");
    } catch {
      showMessage("Camera access denied. Please allow camera permissions.", "error");
    }
  };

  const captureImage = (e) => {
    addRipple(e);
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => setCapturedImage(blob), "image/jpeg");
    showMessage("Photo captured! Click Verify to continue.", "info");
  };

  const handleVerify = async (e) => {
    addRipple(e);
    if (!capturedImage) { showMessage("Please capture a photo first", "error"); return; }
    setVerifying(true);
    showMessage("Analysing face…", "info");
    try {
      await verifyVoterFace(voterId, capturedImage);
      await markVoterAsVoted(voterId);

      // ✅ Mark as verified — show success panel, NO auto redirect
      setVerified(true);
      showMessage("Vote recorded successfully!", "success");

    } catch (err) {
      const detail = err?.response?.data?.detail || "Error verifying face";
      showMessage(detail, "error");
    } finally {
      setVerifying(false);
    }
  };

  /* Loading screen */
  if (!voter) return (
    <>
      <style>{STYLES}</style>
      <div className="vv-root" style={{ minHeight:"100vh", background:"linear-gradient(135deg,#EBF3FB,#B9D6F2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
          <div style={{ width:40, height:40, borderRadius:"50%", border:"3px solid #0353A4", borderTopColor:"transparent", animation:"spin .8s linear infinite" }} />
          <p style={{ color:"#0353A4", fontFamily:"'DM Mono',monospace", fontSize:13 }}>Loading voter data…</p>
        </div>
      </div>
    </>
  );

  const alreadyVoted = voter.has_voted;

  const msgColors = {
    success: { bg:"rgba(16,185,129,.10)", border:"rgba(16,185,129,.28)", color:"#065F46", icon:"✅" },
    error:   { bg:"rgba(239,68,68,.08)",  border:"rgba(239,68,68,.25)",  color:"#991B1B", icon:"❌" },
    info:    { bg:"rgba(3,83,164,.07)",   border:"rgba(3,83,164,.20)",   color:"#003559", icon:"ℹ️"  },
  };
  const mc = msgColors[messageType];

  return (
    <>
      <style>{STYLES}</style>
      <div className="vv-root" style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#EBF3FB 0%,#D6E9F8 55%,#B9D6F2 100%)",
        padding:"36px 16px 64px",
      }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>

          {/* Top nav */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, animation:"fadeUp .5s ease both" }}>
            <button className="vv-nav-btn" onClick={() => navigate("/")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M3 12L12 3l9 9M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Home
            </button>

            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(3,83,164,.08)", border:"1px solid rgba(3,83,164,.16)",
              borderRadius:20, padding:"5px 14px",
            }}>
              <span className="vv-dot" style={{ width:7, height:7, background:"#0353A4", display:"inline-block" }} />
              <span style={{ fontSize:10, color:"#0353A4", letterSpacing:".12em", fontWeight:700, fontFamily:"'DM Mono',monospace" }}>
                FACE VERIFICATION
              </span>
            </div>

            <button className="vv-nav-btn" onClick={() => navigate("/search")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#0353A4" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="#0353A4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Search
            </button>
          </div>

          {/* Main card */}
          <div style={{
            background:"rgba(255,255,255,.50)", backdropFilter:"blur(20px)",
            border:"1.5px solid rgba(3,83,164,.16)", borderRadius:20,
            overflow:"hidden", boxShadow:"0 4px 32px rgba(3,83,164,.10)",
            animation:"fadeUp .55s cubic-bezier(.22,1,.36,1) .08s both",
          }}>

            {/* Accent strip */}
            <div style={{
              height:4,
              background: alreadyVoted || verified
                ? "linear-gradient(90deg,#10B981,#059669)"
                : alreadyVoted
                ? "linear-gradient(90deg,#DC2626,#F87171)"
                : "linear-gradient(90deg,#0353A4,#006DAA)",
            }} />

            {/* Hero header */}
            <div className="vv-scanline" style={{
              padding:"24px 28px 20px",
              background: alreadyVoted ? "rgba(239,68,68,.04)" : "rgba(3,83,164,.04)",
              borderBottom:"1px solid rgba(185,214,242,.55)",
              display:"flex", alignItems:"center", gap:18, flexWrap:"wrap",
            }}>
              <div className="vv-avatar-ring" style={{ width:58, height:58, flexShrink:0 }}>
                <div style={{
                  width:58, height:58, borderRadius:"50%",
                  background: alreadyVoted
                    ? "linear-gradient(135deg,#DC2626,#003559)"
                    : "linear-gradient(135deg,#0353A4,#006DAA)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:800, color:"white",
                  border:"3px solid white", boxShadow:"0 2px 12px rgba(3,83,164,.25)",
                }}>
                  {voter.name?.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase() || "??"}
                </div>
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <AccentBar />
                <h2 style={{
                  fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800,
                  color:"#061A40", letterSpacing:"-.01em", marginTop:3, marginBottom:6,
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                }}>{voter.name}</h2>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <div style={{
                    background:"rgba(3,83,164,.08)", border:"1px solid rgba(3,83,164,.18)",
                    borderRadius:7, padding:"3px 10px",
                    fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:500, color:"#0353A4",
                  }}>{voter.voter_id}</div>
                  <div style={{
                    display:"inline-flex", alignItems:"center", gap:5,
                    padding:"3px 10px", borderRadius:20,
                    fontSize:10, fontWeight:700, letterSpacing:".10em", textTransform:"uppercase",
                    fontFamily:"'DM Mono',monospace",
                    background: alreadyVoted ? "rgba(239,68,68,.10)" : "rgba(16,185,129,.10)",
                    border:`1px solid ${alreadyVoted ? "rgba(239,68,68,.25)" : "rgba(16,185,129,.25)"}`,
                    color: alreadyVoted ? "#DC2626" : "#059669",
                  }}>
                    <span className="vv-dot" style={{ width:6, height:6, display:"inline-block", background: alreadyVoted ? "#DC2626" : "#10B981" }} />
                    {alreadyVoted ? "Already Voted" : "Eligible"}
                  </div>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div style={{ padding:"14px 14px 6px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 8px" }}>
              <InfoRow icon="🪪" label="Voter ID"     value={voter.voter_id}     mono highlight delay=".06s" />
              <InfoRow icon="👤" label="Name"          value={voter.name}                       delay=".09s" />
              <InfoRow icon="👨" label="Father's Name" value={voter.fathers_name}              delay=".12s" />
              <InfoRow icon="💍" label="Spouse"        value={voter.spouse_name}               delay=".15s" />
              <InfoRow icon="⚧"  label="Gender"        value={voter.gender}                    delay=".18s" />
              <InfoRow icon="🎂" label="Date of Birth" value={voter.dob}                       delay=".21s" />
              <InfoRow icon="🏠" label="Address"       value={voter.address}                   delay=".24s" />
              <InfoRow icon="🏛️" label="Booth ID"      value={voter.booth_id}     mono         delay=".27s" />
              <InfoRow icon="🪪" label="Aadhaar ID"    value={voter.aadhaar_id}   mono         delay=".30s" />
              <InfoRow icon="🗳️" label="Has Voted"     value={voter.has_voted ? "Yes — Recorded" : "No — Eligible"} delay=".33s" />
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(3,83,164,.14),transparent)", margin:"8px 28px" }} />

            {/* ── SUCCESS PANEL after verification ── */}
            {verified ? (
              <div style={{ padding:"24px 28px 28px" }}>
                <div style={{
                  padding:"20px 22px", borderRadius:16,
                  background:"linear-gradient(135deg,rgba(16,185,129,.10),rgba(5,150,105,.06))",
                  border:"1.5px solid rgba(16,185,129,.30)",
                  display:"flex", alignItems:"flex-start", gap:16, marginBottom:20,
                }}>
                  <div style={{ fontSize:36, flexShrink:0 }}>🎉</div>
                  <div>
                    <p style={{ fontSize:15, fontWeight:800, color:"#065F46", marginBottom:6, fontFamily:"'Syne',sans-serif" }}>
                      Vote Recorded Successfully!
                    </p>
                    <p style={{ fontSize:12, color:"#047857", lineHeight:1.65 }}>
                      <strong>{voter.name}</strong>'s identity has been verified and their vote has been recorded in the system. They may now proceed to cast their vote.
                    </p>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button className="vv-btn" onClick={() => navigate("/")}
                    style={{ flex:1, padding:"13px 0", fontSize:13, color:"#0353A4", background:"transparent", border:"1.5px solid rgba(3,83,164,.25)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  >🏠 Go to Home</button>
                  <button className="vv-btn vv-btn-primary" onClick={() => navigate("/search")}
                    style={{ flex:2, padding:"13px 0", fontSize:13, color:"white", border:"none", background:"linear-gradient(135deg,#0353A4,#006DAA)", boxShadow:"0 4px 16px rgba(3,83,164,.30)" }}
                  >🔍 Go to Search Page</button>
                </div>
              </div>

            /* ── ALREADY VOTED block ── */
            ) : alreadyVoted ? (
              <div style={{ padding:"20px 28px 28px" }}>
                <div style={{
                  padding:"16px 18px", borderRadius:14,
                  background:"rgba(239,68,68,.07)", border:"1px solid rgba(239,68,68,.22)",
                  display:"flex", alignItems:"flex-start", gap:14, marginBottom:16,
                }}>
                  <div style={{ fontSize:28, flexShrink:0 }}>🚫</div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700, color:"#B91C1C", marginBottom:4, fontFamily:"'Syne',sans-serif" }}>
                      Duplicate Vote Blocked
                    </p>
                    <p style={{ fontSize:12, color:"#7F1D1D", lineHeight:1.6 }}>
                      This voter has already cast their vote. Face verification is disabled and this attempt has been logged.
                    </p>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button className="vv-btn" onClick={() => navigate("/")}
                    style={{ flex:1, padding:"12px 0", fontSize:13, color:"#0353A4", background:"transparent", border:"1.5px solid rgba(3,83,164,.25)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  >🏠 Home</button>
                  <button className="vv-btn" onClick={() => navigate("/search")}
                    style={{ flex:1, padding:"12px 0", fontSize:13, color:"#0353A4", background:"transparent", border:"1.5px solid rgba(3,83,164,.25)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  >🔍 Back to Search</button>
                </div>
              </div>

            /* ── CAMERA + VERIFY section ── */
            ) : (
              <div style={{ padding:"20px 28px 28px" }}>

                {/* Step indicator */}
                <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:20 }}>
                  <Step num="1" label="Open Cam" active={step === 1} done={step > 1} />
                  <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${step > 1 ? "#0353A4" : "rgba(3,83,164,.15)"},${step > 2 ? "#0353A4" : "rgba(3,83,164,.15)"})`, transition:"background .4s" }} />
                  <Step num="2" label="Capture"  active={step === 2} done={step > 2} />
                  <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${step > 2 ? "#0353A4" : "rgba(3,83,164,.15)"},rgba(3,83,164,.15))`, transition:"background .4s" }} />
                  <Step num="3" label="Verify"   active={step === 3} done={false} />
                </div>

                {/* Camera frame */}
                <div className={`vv-camera-frame ${cameraActive ? (capturedImage ? "captured" : "active") : ""}`}
                  style={{ marginBottom:16, background:"#061A40", minHeight:200, display:"flex", alignItems:"center", justifyContent:"center" }}
                >
                  <video ref={videoRef} style={{ width:"100%", display:"block", maxHeight:300, objectFit:"cover" }} playsInline />
                  {!cameraActive && (
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
                      <div style={{ fontSize:36 }}>📷</div>
                      <p style={{ color:"rgba(185,214,242,.7)", fontFamily:"'DM Mono',monospace", fontSize:12 }}>Camera not started</p>
                    </div>
                  )}
                  {capturedImage && (
                    <div style={{
                      position:"absolute", top:10, right:10,
                      background:"rgba(16,185,129,.9)", borderRadius:8,
                      padding:"4px 10px", fontSize:11, color:"white",
                      fontFamily:"'DM Mono',monospace", fontWeight:500,
                    }}>✓ Captured</div>
                  )}
                </div>
                <canvas ref={canvasRef} style={{ display:"none" }} />

                {/* Action buttons */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                  <button className="vv-btn" onClick={startCamera}
                    style={{ padding:"12px 8px", fontSize:12, color:"#0353A4", background:"rgba(3,83,164,.08)", border:"1.5px solid rgba(3,83,164,.22)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.14)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(3,83,164,.08)"}
                  >
                    {ripples.map(r => <span key={r.id} className="ripple" style={{ left:r.x, top:r.y }} />)}
                    📷 Camera
                  </button>

                  <button className="vv-btn" onClick={captureImage} disabled={!cameraActive}
                    style={{
                      padding:"12px 8px", fontSize:12,
                      color: cameraActive ? "#0353A4" : "#8096B0",
                      background: cameraActive ? "rgba(3,83,164,.08)" : "rgba(3,83,164,.03)",
                      border:`1.5px solid rgba(3,83,164,${cameraActive ? ".22" : ".10"})`,
                      cursor: cameraActive ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={e => { if (cameraActive) e.currentTarget.style.background="rgba(3,83,164,.14)"; }}
                    onMouseLeave={e => { if (cameraActive) e.currentTarget.style.background="rgba(3,83,164,.08)"; }}
                  >📸 Capture</button>

                  <button className="vv-btn vv-btn-primary" onClick={handleVerify}
                    disabled={!capturedImage || verifying}
                    style={{
                      padding:"12px 8px", fontSize:12, color:"white", border:"none",
                      background: capturedImage && !verifying ? "linear-gradient(135deg,#0353A4,#006DAA)" : "rgba(3,83,164,.30)",
                      cursor: capturedImage && !verifying ? "pointer" : "not-allowed",
                      boxShadow: capturedImage && !verifying ? "0 4px 16px rgba(3,83,164,.30)" : "none",
                    }}
                  >
                    {verifying
                      ? <><div style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,.4)", borderTopColor:"white", animation:"spin .7s linear infinite" }} /> Checking…</>
                      : "🔍 Verify"
                    }
                  </button>
                </div>

                {/* Message */}
                {message && (
                  <div className="vv-message" style={{ background:mc.bg, border:`1px solid ${mc.border}` }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{mc.icon}</span>
                    <span style={{ fontSize:13, fontWeight:500, color:mc.color, lineHeight:1.55 }}>{message}</span>
                  </div>
                )}

                {/* Bottom nav */}
                <div style={{ display:"flex", gap:10, marginTop:16 }}>
                  <button className="vv-btn" onClick={() => navigate("/")}
                    style={{ flex:1, padding:"11px 0", fontSize:12, color:"#0353A4", background:"transparent", border:"1.5px solid rgba(3,83,164,.22)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  >🏠 Back to Home</button>
                  <button className="vv-btn" onClick={() => navigate("/search")}
                    style={{ flex:1, padding:"11px 0", fontSize:12, color:"#0353A4", background:"transparent", border:"1.5px solid rgba(3,83,164,.22)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(3,83,164,.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  >🔍 Back to Search</button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ marginTop:18, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6, animation:"fadeUp .5s ease .4s both" }}>
            <span className="vv-dot" style={{ width:6, height:6, background:"#0353A4", display:"inline-block" }} />
            <span style={{ fontSize:11, color:"#8096B0" }}>Voter Verification System · Booth Officer View · Data is end-to-end encrypted</span>
          </div>

        </div>
      </div>
    </>
  );
}