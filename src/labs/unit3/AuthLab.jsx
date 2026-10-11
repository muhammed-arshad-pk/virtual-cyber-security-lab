import { useCallback, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { KeyRound, ShieldCheck, Smartphone, Fingerprint, MessageSquare, Lock, Play, Cookie, FileKey2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

/* ---------------- crypto helpers (all real, all local) ---------------- */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32(bytes) {
  let bits = 0; let value = 0; let out = '';
  for (const b of bytes) {
    value = (value << 8) | b; bits += 8;
    while (bits >= 5) { out += B32[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}
const hex = (u8) => [...u8].map((b) => b.toString(16).padStart(2, '0')).join('');

async function hotp(secret, counter) {
  const key = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const msg = new ArrayBuffer(8);
  const v = new DataView(msg);
  v.setUint32(0, Math.floor(counter / 2 ** 32));
  v.setUint32(4, counter >>> 0);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, msg));
  const offset = mac[19] & 0xf;
  const bin = ((mac[offset] & 0x7f) << 24) | (mac[offset + 1] << 16) | (mac[offset + 2] << 8) | mac[offset + 3];
  return { code: String(bin % 1e6).padStart(6, '0'), mac, offset, bin };
}

const b64url = (str) => btoa(unescape(encodeURIComponent(str))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
const fromB64url = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4))));
async function hs256(data, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  return btoa(String.fromCharCode(...sig)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/* ---------------- TOTP lab ---------------- */
function TotpLab({ complete }) {
  const [secret, setSecret] = useState(() => crypto.getRandomValues(new Uint8Array(20)));
  const [now, setNow] = useState(Date.now());
  const [info, setInfo] = useState(null);
  const [qr, setQr] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const b32 = useMemo(() => base32(secret), [secret]);
  const uri = `otpauth://totp/CyberShield:student?secret=${b32}&issuer=CyberShield&algorithm=SHA1&digits=6&period=30`;
  const counter = Math.floor(now / 1000 / 30);
  const left = 30 - (Math.floor(now / 1000) % 30);

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 250); return () => clearInterval(id); }, []);
  useEffect(() => { QRCode.toDataURL(uri, { margin: 1, width: 180, color: { dark: '#0b1530', light: '#ffffff' } }).then(setQr).catch(() => setQr('')); }, [uri]);
  useEffect(() => {
    let alive = true;
    hotp(secret, counter).then((r) => alive && setInfo(r));
    return () => { alive = false; };
  }, [secret, counter]);

  const verify = async () => {
    const code = input.replace(/\s/g, '');
    let ok = false;
    for (const d of [-1, 0, 1]) {
      // eslint-disable-next-line no-await-in-loop
      if ((await hotp(secret, counter + d)).code === code) ok = true;
    }
    setResult(ok);
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('totp');
  };

  const regenerate = () => { setSecret(crypto.getRandomValues(new Uint8Array(20))); setResult(null); setInput(''); sfx('click'); };
  const r = 26; const c = 2 * Math.PI * r;

  return (
    <div className="totp-grid">
      <div className="lab-card">
        <h3><Smartphone size={18} /> 1. Pair your real authenticator</h3>
        <p>Open <b>Google Authenticator</b> or <b>Microsoft Authenticator</b> on your phone, tap <b>+</b>, then scan this QR (or choose "Enter a setup key", time-based).</p>
        <div className="qr-wrap">
          {qr ? <img src={qr} alt="TOTP QR code" width="180" height="180" /> : <div className="qr-ph">QR</div>}
          <div>
            <small className="hint">Secret key (Base32)</small>
            <code className="hash small">{b32.match(/.{1,4}/g).join(' ')}</code>
            <button className="btn btn-ghost btn-sm" onClick={regenerate}><RefreshCw size={14} /> New secret</button>
          </div>
        </div>
        <p className="hint">This secret exists only in this browser tab. It’s a lab account, not a real login.</p>
      </div>

      <div className="lab-card">
        <h3><KeyRound size={18} /> 2. Watch the code being computed</h3>
        <div className="totp-live">
          <svg viewBox="0 0 64 64" className="totp-ring">
            <circle cx="32" cy="32" r={r} className="track" />
            <circle cx="32" cy="32" r={r} className={`val ${left <= 5 ? 'low' : ''}`} style={{ strokeDasharray: c, strokeDashoffset: c * (1 - left / 30) }} />
            <text x="32" y="37">{left}</text>
          </svg>
          <span className="totp-code" key={info?.code}>{info ? `${info.code.slice(0, 3)} ${info.code.slice(3)}` : '--- ---'}</span>
        </div>
        {info && (
          <ol className="calc-steps">
            <li>Unix time ÷ 30 → counter = <code>{counter}</code></li>
            <li>HMAC-SHA1(secret, counter) = <code className="wrap">{hex(info.mac).replace(/(..)/g, '$1 ')}</code></li>
            <li>Last nibble → offset = <code>{info.offset}</code>, take 4 bytes → <code>{info.bin}</code></li>
            <li><code>{info.bin}</code> mod 1,000,000 = <b>{info.code}</b></li>
          </ol>
        )}
      </div>

      <div className="lab-card">
        <h3><ShieldCheck size={18} /> 3. Verify like a server</h3>
        <p>Type the 6-digit code from your phone (or the one shown above). The server allows one time-step of clock drift either side.</p>
        <div className="pin-row">
          <input className="dark-input otp-input" inputMode="numeric" maxLength={7} value={input} onChange={(e) => { setInput(e.target.value.replace(/[^\d ]/g, '')); setResult(null); }} placeholder="123 456" onKeyDown={(e) => e.key === 'Enter' && verify()} />
          <button className="btn btn-primary btn-sm" onClick={verify} disabled={input.replace(/\s/g, '').length !== 6}>Verify</button>
        </div>
        {result === true && <p className="result good">✔ Code accepted. Your phone and this "server" computed the same code with no network message, just a shared secret and the clock.</p>}
        {result === false && <p className="result bad">✘ Code rejected. Check the phone’s time is automatic, or wait for the next code.</p>}
      </div>
    </div>
  );
}

