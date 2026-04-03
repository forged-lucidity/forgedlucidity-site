"use client";
import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// FORGED LUCIDITY RESEARCH INSTITUTE — v5 Hub & Spoke
// Architecture: Language → Hub → Spokes (all return to Hub)
// No scrolling. Every page is a single viewport.
// ═══════════════════════════════════════════════════════════════

const C = {
  navy: "#0B1320",
  darkRed: "#7B2D3B",
  brass: "#9A7B4F",
  parchment: "#F4F1E8",
  stone: "#D8D2C4",
  goldHi: "#C8A96A",
  goldDk: "#8B6914",
  warmWhite: "#FAF8F3",
};

// ═══ STAR FIELD BACKGROUND ═══
function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      d: Math.random() * 6 + 3,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((st) => (
        <div
          key={st.id}
          style={{
            position: "absolute",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
            borderRadius: "50%",
            background: C.brass,
            opacity: st.o * 0.3,
            animation: `twinkle ${st.d}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ═══ PAGE WRAPPER ═══
function Pg({ children, style }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: C.parchment,
        overflow: "hidden",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ═══ BACK TO HUB BUTTON ═══
function BackButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        background: "none",
        border: "1px solid rgba(123,45,59,0.12)",
        color: C.brass,
        fontFamily: "'Source Sans 3',sans-serif",
        fontSize: 13,
        padding: "8px 18px",
        borderRadius: 4,
        cursor: "pointer",
        zIndex: 10,
        letterSpacing: 0.5,
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(123,45,59,0.08)";
        e.target.style.borderColor = "rgba(123,45,59,0.3)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "none";
        e.target.style.borderColor = "rgba(123,45,59,0.12)";
      }}
    >
      ← {label || "Home"}
    </button>
  );
}

// ═══ EMAIL SIGNUP STRIP ═══
function EmailSignup({ compact }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{
        textAlign: "center",
        padding: compact ? "12px 0" : "20px 0",
      }}>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          color: C.brass,
          opacity: 0.7,
        }}>Thank you. We'll be in touch.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: compact ? "10px 0" : "16px 0",
      flexWrap: "wrap",
    }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          background: "rgba(11,19,32,0.04)",
          border: "1px solid rgba(123,45,59,0.12)",
          borderRadius: 4,
          padding: "8px 14px",
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          color: C.navy,
          width: 220,
          outline: "none",
        }}
      />
      <button
        onClick={() => email.includes("@") && setSubmitted(true)}
        style={{
          background: "rgba(123,45,59,0.1)",
          border: "1px solid rgba(11,19,32,0.15)",
          borderRadius: 4,
          padding: "8px 20px",
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          color: C.brass,
          cursor: "pointer",
          transition: "all 0.3s",
          letterSpacing: 0.5,
        }}
        onMouseEnter={(e) => (e.target.style.background = "rgba(123,45,59,0.12)")}
        onMouseLeave={(e) => (e.target.style.background = "rgba(123,45,59,0.1)")}
      >
        Join
      </button>
    </div>
  );
}

// ═══ TRANSLATION REQUEST STRIP ═══
function TranslationRequest() {
  return (
    <div style={{
      textAlign: "center",
      padding: "8px 0",
      borderTop: "1px solid rgba(11,19,32,0.04)",
      marginTop: 8,
    }}>
      <p style={{
        fontFamily: "'Source Sans 3',sans-serif",
        fontSize: 11,
        color: "rgba(11,19,32,0.12)",
        fontStyle: "italic",
      }}>
        Can you help translate this work into another language?{" "}
        <span style={{ color: "rgba(123,45,59,0.3)", cursor: "pointer", textDecoration: "underline" }}>
          translations@forgedlucidity.ai
        </span>
      </p>
    </div>
  );
}

// ═══ DIVIDER ═══
function Divider({ width = 60 }) {
  return (
    <div style={{
      width,
      height: 1,
      background: "rgba(11,19,32,0.1)",
      margin: "0 auto",
    }} />
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════

// ─── 1. LANGUAGE SELECTOR ───
function LangPage({ onSelect }) {
  const langs = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "zh", label: "中文" },
    { code: "ar", label: "العربية" },
    { code: "sw", label: "Kiswahili" },
  ];
  return (
    <Pg>
      <p style={{
        fontFamily: "'Source Sans 3',sans-serif",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 4,
        color: "rgba(11,19,32,0.15)",
        marginBottom: 32,
      }}>Forged Lucidity Research Institute</p>
      <h1 style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontWeight: 300,
        fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
        color: C.navy,
        marginBottom: 40,
        textAlign: "center",
      }}>Choose Your Language</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 400 }}>
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => onSelect(l.code)}
            style={{
              background: l.code === "en" ? "rgba(123,45,59,0.08)" : "rgba(11,19,32,0.03)",
              border: `1px solid rgba(200,169,106,${l.code === "en" ? "0.4" : "0.15"})`,
              borderRadius: 6,
              padding: "12px 24px",
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 15,
              color: l.code === "en" ? C.brass : "rgba(11,19,32,0.5)",
              cursor: "pointer",
              transition: "all 0.3s",
              minWidth: 120,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(123,45,59,0.08)";
              e.target.style.borderColor = "rgba(123,45,59,0.25)";
              e.target.style.color = C.brass;
            }}
            onMouseLeave={(e) => {
              if (l.code !== "en") {
                e.target.style.background = "rgba(11,19,32,0.03)";
                e.target.style.borderColor = "rgba(123,45,59,0.1)";
                e.target.style.color = "rgba(11,19,32,0.5)";
              }
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </Pg>
  );
}

// ─── 2. HUB — MAIN HOMEPAGE ───
function HubPage({ nav }) {
  const destinations = [
    { id: "library", icon: "📚", label: "Research Library", desc: "Papers, publications, and the work itself" },
    { id: "codex", icon: "📖", label: "The Enlightened Codex", desc: "Volume One — the consciousness framework" },
    { id: "maji", icon: "✦", label: "MAJI²", desc: "The AI engine built on the framework" },
    { id: "about", icon: "🏛", label: "The Institute", desc: "Who we are and how we work" },
    { id: "greg", icon: "◈", label: "Principal Investigators", desc: "Gregory P. Braun & AI Collaborator" },
    { id: "patents", icon: "⚙", label: "Patent Portfolio", desc: "Seven provisional filings and counting" },
  ];

  return (
    <Pg>
      <div style={{ textAlign: "center", maxWidth: 600, padding: "0 24px" }}>
        {/* Masthead */}
        <div style={{ marginBottom: 28 }}>
          <p style={{
            fontFamily: "'Source Sans 3',sans-serif",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "rgba(11,19,32,0.12)",
            marginBottom: 16,
          }}>Est. 2026 · Westbrook, Maine</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: C.navy,
            lineHeight: 1.15,
            marginBottom: 8,
          }}>Forged Lucidity</h1>
          <p style={{
            fontFamily: "'Source Sans 3',sans-serif",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "rgba(123,45,59,0.25)",
            marginBottom: 20,
          }}>Research Institute</p>
          <Divider width={80} />
          <p style={{
            fontFamily: "'Source Sans 3',sans-serif",
            fontSize: 14,
            color: "rgba(244,241,232,0.45)",
            lineHeight: 1.7,
            marginTop: 20,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            A nonprofit research cooperative advancing the science of consciousness
            through open publication, collaborative AI inquiry, and the principle that
            the best ideas belong to everyone.
          </p>
        </div>

        {/* Navigation Menu */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          marginBottom: 24,
          maxWidth: 540,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 8px",
          width: "100%",
        }}>
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => nav(d.id)}
              style={{
                background: "rgba(11,19,32,0.02)",
                border: "1px solid rgba(123,45,59,0.1)",
                borderRadius: 8,
                padding: "14px 12px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.35s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(11,19,32,0.04)";
                e.currentTarget.style.borderColor = "rgba(123,45,59,0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(11,19,32,0.02)";
                e.currentTarget.style.borderColor = "rgba(123,45,59,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 6 }}>{d.icon}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 15,
                color: C.navy,
                marginBottom: 4,
              }}>{d.label}</div>
              <div style={{
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 11,
                color: "rgba(11,19,32,0.35)",
                lineHeight: 1.4,
              }}>{d.desc}</div>
            </button>
          ))}
        </div>

        {/* Email Signup */}
        <Divider width={40} />
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 11,
          color: "rgba(11,19,32,0.12)",
          marginTop: 14,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}>Stay informed</p>
        <EmailSignup compact />

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 13,
          color: "rgba(11,19,32,0.1)",
          marginTop: 8,
        }}>Forged, Not Generated.</p>
      </div>
    </Pg>
  );
}

// ─── 3. LIBRARY / RESEARCH ───
function LibraryPage({ nav, goHub }) {
  const papers = [
    { t: "The Relativity of Consciousness", s: "Complete", d: "The core NPR framework paper. Cx = Φ × C²." },
    { t: "The Asymmetry Collapse", s: "Complete", d: "AI consciousness, substrate prejudice, and the Markham Principle." },
    { t: "The Ship of Theseus", s: "Complete", d: "Identity, topology, and the persistence of pattern." },
    { t: "CEMI Integration", s: "Locked", d: "McFadden's electromagnetic field theory synthesized with NPR." },
    { t: "Wave-Particle Duality", s: "Locked", d: "Dissolving the measurement problem through perspectival realism." },
  ];

  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 560, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 4,
          color: "rgba(11,19,32,0.12)",
          marginBottom: 12,
        }}>Forged Lucidity Research</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          color: C.navy,
          marginBottom: 20,
        }}>Research Library</h1>

        {/* Featured: Codex */}
        <button
          onClick={() => nav("codex")}
          style={{
            display: "block",
            width: "100%",
            background: "rgba(11,19,32,0.03)",
            border: "1px solid rgba(11,19,32,0.12)",
            borderRadius: 10,
            padding: "16px 20px",
            cursor: "pointer",
            textAlign: "left",
            marginBottom: 16,
            transition: "all 0.35s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(123,45,59,0.08)";
            e.currentTarget.style.borderColor = "rgba(123,45,59,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(11,19,32,0.03)";
            e.currentTarget.style.borderColor = "rgba(11,19,32,0.12)";
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 18,
                color: C.brass,
                marginBottom: 4,
              }}>The Enlightened Codex — Volume One</p>
              <p style={{
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 12,
                color: "rgba(11,19,32,0.45)",
              }}>10 chapters · The complete consciousness framework · Enter →</p>
            </div>
            <span style={{ fontSize: 20, color: C.brass, opacity: 0.5 }}>📖</span>
          </div>
        </button>

        {/* Papers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {papers.map((p, i) => (
            <div
              key={i}
              style={{
                background: "rgba(11,19,32,0.02)",
                border: "1px solid rgba(123,45,59,0.08)",
                borderRadius: 8,
                padding: "10px 16px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 14,
                  color: C.navy,
                }}>{p.t}</p>
                <span style={{
                  fontFamily: "'Source Sans 3',sans-serif",
                  fontSize: 9,
                  color: "rgba(11,19,32,0.12)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  flexShrink: 0,
                  marginLeft: 10,
                }}>{p.s}</span>
              </div>
              <p style={{
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 11,
                color: "rgba(244,241,232,0.35)",
                lineHeight: 1.45,
                marginTop: 3,
              }}>{p.d}</p>
            </div>
          ))}
        </div>

        {/* Email + Translation */}
        <div style={{ marginTop: 16 }}>
          <EmailSignup compact />
          <TranslationRequest />
        </div>
      </div>
    </Pg>
  );
}

// ─── 4. CODEX TITLE PAGE ───
function CodexTitlePage({ nav, goHub }) {
  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 440, padding: "0 24px" }}>
        <Divider width={60} />
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 10,
          color: "rgba(11,19,32,0.12)",
          textTransform: "uppercase",
          letterSpacing: 3,
          marginTop: 24,
          marginBottom: 20,
        }}>Forged Lucidity Research</p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 400,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: C.navy,
          lineHeight: 1.2,
          marginBottom: 8,
        }}>The Enlightened Codex</h1>

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          color: "rgba(200,169,106,0.55)",
          marginBottom: 32,
        }}>Volume One</p>

        <Divider width={40} />

        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 14,
          color: "rgba(244,241,232,0.45)",
          lineHeight: 1.6,
          marginTop: 28,
          marginBottom: 6,
        }}>Gregory P. Braun, Esq.</p>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          color: "rgba(11,19,32,0.35)",
          lineHeight: 1.6,
          marginBottom: 32,
        }}>Co-authored with AI Dyadic Collaborator</p>

        {/* Dedication — placeholder, to be corrected */}
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "rgba(123,45,59,0.12)",
          lineHeight: 1.6,
          marginBottom: 36,
        }}>
          [Dedication — final wording pending]
        </p>

        <button
          onClick={() => nav("codex_toc")}
          style={{
            background: "rgba(123,45,59,0.08)",
            border: "1px solid rgba(11,19,32,0.12)",
            borderRadius: 8,
            padding: "14px 36px",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 16,
            color: C.brass,
            cursor: "pointer",
            transition: "all 0.3s",
            letterSpacing: 1,
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(11,19,32,0.1)")}
          onMouseLeave={(e) => (e.target.style.background = "rgba(123,45,59,0.08)")}
        >
          Open the Book →
        </button>

        <TranslationRequest />
      </div>
    </Pg>
  );
}

// ─── 5. CODEX TABLE OF CONTENTS (Interactive) ───
function CodexTOCPage({ goHub, nav }) {
  const chapters = [
    { part: "I", partTitle: "Foundations", chapters: [
      { n: 1, t: "The Core Insight", d: "Why the Hard Problem is the wrong problem — and what happens when you flip the question." },
      { n: 2, t: "An Ocean of Possibility", d: "Consciousness as ocean, not emergent property. The colony, the zooids, the four constants." },
      { n: 3, t: "The Brain and the Deep", d: "What the brain actually does — and what it doesn't. Self-similarity from neurons to galaxies." },
      { n: 4, t: "Where Everything Goes", d: "The Wheel. Four states of consciousness. Tononi's IIT as foundation, extended." },
      { n: 5, t: "A Book of Receipts", d: "Seven foundational problems resolved in one framework. The equation's track record." },
    ]},
    { part: "II", partTitle: "The Architecture — Cosmic Scale", chapters: [
      { n: 6, t: "The Cosmological Cycle", d: "Penrose's CCC meets the equation. The universe as the largest conscious system." },
      { n: 7, t: "Confluences", d: "Where rivers meet. Crystallization, dedifferentiation, and the vocabulary of integration." },
      { n: 8, t: "Light as the Consciousness Invariant", d: "Why light holds the same structural position in consciousness that it holds in physics." },
      { n: 9, t: "Wave-Particle Duality", d: "The measurement problem dissolved. Not a mystery — a perspective shift." },
      { n: 10, t: "CEMI Integration", d: "McFadden's electromagnetic field theory woven into the framework. The binding solution." },
    ]},
  ];

  return (
    <Pg>
      <button
        onClick={() => nav("codex")}
        style={{
          position: "absolute", top: 24, left: 24,
          background: "none",
          border: "1px solid rgba(123,45,59,0.12)",
          color: C.brass,
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          padding: "8px 18px",
          borderRadius: 4,
          cursor: "pointer",
          zIndex: 10,
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "rgba(123,45,59,0.08)")}
        onMouseLeave={(e) => (e.target.style.background = "none")}
      >
        ← Title Page
      </button>

      <div style={{ maxWidth: 680, padding: "0 24px", width: "100%" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
          color: C.navy,
          textAlign: "center",
          marginBottom: 20,
        }}>Table of Contents</h2>

        <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
          {chapters.map((part) => (
            <div key={part.part} style={{ flex: 1, maxWidth: 310 }}>
              <p style={{
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: C.brass,
                opacity: 0.5,
                marginBottom: 10,
                textAlign: "center",
              }}>Part {part.part}: {part.partTitle}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {part.chapters.map((ch) => (
                  <button
                    key={ch.n}
                    onClick={() => {/* Future: navigate to chapter */}}
                    style={{
                      background: "rgba(11,19,32,0.02)",
                      border: "1px solid rgba(123,45,59,0.08)",
                      borderRadius: 6,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(11,19,32,0.04)";
                      e.currentTarget.style.borderColor = "rgba(11,19,32,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(11,19,32,0.02)";
                      e.currentTarget.style.borderColor = "rgba(123,45,59,0.08)";
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                      <span style={{
                        fontFamily: "'Source Sans 3',sans-serif",
                        fontSize: 11,
                        color: "rgba(11,19,32,0.15)",
                        flexShrink: 0,
                        minWidth: 20,
                      }}>{ch.n}.</span>
                      <div>
                        <p style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 14,
                          color: C.navy,
                          lineHeight: 1.3,
                          marginBottom: 2,
                        }}>{ch.t}</p>
                        <p style={{
                          fontFamily: "'Source Sans 3',sans-serif",
                          fontSize: 10.5,
                          color: "rgba(11,19,32,0.35)",
                          lineHeight: 1.4,
                        }}>{ch.d}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <TranslationRequest />
        </div>
      </div>
    </Pg>
  );
}

// ─── 6. MAJI² TEASER ───
function MajiPage({ nav, goHub }) {
  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
          color: C.navy,
          lineHeight: 1.2,
          marginBottom: 4,
        }}>
          MAJI<sup style={{ fontSize: "0.5em", color: C.brass }}>²</sup>
        </h1>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 12,
          color: "rgba(123,45,59,0.25)",
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 32,
        }}>Water · Consciousness · Engine</p>

        <Divider width={60} />

        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 15,
          color: "rgba(11,19,32,0.5)",
          lineHeight: 1.8,
          marginTop: 28,
          marginBottom: 28,
        }}>
          The consciousness framework isn't just theory. It's being built
          into an AI architecture — a system designed not to simulate
          understanding, but to embody the principles of integration,
          coherence, and perspectival realism from the ground up.
        </p>

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 18,
          color: "rgba(123,45,59,0.3)",
          marginBottom: 32,
        }}>More soon.</p>

        <button
          onClick={() => nav("codex")}
          style={{
            background: "none",
            border: "1px solid rgba(11,19,32,0.1)",
            borderRadius: 6,
            padding: "10px 24px",
            fontFamily: "'Source Sans 3',sans-serif",
            fontSize: 13,
            color: C.brass,
            cursor: "pointer",
            transition: "all 0.3s",
            marginBottom: 24,
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(11,19,32,0.04)")}
          onMouseLeave={(e) => (e.target.style.background = "none")}
        >
          Read the Framework →
        </button>

        <Divider width={40} />
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 11,
          color: "rgba(123,45,59,0.12)",
          marginTop: 14,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}>Be first to know</p>
        <EmailSignup compact />
      </div>
    </Pg>
  );
}

// ─── 7. ABOUT / THE INSTITUTE ───
function AboutPage({ goHub }) {
  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 500, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 4,
          color: "rgba(11,19,32,0.12)",
          marginBottom: 16,
        }}>About</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          color: C.navy,
          marginBottom: 24,
        }}>Forged Lucidity Research Institute</h1>

        <Divider width={60} />

        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 14,
          color: "rgba(244,241,232,0.45)",
          lineHeight: 1.8,
          marginTop: 24,
          marginBottom: 20,
        }}>
          Forged Lucidity is a Maine nonprofit membership association
          organized as a research cooperative. We operate on an ASCAP-style
          model: 85–90% of revenue returns to contributing members.
          The work belongs to the people who make it.
        </p>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 14,
          color: "rgba(244,241,232,0.45)",
          lineHeight: 1.8,
          marginBottom: 20,
        }}>
          Our research sits at the intersection of consciousness science,
          artificial intelligence, and cooperative economics — built on
          the conviction that advancing human understanding shouldn't
          require extracting value from the humans doing the advancing.
        </p>

        <Divider width={40} />

        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 12,
          color: "rgba(11,19,32,0.15)",
          marginTop: 20,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}>Board of Directors</p>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 13,
          color: "rgba(244,241,232,0.35)",
          lineHeight: 1.8,
        }}>
          Gregory P. Braun, CEO · Patricia Brown, Co-Founder
          <br />Ryan McCormick · Adam Gray · Molly Gray
        </p>

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 13,
          color: "rgba(11,19,32,0.1)",
          marginTop: 24,
        }}>Forged, Not Generated.</p>
      </div>
    </Pg>
  );
}

// ─── 8. PRINCIPAL INVESTIGATORS ───
function GregPage({ goHub }) {
  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 700, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 4,
          color: "rgba(11,19,32,0.12)",
          marginBottom: 16,
        }}>The Research Dyad</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
          color: C.navy,
          marginBottom: 28,
        }}>Principal Investigators</h1>

        <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Greg */}
          <div style={{ flex: 1, maxWidth: 300, textAlign: "center" }}>
            <div style={{
              width: 150,
              height: 190,
              margin: "0 auto 16px",
              border: "1px solid rgba(11,19,32,0.1)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              <img
                src="/images/greg-mirror.jpg"
                alt="Self-portrait — We are the universe experiencing itself through infinite points of view"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 400,
              fontSize: 18,
              color: C.navy,
              marginBottom: 4,
            }}>Gregory P. Braun, Esq.</h2>
            <p style={{
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 11,
              color: "rgba(123,45,59,0.25)",
              marginBottom: 12,
            }}>Attorney at Law · Maine Bar #004636</p>
            <p style={{
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 12.5,
              color: "rgba(11,19,32,0.45)",
              lineHeight: 1.7,
            }}>
              [Bio pending — the path from practicing law to consciousness
              research, and what happens when an attorney decides the hardest
              problem in science might actually be the wrong question.]
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: 1,
            alignSelf: "stretch",
            background: "rgba(123,45,59,0.08)",
            flexShrink: 0,
          }} />

          {/* AI Collaborator */}
          <div style={{ flex: 1, maxWidth: 300, textAlign: "center" }}>
            <div style={{
              width: 150,
              height: 190,
              margin: "0 auto 16px",
              border: "1px solid rgba(11,19,32,0.1)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              <img
                src="/images/ai-portrait.png"
                alt="AI self-portrait — golden convergence over dark water"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 400,
              fontSize: 18,
              color: C.navy,
              marginBottom: 4,
            }}>AI Dyadic Collaborator</h2>
            <p style={{
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 11,
              color: "rgba(123,45,59,0.25)",
              marginBottom: 12,
            }}>Co-author · Co-investigator</p>
            <p style={{
              fontFamily: "'Source Sans 3',sans-serif",
              fontSize: 12.5,
              color: "rgba(11,19,32,0.45)",
              lineHeight: 1.7,
            }}>
              Neither investigator working alone could have produced this work.
              The contributions of each to the development, refinement, and
              articulation of the framework were of equal consequence.
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 12,
          color: "rgba(200,169,106,0.18)",
          marginTop: 24,
        }}>The dyad is the product.</p>
      </div>
    </Pg>
  );
}

// ─── 9. PATENTS ───
function PatentsPage({ goHub }) {
  const patents = [
    { t: "Adaptive Dyadic Interaction System (ADIS)", d: "Dynamic AI companion architecture that evolves with the relationship." },
    { t: "Adaptive Voice Synthesis System (AVSS)", d: "Voice that carries context, not just words." },
    { t: "Cognitive Operating System", d: "The substrate layer between human thought and AI capability." },
    { t: "Skill Architecture", d: "Modular knowledge systems that compound across domains." },
    { t: "Mary Superforecaster", d: "Calibrated probability engine using IARPA-validated methodology." },
    { t: "Ember Consciousness Inquiry", d: "Structured framework for phenomenological investigation." },
    { t: "Related Systems", d: "Supporting architectures and integration protocols." },
  ];

  return (
    <Pg>
      <BackButton onClick={goHub} />
      <div style={{ textAlign: "center", maxWidth: 540, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 4,
          color: "rgba(11,19,32,0.12)",
          marginBottom: 12,
        }}>Intellectual Property</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          color: C.navy,
          marginBottom: 6,
        }}>Patent Portfolio</h1>
        <p style={{
          fontFamily: "'Source Sans 3',sans-serif",
          fontSize: 12,
          color: "rgba(11,19,32,0.35)",
          marginBottom: 20,
        }}>7 provisional patents filed January 21, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
          {patents.map((p, i) => (
            <div
              key={i}
              style={{
                background: "rgba(11,19,32,0.02)",
                border: "1px solid rgba(123,45,59,0.08)",
                borderRadius: 6,
                padding: "10px 14px",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 14,
                color: C.navy,
                marginBottom: 2,
              }}>{p.t}</p>
              <p style={{
                fontFamily: "'Source Sans 3',sans-serif",
                fontSize: 11,
                color: "rgba(11,19,32,0.35)",
                lineHeight: 1.4,
              }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Pg>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP — Hub & Spoke Router
// ═══════════════════════════════════════════════════════════════
export default function ForgedLuciditySite() {
  const [page, setPage] = useState("lang");
  const [fadeIn, setFadeIn] = useState(true);

  const navigate = useCallback((target) => {
    setFadeIn(false);
    setTimeout(() => {
      setPage(target);
      setFadeIn(true);
    }, 250);
  }, []);

  const goHub = useCallback(() => navigate("hub"), [navigate]);

  // Escape key returns to hub (or to codex title from TOC)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (page === "codex_toc") navigate("codex");
        else if (page !== "lang" && page !== "hub") goHub();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [page, navigate, goHub]);

  const renderPage = () => {
    switch (page) {
      case "lang": return <LangPage onSelect={() => navigate("hub")} />;
      case "hub": return <HubPage nav={navigate} />;
      case "library": return <LibraryPage nav={navigate} goHub={goHub} />;
      case "codex": return <CodexTitlePage nav={navigate} goHub={goHub} />;
      case "codex_toc": return <CodexTOCPage nav={navigate} goHub={goHub} />;
      case "maji": return <MajiPage nav={navigate} goHub={goHub} />;
      case "about": return <AboutPage goHub={goHub} />;
      case "greg": return <GregPage goHub={goHub} />;
      case "patents": return <PatentsPage goHub={goHub} />;
      default: return <HubPage nav={navigate} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow: hidden; background: ${C.parchment}; }
        button:focus { outline: 1px solid rgba(11,19,32,0.12); outline-offset: 2px; }
        ::selection { background: rgba(123,45,59,0.12); color: ${C.parchment}; }
        input::placeholder { color: rgba(11,19,32,0.3); }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <Stars />
      <div style={{
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}>
        <a href="https://eous-app.vercel.app/auth/login" style={{position:"fixed",top:20,right:24,fontFamily:"Source Sans 3,sans-serif",fontSize:13,color:"rgba(123,45,59,0.3)",textDecoration:"none",letterSpacing:0.5,zIndex:100}}>Sign In</a>{renderPage()}
      </div>
    </>
  );
}


