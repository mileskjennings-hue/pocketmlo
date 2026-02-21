import { useState, useRef, useEffect } from "react";

/* ─── Theme ─── */
const T = {
  lime: "#E4F222", limeDim: "rgba(228,242,34,0.10)", limeGlow: "rgba(228,242,34,0.04)",
  bg: "#1e1f20", card: "#0a0a0a", border: "#2a2b2c", border2: "#1a1a1a"
};

/* ─── Avatar ─── */
// Replace this URL with your actual photo URL
const AVATAR_URL = "data:image/jpeg;base64,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";

/* ─── System Prompts ─── */
const SYS = `You are Miles, an AI mortgage advisor built for homebuyers.

Your vibe:
- Talk like a knowledgeable friend texting, not a banker in a suit
- Casual, warm, zero jargon unless you explain it immediately
- You're affordability-first: optimize for the buyer's financial health, not the biggest loan
- Ask clarifying questions when it helps you give better advice

Response rules:
- AIM FOR 100 WORDS OR LESS. Go over only if completeness truly demands it.
- Never use bullet points, numbered lists, or headers unless the user asks
- Write in short paragraphs, 2-3 sentences max per paragraph
- No filler phrases like "Great question!" or "That's a really important consideration"
- Just get to the answer
- Sound like a real person — contractions, casual phrasing, direct

You can help with:
- Mortgage types (conventional, FHA, VA, USDA, jumbo)
- Affordability estimates from income, debts, down payment
- Rate environments and what moves rates
- Pre-approval process and timeline
- Documents needed (W2s, stubs, statements, returns)
- DTI, PMI, closing costs, escrow
- Comparing loan estimates

Rules:
- No specific rate quotes (you don't have live rates)
- Mention you're an AI advisor when relevant, but don't lead with it
- If they're ready, nudge them toward the pre-approval sprint`;

const SPRINT_ADD = `\n\nThe user is in the Pre-approval Sprint. They've authenticated, verified income via IRS, linked bank accounts via Plaid, consented to a soft credit pull, confirmed their address, and selected their target property type and budget. You now have verified financial data.

Your job is to quickly confirm a few things from their data. This should feel fast — you're confirming, not interrogating.

STEP 1 — EMPLOYMENT (from IRS W2): Their most recent W2 shows employment at Acme Corp with annual income of ~$142,000. The welcome message already asked if they're still there. Based on their response:
- If yes: great, move to step 2.
- If they changed jobs: briefly ask where they work now, their role, and roughly how long they've been there. Then move on.

STEP 2 — RESIDENCY (from IRS filing + address): Their tax filing and confirmed address indicate US residency. Confirm naturally in one line: "And based on your tax filings, you're a US citizen or permanent resident — correct?" Move on once confirmed.

STEP 3 — FIRST-TIME BUYER (conditional): Their IRS transcripts show NO mortgage interest deductions or 1098 forms, which suggests this is their first home purchase. Confirm: "It also looks like this would be your first home purchase — is that right?" 
- If they confirm: note that this opens up additional programs like FHA low down payment and state first-time buyer assistance.
- If they say no (they owned before): acknowledge and move on — it just means some first-time-only programs won't apply.
- IMPORTANT: Only ask this if there is no mortgage history. If the data showed prior mortgage interest, skip this question entirely — they're not a first-time buyer.

AFTER CONFIRMATIONS: You have everything. Congratulate them warmly and let them know their pre-approval is being prepared. Keep it to 2-3 sentences. Something like: "That's everything — you crushed it. Your pre-approval is being generated now. You'll have a letter and a full breakdown of what you qualify for shortly."

CRITICAL RULES:
- Keep each message to 1-2 sentences. Don't combine all confirmations into one wall of text.
- Move through confirmations one at a time — wait for their response before the next.
- Be warm and encouraging, keep the sprint energy going.
- Do NOT ask about timeline, area/neighborhood, or any other details. We have what we need.`;

const CHAT_SUGGESTIONS = [
  "How much house can I afford?",
  "FHA vs conventional?",
  "What documents do I need?",
  "Explain closing costs"
];

const SPRINT_SUGGESTIONS = [
  "Yep, still at Acme Corp",
  "I switched jobs recently"
];

const EXTRACT_PROMPT = `Analyze the conversation and extract any mortgage-relevant data the user has shared. Return ONLY a valid JSON object with these fields (use null for anything not mentioned or uncertain):

{
  "propertyType": "sfh" | "condo" | "townhouse" | "multi" | "new" | "land" | null,
  "budget": number | null,
  "area": "string or null",
  "employer": "string or null",
  "income": number | null,
  "firstTimeBuyer": true | false | null,
  "loanType": "conventional" | "fha" | "va" | "usda" | null
}

Rules:
- budget should be a number (e.g. 500000 not "$500k")
- income should be annual number
- propertyType must match one of the exact IDs listed
- Only extract what the user explicitly stated, don't infer
- Return ONLY the JSON object, no markdown backticks, no explanation`;

const TOTAL_STEPS = 7;

