import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Design tokens — exact VVS palette
   Primary: #0353A4 | Deep: #003559 / #061A40
   Secondary: #006DAA | Surface: #B9D6F2
───────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  .vvp-root * { box-sizing: border-box; }
  .vvp-root   { font-family: 'Inter', sans-serif; }

  /* ── Animations ── */
  @keyframes vvp-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes vvp-slideIn {
    from { opacity: 0; transform: translateX(-14px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes vvp-rowIn {
    from { opacity: 0; transform: translateX(10px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes vvp-pulse {
    0%, 100% { opacity: 1;   transform: scale(1);    }
    50%       { opacity: 0.4; transform: scale(0.78); }
  }
  @keyframes vvp-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  
  @keyframes vvp-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes vvp-ripple {
    0%   { transform: scale(0);   opacity: 0.35; }
    100% { transform: scale(3.5); opacity: 0;    }
  }

  .vvp-fadeUp  { animation: vvp-fadeUp  0.55s cubic-bezier(.22,1,.36,1) both; }
  .vvp-slideIn { animation: vvp-slideIn 0.45s cubic-bezier(.22,1,.36,1) both; }

  .vvp-d1 { animation-delay: 0.06s; }
  .vvp-d2 { animation-delay: 0.13s; }
  .vvp-d3 { animation-delay: 0.20s; }
  .vvp-d4 { animation-delay: 0.27s; }
  .vvp-d5 { animation-delay: 0.34s; }

  /* ── Info row hover ── */
  .vvp-row {
    display: flex; align-items: center;
    gap: 14px;
    padding: 11px 14px;
    border-radius: 10px;
    transition: background 0.18s, transform 0.18s;
    animation: vvp-rowIn 0.4s cubic-bezier(.22,1,.36,1) both;
    cursor: default;
  }
  .vvp-row:hover {
    background: rgba(3,83,164,0.05);
    transform: translateX(3px);
  }

  /* ── Primary button ── */
  .vvp-btn-verify {
    width: 100%;
    background: linear-gradient(135deg, #0353A4 0%, #006DAA 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px 0;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    position: relative; overflow: hidden;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .vvp-btn-verify::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);
    background-size: 400px 100%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .vvp-btn-verify:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(3,83,164,0.35);
  }
  .vvp-btn-verify:hover::before {
    opacity: 1;
    animation: vvp-shimmer 0.75s ease;
  }
  .vvp-btn-verify:active { transform: scale(0.97); }

  /* Ripple on click */
  .vvp-btn-verify .ripple {
    position: absolute;
    border-radius: 50%;
    width: 60px; height: 60px;
    background: rgba(255,255,255,0.22);
    pointer-events: none;
    transform: scale(0);
    animation: vvp-ripple 0.55s ease-out forwards;
  }

  /* ── Pulse dot ── */
  .vvp-dot {
    border-radius: 50%;
    animation: vvp-pulse 2.2s ease-in-out infinite;
  }

 

  /* ── Avatar ring ── */
  .vvp-avatar-ring {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .vvp-avatar-ring::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: conic-gradient(#0353A4 0deg, #B9D6F2 180deg, #006DAA 360deg);
    animation: vvp-spin 6s linear infinite;
    z-index: 0;
  }
  .vvp-avatar-ring > * { position: relative; z-index: 1; }

  /* ── Glass card ── */
  .vvp-glass {
    background: rgba(255,255,255,0.44);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1.5px solid rgba(3,83,164,0.16);
    transition: box-shadow 0.3s;
  }
  .vvp-glass:hover {
    box-shadow: 0 12px 40px rgba(3,83,164,0.13);
  }
`;

/* ── Accent bar ── */
function AccentBar() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}
    >
      <div
        style={{ width: 32, height: 3, borderRadius: 2, background: "#0353A4" }}
      />
      <div
        style={{ width: 9, height: 3, borderRadius: 2, background: "#B9D6F2" }}
      />
    </div>
  );
}

/* ── Single info row ── */
function InfoRow({ icon, label, value, mono, delay, highlight }) {
  return (
    <div className={`vvp-row ${delay}`}>
      {/* Icon bubble */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          flexShrink: 0,
          background: highlight ? "rgba(3,83,164,0.10)" : "rgba(3,83,164,0.06)",
          border: `1px solid rgba(3,83,164,${highlight ? "0.20" : "0.10"})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
        }}
      >
        {icon}
      </div>

      {/* Label + value */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 10,
            color: "#8096B0",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: highlight ? 700 : 500,
            color: highlight ? "#0353A4" : "#061A40",
            marginTop: 1,
            fontFamily: mono ? "'DM Mono', monospace" : "'Inter', sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value || "—"}
        </div>
      </div>

      {/* Right tick for populated rows */}
      {value && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0, opacity: 0.3 }}
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#0353A4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function VoterProfile({ voter }) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);
  const alreadyVoted = voter?.has_voted === true || voter?.status === "voted";

  /* Derive initials for avatar */
  const initials = voter?.name
    ? voter.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "??";

  /* Ripple effect on verify button */
  const handleVerifyClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 30;
    const y = e.clientY - rect.top - 30;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    setTimeout(() => navigate(`/verify/${voter.voter_id}`), 220);
  };

  return (
    <>
      <style>{styles}</style>

      <div
        className="vvp-root"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #EBF3FB 0%, #D6E9F8 50%, #B9D6F2 100%)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "44px 16px 64px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 600 }}>
          {/* ── Page badge ── */}
          <div
            className="vvp-fadeUp"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 22,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(3,83,164,0.08)",
                border: "1px solid rgba(3,83,164,0.16)",
                borderRadius: 20,
                padding: "5px 14px",
              }}
            >
              <span
                className="vvp-dot"
                style={{
                  width: 7,
                  height: 7,
                  background: "#0353A4",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "#0353A4",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                VOTER PROFILE
              </span>
            </div>
          </div>

          {/* ── Main glass card ── */}
          <div
            className="vvp-glass vvp-fadeUp vvp-d1"
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(3,83,164,0.09)",
            }}
          >
            {/* ── Top accent strip ── */}
            <div
              style={{
                height: 4,
                background: alreadyVoted
                  ? "linear-gradient(90deg, #DC2626, #F87171)"
                  : "linear-gradient(90deg, #0353A4, #006DAA)",
              }}
            />

            {/* ── Hero header ── */}
            <div
              className="vvp-scanline"
              style={{
                padding: "24px 28px 20px",
                background: alreadyVoted
                  ? "rgba(239,68,68,0.04)"
                  : "rgba(3,83,164,0.04)",
                borderBottom: "1px solid rgba(185,214,242,0.55)",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {/* Avatar */}
              <div
                className="vvp-avatar-ring"
                style={{ width: 60, height: 60, flexShrink: 0 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: alreadyVoted
                      ? "linear-gradient(135deg, #DC2626, #003559)"
                      : "linear-gradient(135deg, #0353A4, #006DAA)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "white",
                    border: "3px solid white",
                    boxShadow: "0 2px 12px rgba(3,83,164,0.25)",
                  }}
                >
                  {initials}
                </div>
              </div>

              {/* Name + ID */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <AccentBar />
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#061A40",
                    letterSpacing: "-0.01em",
                    marginTop: 4,
                    marginBottom: 6,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {voter.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Voter ID pill */}
                  <div
                    style={{
                      background: "rgba(3,83,164,0.08)",
                      border: "1px solid rgba(3,83,164,0.18)",
                      borderRadius: 8,
                      padding: "3px 10px",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#0353A4",
                    }}
                  >
                    {voter.voter_id}
                  </div>

                  {/* Status badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      fontFamily: "'DM Mono', monospace",
                      background: alreadyVoted
                        ? "rgba(239,68,68,0.10)"
                        : "rgba(16,185,129,0.10)",
                      border: `1px solid ${alreadyVoted ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)"}`,
                      color: alreadyVoted ? "#DC2626" : "#059669",
                    }}
                  >
                    <span
                      className="vvp-dot"
                      style={{
                        width: 6,
                        height: 6,
                        display: "inline-block",
                        background: alreadyVoted ? "#DC2626" : "#10B981",
                      }}
                    />
                    {alreadyVoted ? "Already Voted" : "Not Yet Voted"}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Info rows ── */}
            <div style={{ padding: "12px 14px 8px" }}>
              <InfoRow
                icon="👤"
                label="Full Name"
                value={voter.name}
                delay="vvp-d1"
              />
              <InfoRow
                icon="🪪"
                label="Voter ID"
                value={voter.voter_id}
                mono
                highlight
                delay="vvp-d2"
              />
              <InfoRow
                icon="🗳️"
                label="Has Voted"
                value={
                  voter.has_voted
                    ? "Yes — Vote Recorded"
                    : "No — Eligible to Vote"
                }
                delay="vvp-d3"
              />
              <InfoRow
                icon="📋"
                label="Current Status"
                value={alreadyVoted ? "VOTED" : "NOT VERIFIED"}
                mono
                delay="vvp-d4"
              />
              {/* Render any extra fields dynamically */}
              {voter.constituency && (
                <InfoRow
                  icon="🗺️"
                  label="Constituency"
                  value={voter.constituency}
                  delay="vvp-d5"
                />
              )}
              {voter.dob && (
                <InfoRow
                  icon="🎂"
                  label="Date of Birth"
                  value={voter.dob}
                  delay="vvp-d5"
                />
              )}
              {voter.address && (
                <InfoRow
                  icon="🏠"
                  label="Address"
                  value={voter.address}
                  delay="vvp-d5"
                />
              )}
            </div>

            {/* ── Divider ── */}
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(3,83,164,0.15), transparent)",
                margin: "4px 28px 0",
              }}
            />

            {/* ── Footer CTA ── */}
            <div style={{ padding: "20px 28px 26px" }}>
              {alreadyVoted ? (
                /* ── Already voted block ── */
                <div>
                  <div
                    style={{
                      padding: "14px 16px",
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontSize: 26, flexShrink: 0 }}>🚫</div>
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#B91C1C",
                          marginBottom: 3,
                        }}
                      >
                        Duplicate Vote Blocked
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#7F1D1D",
                          lineHeight: 1.55,
                        }}
                      >
                        This voter has already cast their vote. Face
                        verification cannot be initiated. This attempt has been
                        logged.
                      </p>
                    </div>
                  </div>
                  {/* Back button */}
                  <button
                    onClick={() => navigate(-1)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "1.5px solid rgba(3,83,164,0.25)",
                      borderRadius: 10,
                      padding: "12px 0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#0353A4",
                      cursor: "pointer",
                      transition: "background 0.2s, border-color 0.2s",
                      letterSpacing: "0.03em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(3,83,164,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    ← Back to Search
                  </button>
                </div>
              ) : (
                /* ── Verify CTA ── */
                <div>
                  <button
                    className="vvp-btn-verify"
                    onClick={handleVerifyClick}
                  >
                    {ripples.map((r) => (
                      <span
                        key={r.id}
                        className="ripple"
                        style={{ left: r.x, top: r.y }}
                      />
                    ))}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"
                        fill="white"
                        fillOpacity="0.9"
                      />
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="#061A40"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Proceed to Face Verification
                  </button>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      color: "#8096B0",
                      marginTop: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"
                        stroke="#8096B0"
                        strokeWidth="2"
                      />
                    </svg>
                    Facial recognition will confirm this voter's identity
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* ── end glass card ── */}

          {/* ── Meta footer ── */}
          <div
            className="vvp-fadeUp vvp-d5"
            style={{
              marginTop: 18,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span
              className="vvp-dot"
              style={{
                width: 6,
                height: 6,
                background: "#0353A4",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 11, color: "#8096B0" }}>
              Voter Verification System · Booth Officer View · Data is
              end-to-end encrypted
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
