import { useEffect, useMemo, useState } from 'react';
import { Tags, EyeOff, ClipboardCheck, RotateCcw, Copy, FileText } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

/* ---------------- Classifier ---------------- */
const ITEMS = [
  { text: 'Aadhaar number', type: 'sensitive', why: 'A unique national ID that directly identifies you and is widely used for KYC.' },
  { text: 'Full name', type: 'nonsensitive', why: 'Identifies you, but is usually public. It becomes risky when combined with other data.' },
  { text: 'Bank account number', type: 'sensitive', why: 'Financial information is sensitive personal data.' },
  { text: 'Today’s weather in Pune', type: 'notpii', why: 'Not about any person.' },
  { text: 'Fingerprint template', type: 'sensitive', why: 'Biometric data can’t be changed if leaked.' },
  { text: 'Work email address', type: 'nonsensitive', why: 'Identifies you, but is commonly shared for work.' },
  { text: 'Medical test report', type: 'sensitive', why: 'Health data is sensitive personal data.' },
  { text: 'Company’s total annual revenue', type: 'notpii', why: 'Business data, not about an individual.' },
  { text: 'PAN number', type: 'sensitive', why: 'A tax identifier linked to your finances.' },
  { text: 'City you live in', type: 'nonsensitive', why: 'An indirect identifier. Alone it’s broad, but combined with other data it narrows down who you are.' },
  { text: 'Account password', type: 'sensitive', why: 'Passwords are sensitive and should never be shared or stored in plain text.' },
  { text: 'Gender', type: 'nonsensitive', why: 'An indirect identifier on its own.' },
];
const BINS = [
  { id: 'sensitive', label: 'Sensitive PII', cls: 'bad' },
  { id: 'nonsensitive', label: 'Non-sensitive PII', cls: 'warn' },
  { id: 'notpii', label: 'Not PII', cls: 'ok' },
];