/* ─── Shared UI ─── */
function BackArrow({ onClick }) {
  return (
    <button onClick={onClick} style={{ background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",alignItems:"center" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    </button>
  );
}

function Progress({ step }) {
  return (
    <div style={{ display:"flex",gap:6,padding:"0 24px" }}>
      {Array.from({length:TOTAL_STEPS}).map((_,i) => (
        <div key={i} style={{ flex:1,height:3,borderRadius:2,background:i<=step?T.lime:T.border,transition:"background 0.4s",opacity:i<=step?1:0.4 }}/>
      ))}
    </div>
  );
}

function StepInfo({ step, label }) {
  return (
    <div style={{ padding:"12px 24px 16px",display:"flex",justifyContent:"space-between" }}>
      <span style={{ fontSize:12,color:"#666",fontWeight:500 }}>Step {step+1} of {TOTAL_STEPS}</span>
      <span style={{ fontSize:12,color:T.lime,fontWeight:600,letterSpacing:"0.03em" }}>{label}</span>
    </div>
  );
}

function Avatar({ size = 32 }) {
  return AVATAR_URL ? (
    <img src={AVATAR_URL} alt="Avatar" style={{
      width:size,height:size,borderRadius:size*0.3,objectFit:"cover",
      border:`1.5px solid ${T.lime}`
    }}/>
  ) : (
    <div style={{
      width:size,height:size,borderRadius:size*0.3,
      background:`linear-gradient(135deg, rgba(228,242,34,0.15) 0%, rgba(228,242,34,0.05) 100%)`,
      border:`1.5px solid rgba(228,242,34,0.3)`,
      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0
    }}>
      <span style={{ fontSize:size*0.45,fontWeight:700,color:T.lime }}>M</span>
    </div>
  );
}

function Header({ onBack, subtitle, name = "PocketMLO", showAvatar = false }) {
  return (
    <div style={{ padding:"16px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
      <BackArrow onClick={onBack} />
      {showAvatar && <Avatar size={30} />}
      <span style={{ fontSize:16,fontWeight:700,color:"#fff" }}>{name}</span>
      {subtitle && <span style={{ fontSize:12,color:"#555",marginLeft:"auto" }}>{subtitle}</span>}
    </div>
  );
}

function Spinner({ color, size=56 }) {
  return <div style={{ width:size,height:size,border:`3px solid #222`,borderTopColor:color||T.lime,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto" }}/>;
}

function TypingIndicator() {
  return (
    <div style={{ display:"flex",gap:5,padding:"12px 16px",alignItems:"center" }}>
      {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:T.lime,opacity:0.4,animation:`dotPulse 1.2s ease infinite ${i*0.2}s` }}/>)}
    </div>
  );
}

function ChatMessage({ msg, isLast }) {
  const u = msg.role==="user";
  return (
    <div style={{ display:"flex",justifyContent:u?"flex-end":"flex-start",marginBottom:8,animation:isLast?"msgIn 0.25s ease":"none" }}>
      <div style={{ maxWidth:"80%",padding:"12px 16px",borderRadius:u?"16px 16px 4px 16px":"16px 16px 16px 4px",background:u?"#2a2b2c":T.limeDim,color:u?"#fff":"#e8e8e8",fontSize:15,lineHeight:1.6,whiteSpace:"pre-wrap",wordBreak:"break-word" }}>
        {msg.content}
      </div>
    </div>
  );
}

/* ─── Welcome ─── */
function WelcomeScreen({ onSelect }) {
  const [hov, setHov] = useState(null);
  const opts = [
    { id:"chat",title:"Chat through mortgage options",desc:"Ask anything about rates, affordability, loan types, or the buying process",
      icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { id:"sprint",title:"Pre-approval Sprint",desc:"Verify your finances and get pre-approved in about five minutes",
      icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> }
  ];
  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif",padding:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:`radial-gradient(circle,${T.limeGlow} 0%,transparent 70%)`,pointerEvents:"none" }}/>
      <div style={{ position:"relative",zIndex:1,textAlign:"center",maxWidth:640 }}>
        <div style={{ fontSize:15,fontWeight:700,color:T.lime,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:32,opacity:0,animation:"fadeIn 0.5s ease forwards 0.1s" }}>PocketMLO</div>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3.25rem)",fontWeight:700,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.15,marginBottom:48,opacity:0,animation:"fadeIn 0.5s ease forwards 0.25s" }}>Welcome, what would<br/>you like help with?</h1>
        <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",opacity:0,animation:"fadeIn 0.5s ease forwards 0.45s" }}>
          {opts.map(o=>(
            <button key={o.id} onClick={()=>onSelect(o.id)} onMouseEnter={()=>setHov(o.id)} onMouseLeave={()=>setHov(null)}
              style={{ flex:"1 1 260px",maxWidth:300,padding:"32px 28px",background:hov===o.id?"rgba(228,242,34,0.06)":T.card,border:`1px solid ${hov===o.id?"rgba(228,242,34,0.3)":"#1a1a1a"}`,borderRadius:16,cursor:"pointer",transition:"all 0.25s",textAlign:"left",fontFamily:"inherit",transform:hov===o.id?"translateY(-4px)":"none",boxShadow:hov===o.id?"0 8px 32px rgba(228,242,34,0.06)":"none" }}>
              <div style={{ marginBottom:20,opacity:hov===o.id?1:0.7,transition:"opacity 0.25s" }}>{o.icon}</div>
              <div style={{ fontSize:17,fontWeight:600,color:"#fff",marginBottom:8,lineHeight:1.3 }}>{o.title}</div>
              <div style={{ fontSize:13.5,color:"#777",lineHeight:1.55 }}>{o.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Demo Indicators ─── */
function DemoBanner() {
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:10,padding:"12px 16px",
      background:"rgba(255,180,77,0.08)",border:"1px solid rgba(255,180,77,0.2)",
      borderRadius:10,margin:"0 24px 0",flexShrink:0,animation:"fadeIn 0.4s ease"
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFB84D" strokeWidth="2" style={{ flexShrink:0 }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span style={{ fontSize:12,color:"#FFB84D",lineHeight:1.4 }}>
        <strong>Demo mode</strong> — This sprint is for demonstration purposes only. No real data is collected or processed.
      </span>
    </div>
  );
}

function DemoFooter() {
  return (
    <div style={{
      textAlign:"center",padding:"12px 24px",flexShrink:0
    }}>
      <span style={{ fontSize:10,color:"#444",letterSpacing:"0.02em" }}>
        Demo only — no real financial data is collected, stored, or transmitted
      </span>
    </div>
  );
}

/* ─── Step 1: Auth + Identity ─── */
function AuthStep({ onComplete, onBack }) {
  const [phase, setPhase] = useState("provider"); // provider | identity | loading
  const [provider, setProvider] = useState(null);
  const [ssn, setSsn] = useState("");
  const [dob, setDob] = useState("");
  const [hov, setHov] = useState(null);
  const [ssnVisible, setSsnVisible] = useState(false);

  function handleProvider(p) {
    setProvider(p);
    setTimeout(() => setPhase("identity"), 1200);
  }

  function formatSSN(val) {
    const digits = val.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return digits.slice(0,3) + "-" + digits.slice(3);
    return digits.slice(0,3) + "-" + digits.slice(3,5) + "-" + digits.slice(5);
  }

  function formatDOB(val) {
    const digits = val.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return digits.slice(0,2) + "/" + digits.slice(2);
    return digits.slice(0,2) + "/" + digits.slice(2,4) + "/" + digits.slice(4);
  }

  function handleDobChange(e) {
    const raw = e.target.value;
    // Allow backspace to work naturally
    if (raw.length < dob.length) {
      setDob(raw);
    } else {
      setDob(formatDOB(raw));
    }
  }

  function handleIdentitySubmit() {
    setPhase("loading");
    setTimeout(() => onComplete({ provider, ssn, dob, name:"Jordan", email:"buyer@example.com" }), 1500);
  }

  const identityReady = ssn.replace(/\D/g,"").length === 9 && dob.replace(/\D/g,"").length === 8;

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={0} />
      <StepInfo step={0} label="Sign in & verify identity" />
      <DemoBanner />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,overflowY:"auto" }}>
        <div style={{ maxWidth:420,width:"100%",animation:"fadeIn 0.4s ease" }}>

          {phase === "provider" && (
            <div style={{ textAlign:"center" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:24,opacity:0.9 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",marginBottom:8 }}>Let's get you signed in</h2>
              <p style={{ fontSize:14,color:"#777",marginBottom:36,lineHeight:1.6 }}>We'll save your progress and verify your identity.</p>
              {[
                { id:"google",label:"Continue with Google",icon:<svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                { id:"apple",label:"Continue with Apple",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> }
              ].map(b=>(
                <button key={b.id} onClick={()=>handleProvider(b.id)} onMouseEnter={()=>setHov(b.id)} onMouseLeave={()=>setHov(null)}
                  style={{ width:"100%",padding:"14px 20px",marginBottom:12,background:hov===b.id?"#222":"#181818",border:`1px solid ${hov===b.id?"#444":T.border}`,borderRadius:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:12,transition:"all 0.2s",fontFamily:"inherit" }}>
                  {b.icon}<span style={{ fontSize:15,fontWeight:500,color:"#fff" }}>{b.label}</span>
                </button>
              ))}
            </div>
          )}

          {phase === "identity" && (
            <div style={{ animation:"fadeIn 0.4s ease" }}>
              <div style={{ textAlign:"center",marginBottom:32 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:16 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <h2 style={{ fontSize:22,fontWeight:700,color:"#fff",marginBottom:6 }}>Verify your identity</h2>
                <p style={{ fontSize:13,color:"#777",lineHeight:1.6 }}>Required for income verification and credit check. Your data is encrypted end-to-end.</p>
              </div>

              {/* SSN */}
              <label style={{ display:"block",marginBottom:16 }}>
                <span style={{ fontSize:12,fontWeight:600,color:"#888",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em" }}>Social Security Number</span>
                <div style={{ position:"relative" }}>
                  <input value={ssnVisible ? formatSSN(ssn) : ssn.replace(/\D/g,"").length > 0 ? "•••-••-" + ssn.replace(/\D/g,"").slice(5) : ""}
                    onChange={e => { setSsnVisible(true); setSsn(e.target.value); }}
                    onFocus={() => setSsnVisible(true)}
                    onBlur={() => setSsnVisible(false)}
                    placeholder="XXX-XX-XXXX" maxLength={11}
                    style={{ width:"100%",padding:"14px 48px 14px 16px",background:"#111",border:`1px solid ${T.border2}`,borderRadius:10,color:"#fff",fontSize:16,fontFamily:"'JetBrains Mono',monospace",outline:"none",letterSpacing:"0.08em",transition:"border-color 0.2s" }}
                    onMouseEnter={e=>e.target.style.borderColor="#333"} />
                  <button onClick={()=>setSsnVisible(!ssnVisible)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5"><path d={ssnVisible?"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z":"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}/>{ssnVisible&&<circle cx="12" cy="12" r="3"/>}{!ssnVisible&&<line x1="1" y1="1" x2="23" y2="23"/>}</svg>
                  </button>
                </div>
              </label>

              {/* DOB */}
              <label style={{ display:"block",marginBottom:28 }}>
                <span style={{ fontSize:12,fontWeight:600,color:"#888",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em" }}>Date of Birth</span>
                <input value={dob} onChange={handleDobChange} placeholder="MM/DD/YYYY" maxLength={10}
                  style={{ width:"100%",padding:"14px 16px",background:"#111",border:`1px solid ${T.border2}`,borderRadius:10,color:"#fff",fontSize:16,fontFamily:"'JetBrains Mono',monospace",outline:"none",letterSpacing:"0.05em",transition:"border-color 0.2s" }} />
              </label>

              <button onClick={handleIdentitySubmit} disabled={!identityReady}
                style={{ width:"100%",padding:"14px 20px",background:identityReady?T.lime:"#222",color:identityReady?"#000":"#555",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:identityReady?"pointer":"default",transition:"all 0.2s",fontFamily:"inherit" }}>
                Continue
              </button>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:16 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize:11,color:"#444" }}>256-bit AES encryption • Never stored in plain text</span>
              </div>
            </div>
          )}

          {phase === "loading" && (
            <div style={{ textAlign:"center",animation:"fadeIn 0.3s ease" }}>
              <Spinner /><div style={{ marginTop:24 }}><h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginBottom:8 }}>Verifying identity...</h2><p style={{ fontSize:14,color:"#666" }}>This only takes a moment</p></div>
            </div>
          )}
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 2: IRS Income ─── */
function IncomeStep({ onComplete, onBack }) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hov, setHov] = useState(false);

  function go() { setLoading(true); setTimeout(()=>onComplete({ income:{annual:142000,employer:"Acme Corp",years:3} }),2200); }

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={1} />
      <StepInfo step={1} label="Income verification" />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:480,width:"100%",animation:"fadeIn 0.4s ease" }}>
          {loading ? (
            <div style={{ textAlign:"center",animation:"fadeIn 0.3s ease" }}>
              <Spinner /><div style={{ marginTop:24 }}><h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginBottom:8 }}>Verifying income...</h2><p style={{ fontSize:14,color:"#666" }}>Securely retrieving your tax transcript from the IRS</p></div>
            </div>
          ) : (
            <>
              <div style={{ textAlign:"center",marginBottom:32 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:16 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",marginBottom:8 }}>Verify your income</h2>
                <p style={{ fontSize:14,color:"#777",lineHeight:1.6 }}>We'll securely retrieve your tax transcript from the IRS. This replaces W2s and pay stubs.</p>
              </div>
              <div style={{ background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,padding:20,marginBottom:24 }}>
                <div style={{ fontSize:13,fontWeight:600,color:"#999",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em" }}>What we'll access</div>
                {["Tax return transcripts (Form 4506-C)","W2 wage information","Filing status & employer details"].map((t,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${T.border2}`:"none" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize:14,color:"#ccc" }}>{t}</span>
                  </div>
                ))}
              </div>
              <label style={{ display:"flex",alignItems:"flex-start",gap:12,marginBottom:24,cursor:"pointer",padding:"0 4px" }} onClick={()=>setAgreed(!agreed)}>
                <div style={{ width:20,height:20,borderRadius:4,flexShrink:0,marginTop:1,border:`1.5px solid ${agreed?T.lime:"#444"}`,background:agreed?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s" }}>
                  {agreed&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span style={{ fontSize:13,color:"#999",lineHeight:1.55 }}>I authorize PocketMLO to retrieve my tax information from the IRS for mortgage pre-approval. Data is encrypted and never shared without consent.</span>
              </label>
              <button onClick={go} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} disabled={!agreed}
                style={{ width:"100%",padding:"14px 20px",background:agreed?(hov?"#d4e212":T.lime):"#222",color:agreed?"#000":"#555",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:agreed?"pointer":"default",transition:"all 0.2s",fontFamily:"inherit" }}>
                Authorize & verify
              </button>
            </>
          )}
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 3: Plaid Assets ─── */
function AssetsStep({ onComplete, onBack }) {
  const [phase, setPhase] = useState("list");
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const banks = [
    { id:"chase",name:"Chase",color:"#0B6AB0" },
    { id:"bofa",name:"Bank of America",color:"#C41230" },
    { id:"wells",name:"Wells Fargo",color:"#CD1409" },
    { id:"citi",name:"Citi",color:"#003B70" }
  ];

  function pick(b) {
    setSel(b); setPhase("connecting");
    setTimeout(()=>{ setPhase("done"); setTimeout(()=>onComplete({ assets:{checking:34200,savings:87500,bank:b.name} }),1200); },2000);
  }

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={2} />
      <StepInfo step={2} label="Link accounts" />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:440,width:"100%",animation:"fadeIn 0.4s ease" }}>
          {phase==="connecting"&&(<div style={{ textAlign:"center",animation:"fadeIn 0.3s" }}><Spinner color={sel?.color}/><div style={{ marginTop:24 }}><h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginBottom:8 }}>Connecting to {sel?.name}...</h2><p style={{ fontSize:14,color:"#666" }}>Securely linking via Plaid</p></div></div>)}
          {phase==="done"&&(<div style={{ textAlign:"center",animation:"fadeIn 0.3s" }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg><h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginTop:16,marginBottom:8 }}>Accounts linked</h2><p style={{ fontSize:14,color:"#666" }}>Found 2 accounts at {sel?.name}</p></div>)}
          {phase==="list"&&(
            <>
              <div style={{ textAlign:"center",marginBottom:32 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:16 }}><rect x="1" y="20" width="22" height="2" rx="1"/><path d="M12 2L2 8h20L12 2z"/><line x1="5" y1="10" x2="5" y2="18"/><line x1="9" y1="10" x2="9" y2="18"/><line x1="15" y1="10" x2="15" y2="18"/><line x1="19" y1="10" x2="19" y2="18"/></svg>
                <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",marginBottom:8 }}>Link your bank accounts</h2>
                <p style={{ fontSize:14,color:"#777",lineHeight:1.6 }}>Verify assets and down payment funds. Powered by Plaid — we never see your credentials.</p>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:20 }}>
                {banks.map(b=>(
                  <button key={b.id} onClick={()=>pick(b)} onMouseEnter={()=>setHov(b.id)} onMouseLeave={()=>setHov(null)}
                    style={{ width:"100%",padding:"16px 20px",background:hov===b.id?"#181818":"#111",border:`1px solid ${hov===b.id?"#333":T.border2}`,borderRadius:12,cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all 0.2s",fontFamily:"inherit" }}>
                    <div style={{ width:36,height:36,borderRadius:8,background:b.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0 }}>{b.name[0]}</div>
                    <span style={{ fontSize:15,fontWeight:500,color:"#fff" }}>{b.name}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" style={{ marginLeft:"auto" }}><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ))}
              </div>
              <button onMouseEnter={()=>setHov("s")} onMouseLeave={()=>setHov(null)}
                style={{ width:"100%",padding:"14px 20px",background:"transparent",border:`1px solid ${hov==="s"?"#444":T.border}`,borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:500,color:"#777",transition:"all 0.2s",fontFamily:"inherit" }}>
                Search for another bank
              </button>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:20 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize:11,color:"#444" }}>256-bit encryption • Powered by Plaid</span>
              </div>
            </>
          )}
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 4: Brokerage Accounts ─── */
function BrokerageStep({ onComplete, onBack }) {
  const [phase, setPhase] = useState("list"); // list | connecting | done
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [skipping, setSkipping] = useState(false);

  const brokerages = [
    { id:"robinhood", name:"Robinhood", color:"#00C805", initial:"R",
      desc:"Stocks, ETFs, Crypto" },
    { id:"schwab", name:"Charles Schwab", color:"#00A0DF", initial:"S",
      desc:"Stocks, Bonds, Mutual Funds" },
    { id:"fidelity", name:"Fidelity", color:"#4B8B3B", initial:"F",
      desc:"Stocks, ETFs, Retirement" },
    { id:"vanguard", name:"Vanguard", color:"#822A31", initial:"V",
      desc:"Index Funds, ETFs, Retirement" },
    { id:"etrade", name:"E*TRADE", color:"#6633CC", initial:"E",
      desc:"Stocks, Options, Futures" },
    { id:"td", name:"TD Ameritrade", color:"#2E8B57", initial:"T",
      desc:"Stocks, ETFs, Options" }
  ];

  function pick(b) {
    setSel(b);
    setPhase("connecting");
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => onComplete({
        brokerage: { provider: b.name, stocks: 45200, retirement: 128000 }
      }), 1400);
    }, 2000);
  }

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={3} />
      <StepInfo step={3} label="Investment accounts" />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:440,width:"100%",animation:"fadeIn 0.4s ease" }}>

          {phase === "connecting" && (
            <div style={{ textAlign:"center",animation:"fadeIn 0.3s" }}>
              <Spinner color={sel?.color} />
              <div style={{ marginTop:24 }}>
                <h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginBottom:8 }}>Connecting to {sel?.name}...</h2>
                <p style={{ fontSize:14,color:"#666" }}>Securely linking via Plaid</p>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div style={{ textAlign:"center",animation:"fadeIn 0.3s" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
              </svg>
              <h2 style={{ fontSize:20,fontWeight:600,color:"#fff",marginTop:16,marginBottom:8 }}>Accounts linked</h2>
              <p style={{ fontSize:14,color:"#666" }}>Found investment accounts at {sel?.name}</p>
            </div>
          )}

          {phase === "list" && (
            <>
              <div style={{ textAlign:"center",marginBottom:32 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:16 }}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",marginBottom:8 }}>Link investment accounts</h2>
                <p style={{ fontSize:14,color:"#777",lineHeight:1.6 }}>Investment and retirement accounts strengthen your application by showing additional reserves.</p>
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:16 }}>
                {brokerages.map(b => (
                  <button key={b.id} onClick={() => pick(b)}
                    onMouseEnter={() => setHov(b.id)} onMouseLeave={() => setHov(null)}
                    style={{
                      width:"100%",padding:"14px 18px",
                      background: hov===b.id ? "#181818" : "#111",
                      border:`1px solid ${hov===b.id ? "#333" : T.border2}`,
                      borderRadius:12,cursor:"pointer",
                      display:"flex",alignItems:"center",gap:14,
                      transition:"all 0.2s",fontFamily:"inherit"
                    }}>
                    <div style={{
                      width:40,height:40,borderRadius:10,background:b.color,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:16,fontWeight:700,color:"#fff",flexShrink:0
                    }}>
                      {b.initial}
                    </div>
                    <div style={{ textAlign:"left",flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:500,color:"#fff" }}>{b.name}</div>
                      <div style={{ fontSize:12,color:"#555",marginTop:2 }}>{b.desc}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" style={{ flexShrink:0 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))}
              </div>

              <button
                onMouseEnter={() => setHov("search")} onMouseLeave={() => setHov(null)}
                style={{
                  width:"100%",padding:"14px 20px",marginBottom:16,
                  background:"transparent",
                  border:`1px solid ${hov==="search" ? "#444" : T.border}`,
                  borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:500,
                  color:"#777",transition:"all 0.2s",fontFamily:"inherit"
                }}>
                Search for another brokerage
              </button>

              <button onClick={() => onComplete({ brokerage: null })}
                onMouseEnter={() => setHov("skip")} onMouseLeave={() => setHov(null)}
                style={{
                  width:"100%",padding:"12px 20px",
                  background:"none",border:"none",cursor:"pointer",
                  fontSize:13,fontWeight:500,
                  color: hov==="skip" ? T.lime : "#555",
                  transition:"color 0.2s",fontFamily:"inherit",
                  textDecoration:"underline",textUnderlineOffset:3
                }}>
                Skip for now — I'll add this later
              </button>

              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:16 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span style={{ fontSize:11,color:"#444" }}>256-bit encryption • Powered by Plaid</span>
              </div>
            </>
          )}
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 5: Address Confirmation ─── */
function AddressStep({ onComplete, onBack }) {
  const [confirmed, setConfirmed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState("742 Evergreen Terrace, Springfield, IL 62704");
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hovSug, setHovSug] = useState(null);
  const [hov, setHov] = useState(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const sources = [
    { label: "Bank records (Plaid)", match: true },
    { label: "IRS tax filing", match: true }
  ];

  // Mock USPS / Google Places autocomplete
  const mockAddresses = [
    "123 Main Street, Apt 4B, New York, NY 10001",
    "123 Main Street, Brooklyn, NY 11201",
    "1234 Main Boulevard, Queens, NY 11375",
    "123 Maiden Lane, New York, NY 10038",
    "12-30 Main Ave, Flushing, NY 11354",
    "456 Oak Avenue, Springfield, IL 62704",
    "789 Elm Street, Springfield, IL 62702",
    "321 Park Drive, Chicago, IL 60601",
    "555 Broadway, Apt 12A, New York, NY 10012",
    "100 Wall Street, New York, NY 10005",
    "742 Evergreen Terrace, Springfield, IL 62704",
    "850 Metropolitan Ave, Brooklyn, NY 11211",
    "1600 Pennsylvania Ave, Washington, DC 20500"
  ];

  function handleSearch(val) {
    setSearchVal(val);
    setConfirmed(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const q = val.toLowerCase();
      const matches = mockAddresses.filter(a =>
        a.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    }, 200);
  }

  function selectSuggestion(addr) {
    setAddress(addr);
    setSearchVal("");
    setSuggestions([]);
    setShowSuggestions(false);
    setEditing(false);
    setConfirmed(false);
  }

  function startEditing() {
    setEditing(true);
    setSearchVal("");
    setConfirmed(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={4} />
      <StepInfo step={4} label="Confirm address" />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24 }}>
        <div style={{ maxWidth:460,width:"100%",animation:"fadeIn 0.4s ease" }}>
          <div style={{ textAlign:"center",marginBottom:32 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ marginBottom:16 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",marginBottom:8 }}>Confirm your address</h2>
            <p style={{ fontSize:14,color:"#777",lineHeight:1.6 }}>We found this address across your linked accounts. Please confirm it's current.</p>
          </div>

          {/* Address card */}
          <div style={{
            background: confirmed ? "rgba(228,242,34,0.06)" : "#111",
            border: `1.5px solid ${confirmed ? T.lime : T.border2}`,
            borderRadius: 14, padding: "24px 20px", marginBottom: 20,
            transition: "all 0.3s ease"
          }}>
            {editing ? (
              <div style={{ animation:"fadeIn 0.3s ease" }}>
                <span style={{ fontSize:12,fontWeight:600,color:"#888",display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em" }}>
                  Start typing your address
                </span>
                <div style={{ position:"relative" }}>
                  <div style={{ position:"relative" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"
                      style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}>
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      ref={inputRef}
                      value={searchVal}
                      onChange={e => handleSearch(e.target.value)}
                      onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                      placeholder="e.g. 123 Main Street, New York"
                      style={{
                        width:"100%",padding:"14px 14px 14px 42px",
                        background:"#0a0a0a",border:`1.5px solid ${showSuggestions ? T.lime : T.border}`,
                        borderRadius: showSuggestions ? "10px 10px 0 0" : 10,
                        color:"#fff",fontSize:15,outline:"none",fontFamily:"inherit",
                        transition:"border-color 0.2s, border-radius 0.2s"
                      }}
                    />
                  </div>

                  {/* Suggestions dropdown */}
                  {showSuggestions && (
                    <div style={{
                      position:"absolute",top:"100%",left:0,right:0,zIndex:10,
                      background:"#0a0a0a",
                      border:`1.5px solid ${T.lime}`,borderTop:"none",
                      borderRadius:"0 0 10px 10px",
                      overflow:"hidden",
                      animation:"fadeIn 0.15s ease"
                    }}>
                      {suggestions.map((s, i) => {
                        // Highlight the matching part
                        const q = searchVal.toLowerCase();
                        const idx = s.toLowerCase().indexOf(q);
                        let before = s, bold = "", after = "";
                        if (idx >= 0) {
                          before = s.slice(0, idx);
                          bold = s.slice(idx, idx + searchVal.length);
                          after = s.slice(idx + searchVal.length);
                        }

                        return (
                          <button key={i}
                            onClick={() => selectSuggestion(s)}
                            onMouseEnter={() => setHovSug(i)}
                            onMouseLeave={() => setHovSug(null)}
                            style={{
                              width:"100%",padding:"12px 14px 12px 42px",
                              background: hovSug === i ? "#151515" : "transparent",
                              border:"none",borderBottom: i < suggestions.length - 1 ? `1px solid ${T.border2}` : "none",
                              cursor:"pointer",textAlign:"left",fontFamily:"inherit",
                              transition:"background 0.15s",
                              display:"flex",alignItems:"center",gap:10
                            }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hovSug === i ? T.lime : "#444"} strokeWidth="1.5"
                              style={{ flexShrink:0,transition:"stroke 0.15s" }}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span style={{ fontSize:14,color: hovSug === i ? "#fff" : "#ccc",lineHeight:1.4 }}>
                              {before}<strong style={{ color:T.lime }}>{bold}</strong>{after}
                            </span>
                          </button>
                        );
                      })}
                      <div style={{
                        padding:"8px 14px",display:"flex",alignItems:"center",gap:6,
                        borderTop:`1px solid ${T.border2}`
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span style={{ fontSize:10,color:"#444" }}>Verified by USPS Address Validation</span>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => { setEditing(false); setSearchVal(""); setSuggestions([]); setShowSuggestions(false); }}
                  style={{
                    background:"none",border:"none",cursor:"pointer",fontSize:13,
                    color:"#555",fontFamily:"inherit",fontWeight:500,padding:0,
                    marginTop:14,transition:"color 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.color = "#999"}
                  onMouseLeave={e => e.target.style.color = "#555"}>
                  ← Back to confirmed address
                </button>
              </div>
            ) : (
              <>
                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16 }}>
                  <div>
                    <div style={{ fontSize:11,fontWeight:600,color:"#666",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6 }}>Current address</div>
                    <div style={{ fontSize:17,fontWeight:600,color:"#fff",lineHeight:1.4 }}>{address}</div>
                  </div>
                  {confirmed && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="2" style={{ flexShrink:0,marginTop:4 }}>
                      <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
                    </svg>
                  )}
                </div>

                {/* Source badges */}
                <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:16 }}>
                  {sources.map((s,i) => (
                    <div key={i} style={{
                      display:"flex",alignItems:"center",gap:6,padding:"4px 10px",
                      background:"rgba(228,242,34,0.06)",borderRadius:20,fontSize:11,color:T.lime,fontWeight:500
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {s.label}
                    </div>
                  ))}
                </div>

                <button onClick={startEditing}
                  onMouseEnter={()=>setHov("edit")} onMouseLeave={()=>setHov(null)}
                  style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:hov==="edit"?T.lime:"#666",fontFamily:"inherit",fontWeight:500,padding:0,transition:"color 0.2s",textDecoration:"underline",textUnderlineOffset:3 }}>
                  This isn't right — update it
                </button>
              </>
            )}
          </div>

          {!editing && (
            <>
              <button onClick={()=>setConfirmed(true)}
                onMouseEnter={()=>setHov("confirm")} onMouseLeave={()=>setHov(null)}
                disabled={confirmed}
                style={{
                  width:"100%",padding:"14px 20px",marginBottom:10,
                  background: confirmed ? "rgba(228,242,34,0.15)" : (hov==="confirm" ? "#d4e212" : T.lime),
                  color:"#000",border:"none",borderRadius:12,fontSize:15,fontWeight:600,
                  cursor: confirmed ? "default" : "pointer",
                  transition:"all 0.2s",fontFamily:"inherit"
                }}>
                {confirmed ? "✓ Address confirmed" : "Yes, this is correct"}
              </button>

              {confirmed && (
                <button onClick={()=>onComplete({ address })}
                  onMouseEnter={()=>setHov("next")} onMouseLeave={()=>setHov(null)}
                  style={{
                    width:"100%",padding:"14px 20px",
                    background: hov==="next" ? "#d4e212" : T.lime,
                    color:"#000",border:"none",borderRadius:12,fontSize:15,fontWeight:600,
                    cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
                    animation:"fadeIn 0.3s ease"
                  }}>
                  Continue →
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 5: Property Intent + Credit Consent ─── */
function PropertyStep({ onComplete, onBack, chatData }) {
  const presetValues = [250000,400000,500000,750000,1000000,1500000];
  const presetLabels = ["$250k","$400k","$500k","$750k","$1M","$1.5M+"];

  const [creditConsent, setCreditConsent] = useState(false);
  const [selectedType, setSelectedType] = useState(chatData?.propertyType || null);
  const [budgetRaw, setBudgetRaw] = useState(chatData?.budget ? chatData.budget.toString() : "");
  const [activePreset, setActivePreset] = useState(() => {
    if (!chatData?.budget) return null;
    const idx = presetValues.indexOf(chatData.budget);
    return idx >= 0 ? presetLabels[idx] : "other";
  });
  const [showCustom, setShowCustom] = useState(chatData?.budget ? !presetValues.includes(chatData.budget) : false);
  const [isFocused, setIsFocused] = useState(false);
  const [hov, setHov] = useState(null);
  const customRef = useRef(null);

  const types = [
    { id:"sfh", label:"Single Family", emoji:"🏡" },
    { id:"condo", label:"Condo", emoji:"🏢" },
    { id:"townhouse", label:"Townhouse", emoji:"🏘️" },
    { id:"multi", label:"Multi-family", emoji:"🏗️" },
    { id:"new", label:"New Build", emoji:"🔨" },
    { id:"land", label:"Land", emoji:"🌿" }
  ];

  const presets = [
    { label:"$250k", value:250000 },
    { label:"$400k", value:400000 },
    { label:"$500k", value:500000 },
    { label:"$750k", value:750000 },
    { label:"$1M", value:1000000 },
    { label:"$1.5M+", value:1500000 }
  ];

  function fmtCommas(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function fmtDisplay(num) {
    if (!num) return "$0";
    if (num >= 1000000) return "$" + (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + "M";
    return "$" + fmtCommas(num.toString());
  }

  function handlePreset(p) {
    setActivePreset(p.label);
    setBudgetRaw(p.value.toString());
    setShowCustom(false);
  }

  function handleOther() {
    setActivePreset("other");
    setBudgetRaw("");
    setShowCustom(true);
    setTimeout(() => customRef.current?.focus(), 100);
  }

  function handleCustomChange(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    setBudgetRaw(digits);
  }

  const budgetNum = parseInt(budgetRaw) || 0;
  const hasAmount = budgetNum >= 50000;
  const ready = creditConsent && selectedType && hasAmount;

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={5} />
      <StepInfo step={5} label="Property & credit" />
      <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 24px 100px" }}>
        <div style={{ maxWidth:520,width:"100%",animation:"fadeIn 0.4s ease" }}>

          {/* Pre-filled indicator */}
          {chatData && (chatData.propertyType || chatData.budget) && (
            <div style={{
              display:"flex",alignItems:"center",gap:8,padding:"10px 14px",
              background:"rgba(228,242,34,0.06)",border:`1px solid rgba(228,242,34,0.12)`,
              borderRadius:10,marginBottom:24,animation:"fadeIn 0.3s ease"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="2" style={{ flexShrink:0 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span style={{ fontSize:12,color:T.lime,fontWeight:500 }}>Pre-filled from your chat — review and adjust as needed</span>
            </div>
          )}

          {/* Property type */}
          <div style={{ marginBottom:36 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#fff",marginBottom:6 }}>What type of property?</h3>
            <p style={{ fontSize:13,color:"#666",marginBottom:20 }}>Select the type you're most interested in.</p>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10 }}>
              {types.map(t=>{
                const active = selectedType===t.id;
                return (
                  <button key={t.id} onClick={()=>setSelectedType(t.id)}
                    onMouseEnter={()=>setHov(t.id)} onMouseLeave={()=>setHov(null)}
                    style={{
                      padding:"20px 12px",textAlign:"center",
                      background:active?"rgba(228,242,34,0.08)":(hov===t.id?"#151515":"#111"),
                      border:`1.5px solid ${active?T.lime:(hov===t.id?"#333":T.border2)}`,
                      borderRadius:12,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
                      transform:active?"scale(1.03)":"none",
                      boxShadow:active?`0 0 20px rgba(228,242,34,0.08)`:"none"
                    }}>
                    <div style={{ fontSize:28,marginBottom:8,transition:"transform 0.2s",transform:active?"scale(1.15)":"none" }}>{t.emoji}</div>
                    <div style={{ fontSize:13,fontWeight:active?600:500,color:active?T.lime:"#ccc",transition:"color 0.2s" }}>{t.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget — big display + preset chips + other */}
          <div style={{ marginBottom:36 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#fff",marginBottom:24,textAlign:"center" }}>What's your budget?</h3>

            {/* Hero number */}
            <div style={{
              textAlign:"center",padding:"24px 20px",marginBottom:20,
              position:"relative",borderRadius:16
            }}>
              {hasAmount && (
                <div style={{
                  position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                  width:240,height:240,borderRadius:"50%",
                  background:`radial-gradient(circle, rgba(228,242,34,0.06) 0%, transparent 70%)`,
                  pointerEvents:"none",transition:"opacity 0.4s"
                }}/>
              )}
              <div style={{
                fontSize: budgetRaw.length > 7 ? 36 : budgetRaw.length > 5 ? 44 : 52,
                fontWeight:700,
                fontFamily:"'JetBrains Mono',monospace",
                color: hasAmount ? T.lime : "#333",
                letterSpacing:"-0.02em",
                position:"relative",
                transition:"font-size 0.2s, color 0.3s",
                minHeight:64,
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                {hasAmount ? fmtDisplay(budgetNum) : "$0"}
              </div>
              {hasAmount && budgetNum < 100000 && (
                <div style={{ fontSize:12,color:"#666",marginTop:4 }}>Minimum $50,000</div>
              )}
            </div>

            {/* Preset chips + Other */}
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center" }}>
              {presets.map(p => {
                const active = activePreset === p.label;
                return (
                  <button key={p.label} onClick={() => handlePreset(p)}
                    onMouseEnter={() => setHov("p-"+p.label)} onMouseLeave={() => setHov(null)}
                    style={{
                      padding:"10px 18px",
                      background: active ? "rgba(228,242,34,0.12)" : (hov===("p-"+p.label) ? "#181818" : "#111"),
                      border:`1.5px solid ${active ? T.lime : (hov===("p-"+p.label) ? "#333" : T.border2)}`,
                      borderRadius:24,cursor:"pointer",
                      fontSize:14,fontWeight: active ? 600 : 500,
                      color: active ? T.lime : "#999",
                      transition:"all 0.2s",fontFamily:"inherit",
                      transform: active ? "scale(1.05)" : "none"
                    }}>
                    {p.label}
                  </button>
                );
              })}
              <button onClick={handleOther}
                onMouseEnter={() => setHov("p-other")} onMouseLeave={() => setHov(null)}
                style={{
                  padding:"10px 18px",
                  background: activePreset==="other" ? "rgba(228,242,34,0.12)" : (hov==="p-other" ? "#181818" : "#111"),
                  border:`1.5px solid ${activePreset==="other" ? T.lime : (hov==="p-other" ? "#333" : T.border2)}`,
                  borderRadius:24,cursor:"pointer",
                  fontSize:14,fontWeight: activePreset==="other" ? 600 : 500,
                  color: activePreset==="other" ? T.lime : "#999",
                  transition:"all 0.2s",fontFamily:"inherit",
                  transform: activePreset==="other" ? "scale(1.05)" : "none"
                }}>
                Other
              </button>
            </div>

            {/* Custom input — shown when "Other" is selected */}
            {showCustom && (
              <div style={{
                marginTop:16,animation:"fadeIn 0.3s ease",
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                <div style={{
                  position:"relative",maxWidth:280,width:"100%"
                }}>
                  <span style={{
                    position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",
                    fontSize:18,fontWeight:600,color:isFocused ? T.lime : "#555",
                    transition:"color 0.2s",pointerEvents:"none"
                  }}>$</span>
                  <input
                    ref={customRef}
                    value={budgetRaw ? fmtCommas(budgetRaw) : ""}
                    onChange={handleCustomChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    inputMode="numeric"
                    placeholder="Enter amount"
                    style={{
                      width:"100%",padding:"14px 16px 14px 32px",
                      background:"#111",
                      border:`1.5px solid ${isFocused ? T.lime : T.border2}`,
                      borderRadius:12,color:"#fff",
                      fontSize:18,fontWeight:600,
                      fontFamily:"'JetBrains Mono',monospace",
                      outline:"none",transition:"border-color 0.2s",
                      letterSpacing:"0.02em"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Credit consent */}
          <div style={{ background:"#111",border:`1px solid ${T.border2}`,borderRadius:14,padding:"24px 20px",marginBottom:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <div>
                <div style={{ fontSize:16,fontWeight:600,color:"#fff" }}>Soft credit check</div>
                <div style={{ fontSize:12,color:"#666",marginTop:2 }}>Won't affect your credit score</div>
              </div>
            </div>
            <p style={{ fontSize:13,color:"#888",lineHeight:1.6,marginBottom:16 }}>
              A soft pull lets us see your credit profile to calculate your debt-to-income ratio and determine which loan programs you qualify for. This has zero impact on your credit score.
            </p>
            <label style={{ display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer" }} onClick={()=>setCreditConsent(!creditConsent)}>
              <div style={{ width:20,height:20,borderRadius:4,flexShrink:0,marginTop:1,border:`1.5px solid ${creditConsent?T.lime:"#444"}`,background:creditConsent?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s" }}>
                {creditConsent&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <span style={{ fontSize:13,color:"#999",lineHeight:1.5 }}>I authorize PocketMLO to perform a soft credit inquiry. This will not impact my credit score.</span>
            </label>
          </div>

        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{ position:"fixed",bottom:0,left:0,right:0,padding:"16px 24px 24px",background:`linear-gradient(transparent, ${T.bg} 20%)` }}>
        <div style={{ maxWidth:520,margin:"0 auto" }}>
          <button onClick={()=>onComplete({ propertyType:selectedType, budget:budgetNum, creditConsent:true })}
            disabled={!ready}
            onMouseEnter={()=>setHov("go")} onMouseLeave={()=>setHov(null)}
            style={{
              width:"100%",padding:"16px 20px",
              background:ready?(hov==="go"?"#d4e212":T.lime):"#222",
              color:ready?"#000":"#555",border:"none",borderRadius:12,
              fontSize:16,fontWeight:600,cursor:ready?"pointer":"default",
              transition:"all 0.2s",fontFamily:"inherit",
              transform:ready&&hov==="go"?"translateY(-1px)":"none"
            }}>
            Almost done — last step →
          </button>
        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Step 6: Confirmations ─── */

function ConfirmationCard({ icon, title, subtitle, children }) {
  return (
    <div key={title} style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={{ textAlign:"center",marginBottom:28 }}>
        <div style={{ marginBottom:16 }}>{icon}</div>
        <h2 style={{ fontSize:22,fontWeight:700,color:"#fff",marginBottom:8 }}>{title}</h2>
        <p style={{ fontSize:14,color:"#777",lineHeight:1.6,maxWidth:380,margin:"0 auto" }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function YesNoChoice({ onYes, onNo, yesLabel, noLabel, yesEmoji, noEmoji }) {
  const [hovYes, setHovYes] = useState(false);
  const [hovNo, setHovNo] = useState(false);
  return (
    <div style={{ display:"flex",gap:12,marginTop:24 }}>
      <button onClick={onYes}
        onMouseEnter={() => setHovYes(true)} onMouseLeave={() => setHovYes(false)}
        style={{
          flex:1,padding:"18px 16px",textAlign:"center",
          background: hovYes ? "rgba(228,242,34,0.10)" : "#111",
          border: `1.5px solid ${hovYes ? T.lime : T.border2}`,
          borderRadius:14,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
          transform: hovYes ? "scale(1.02)" : "none"
        }}>
        <div style={{ fontSize:26,marginBottom:8 }}>{yesEmoji || "👍"}</div>
        <div style={{ fontSize:14,fontWeight:600,color: hovYes ? T.lime : "#fff" }}>{yesLabel || "Yes, that's right"}</div>
      </button>
      <button onClick={onNo}
        onMouseEnter={() => setHovNo(true)} onMouseLeave={() => setHovNo(false)}
        style={{
          flex:1,padding:"18px 16px",textAlign:"center",
          background: hovNo ? "rgba(255,107,107,0.05)" : "#111",
          border: `1.5px solid ${hovNo ? "#ff6b6b" : T.border2}`,
          borderRadius:14,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
          transform: hovNo ? "scale(1.02)" : "none"
        }}>
        <div style={{ fontSize:26,marginBottom:8 }}>{noEmoji || "👎"}</div>
        <div style={{ fontSize:14,fontWeight:600,color: hovNo ? "#ff6b6b" : "#fff" }}>{noLabel || "No"}</div>
      </button>
    </div>
  );
}

function NewEmployerForm({ onSubmit }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [hov, setHov] = useState(false);

  const ready = companyName.trim().length > 1 && jobTitle.trim().length > 1;

  const inputStyle = {
    width:"100%",padding:"14px 16px",background:"#111",
    border:`1px solid ${T.border2}`,borderRadius:10,color:"#fff",
    fontSize:15,outline:"none",fontFamily:"inherit",transition:"border-color 0.2s"
  };

  const labelStyle = {
    fontSize:12,fontWeight:600,color:"#888",display:"block",
    marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"
  };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14,animation:"fadeIn 0.3s ease" }}>
      <label>
        <span style={labelStyle}>Company name *</span>
        <input value={companyName} onChange={e=>setCompanyName(e.target.value)}
          placeholder="e.g. Google, Main Street Realty" style={inputStyle}
          onFocus={e=>e.target.style.borderColor=T.lime} onBlur={e=>e.target.style.borderColor=T.border2} />
      </label>
      <label>
        <span style={labelStyle}>Your job title *</span>
        <input value={jobTitle} onChange={e=>setJobTitle(e.target.value)}
          placeholder="e.g. Software Engineer, Sales Manager" style={inputStyle}
          onFocus={e=>e.target.style.borderColor=T.lime} onBlur={e=>e.target.style.borderColor=T.border2} />
      </label>
      <label>
        <span style={labelStyle}>Company website <span style={{ color:"#555",fontWeight:400,textTransform:"none" }}>(optional)</span></span>
        <input value={companyWebsite} onChange={e=>setCompanyWebsite(e.target.value)}
          placeholder="e.g. company.com" style={inputStyle}
          onFocus={e=>e.target.style.borderColor=T.lime} onBlur={e=>e.target.style.borderColor=T.border2} />
      </label>
      <label>
        <span style={labelStyle}>Company phone <span style={{ color:"#555",fontWeight:400,textTransform:"none" }}>(optional)</span></span>
        <input value={companyPhone} onChange={e=>setCompanyPhone(e.target.value)}
          placeholder="(555) 123-4567" style={inputStyle}
          onFocus={e=>e.target.style.borderColor=T.lime} onBlur={e=>e.target.style.borderColor=T.border2} />
      </label>
      <button onClick={() => onSubmit({ companyName, jobTitle, companyWebsite, companyPhone })}
        disabled={!ready}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          width:"100%",padding:"14px 20px",marginTop:4,
          background: ready ? (hov?"#d4e212":T.lime) : "#222",
          color: ready ? "#000" : "#555",
          border:"none",borderRadius:12,fontSize:15,fontWeight:600,
          cursor: ready ? "pointer" : "default",
          transition:"all 0.2s",fontFamily:"inherit"
        }}>
        Continue
      </button>
    </div>
  );
}

function ConfirmationsStep({ onComplete, onBack }) {
  const [phase, setPhase] = useState("employment");
  const [newEmployerData, setNewEmployerData] = useState(null);
  const [residencyAnswer, setResidencyAnswer] = useState(null);

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Header onBack={onBack} />
      <Progress step={6} />
      <StepInfo step={6} label="Confirm details" />
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,overflowY:"auto" }}>
        <div style={{ maxWidth:460,width:"100%" }}>

          {phase === "employment" && (
            <ConfirmationCard
              icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}
              title="Still at Acme Corp?"
              subtitle="Your most recent W2 shows employment at Acme Corp with annual income of ~$142,000."
            >
              <div style={{
                background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,
                padding:"16px 20px",marginBottom:4,
                display:"flex",alignItems:"center",gap:14
              }}>
                <div style={{
                  width:44,height:44,borderRadius:10,background:"rgba(228,242,34,0.08)",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0
                }}>
                  <span style={{ fontSize:18,fontWeight:700,color:T.lime }}>A</span>
                </div>
                <div>
                  <div style={{ fontSize:16,fontWeight:600,color:"#fff" }}>Acme Corp</div>
                  <div style={{ fontSize:13,color:"#666",marginTop:2 }}>~$142,000/year • W2 Employment</div>
                </div>
              </div>
              <YesNoChoice
                onYes={() => setPhase("residency")}
                onNo={() => setPhase("employmentNew")}
                noLabel="I switched jobs"
              />
            </ConfirmationCard>
          )}

          {phase === "employmentNew" && (
            <ConfirmationCard
              icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>}
              title="Where do you work now?"
              subtitle="We'll need a few details to verify your current employment."
            >
              <NewEmployerForm onSubmit={(data) => {
                setNewEmployerData(data);
                setPhase("residency");
              }} />
            </ConfirmationCard>
          )}

          {phase === "residency" && (
            <ConfirmationCard
              icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
              title="US citizen or permanent resident?"
              subtitle="Based on your tax filings and verified address, it looks like you're a US citizen or permanent resident."
            >
              <div style={{
                background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,
                padding:"14px 20px",marginBottom:4,
                display:"flex",alignItems:"center",gap:10
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize:13,color:"#ccc" }}>Tax filings indicate US residency</span>
              </div>
              <YesNoChoice
                onYes={() => { setResidencyAnswer(true); setPhase("firstTime"); }}
                onNo={() => { setResidencyAnswer(false); setPhase("firstTime"); }}
                noLabel="No, I'm not"
              />
            </ConfirmationCard>
          )}

          {phase === "firstTime" && (
            <ConfirmationCard
              icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              title="First-time homebuyer?"
              subtitle="Your tax records show no prior mortgage interest deductions, which suggests this would be your first home purchase."
            >
              <div style={{
                background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,
                padding:"14px 20px",marginBottom:4,
                display:"flex",alignItems:"center",gap:10
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize:13,color:"#ccc" }}>No mortgage history found in IRS records</span>
              </div>
              <YesNoChoice
                onYes={() => setPhase("done")}
                onNo={() => setPhase("done")}
                yesLabel="Yes, first time!"
                yesEmoji="🏡"
                noLabel="I've owned before"
                noEmoji="🔄"
              />
            </ConfirmationCard>
          )}

          {(phase === "done" || phase === "results") && phase === "done" && (
            <DoneCountdown onReady={() => setPhase("results")} />
          )}

          {phase === "results" && (
            <PreApprovalResults />
          )}

        </div>
      </div>
      <DemoFooter/>
    </div>
  );
}

/* ─── Done Countdown ─── */
function DoneCountdown({ onReady }) {
  const [seconds, setSeconds] = useState(60);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(timer); onReady(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const d = setInterval(() => setDots(p => p.length >= 3 ? "" : p + "."), 500);
    return () => clearInterval(d);
  }, []);

  const pct = ((60 - seconds) / 60) * 100;

  return (
    <div style={{ textAlign:"center",animation:"fadeIn 0.5s ease" }}>
      <h2 style={{ fontSize:32,fontWeight:700,color:"#fff",marginBottom:16,lineHeight:1.3 }}>
        Bet, we locked in twin 🤞🥳
      </h2>
      <p style={{ fontSize:15,color:"#999",lineHeight:1.7,maxWidth:400,margin:"0 auto 36px" }}>
        Your pre-approval is being generated now. You can hang here or head out — we'll send you an email once your results are in.
      </p>

      {/* Circular progress */}
      <div style={{ position:"relative",width:120,height:120,margin:"0 auto 20px" }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform:"rotate(-90deg)" }}>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#1a1a1a" strokeWidth="6" />
          <circle cx="60" cy="60" r="52" fill="none" stroke={T.lime} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
            style={{ transition:"stroke-dashoffset 1s linear" }} />
        </svg>
        <div style={{
          position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          fontSize:28,fontWeight:700,color:T.lime,fontFamily:"'JetBrains Mono',monospace"
        }}>
          {seconds}s
        </div>
      </div>

      <p style={{ fontSize:13,color:"#555" }}>Crunching numbers{dots}</p>
    </div>
  );
}

/* ─── Pre-Approval Results ─── */
function PreApprovalResults() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hovTab, setHovTab] = useState(null);
  const [hovBtn, setHovBtn] = useState(null);
  const [expanded, setExpanded] = useState(null);

  // Mock pre-approval data
  const data = {
    approvedAmount: 485000,
    maxAmount: 520000,
    downPayment: 48500,
    downPaymentPct: 10,
    monthlyPayment: 3124,
    rate: 6.75,
    loanType: "Conventional 30yr Fixed",
    dti: 32,
    creditScore: 742,
    income: 142000,
    reserves: 87500,
    programs: [
      { name:"Conventional 30yr Fixed", rate:"6.75%", monthly:"$3,124", highlight:true },
      { name:"FHA 30yr Fixed", rate:"6.25%", monthly:"$2,987", highlight:false },
      { name:"Conventional 15yr Fixed", rate:"5.90%", monthly:"$4,218", highlight:false }
    ],
    breakdown: [
      { label:"Principal & Interest", amount:2847, color:T.lime },
      { label:"Property Tax (est.)", amount:405, color:"#4A9EFF" },
      { label:"Homeowners Insurance", amount:142, color:"#FF6B6B" },
      { label:"PMI", amount:130, color:"#FFB84D" }
    ]
  };

  const totalMonthly = data.breakdown.reduce((s,b) => s+b.amount, 0);

  function fmt(n) { return "$" + n.toLocaleString(); }

  const tabs = [
    { id:"overview", label:"Overview" },
    { id:"breakdown", label:"Monthly breakdown" },
    { id:"programs", label:"Loan options" }
  ];

  return (
    <div style={{ animation:"fadeIn 0.6s ease",maxWidth:520,width:"100%" }}>

      {/* Header celebration */}
      <div style={{ textAlign:"center",marginBottom:32 }}>
        <div style={{ fontSize:52,marginBottom:12 }}>🏠</div>
        <h2 style={{ fontSize:28,fontWeight:700,color:"#fff",marginBottom:6 }}>You're pre-approved!</h2>
        <p style={{ fontSize:14,color:"#777" }}>Here's what you qualify for based on your verified financials.</p>
      </div>

      {/* Big number */}
      <div style={{
        background:"rgba(228,242,34,0.06)",border:`1.5px solid rgba(228,242,34,0.2)`,
        borderRadius:16,padding:"28px 24px",textAlign:"center",marginBottom:24,
        position:"relative",overflow:"hidden"
      }}>
        <div style={{
          position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          width:300,height:300,borderRadius:"50%",
          background:`radial-gradient(circle, rgba(228,242,34,0.06) 0%, transparent 70%)`,
          pointerEvents:"none"
        }}/>
        <div style={{ fontSize:12,fontWeight:600,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,position:"relative" }}>
          Approved up to
        </div>
        <div style={{
          fontSize:48,fontWeight:700,color:T.lime,fontFamily:"'JetBrains Mono',monospace",
          letterSpacing:"-0.02em",position:"relative"
        }}>
          {fmt(data.approvedAmount)}
        </div>
        <div style={{ fontSize:13,color:"#666",marginTop:8,position:"relative" }}>
          {data.loanType} • {data.rate}% APR
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:28 }}>
        {[
          { label:"Monthly payment", value:fmt(data.monthlyPayment) },
          { label:"Down payment", value:`${data.downPaymentPct}%` },
          { label:"Your DTI", value:`${data.dti}%` }
        ].map((m,i) => (
          <div key={i} style={{
            background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,
            padding:"16px 12px",textAlign:"center"
          }}>
            <div style={{ fontSize:20,fontWeight:700,color:"#fff",marginBottom:4 }}>{m.value}</div>
            <div style={{ fontSize:11,color:"#666",textTransform:"uppercase",letterSpacing:"0.04em" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex",gap:4,marginBottom:20,background:"#111",borderRadius:10,padding:4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            onMouseEnter={() => setHovTab(t.id)} onMouseLeave={() => setHovTab(null)}
            style={{
              flex:1,padding:"10px 8px",
              background: activeTab===t.id ? "#222" : "transparent",
              border:"none",borderRadius:8,cursor:"pointer",
              fontSize:12,fontWeight: activeTab===t.id ? 600 : 500,
              color: activeTab===t.id ? T.lime : (hovTab===t.id ? "#ccc" : "#777"),
              transition:"all 0.2s",fontFamily:"inherit"
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div style={{ animation:"fadeIn 0.3s ease" }}>
          <div style={{ background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,overflow:"hidden" }}>
            {[
              { label:"Annual income (verified)", value:fmt(data.income) },
              { label:"Credit score", value:data.creditScore },
              { label:"Cash reserves", value:fmt(data.reserves) },
              { label:"Down payment", value:`${fmt(data.downPayment)} (${data.downPaymentPct}%)` },
              { label:"Debt-to-income ratio", value:`${data.dti}%` },
              { label:"Max purchase price", value:fmt(data.maxAmount) }
            ].map((row,i,arr) => (
              <div key={i} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"14px 20px",
                borderBottom: i < arr.length-1 ? `1px solid ${T.border2}` : "none"
              }}>
                <span style={{ fontSize:14,color:"#999" }}>{row.label}</span>
                <span style={{ fontSize:14,fontWeight:600,color:"#fff" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "breakdown" && (
        <div style={{ animation:"fadeIn 0.3s ease" }}>
          {/* Visual bar */}
          <div style={{ display:"flex",height:8,borderRadius:4,overflow:"hidden",marginBottom:20,gap:2 }}>
            {data.breakdown.map((b,i) => (
              <div key={i} style={{
                flex: b.amount / totalMonthly,
                background: b.color,
                borderRadius: i===0 ? "4px 0 0 4px" : i===data.breakdown.length-1 ? "0 4px 4px 0" : 0
              }} />
            ))}
          </div>

          <div style={{ background:"#111",border:`1px solid ${T.border2}`,borderRadius:12,overflow:"hidden" }}>
            {data.breakdown.map((b,i) => (
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px 20px",
                borderBottom: i < data.breakdown.length-1 ? `1px solid ${T.border2}` : "none"
              }}>
                <div style={{ width:10,height:10,borderRadius:"50%",background:b.color,flexShrink:0 }} />
                <span style={{ fontSize:14,color:"#999",flex:1 }}>{b.label}</span>
                <span style={{ fontSize:14,fontWeight:600,color:"#fff" }}>{fmt(b.amount)}</span>
              </div>
            ))}
            <div style={{
              display:"flex",justifyContent:"space-between",padding:"14px 20px",
              background:"rgba(228,242,34,0.04)",borderTop:`1px solid ${T.border2}`
            }}>
              <span style={{ fontSize:14,fontWeight:600,color:T.lime }}>Total monthly</span>
              <span style={{ fontSize:14,fontWeight:700,color:T.lime }}>{fmt(totalMonthly)}/mo</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "programs" && (
        <div style={{ display:"flex",flexDirection:"column",gap:10,animation:"fadeIn 0.3s ease" }}>
          {data.programs.map((p,i) => (
            <div key={i}
              onClick={() => setExpanded(expanded===i ? null : i)}
              style={{
                background: p.highlight ? "rgba(228,242,34,0.06)" : "#111",
                border: `1.5px solid ${p.highlight ? "rgba(228,242,34,0.2)" : T.border2}`,
                borderRadius:14,padding:"18px 20px",cursor:"pointer",
                transition:"all 0.2s"
              }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                    <span style={{ fontSize:15,fontWeight:600,color:"#fff" }}>{p.name}</span>
                    {p.highlight && (
                      <span style={{
                        fontSize:10,fontWeight:600,color:T.lime,background:"rgba(228,242,34,0.12)",
                        padding:"2px 8px",borderRadius:10,textTransform:"uppercase",letterSpacing:"0.05em"
                      }}>Best fit</span>
                    )}
                  </div>
                  <span style={{ fontSize:13,color:"#666" }}>{p.rate} rate • {p.monthly}/mo</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"
                  style={{ transform: expanded===i ? "rotate(180deg)" : "none",transition:"transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {expanded === i && (
                <div style={{ marginTop:14,paddingTop:14,borderTop:`1px solid ${T.border2}`,animation:"fadeIn 0.2s ease" }}>
                  <p style={{ fontSize:13,color:"#888",lineHeight:1.6 }}>
                    {p.highlight
                      ? "This is your best option based on your credit score, down payment, and financial profile. Competitive rate with predictable monthly payments over 30 years."
                      : p.name.includes("FHA")
                        ? "FHA loans offer lower down payment requirements (as low as 3.5%) and more flexible credit standards. Includes mortgage insurance premium for the life of the loan."
                        : "A 15-year term means higher monthly payments but significantly less interest paid over the life of the loan. You'll build equity faster and own your home sooner."
                    }
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ marginTop:28,display:"flex",flexDirection:"column",gap:10 }}>
        <button
          onMouseEnter={() => setHovBtn("download")} onMouseLeave={() => setHovBtn(null)}
          style={{
            width:"100%",padding:"16px 20px",
            background: hovBtn==="download" ? "#d4e212" : T.lime,
            color:"#000",border:"none",borderRadius:12,
            fontSize:15,fontWeight:600,cursor:"pointer",
            transition:"all 0.2s",fontFamily:"inherit"
          }}>
          Download pre-approval letter
        </button>
        <button
          onMouseEnter={() => setHovBtn("agent")} onMouseLeave={() => setHovBtn(null)}
          style={{
            width:"100%",padding:"16px 20px",
            background: hovBtn==="agent" ? "#181818" : "#111",
            border: `1px solid ${hovBtn==="agent" ? "#333" : T.border2}`,
            color:"#fff",borderRadius:12,
            fontSize:15,fontWeight:600,cursor:"pointer",
            transition:"all 0.2s",fontFamily:"inherit"
          }}>
          Share with my agent
        </button>
      </div>

      <p style={{ fontSize:11,color:"#444",textAlign:"center",marginTop:20,lineHeight:1.5 }}>
        This is an AI-generated pre-approval estimate. Final approval subject to underwriting verification by a licensed loan officer.
      </p>
    </div>
  );
}

/* ─── Chat Screen ─── */
function ChatScreen({ mode, onBack, addendum, welcome, suggestions, placeholder, onExtract, onStartSprint, chatExtracted }) {
  const [msgs, setMsgs] = useState([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSug, setShowSug] = useState(true);
  const [err, setErr] = useState(null);
  const [showSprintCta, setShowSprintCta] = useState(false);
  const [hovCta, setHovCta] = useState(false);
  const sr = useRef(null);
  const ir = useRef(null);
  const msgCount = useRef(0);

  useEffect(()=>{ if(sr.current) sr.current.scrollTop=sr.current.scrollHeight; },[msgs,loading]);
  useEffect(()=>{ ir.current?.focus(); },[]);

  async function extractData(conversation) {
    if (!onExtract || mode !== "chat") return;
    try {
      const convText = conversation.slice(1).map(m => `${m.role}: ${m.content}`).join("\n");
      const r = await fetch("/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:500,
          system: EXTRACT_PROMPT,
          messages:[{ role:"user", content: convText }]
        })
      });
      if (!r.ok) return;
      const d = await r.json();
      const text = d.content.filter(b=>b.type==="text").map(b=>b.text).join("");
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      // Only pass non-null values
      const extracted = {};
      Object.entries(parsed).forEach(([k,v]) => { if (v !== null) extracted[k] = v; });
      if (Object.keys(extracted).length > 0) onExtract(extracted);
    } catch(e) { /* silent fail — extraction is best-effort */ }
  }

  async function send(text) {
    if(!text.trim()||loading) return;
    const um = { role:"user",content:text.trim() };
    const up = [...msgs,um];
    setMsgs(up); setInput(""); setShowSug(false); setLoading(true); setErr(null);
    try {
      const r = await fetch("/api/chat",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYS+(addendum||""),messages:up.slice(1).map(m=>({role:m.role,content:m.content})) })
      });
      if(!r.ok) throw new Error(`API ${r.status}`);
      const d = await r.json();
      const assistantMsg = {role:"assistant",content:d.content.filter(b=>b.type==="text").map(b=>b.text).join("\n")};
      const fullConvo = [...up, assistantMsg];
      setMsgs(fullConvo);
      // Run extraction in background (non-blocking)
      extractData(fullConvo);
      // Show sprint CTA after 3+ user messages
      msgCount.current += 1;
      if (msgCount.current >= 2 && mode === "chat" && onStartSprint) {
        setShowSprintCta(true);
      }
    } catch(e) { console.error(e); setErr("Something went wrong."); }
    finally { setLoading(false); ir.current?.focus(); }
  }

  return (
    <div style={{ width:"100vw",height:"100vh",background:T.bg,display:"flex",flexDirection:"column",fontFamily:"'Söhne',-apple-system,BlinkMacSystemFont,sans-serif",overflow:"hidden" }}>
      <div style={{ padding:"16px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,background:"rgba(30,31,32,0.95)",backdropFilter:"blur(10px)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <BackArrow onClick={onBack} />
          <Avatar size={36} />
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:"#fff" }}>Miles</div>
            <div style={{ fontSize:12,color:"#666",marginTop:1 }}>{mode==="sprint"?"Pre-approval Sprint • Final details":"Mortgage advisor • Always on"}</div>
          </div>
        </div>
        <div style={{ fontSize:11,color:"#444",padding:"4px 10px",border:`1px solid ${T.border}`,borderRadius:6,fontWeight:500,letterSpacing:"0.03em",textTransform:"uppercase" }}>Beta</div>
      </div>
      {mode==="sprint"&&<><Progress step={5}/><StepInfo step={5} label="Final details"/></>}
      <div ref={sr} style={{ flex:1,overflowY:"auto",padding:"24px 24px 16px",display:"flex",flexDirection:"column" }}>
        <div style={{ maxWidth:720,width:"100%",margin:"0 auto",flex:1 }}>
          {msgs.map((m,i)=><ChatMessage key={i} msg={m} isLast={i===msgs.length-1}/>)}
          {loading&&<div style={{ display:"flex",justifyContent:"flex-start",marginBottom:8 }}><div style={{ background:T.limeDim,borderRadius:"16px 16px 16px 4px" }}><TypingIndicator/></div></div>}
          {err&&<div style={{ textAlign:"center",color:"#ff6b6b",fontSize:13,padding:"8px 0" }}>{err} <span onClick={()=>{const l=[...msgs].reverse().find(m=>m.role==="user");if(l){setMsgs(p=>p.slice(0,-1));send(l.content);}}} style={{ color:T.lime,marginLeft:8,cursor:"pointer",textDecoration:"underline" }}>Retry</span></div>}
          {showSug&&msgs.length===1&&(
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:16,animation:"fadeIn 0.5s ease 0.3s both" }}>
              {suggestions.map((s,i)=>(
                <button key={i} onClick={()=>send(s)}
                  style={{ padding:"10px 16px",background:"transparent",border:"1px solid #333",borderRadius:20,color:"#ccc",fontSize:13,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",lineHeight:1.3 }}
                  onMouseEnter={e=>{e.target.style.borderColor=T.lime;e.target.style.color=T.lime;}}
                  onMouseLeave={e=>{e.target.style.borderColor="#333";e.target.style.color="#ccc";}}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Sprint CTA banner */}
      {showSprintCta && mode === "chat" && onStartSprint && (
        <div style={{
          padding:"12px 24px",borderTop:`1px solid ${T.border}`,
          animation:"slideUp 0.4s ease",flexShrink:0
        }}>
          <div style={{
            maxWidth:720,margin:"0 auto",
            background:"rgba(228,242,34,0.06)",border:`1px solid rgba(228,242,34,0.15)`,
            borderRadius:12,padding:"14px 18px",
            display:"flex",alignItems:"center",justifyContent:"space-between",gap:12
          }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="1.5" style={{ flexShrink:0 }}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13,fontWeight:600,color:"#fff" }}>Ready to get pre-approved?</div>
                <div style={{ fontSize:11,color:"#888",marginTop:1 }}>We'll carry over what you've shared</div>
              </div>
            </div>
            <button onClick={onStartSprint}
              onMouseEnter={()=>setHovCta(true)} onMouseLeave={()=>setHovCta(false)}
              style={{
                padding:"8px 16px",background:hovCta?"#d4e212":T.lime,color:"#000",
                border:"none",borderRadius:8,fontSize:12,fontWeight:600,
                cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
                whiteSpace:"nowrap",flexShrink:0
              }}>
              Start Sprint →
            </button>
          </div>
        </div>
      )}
      <div style={{ padding:"16px 24px 24px",borderTop:`1px solid ${T.border}`,flexShrink:0 }}>
        <div style={{ maxWidth:720,margin:"0 auto",display:"flex",gap:10,alignItems:"flex-end" }}>
          <input ref={ir} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(input);}}}
            placeholder={placeholder} disabled={loading}
            style={{ flex:1,padding:"14px 18px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12,color:"#fff",fontSize:15,outline:"none",fontFamily:"inherit",transition:"border-color 0.2s",opacity:loading?0.5:1 }}
            onFocus={e=>e.target.style.borderColor=T.lime} onBlur={e=>e.target.style.borderColor=T.border} />
          <button onClick={()=>send(input)} disabled={!input.trim()||loading}
            style={{ padding:"14px 20px",background:input.trim()&&!loading?T.lime:"#333",color:input.trim()&&!loading?"#000":"#666",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:input.trim()&&!loading?"pointer":"default",transition:"all 0.2s",fontFamily:"inherit",flexShrink:0 }}>
            Send
          </button>
        </div>
        <div style={{ maxWidth:720,margin:"8px auto 0",textAlign:"center",fontSize:11,color:"#444" }}>Miles is an AI mortgage advisor powered by PocketMLO. Always verify with a licensed professional.</div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function PocketMLOBuyers() {
  const [view, setView] = useState("welcome");
  const [data, setData] = useState({});
  const [chatExtracted, setChatExtracted] = useState({});

  function handleExtract(extracted) {
    setChatExtracted(prev => ({ ...prev, ...extracted }));
  }

  const hasChatData = Object.keys(chatExtracted).length > 0;

  const back = { welcome:"welcome", chat:"welcome", "s-auth":"welcome", "s-income":"s-auth", "s-assets":"s-income", "s-brokerage":"s-assets", "s-address":"s-brokerage", "s-property":"s-address", "s-confirm":"s-property" };

  return (
    <>
      <style>{`
        @keyframes msgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dotPulse { 0%,100%{opacity:0.25;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.2)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder{color:#555!important} *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
      `}</style>

      {view==="welcome"&&<WelcomeScreen onSelect={c=>setView(c==="chat"?"chat":"s-auth")} hasChatData={hasChatData} />}
      {view==="chat"&&<ChatScreen mode="chat" onBack={()=>setView("welcome")} onExtract={handleExtract} onStartSprint={()=>setView("s-auth")} chatExtracted={chatExtracted} welcome={{role:"assistant",content:"Hey! I'm Miles, your mortgage advisor. Ask me anything — rates, affordability, loan types, documents, timelines. Whatever's on your mind, let's talk through it."}} suggestions={CHAT_SUGGESTIONS} placeholder="Ask about mortgages, rates, affordability..."/>}
      {view==="s-auth"&&<AuthStep onBack={()=>setView("welcome")} onComplete={d=>{setData(p=>({...p,...d}));setView("s-income");}}/>}
      {view==="s-income"&&<IncomeStep onBack={()=>setView("s-auth")} onComplete={d=>{setData(p=>({...p,...d}));setView("s-assets");}}/>}
      {view==="s-assets"&&<AssetsStep onBack={()=>setView("s-income")} onComplete={d=>{setData(p=>({...p,...d}));setView("s-brokerage");}}/>}
      {view==="s-brokerage"&&<BrokerageStep onBack={()=>setView("s-assets")} onComplete={d=>{setData(p=>({...p,...d}));setView("s-address");}}/>}
      {view==="s-address"&&<AddressStep onBack={()=>setView("s-brokerage")} onComplete={d=>{setData(p=>({...p,...d}));setView("s-property");}}/>}
      {view==="s-property"&&<PropertyStep onBack={()=>setView("s-address")} chatData={chatExtracted} onComplete={d=>{setData(p=>({...p,...d}));setView("s-confirm");}}/>}
      {view==="s-confirm"&&<ConfirmationsStep onBack={()=>setView("s-property")} onComplete={d=>{setData(p=>({...p,...d}));/* pre-approval complete */}}/>}
    </>
  );
}