/* ---------------- Login designer vs attacks ---------------- */
const FACTORS = [
  { id: 'password', label: 'Password', icon: Lock, friction: 2 },
  { id: 'sms', label: 'SMS OTP', icon: MessageSquare, friction: 2 },
  { id: 'totp', label: 'Authenticator app', icon: Smartphone, friction: 2 },
  { id: 'bio', label: 'Biometric (on device)', icon: Fingerprint, friction: 1 },
  { id: 'passkey', label: 'Passkey (FIDO2)', icon: KeyRound, friction: 1 },
];
const ATTACKS = [
  { id: 'stuffing', label: 'Credential stuffing', story: 'Your password leaked from another site.', has: ['password'] },
  { id: 'phishing', label: 'Real-time phishing site', story: 'A fake login page relays everything you type to the real site.', has: ['password', 'sms', 'totp'] },
  { id: 'simswap', label: 'SIM swap', story: 'A fraudster ports your number and knows your password.', has: ['password', 'sms'] },
  { id: 'stolen', label: 'Stolen locked phone', story: 'A thief moves your SIM into their phone.', has: ['sms'] },
  { id: 'session', label: 'Session-cookie theft', story: 'Malware copies your logged-in session token.', session: true },
];

function LoginDesigner({ complete }) {
  const [on, setOn] = useState(() => new Set(['password', 'sms']));
  const [session, setSession] = useState(false);
  const [results, setResults] = useState({});
  const [running, setRunning] = useState(false);

  const toggle = (id) => { setOn((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }); setResults({}); sfx('click'); };
  const breaks = useCallback((a) => {
    if (a.session) return !session;
    return [...on].every((f) => a.has.includes(f));
  }, [on, session]);

  const run = async () => {
    if (!on.size) return;
    setRunning(true); setResults({});
    const res = {};
    for (const a of ATTACKS) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 550));
      res[a.id] = breaks(a) ? 'breached' : 'blocked';
      setResults({ ...res });
      sfx(res[a.id] === 'breached' ? 'bad' : 'good');
    }
    setRunning(false);
    if (res.phishing === 'breached' && on.has('sms')) complete('phish-sms');
    if (Object.values(res).every((v) => v === 'blocked')) complete('all-blocked');
  };

  const friction = [...on].reduce((s, f) => s + FACTORS.find((x) => x.id === f).friction, 0);

  return (
    <div className="ld-grid">
      <div className="lab-card">
        <h3>Design the login for "MyBank"</h3>
        <p className="hint">Every selected factor is required at login.</p>
        <div className="factor-grid">
          {FACTORS.map((f) => (
            <button key={f.id} className={`factor ${on.has(f.id) ? 'on' : ''}`} onClick={() => toggle(f.id)}>
              <f.icon size={22} /><span>{f.label}</span>
            </button>
          ))}
        </div>
        <label className="switch dark">
          <input type="checkbox" checked={session} onChange={(e) => { setSession(e.target.checked); setResults({}); }} />
          <span><Cookie size={14} /> Secure sessions (short expiry, HttpOnly cookies, device-bound tokens, re-auth for payments)</span>
        </label>
        <div className="meter-row">
          <span>User friction</span>
          <div className="bar"><span style={{ width: `${Math.min(100, friction * 15)}%` }} className={friction > 4 ? 'low' : ''} /></div>
        </div>
        <button className="btn btn-primary" onClick={run} disabled={running || !on.size}><Play size={15} /> Launch attacks</button>
        {!on.size && <p className="hint">Select at least one factor.</p>}
      </div>
      <div className="lab-card">
        <h3>Attack simulation</h3>
        <div className="attack-list">
          {ATTACKS.map((a) => {
            const r = results[a.id];
            return (
              <div key={a.id} className={`attack-row ${r || ''}`}>
                <div><strong>{a.label}</strong><small>{a.story}</small></div>
                <span className="attack-res">
                  {r === 'breached' && <><XCircle size={16} /> Breached</>}
                  {r === 'blocked' && <><CheckCircle2 size={16} /> Blocked</>}
                  {!r && (running ? <span className="spin-dot" /> : '—')}
                </span>
              </div>
            );
          })}
        </div>
        {Object.keys(results).length === ATTACKS.length && (
          <p className={`result ${Object.values(results).every((v) => v === 'blocked') ? 'good' : 'bad'}`}>
            {Object.values(results).every((v) => v === 'blocked')
              ? 'Unbreakable design! Passkeys stop phishing because the signature is bound to the real domain, and session security covers what login can’t.'
              : 'Some attacks got through. Hint: which factor can’t be relayed by a fake website?'}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- JWT tamper lab ---------------- */
const SERVER_SECRET = 'cybershield-lab-secret-key';

function JwtLab({ complete }) {
  const [token, setToken] = useState('');
  const [payloadText, setPayloadText] = useState('');
  const [forged, setForged] = useState('');
  const [verdict, setVerdict] = useState(null);

  const issue = useCallback(async () => {
    const iat = Math.floor(Date.now() / 1000);
    const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadObj = { sub: 'student42', name: 'Riya', role: 'student', iat, exp: iat + 900 };
    const payload = b64url(JSON.stringify(payloadObj));
    const sig = await hs256(`${header}.${payload}`, SERVER_SECRET);
    setToken(`${header}.${payload}.${sig}`);
    setPayloadText(JSON.stringify(payloadObj, null, 2));
    setForged(''); setVerdict(null);
  }, []);

  useEffect(() => { issue(); }, [issue]);

  const [h, p, s] = token.split('.');
  const forge = () => {
    try {
      const obj = JSON.parse(payloadText);
      setForged(`${h}.${b64url(JSON.stringify(obj))}.${s}`);
      setVerdict(null); sfx('click');
    } catch { setVerdict({ ok: false, msg: 'That isn’t valid JSON.' }); }
  };

  const send = async (tok) => {
    const [hh, pp, ss] = tok.split('.');
    const expected = await hs256(`${hh}.${pp}`, SERVER_SECRET);
    const claims = JSON.parse(fromB64url(pp));
    if (expected !== ss) {
      setVerdict({ ok: false, msg: `401 Unauthorized: signature mismatch. The payload was changed, and without the server’s secret key you can’t produce a valid signature. Tampering detected.` });
      sfx('alarm');
      complete('jwt');
    } else if (claims.exp < Date.now() / 1000) {
      setVerdict({ ok: false, msg: '401 Unauthorized: token expired.' });
    } else {
      setVerdict({ ok: true, msg: `200 OK: welcome ${claims.name}, role = ${claims.role}.` });
      sfx('good');
    }
  };

  return (
    <div className="jwt-grid">
      <div className="lab-card">
        <h3><FileKey2 size={18} /> The token the server gave you</h3>
        <code className="jwt">
          <span className="j-h">{h}</span>.<span className="j-p">{p}</span>.<span className="j-s">{s}</span>
        </code>
        <div className="jwt-legend"><span className="j-h">header</span><span className="j-p">payload</span><span className="j-s">signature = HMAC-SHA256(header.payload, secret)</span></div>
        <div className="row-gap">
          <button className="btn btn-ok btn-sm" onClick={() => send(token)}>Send genuine token</button>
          <button className="btn btn-ghost btn-sm" onClick={issue}><RefreshCw size={14} /> New token</button>
        </div>
      </div>
      <div className="lab-card">
        <h3>Play the attacker: edit the payload</h3>
        <p className="hint">The payload is only Base64-encoded, not encrypted. Anyone can read it. Try changing <code>"role": "student"</code> to <code>"admin"</code>.</p>
        <textarea className="dark-input jwt-edit" rows={8} value={payloadText} onChange={(e) => setPayloadText(e.target.value)} spellCheck={false} />
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={forge}>Re-encode token</button>
          {forged && <button className="btn btn-danger btn-sm" onClick={() => send(forged)}>Send forged token</button>}
        </div>
        {forged && <code className="jwt small"><span className="j-h">{forged.split('.')[0]}</span>.<span className="j-p changed">{forged.split('.')[1]}</span>.<span className="j-s">{forged.split('.')[2]}</span></code>}
      </div>
      {verdict && <p className={`result ${verdict.ok ? 'good' : 'bad'} full`}>{verdict.msg}</p>}
      <p className="hint full">Lessons: never put secrets in a JWT payload, because it’s readable. Always verify the signature server-side and reject <code>alg: none</code>. Keep expiry short.</p>
    </div>
  );
}

export default function AuthLab() {
  const { complete } = useMission('u3-auth');
  const [tab, setTab] = useState('totp');
  const tabs = [
    { id: 'totp', label: 'TOTP authenticator', icon: Smartphone },
    { id: 'design', label: 'Login vs attacks', icon: ShieldCheck },
    { id: 'jwt', label: 'JWT tamper test', icon: FileKey2 },
  ];
  return (
    <div>
      <div className="seg">
        {tabs.map((t) => <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}><t.icon size={15} /> {t.label}</button>)}
      </div>
      {!window.crypto?.subtle && <p className="result bad">This lab needs a secure context: open it via localhost or https.</p>}
      {tab === 'totp' && <TotpLab complete={complete} />}
      {tab === 'design' && <LoginDesigner complete={complete} />}
      {tab === 'jwt' && <JwtLab complete={complete} />}
    </div>
  );
}
