"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const phrases = [
      "What are mortgages priced at today?",
      "How much can I afford?",
      "Where can I find my W2?",
      "Let's lock the rate and close",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    const pauseBeforeDelete = 1500;
    let timeoutId: ReturnType<typeof setTimeout>;

    function type() {
      const current = phrases[phraseIndex];
      const typingElement = document.getElementById("typingText");
      if (!typingElement) return;

      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseBeforeDelete);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutId = setTimeout(type, 500);
        return;
      }

      timeoutId = setTimeout(type, typingSpeed);
    }

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          color: #fff;
          background: #1e1f20;
        }

        header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(30, 31, 32, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #2a2b2c;
          z-index: 1000;
        }

        nav {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 3rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #E4F222;
        }

        .hero {
          margin-top: 80px;
          padding: 10rem 3rem 8rem;
          text-align: center;
          background: #1e1f20;
        }

        .hero-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: 5.5rem;
          font-weight: 700;
          margin-bottom: 4rem;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .chat-demo {
          max-width: 600px;
          margin: 0 auto;
          background: #2a2b2c;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          min-height: 120px;
          display: flex;
          align-items: center;
        }

        .typing-text {
          font-size: 1.1rem;
          color: #E4F222;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
          position: relative;
        }

        .typing-text::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }

        .btn-primary {
          background: #E4F222;
          color: #000;
        }

        .btn-primary:hover {
          background: #d4e212;
        }

        .two-part-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3rem 8rem;
        }

        .two-part-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .audience-block {
          padding: 4rem 3rem;
          background: #0a0a0a;
          border-radius: 16px;
          border: 1px solid #1a1a1a;
        }

        .audience-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #E4F222;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .audience-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .feature-item {
          display: flex;
          gap: 1.25rem;
          align-items: start;
        }

        .feature-bullet {
          width: 6px;
          height: 6px;
          background: #E4F222;
          border-radius: 50%;
          margin-top: 0.6rem;
          flex-shrink: 0;
        }

        .feature-text {
          color: #ccc;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .cta-section {
          padding: 8rem 3rem;
          background: #1e1f20;
          text-align: center;
          border-top: 1px solid #2a2b2c;
        }

        .cta-section h2 {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
        }

        footer {
          background: #1e1f20;
          color: #666;
          padding: 3rem 3rem 2rem;
          border-top: 1px solid #2a2b2c;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-content p {
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .two-part-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 3rem;
            margin-bottom: 2.5rem;
          }

          .chat-demo {
            padding: 1.5rem;
            min-height: 100px;
          }

          .typing-text {
            font-size: 0.95rem;
          }

          nav {
            padding: 1rem 1.5rem;
          }

          .hero {
            padding: 6rem 1.5rem 5rem;
          }

          .two-part-container {
            padding: 0 1.5rem 5rem;
          }

          .audience-block {
            padding: 2.5rem 1.5rem;
          }

          .audience-title {
            font-size: 1.75rem;
          }

          .cta-section {
            padding: 5rem 1.5rem;
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .nav-links {
            gap: 1.5rem;
          }
        }
      `}</style>

      <header>
        <nav>
          <div className="logo">PocketMLO</div>
          <ul className="nav-links">
            <li><a href="/buyers">Buyers</a></li>
            <li><a href="/agents">Agents</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>The next generation of mortgage advisory</h1>
          <div className="chat-demo">
            <div className="typing-text" id="typingText"></div>
          </div>
        </div>
      </section>

      <section className="two-part-container">
        <div className="two-part-grid">
          <div id="buyers" className="audience-block">
            <div className="audience-label">For buyers</div>
            <h2 className="audience-title">Always-on guidance that works for you.</h2>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">24/7 advisory</div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">Pre-approvals in five minutes</div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">Neutral advice centered around affordability and building wealth</div>
              </div>
            </div>
          </div>

          <div id="agents" className="audience-block">
            <div className="audience-label">For agents</div>
            <h2 className="audience-title">Your dedicated loan officer, everywhere you work.</h2>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">A loan officer embedded wherever you work, available 24/7</div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">Intent signals for valuable lead engagement</div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">Buyers that are better prepared for the closing table</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Time to modernize mortgages.</h2>
        <a href="/beta" className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "1.1rem 2.5rem" }}>Join the Beta</a>
      </section>

      <footer>
        <div className="footer-content">
          <p>&copy; 2026 PocketMLO. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
