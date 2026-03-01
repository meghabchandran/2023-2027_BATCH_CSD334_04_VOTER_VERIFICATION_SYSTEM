import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getVoterById } from "../api/voterApi";
import VoterProfile from "./VoterProfile";

/* ─────────────────────────────────────────────
   Styles — matches Home.jsx palette exactly
   Primary: #0353A4 | Deep: #003559 / #061A40
   Secondary: #006DAA | Surface: #B9D6F2
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');

  .vvs-search * { box-sizing: border-box; }
  .vvs-search { font-family: 'DM Sans', sans-serif; }

  @keyframes vvs-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vvs-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes vvs-slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes vvs-resultIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vvs-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes vvs-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.8); }
  }
  @keyframes vvs-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes vvs-scanline {
    0%   { top: 0; }
    100% { top: 100%; }
  }

  .vvs-fadeUp   { animation: vvs-fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
  .vvs-fadeIn   { animation: vvs-fadeIn 0.4s ease both; }
  .vvs-slideIn  { animation: vvs-slideIn 0.4s cubic-bezier(.22,1,.36,1) both; }
  .vvs-resultIn { animation: vvs-resultIn 0.5s cubic-bezier(.22,1,.36,1) both; }

  .vvs-d1 { animation-delay: 0.06s; }
  .vvs-d2 { animation-delay: 0.12s; }
  .vvs-d3 { animation-delay: 0.18s; }
  .vvs-d4 { animation-delay: 0.26s; }

  /* Search input */
  .vvs-input {
    flex: 1;
    padding: 13px 16px 13px 44px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #061A40;
    background: white;
    border: 1.5px solid rgba(0,109,170,0.25);
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .vvs-input::placeholder { color: #8096B0; }
  .vvs-input:focus {
    border-color: #0353A4;
    box-shadow: 0 0 0 3px rgba(3,83,164,0.10);
  }

  /* Primary button */
  .vvs-btn-primary {
    background: #0353A4;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 13px 28px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.03em;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .vvs-btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
    background-size: 400px 100%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .vvs-btn-primary:hover {
    background: #003559;
    transform: translateY(-1px);
    box-shadow: 0 5px 20px rgba(3,83,164,0.30);
  }
  .vvs-btn-primary:hover::after {
    opacity: 1;
    animation: vvs-shimmer 0.7s ease;
  }
  .vvs-btn-primary:active { transform: scale(0.97); }
  .vvs-btn-primary:disabled {
    background: #8096B0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Verify button — full width variant */
  .vvs-btn-verify {
    width: 100%;
    background: linear-gradient(135deg, #0353A4 0%, #006DAA 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px 0;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.04em;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .vvs-btn-verify:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(3,83,164,0.35);
  }
  .vvs-btn-verify:active { transform: scale(0.98); }

  /* Back to home button */
  .vvs-btn-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1.5px solid rgba(3,83,164,0.18);
    border-radius: 10px;
    padding: 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #0353A4;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  }
  .vvs-btn-back:hover {
    background: rgba(3,83,164,0.10);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(3,83,164,0.12);
  }
  .vvs-btn-back:active { transform: scale(0.97); }

  /* Voter result card */
  .vvs-result-card {
    background: white;
    border: 1.5px solid rgba(0,109,170,0.20);
    border-radius: 16px;
    overflow: hidden;
    transition: box-shadow 0.25s;
  }
  .vvs-result-card:hover {
    box-shadow: 0 8px 32px rgba(3,83,164,0.12);
  }

  /* Status badge */
  .vvs-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
  }
  .vvs-badge-active {
    background: rgba(16,185,129,0.12);
    color: #059669;
    border: 1px solid rgba(16,185,129,0.25);
  }
  .vvs-badge-voted {
    background: rgba(239,68,68,0.10);
    color: #DC2626;
    border: 1px solid rgba(239,68,68,0.22);
  }

  /* Info row in voter card */
  .vvs-info-row {
    display: flex; align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(185,214,242,0.5);
    gap: 12px;
    transition: background 0.15s;
  }
  .vvs-info-row:last-child { border-bottom: none; }

  /* Spinner */
  .vvs-spinner {
    width: 18px; height: 18px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: vvs-spin 0.7s linear infinite;
  }

  /* Pulse dot */
  .vvs-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    animation: vvs-pulse 2s ease-in-out infinite;
  }

  /* Error shake */
  @keyframes vvs-shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  .vvs-shake { animation: vvs-shake 0.4s ease; }

  /* Scanline on ID strip */
  .vvs-scanline-wrap { position: relative; overflow: hidden; }
  .vvs-scanline-wrap::after {
    content: '';
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(3,83,164,0.3), transparent);
    animation: vvs-scanline 3s linear infinite;
    pointer-events: none;
  }
`;

/* ── Accent bar (matches Home.jsx) ── */
function AccentBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <div style={{ width: 32, height: 3, borderRadius: 2, background: "#0353A4" }} />
      <div style={{ width: 9, height: 3, borderRadius: 2, background: "#B9D6F2" }} />
    </div>
  );
}

/* ── Voter info field row ── */
function InfoRow({ icon, label, value, mono }) {
  return (
    <div className="vvs-info-row">
      <div
        style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0,
          background: "rgba(3,83,164,0.07)",
          border: "1px solid rgba(3,83,164,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "#8096B0", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
          {label}
        </div>
        <div style={{
          fontSize: 14, fontWeight: 600, color: "#061A40", marginTop: 1,
          fontFamily: mono ? "'DM Mono', monospace" : "'DM Sans', sans-serif",
        }}>
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function Search() {
  const [voterId, setVoterId]   = useState("");
  const [voter, setVoter]       = useState(null);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError("");
    setVoter(null);

    if (!voterId.trim()) {
      setError("Please enter a Voter ID to search.");
      setShakeKey(k => k + 1);
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const data = await getVoterById(voterId.trim());
      setVoter(data);
    } catch {
      setError("No voter record found for this ID. Please check and try again.");
      setShakeKey(k => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleVerifyClick = () => {
    if (voter) navigate(`/verify/${voter.voter_id}`);
  };

  const alreadyVoted = voter?.has_voted === true || voter?.status === "voted";

  return (
    <>
      <style>{styles}</style>

      {/* Page background — matches Home */}
      <div
        className="vvs-search"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #EBF3FB 0%, #D6E9F8 50%, #B9D6F2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "40px 16px 60px",
        }}
      >
        {/* ── Back to Home button ── */}
        <div className="vvs-fadeIn" style={{ width: "100%", maxWidth: 620, marginBottom: 20 }}>
          <button
            className="vvs-btn-back"
            onClick={() => navigate("/")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
        </div>

        {/* ── Page header ── */}
        <div className="vvs-fadeUp" style={{ textAlign: "center", marginBottom: 32, maxWidth: 520 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(3,83,164,0.08)",
              border: "1px solid rgba(3,83,164,0.15)",
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: 14,
            }}
          >
            <span
              className="vvs-dot"
              style={{ background: "#0353A4" }}
            />
            <span style={{ fontSize: 10, color: "#0353A4", letterSpacing: "0.12em", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
              VOTER SEARCH TERMINAL
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 32, fontWeight: 800,
              color: "#061A40",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Search <span style={{ color: "#0353A4" }}>Voter</span> Record
          </h1>
          <p style={{ fontSize: 13.5, color: "#4B6080", lineHeight: 1.65 }}>
            Enter a Voter ID to retrieve and verify voter details securely.
          </p>
        </div>

        {/* ── Main search card ── */}
        <div
          className="vvs-fadeUp vvs-d1"
          style={{
            width: "100%", maxWidth: 620,
            background: "rgba(255,255,255,0.42)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1.5px solid rgba(3,83,164,0.16)",
            borderRadius: 20,
            padding: "32px 32px 28px",
            boxShadow: "0 4px 24px rgba(3,83,164,0.08)",
          }}
        >
          {/* Card header */}
          <div className="vvs-slideIn" style={{ marginBottom: 22 }}>
            <AccentBar />
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 18, fontWeight: 800,
                color: "#061A40",
                marginTop: 6, marginBottom: 2,
              }}
            >
              Voter Lookup
            </h2>
            <p style={{ fontSize: 12.5, color: "#5A7090" }}>
              Enter the Voter ID exactly as it appears on the voter card.
            </p>
          </div>

          {/* Search bar */}
          <div
            key={`shake-${shakeKey}`}
            className={shakeKey > 0 ? "vvs-shake" : ""}
            style={{ display: "flex", gap: 10, alignItems: "center", position: "relative" }}
          >
            {/* Search icon inside input */}
            <div style={{ position: "relative", flex: 1 }}>
              <svg
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.4, pointerEvents: "none" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="#0353A4" strokeWidth="2"/>
                <path d="M16.5 16.5L21 21" stroke="#0353A4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                className="vvs-input"
                type="text"
                placeholder="e.g. VID-20240001"
                value={voterId}
                onChange={(e) => { setVoterId(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                style={{ width: "100%" }}
              />
            </div>

            <button
              className="vvs-btn-primary"
              onClick={handleSearch}
              disabled={loading}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {loading ? (
                <>
                  <div className="vvs-spinner" />
                  Searching…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2"/>
                    <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>

          {/* Hint */}
          <p style={{ fontSize: 11, color: "#8096B0", marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#8096B0" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#8096B0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Press <kbd style={{ background: "rgba(3,83,164,0.08)", border: "1px solid rgba(3,83,164,0.15)", borderRadius: 4, padding: "0 5px", fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#0353A4" }}>Enter</kbd> to search
          </p>

          {/* ── Error state ── */}
          {error && (
            <div
              className="vvs-resultIn"
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.22)",
                borderRadius: 10,
                display: "flex", alignItems: "flex-start", gap: 10,
              }}
            >
              <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#B91C1C", marginBottom: 2 }}>
                  Voter Not Found
                </p>
                <p style={{ fontSize: 12, color: "#7F1D1D" }}>{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Voter result card ── */}
        {voter && (
          <div
            className="vvs-result-card vvs-resultIn"
            style={{ width: "100%", maxWidth: 620, marginTop: 20 }}
          >
            {/* Card top accent strip */}
            <div
              style={{
                height: 4,
                background: alreadyVoted
                  ? "linear-gradient(90deg, #DC2626, #F87171)"
                  : "linear-gradient(90deg, #0353A4, #006DAA)",
              }}
            />

            {/* Header row */}
            <div
              className="vvs-scanline-wrap"
              style={{
                padding: "18px 24px 14px",
                background: alreadyVoted
                  ? "rgba(239,68,68,0.04)"
                  : "rgba(3,83,164,0.04)",
                borderBottom: "1px solid rgba(185,214,242,0.6)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 8,
              }}
            >
              <div>
                <AccentBar />
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 17, fontWeight: 800,
                    color: "#061A40", marginTop: 4,
                  }}
                >
                  Voter Details
                </h2>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Voter ID pill */}
                <div
                  style={{
                    background: "rgba(3,83,164,0.08)",
                    border: "1px solid rgba(3,83,164,0.18)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12, fontWeight: 500, color: "#0353A4",
                  }}
                >
                  {voter.voter_id}
                </div>

                {/* Vote status badge */}
                <span className={`vvs-badge ${alreadyVoted ? "vvs-badge-voted" : "vvs-badge-active"}`}>
                  <span
                    className="vvs-dot"
                    style={{
                      width: 6, height: 6,
                      background: alreadyVoted ? "#DC2626" : "#10B981",
                    }}
                  />
                  {alreadyVoted ? "Already Voted" : "Not Yet Voted"}
                </span>
              </div>
            </div>

            {/* Info rows */}
            <div style={{ padding: "8px 24px 4px" }}>
              {/* If VoterProfile handles all fields, render it; else show fallback rows */}
              {typeof VoterProfile === "function" ? (
                <VoterProfile voter={voter} />
              ) : (
                <>
                  <InfoRow icon="👤" label="Full Name"     value={voter.name}           />
                  <InfoRow icon="🪪" label="Voter ID"      value={voter.voter_id} mono  />
                  <InfoRow icon="🗺️" label="Constituency"  value={voter.constituency}   />
                  <InfoRow icon="🎂" label="Date of Birth" value={voter.dob}            />
                  <InfoRow icon="🏠" label="Address"       value={voter.address}        />
                </>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(185,214,242,0.7)", margin: "4px 24px 0" }} />

            {/* CTA footer */}
            <div style={{ padding: "18px 24px 22px" }}>
              {alreadyVoted ? (
                <div
                  style={{
                    padding: "14px 16px",
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 10,
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <div style={{ fontSize: 24 }}>🚫</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#B91C1C", marginBottom: 2 }}>
                      Duplicate Vote Blocked
                    </p>
                    <p style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5 }}>
                      This voter has already cast their vote. Verification cannot proceed.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className="vvs-btn-verify"
                    onClick={handleVerifyClick}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="white" fillOpacity="0.9"/>
                      <path d="M9 12l2 2 4-4" stroke="#061A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Proceed to Face Verification
                  </button>
                  <p style={{ textAlign: "center", fontSize: 11, color: "#8096B0", marginTop: 8 }}>
                    Facial recognition will be used to confirm identity
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Empty state hint ── */}
        {!voter && !error && !loading && (
          <div
            className="vvs-fadeIn vvs-d3"
            style={{
              marginTop: 24, textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}
          >
            <div style={{ fontSize: 36, opacity: 0.3 }}>🔍</div>
            <p style={{ fontSize: 12, color: "#8096B0" }}>Search results will appear here</p>
          </div>
        )}

      </div>
    </>
  );
}