import { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, EyeOff, Hash, Lock, Play, Square, Swords } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

// A short list of very common passwords/words, the kind every guessing list starts with.
const COMMON = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'iloveyou', 'admin', 'welcome', 'monkey', 'dragon',
  'letmein', 'football', 'sunshine', 'princess', 'master', 'login', 'shadow', 'baseball', 'superman', 'batman',
  'hello', 'freedom', 'whatever', 'india', 'cricket', 'computer', 'pokemon', 'starwars', 'secret', 'summer',
  'flower', 'hunter', 'killer', 'soccer', 'ranger', 'jordan', 'tiger', 'charlie', 'thomas', 'pass',
  'qwertyuiop', 'asdfgh', 'zxcvbn', 'mumbai', 'delhi', 'krishna', 'ganesh', 'rahul', 'priya', 'love',
];
const SUFFIXES = ['', '1', '12', '123', '1234', '!', '@123', '2024', '2025', '007', '#1'];
const LEET = { a: '@', e: '3', i: '1', o: '0', s: '$' };
const leet = (w) => w.replace(/[aeios]/g, (c) => LEET[c]);
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

function* guesses() {
  for (const w of COMMON) {
    for (const base of [w, cap(w), leet(w), cap(leet(w))]) {
      for (const s of SUFFIXES) yield base + s;
    }
  }
}
const TOTAL_GUESSES = COMMON.length * 4 * SUFFIXES.length;

function analyze(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
  let bits = pw.length ? pw.length * Math.log2(pool || 1) : 0;

  const base = pw.toLowerCase().replace(/[@]/g, 'a').replace(/3/g, 'e').replace(/[1!]/g, 'i').replace(/0/g, 'o').replace(/\$/g, 's').replace(/[^a-z]+$/, '');
  const dictionary = COMMON.some((w) => base === w || (w.length >= 4 && base.includes(w)));
  const sequence = /(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/i.test(pw);
  const repeated = /(.)\1{2,}/.test(pw);
  if (dictionary) bits = Math.min(bits, 22);
  if (sequence) bits -= 10;
  if (repeated) bits -= 8;
  bits = Math.max(0, bits);

  const checks = [
    { ok: pw.length >= 12, text: 'At least 12 characters' },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), text: 'Mix of upper and lower case' },
    { ok: /[0-9]/.test(pw), text: 'Contains numbers' },
    { ok: /[^A-Za-z0-9]/.test(pw), text: 'Contains symbols' },
    { ok: pw.length > 0 && !dictionary, text: 'Not based on a common word or password' },
    { ok: pw.length > 0 && !sequence && !repeated, text: 'No sequences (1234) or repeats (aaa)' },
  ];
  const level = bits < 30 ? 0 : bits < 50 ? 1 : bits < 70 ? 2 : 3;
  return { bits: Math.round(bits), checks, level };
}

function duration(seconds) {
  if (seconds < 1) return 'instantly';
  const units = [['years', 31536000], ['days', 86400], ['hours', 3600], ['minutes', 60], ['seconds', 1]];
  for (const [name, s] of units) {
    if (seconds >= s) {
      const v = seconds / s;
      if (name === 'years' && v > 1e6) return 'millions of years+';
      return `${v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString()} ${name}`;
    }
  }
  return 'instantly';
}

const LEVELS = ['Weak', 'Fair', 'Strong', 'Super Strong'];
const SCENARIOS = [
  { label: 'Online, rate-limited login', rate: 100 / 3600 },
  { label: 'Offline, slow hash (bcrypt)', rate: 1e4 },
  { label: 'Offline, fast hash on GPUs', rate: 1e10 },
];

