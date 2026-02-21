"use client";

import Script from "next/script";
import { useRef, useState } from "react";

declare global {
  interface Window {
    supabase: {
      createClient: (url: string, key: string) => {
        from: (table: string) => {
          insert: (data: Record<string, string>) => Promise<{ error: { code?: string } | null }>;
        };
      };
    };
  }
}

export default function BetaPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    setErrorMsg("");

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const role = (document.querySelector('input[name="role"]:checked') as HTMLInputElement | null)?.value;

    if (!name || !email || !role) {
      setErrorMsg("Please fill in all fields and select a role.");
      return;
    }

    setSubmitting(true);

    try {
      const sb = window.supabase.createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { error } = await sb.from("waitlist").insert({ name, email, role });

      if (error) {
        setErrorMsg(
          error.code === "23505"
            ? "This email is already on the list!"
            : "Something went wrong. Please try again."
        );
        setSubmitting(false);
        return;
      }

      setShowSuccess(true);
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
        strategy="beforeInteractive"
      />
      <style>{`
        :root {
          --lime: #BFFF00;
          --lime-dim: rgba(191, 255, 0, 0.15);
          --bg: #0A0A0A;
          --bg-card: #111111;
          --text: #E8E8E8;
          --text-dim: #888888;
          --border: rgba(255,255,255,0.08);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Instrument Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          -webkit-font-smoothing: antialiased;
        }

        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }

        .orb { position: fixed; border-radius: 50%; filter: blur(120px); animation: float 20s ease-in-out infinite; z-index: 0; }
        .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(191,255,0,0.1), transparent 70%); top: -200px; left: -100px; }
        .orb-2 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(191,255,0,0.06), transparent 70%); bottom: -100px; right: -50px; animation-delay: -7s; }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logo {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .logo span { color: var(--lime); }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem 2rem;
        }

        .card h1 { font-size: 1.4rem; font-weight: 600; margin-bottom: 0.4rem; }
        .card .sub { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 2rem; line-height: 1.5; }

        .field { margin-bottom: 1.25rem; }
        .field label { display: block; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.03em; margin-bottom: 0.4rem; }

        .field input {
          width: 100%;
          padding: 12px 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .field input:focus { border-color: var(--lime); }
        .field input::placeholder { color: #444; }

        .role-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
        .role-option input { position: absolute; opacity: 0; pointer-events: none; }

        .role-option label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 1.1rem 0.5rem 1rem;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }

        .role-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-icon svg {
          width: 100%;
          height: 100%;
          stroke: var(--text-dim);
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.3s;
        }

        .role-option input:checked + label .role-icon svg {
          stroke: var(--lime);
        }

        .role-option label .text { font-size: 0.78rem; font-weight: 500; }
        .role-option input:checked + label { border-color: var(--lime); background: var(--lime-dim); }
        .role-option label:hover { border-color: rgba(191,255,0,0.35); }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: var(--lime);
          color: var(--bg);
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 0.5rem;
        }
        .submit-btn:hover { background: #d4ff4a; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(191,255,0,0.2); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        .note { text-align: center; font-size: 0.72rem; color: var(--text-dim); margin-top: 0.85rem; }

        .error-msg { color: #ff6b6b; font-size: 0.78rem; margin-bottom: 1rem; }

        .success { text-align: center; padding: 1.5rem 0; animation: fadeUp 0.4s ease both; }
        .success .check { width: 56px; height: 56px; background: var(--lime-dim); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .success .check svg { width: 24px; height: 24px; stroke: var(--lime); fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .success h2 { font-size: 1.2rem; margin-bottom: 0.35rem; }
        .success p { color: var(--text-dim); font-size: 0.9rem; }

        @media (max-width: 480px) {
          .card { padding: 2rem 1.5rem; }
          .role-options { grid-template-columns: 1fr; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="container">
        <div className="logo">POCKET<span>MLO</span></div>
        <div className="card">
          {!showSuccess ? (
            <div id="form-fields">
              <h1>Stay in the loop.</h1>
              <p className="sub">AI-powered mortgage intelligence is coming. Get updates.</p>
              {errorMsg && <div className="error-msg">{errorMsg}</div>}
              <div className="field">
                <label>Name</label>
                <input type="text" ref={nameRef} placeholder="Your name" autoComplete="name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" ref={emailRef} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="field">
                <label>I&apos;m interested as a...</label>
                <div className="role-options">
                  <div className="role-option">
                    <input type="radio" name="role" id="r-buyer" value="buyer" />
                    <label htmlFor="r-buyer">
                      <div className="role-icon">
                        <svg viewBox="0 0 36 36">
                          <path d="M4 17L18 5L32 17" />
                          <path d="M7 15V30H15V22H21V30H29V15" />
                        </svg>
                      </div>
                      <span className="text">Buyer</span>
                    </label>
                  </div>
                  <div className="role-option">
                    <input type="radio" name="role" id="r-agent" value="agent" />
                    <label htmlFor="r-agent">
                      <div className="role-icon">
                        <svg viewBox="0 0 36 36">
                          <rect x="9" y="3" width="18" height="30" rx="3" />
                          <line x1="15" y1="28" x2="21" y2="28" />
                          <line x1="15" y1="7" x2="21" y2="7" />
                        </svg>
                      </div>
                      <span className="text">Agent</span>
                    </label>
                  </div>
                  <div className="role-option">
                    <input type="radio" name="role" id="r-curious" value="curious" />
                    <label htmlFor="r-curious">
                      <div className="role-icon">
                        <svg viewBox="0 0 36 36">
                          <circle cx="12" cy="14" r="5" />
                          <circle cx="24" cy="14" r="5" />
                          <path d="M17 14C17 12.5 19 12.5 19 14" />
                          <line x1="7" y1="14" x2="4" y2="12.5" />
                          <line x1="29" y1="14" x2="32" y2="12.5" />
                          <path d="M10 24C10 21 14 21 18 24C22 21 26 21 26 24" strokeWidth="1.8" />
                        </svg>
                      </div>
                      <span className="text">Curious</span>
                    </label>
                  </div>
                </div>
              </div>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Join Waitlist"}
              </button>
              <p className="note">No spam. Just updates when they matter.</p>
            </div>
          ) : (
            <div className="success">
              <div className="check">
                <svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6" /></svg>
              </div>
              <h2>You&apos;re on the list.</h2>
              <p>We&apos;ll reach out when there&apos;s something worth sharing.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