function Classifier({ complete }) {
  const [i, setI] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(null);
  const [last, setLast] = useState(null);
  const item = ITEMS[i];
  const done = i >= ITEMS.length;

  const drop = (bin) => {
    if (done) return;
    if (bin !== item.type) {
      setShake(bin); setMistakes((m) => m + 1); sfx('bad');
      setLast({ ok: false, text: `Not quite. ${item.why}` });
      setTimeout(() => setShake(null), 450);
      return;
    }
    sfx('good');
    setLast({ ok: true, text: item.why });
    setPlaced((p) => [...p, item]);
    if (i + 1 === ITEMS.length && mistakes === 0) complete('classify');
    setI(i + 1);
  };
  const restart = () => { setI(0); setPlaced([]); setMistakes(0); setLast(null); };

  return (
    <div className="lab-card">
      <h3><Tags size={18} /> Classify the data like a privacy officer</h3>
      <div className="sort-card-slot">
        {!done ? <div className="sort-card" key={i}>{item.text}</div> : (
          <div className="sort-card done">
            {mistakes === 0 ? '🎉 Perfect classification!' : `Done with ${mistakes} mistake(s). Replay for a perfect run.`}
            <button className="btn btn-ghost btn-sm" onClick={restart}><RotateCcw size={14} /> Replay</button>
          </div>
        )}
      </div>
      {last && <p className={`result ${last.ok ? 'good' : 'bad'}`} key={last.text}>{last.text}</p>}
      <div className="buckets three">
        {BINS.map((b) => (
          <button key={b.id} className={`bucket ${b.cls} ${shake === b.id ? 'shake' : ''}`} onClick={() => drop(b.id)} disabled={done}>
            <span className="bucket-head">{b.label}</span>
            {placed.filter((p) => p.type === b.id).map((p) => <span key={p.text} className="bucket-item">{p.text}</span>)}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Redaction tool (real, runs locally) ---------------- */
function luhn(num) {
  const d = num.replace(/\D/g, '');
  let sum = 0;
  for (let k = 0; k < d.length; k++) {
    let v = Number(d[d.length - 1 - k]);
    if (k % 2 === 1) { v *= 2; if (v > 9) v -= 9; }
    sum += v;
  }
  return d.length >= 13 && sum % 10 === 0;
}

const RULES = [
  { id: 'card', label: 'Card number', re: /\b(?:\d[ -]?){12,18}\d\b/g, valid: luhn, mask: (m) => `**** **** **** ${m.replace(/\D/g, '').slice(-4)}` },
  { id: 'aadhaar', label: 'Aadhaar', re: /\b[2-9]\d{3}[ -]?\d{4}[ -]?\d{4}\b/g, mask: (m) => `XXXX XXXX ${m.replace(/\D/g, '').slice(-4)}` },
  { id: 'pan', label: 'PAN', re: /\b[A-Z]{5}\d{4}[A-Z]\b/g, mask: (m) => `XXXXXX${m.slice(6)}` },
  { id: 'phone', label: 'Mobile number', re: /(?:\+91[ -]?)?\b[6-9]\d{9}\b/g, mask: (m) => `+91 XXXXXX${m.replace(/\D/g, '').slice(-4)}` },
  { id: 'email', label: 'Email', re: /\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b/g, mask: (m) => `${m[0]}***@${m.split('@')[1]}` },
];

const SAMPLE = `Dear Support,
Please update my KYC. My name is Riya Sharma, Aadhaar 2345 6789 0123 and PAN ABCDE1234F.
You can reach me on +91 9876543210 or riya.sharma@example.com.
Refund the amount to my card 4111 1111 1111 1111.
Thanks!`;

function Redactor({ complete }) {
  const [text, setText] = useState(SAMPLE);
  const [mode, setMode] = useState('mask');
  const [copied, setCopied] = useState(false);

  const { parts, counts } = useMemo(() => {
    // Find all matches, rule by rule, without letting later rules re-match earlier ones.
    const hits = [];
    const taken = new Array(text.length).fill(false);
    RULES.forEach((r) => {
      for (const m of text.matchAll(r.re)) {
        const s = m.index; const e = s + m[0].length;
        if (taken.slice(s, e).some(Boolean)) continue;
        if (r.valid && !r.valid(m[0])) continue;
        for (let k = s; k < e; k++) taken[k] = true;
        hits.push({ s, e, rule: r, raw: m[0] });
      }
    });
    hits.sort((a, b) => a.s - b.s);
    const out = []; let pos = 0; const c = {};
    hits.forEach((h) => {
      if (h.s > pos) out.push({ t: text.slice(pos, h.s) });
      out.push({ t: mode === 'mask' ? h.rule.mask(h.raw) : '█'.repeat(Math.min(14, h.raw.length)), rule: h.rule });
      c[h.rule.id] = (c[h.rule.id] ?? 0) + 1;
      pos = h.e;
    });
    if (pos < text.length) out.push({ t: text.slice(pos) });
    return { parts: out, counts: c };
  }, [text, mode]);

  const kinds = Object.keys(counts).length;
  useEffect(() => { if (kinds >= 4) complete('redact'); }, [kinds, complete]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(parts.map((p) => p.t).join('')); setCopied(true); sfx('good'); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };

  return (
    <div className="rd-grid">
      <div className="lab-card">
        <h3><FileText size={18} /> Paste any text</h3>
        <textarea className="dark-input rd-input" rows={9} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
        <div className="row-gap">
          <button className="chip" onClick={() => { setText(SAMPLE); sfx('click'); }}>Load sample</button>
          <button className="chip" onClick={() => setText('')}>Clear</button>
        </div>
        <p className="hint">Detection runs entirely in your browser. Card numbers are only flagged if they pass the Luhn check, which cuts false alarms.</p>
      </div>
      <div className="lab-card">
        <h3><EyeOff size={18} /> Safe-to-share version</h3>
        <div className="seg small">
          <button className={mode === 'mask' ? 'active' : ''} onClick={() => setMode('mask')}>Mask (keep last 4)</button>
          <button className={mode === 'redact' ? 'active' : ''} onClick={() => setMode('redact')}>Full redaction</button>
        </div>
        <pre className="rd-output">
          {parts.map((p, k) => (p.rule ? <mark key={k} className={`pii-${p.rule.id}`} title={p.rule.label}>{p.t}</mark> : <span key={k}>{p.t}</span>))}
        </pre>
        <div className="pii-counts">
          {RULES.map((r) => <span key={r.id} className={counts[r.id] ? 'on' : ''}>{r.label}: <b>{counts[r.id] ?? 0}</b></span>)}
        </div>
        <button className="btn btn-primary btn-sm" onClick={copy}><Copy size={14} /> {copied ? 'Copied!' : 'Copy safe text'}</button>
      </div>
    </div>
  );
}

/* ---------------- Personal security audit ---------------- */
const AUDIT = [
  { q: 'Every important account has a different password', tip: 'Use a password manager so reuse never happens.' },
  { q: 'MFA is on for email, banking and social media', tip: 'Turn on an authenticator app or passkey today, starting with email.' },
  { q: 'Phone and laptop install updates automatically', tip: 'Enable auto-updates for the OS and apps.' },
  { q: 'I share Aadhaar/PAN copies only with a written purpose, or use masked Aadhaar', tip: 'Write "For ___ only, date" across copies, or download masked Aadhaar.' },
  { q: 'My Aadhaar biometrics are locked', tip: 'Lock them in the mAadhaar app or on the UIDAI website. Unlock only when needed.' },
  { q: 'I get SMS/app alerts for every bank transaction', tip: 'Enable alerts in your banking app so fraud is noticed within minutes.' },
  { q: 'I check my credit report at least once a year', tip: 'You can get a free report every year from each credit bureau.' },
  { q: 'I know to call 1930 and use cybercrime.gov.in for fraud', tip: 'Save 1930 in your contacts now.' },
];

function Audit({ complete }) {
  const [ans, setAns] = useState({});
  const yes = AUDIT.filter((_, i) => ans[i] === true).length;
  const answered = Object.keys(ans).length;
  const pct = Math.round((yes / AUDIT.length) * 100);
  useEffect(() => { if (pct === 100) complete('audit'); }, [pct, complete]);
  const set = (i, v) => { setAns({ ...ans, [i]: v }); sfx(v ? 'good' : 'click'); };

  return (
    <div className="lab-card">
      <h3><ClipboardCheck size={18} /> Personal security audit</h3>
      <p>Answer honestly. Every "not yet" gives you a concrete fix you can do in under five minutes.</p>
      <div className="audit-score">
        <div className="bar big"><span style={{ width: `${pct}%` }} className={pct < 50 ? 'low' : ''} /></div>
        <strong>{pct}%</strong>
      </div>
      <div className="audit-list">
        {AUDIT.map((a, i) => (
          <div key={a.q} className={`audit-row ${ans[i] === true ? 'yes' : ans[i] === false ? 'no' : ''}`}>
            <span>{a.q}</span>
            <div className="row-gap">
              <button className={`chip ${ans[i] === true ? 'on ok' : ''}`} onClick={() => set(i, true)}>Yes</button>
              <button className={`chip ${ans[i] === false ? 'on bad' : ''}`} onClick={() => set(i, false)}>Not yet</button>
            </div>
            {ans[i] === false && <small className="audit-tip">💡 {a.tip}</small>}
          </div>
        ))}
      </div>
      {answered === AUDIT.length && pct < 100 && <p className="hint">Fix the "not yet" items, then come back and update your answers.</p>}
    </div>
  );
}

export default function PiiLab() {
  const { complete } = useMission('u4-pii');
  const [tab, setTab] = useState('classify');
  const tabs = [
    { id: 'classify', label: 'PII classifier', icon: Tags },
    { id: 'redact', label: 'Redaction tool', icon: EyeOff },
    { id: 'audit', label: 'Security audit', icon: ClipboardCheck },
  ];
  return (
    <div>
      <div className="seg">
        {tabs.map((t) => <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}><t.icon size={15} /> {t.label}</button>)}
      </div>
      {tab === 'classify' && <Classifier complete={complete} />}
      {tab === 'redact' && <Redactor complete={complete} />}
      {tab === 'audit' && <Audit complete={complete} />}
    </div>
  );
}