function PinCracker({ onCrack }) {
  const [pin, setPin] = useState('4821');
  const [current, setCurrent] = useState(0);
  const [running, setRunning] = useState(false);
  const [found, setFound] = useState(false);
  const raf = useRef(null);

  const start = () => {
    if (!/^\d{4}$/.test(pin)) return;
    const target = Number(pin);
    setFound(false); setRunning(true);
    let n = 0;
    const step = () => {
      n = Math.min(target, n + 37);
      setCurrent(n);
      if (n >= target) { setRunning(false); setFound(true); sfx('alarm'); onCrack(); return; }
      if (n % 370 === 0) sfx('tick');
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const digits = String(current).padStart(4, '0').split('');
  return (
    <div className="lab-card">
      <h3><Hash size={18} /> Brute-forcing a 4-digit PIN</h3>
      <p>A 4-digit PIN has only 10,000 combinations. Choose a PIN and watch every combination being tried in order.</p>
      <div className="pin-row">
        <input className="dark-input pin-input" value={pin} maxLength={4} inputMode="numeric" onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} disabled={running} />
        <button className="btn btn-primary btn-sm" onClick={start} disabled={running || pin.length !== 4}><Play size={14} /> Start</button>
      </div>
      <div className={`pin-display ${found ? 'found' : ''} ${running ? 'spin' : ''}`}>
        {digits.map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <p className="hint">
        Attempts: <strong>{(current + 1).toLocaleString()}</strong> / 10,000
        {found && <> · ✔ Cracked! That is why phones lock you out after a few wrong tries and why longer PINs matter.</>}
      </p>
    </div>
  );
}

function GuessAttack({ onCrack, onSurvive }) {
  const [target, setTarget] = useState('Sunshine@123');
  const [show, setShow] = useState(false);
  const [running, setRunning] = useState(false);
  const [tries, setTries] = useState(0);
  const [stream, setStream] = useState([]);
  const [result, setResult] = useState(null);
  const stop = useRef(false);

  const run = async () => {
    if (!target) return;
    stop.current = false;
    setRunning(true); setResult(null); setTries(0); setStream([]);
    const gen = guesses();
    let n = 0;
    while (!stop.current) {
      const batch = [];
      let hit = null;
      for (let k = 0; k < 18; k++) {
        const g = gen.next();
        if (g.done) break;
        n++;
        batch.push(g.value);
        if (g.value === target) { hit = g.value; break; }
      }
      setTries(n);
      setStream((s) => [...batch.slice(-6).reverse(), ...s].slice(0, 9));
      if (hit) { setResult('cracked'); sfx('alarm'); onCrack(); break; }
      if (batch.length < 18) { setResult('survived'); sfx('good'); onSurvive(); break; }
      sfx('key');
      await new Promise((r) => setTimeout(r, 30));
    }
    setRunning(false);
  };

  return (
    <div className="lab-card">
      <h3><Swords size={18} /> Guessing attack vs your password</h3>
      <p>The attacker’s list has {COMMON.length} common words. Each is tried with capital letters, l33t swaps and endings like 123, @123 and 2024: {TOTAL_GUESSES.toLocaleString()} guesses in all.</p>
      <div className="pin-row">
        <div className="pw-field">
          <input className="dark-input" type={show ? 'text' : 'password'} value={target} onChange={(e) => setTarget(e.target.value)} disabled={running} placeholder="Type a test password (not a real one!)" />
          <button className="icon-btn" onClick={() => setShow(!show)} aria-label="Show password">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
        {running
          ? <button className="btn btn-danger btn-sm" onClick={() => { stop.current = true; }}><Square size={14} /> Stop</button>
          : <button className="btn btn-primary btn-sm" onClick={run}><Play size={14} /> Attack</button>}
      </div>
      <div className="term stream">
        {stream.map((g, i) => <div key={i + g} className={g === target ? 'hit' : ''}>{g === target ? '✔ MATCH ' : 'try '} {g}</div>)}
        {!stream.length && <div className="dim">waiting…</div>}
      </div>
      <div className="bar"><span style={{ width: `${(tries / TOTAL_GUESSES) * 100}%` }} /></div>
      {result === 'cracked' && <p className="result bad">💥 Cracked after {tries.toLocaleString()} guesses. Adding "@123" to a common word doesn’t fool anyone.</p>}
      {result === 'survived' && <p className="result good">🛡 Survived all {tries.toLocaleString()} guesses! Real attackers use lists with billions of entries, so length and randomness still matter.</p>}
    </div>
  );
}

async function sha256(text) {
  if (!window.crypto?.subtle) return null;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const randomSalt = () => [...crypto.getRandomValues(new Uint8Array(8))].map((b) => b.toString(16).padStart(2, '0')).join('');

function useHash(text) {
  const [h, setH] = useState('');
  useEffect(() => {
    let alive = true;
    sha256(text).then((v) => alive && setH(v ?? 'unavailable (open the site via localhost or https)'));
    return () => { alive = false; };
  }, [text]);
  return h;
}

function HashView({ hash, compare }) {
  return (
    <code className="hash">
      {[...hash].map((ch, i) => (
        <span key={i} className={compare && compare[i] !== ch ? 'diff' : ''}>{ch}</span>
      ))}
    </code>
  );
}

function HashPlayground({ complete }) {
  const [a, setA] = useState('password');
  const [b, setB] = useState('Password');
  const ha = useHash(a);
  const hb = useHash(b);
  const diff = ha && hb ? [...ha].filter((c, i) => hb[i] !== c).length : 0;

  const [salted, setSalted] = useState(false);
  const [salts, setSalts] = useState(() => [randomSalt(), randomSalt()]);
  const users = [
    { name: 'Riya', pw: 'sunshine123' },
    { name: 'Aman', pw: 'sunshine123' },
  ];
  const h1 = useHash(salted ? salts[0] + users[0].pw : users[0].pw);
  const h2 = useHash(salted ? salts[1] + users[1].pw : users[1].pw);
  const same = h1 && h1 === h2;

  const toggleSalt = () => {
    const next = !salted;
    setSalted(next);
    sfx(next ? 'good' : 'click');
    if (next) complete('salt');
  };

  return (
    <div className="pw-lab">
      <div className="lab-card">
        <h3><Hash size={18} /> Avalanche effect</h3>
        <p>Change one character and watch the SHA-256 hash completely transform. Differing characters glow.</p>
        <label className="field-label">Input A<input className="dark-input" value={a} onChange={(e) => setA(e.target.value)} /></label>
        <HashView hash={ha} />
        <label className="field-label">Input B<input className="dark-input" value={b} onChange={(e) => setB(e.target.value)} /></label>
        <HashView hash={hb} compare={ha} />
        <div className="diff-meter">
          <span>{diff} of 64 characters differ</span>
          <div className="bar"><span style={{ width: `${(diff / 64) * 100}%` }} /></div>
        </div>
        <p className="hint">Notice: every hash is exactly 64 hex characters, whether the input is 1 letter or a whole essay.</p>
      </div>

      <div className="lab-card">
        <h3><Lock size={18} /> Why websites add salt</h3>
        <p>Riya and Aman chose the same password. Look at what the database stores.</p>
        <div className="db-table">
          <div className="db-row head"><span>user</span><span>salt</span><span>stored hash</span></div>
          {users.map((u, i) => (
            <div key={u.name} className={`db-row ${same ? 'clash' : ''}`}>
              <span>{u.name}</span>
              <span className="mono">{salted ? salts[i] : '—'}</span>
              <span className="mono trunc">{(i === 0 ? h1 : h2).slice(0, 24)}…</span>
            </div>
          ))}
        </div>
        {same
          ? <p className="result bad">⚠ Identical hashes! Crack one and you’ve cracked both, and a precomputed rainbow table works on every user.</p>
          : <p className="result good">✔ Different hashes for the same password. Attackers must crack every user separately and rainbow tables are useless.</p>}
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={toggleSalt}>{salted ? 'Remove salt' : 'Add a random salt'}</button>
          {salted && <button className="btn btn-ghost btn-sm" onClick={() => { setSalts([randomSalt(), randomSalt()]); sfx('click'); }}>New salts</button>}
        </div>
      </div>
    </div>
  );
}

export default function PasswordLab() {
  const { complete } = useMission('password');
  const [tab, setTab] = useState('attack');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'attack' ? 'active' : ''} onClick={() => setTab('attack')}><Swords size={15} /> Attack & defend</button>
        <button className={tab === 'hash' ? 'active' : ''} onClick={() => setTab('hash')}><Hash size={15} /> Hash & salt playground</button>
      </div>
      {tab === 'attack' ? <AttackTab complete={complete} /> : <HashPlayground complete={complete} />}
    </div>
  );
}

function AttackTab({ complete }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const a = useMemo(() => analyze(pw), [pw]);

  useEffect(() => { if (a.level === 3) complete('strong'); }, [a.level, complete]);

  return (
    <div className="pw-lab">
      <div className="lab-card pw-analyzer">
        <h3><Lock size={18} /> Password strength analyzer</h3>
        <div className="pw-field big">
          <input className="dark-input" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Try: p@ssw0rd123 … then Forest-Rains-Tornado-3" />
          <button className="icon-btn" onClick={() => setShow(!show)} aria-label="Show password">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
        <div className="strength">
          {LEVELS.map((l, i) => <span key={l} className={pw && a.level >= i ? `on l${a.level}` : ''} />)}
        </div>
        <div className="strength-label">
          <strong className={`l${a.level}`}>{pw ? LEVELS[a.level] : '—'}</strong>
          <span>{a.bits} bits of entropy</span>
        </div>
        <ul className="checks">
          {a.checks.map((c) => <li key={c.text} className={c.ok ? 'ok' : ''}>{c.ok ? '✔' : '✘'} {c.text}</li>)}
        </ul>
        <div className="crack-times">
          {SCENARIOS.map((s) => (
            <div key={s.label}><small>{s.label}</small><strong>{pw ? duration(2 ** a.bits / 2 / s.rate) : '—'}</strong></div>
          ))}
        </div>
      </div>
      <div className="pw-side">
        <GuessAttack onCrack={() => complete('crack')} onSurvive={() => complete('survive')} />
        <PinCracker onCrack={() => complete('pin')} />
      </div>
    </div>
  );
}
