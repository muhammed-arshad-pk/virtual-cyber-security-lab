import { useState } from 'react';
import { KeyRound, Keyboard, ScanSearch, Skull, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const APPS = [
  { name: 'Space Quiz Game', icon: '🚀', perms: ['Internet access'], risky: false, why: 'A game needing internet is normal.' },
  { name: 'Quick PDF Convert', icon: '📄', perms: ['Accessibility service (read screen & typed text)', 'Run in background always', 'Upload data continuously', 'Read SMS'], risky: true, why: 'A PDF tool has no reason to read your screen, keystrokes or SMS. These are classic spyware permissions.' },
  { name: 'Campus Bus Tracker', icon: '🚌', perms: ['Location (only while using the app)'], risky: false, why: 'Location while in use matches the app’s purpose.' },
  { name: 'Free Keyboard Themes PRO', icon: '⌨️', perms: ['Replace system keyboard (full access)', 'Network access', 'Read contacts'], risky: true, why: 'A keyboard with full network access can send everything you type to someone else.' },
  { name: 'Flashlight Plus', icon: '🔦', perms: ['Camera (flash)', 'Microphone', 'Location (always)', 'Contacts'], risky: true, why: 'A flashlight only needs the camera flash. Microphone, contacts and constant location point to spying.' },
  { name: 'Notes Lite', icon: '📝', perms: ['Storage (save your notes)'], risky: false, why: 'Storage is exactly what a notes app needs.' },
];

const now = () => new Date().toLocaleTimeString('en-GB', { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0');

function reconstruct(log, field) {
  let s = '';
  log.filter((k) => k.field === field).forEach((k) => {
    if (k.key === 'Backspace') s = s.slice(0, -1);
    else if (k.key.length === 1) s += k.key;
  });
  return s;
}

function CaptureLab({ complete }) {
  const [active, setActive] = useState(true);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [log, setLog] = useState([]);
  const [flying, setFlying] = useState([]);
  const [autofilled, setAutofilled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onKey = (field) => (e) => {
    if (!active) return;
    const key = e.key;
    if (key.length !== 1 && key !== 'Backspace' && key !== 'Enter' && key !== 'Tab') return;
    setLog((l) => [...l, { t: now(), field, key }].slice(-80));
    sfx('key');
    const id = Math.random();
    setFlying((f) => [...f, { id, key: key.length === 1 ? key : `⟨${key}⟩` }]);
    setTimeout(() => setFlying((f) => f.filter((x) => x.id !== id)), 900);
  };

  const autofill = () => {
    setPass('Xq7#mP2v!Lr9wK4z');
    setAutofilled(true);
    sfx('good');
    setLog((l) => [...l, { t: now(), field: 'password', key: '(no keystrokes: value inserted by password manager)', info: true }]);
    complete('autofill');
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (reconstruct(log, 'password').length > 0) { sfx('alarm'); complete('capture'); }
  };

  const clear = () => { setLog([]); setUser(''); setPass(''); setAutofilled(false); setSubmitted(false); };

  const stolenUser = reconstruct(log, 'username');
  const stolenPass = reconstruct(log, 'password');

  return (
    <div className="kl-grid">
      <div className="victim-pc">
        <div className="win-bar"><span /><span /><span /> <em>https://mybank.example/login</em></div>
        <form className="fake-login" onSubmit={submit}>
          <h3>🏦 MyBank Login</h3>
          <label>Username<input className="light-input" value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={onKey('username')} placeholder="e.g. student01" autoComplete="off" /></label>
          <label>Password<input className="light-input" type="password" value={pass} onChange={(e) => { setPass(e.target.value); setAutofilled(false); }} onKeyDown={onKey('password')} placeholder="type a FAKE password" autoComplete="off" /></label>
          <div className="row-gap">
            <button className="btn btn-primary btn-sm" type="submit">Log in</button>
            <button className="btn btn-ghost btn-sm" type="button" onClick={autofill}><KeyRound size={14} /> Autofill from password manager</button>
          </div>
          {submitted && <p className="hint">Logged in… but look at the attacker’s screen →</p>}
        </form>
        <div className="key-fly">
          {flying.map((f) => <span key={f.id}>{f.key}</span>)}
        </div>
        <label className="switch">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <span>Simulated keylogger {active ? <b className="red">ACTIVE</b> : <b>removed by antivirus</b>}</span>
        </label>
      </div>

      <div className="attacker-pc">
        <div className="win-bar dark"><Skull size={14} /> attacker@c2: ~/logs/victim-pc.txt</div>
        <div className="term keylog">
          {log.length === 0 && <div className="dim">[waiting for keystrokes…]</div>}
          {log.map((k, i) => (
            <div key={i} className={k.info ? 'info' : ''}>
              <span className="dim">[{k.t}]</span> <span className="fld">{k.field}</span> {k.info ? k.key : <b>{k.key === ' ' ? '␣' : k.key}</b>}
            </div>
          ))}
        </div>
        <div className="stolen">
          <h4>Reconstructed by attacker</h4>
          <div><small>username</small><code>{stolenUser || '—'}</code></div>
          <div><small>password</small><code className={stolenPass ? 'red' : ''}>{stolenPass || (autofilled ? 'not captured ✔' : '—')}</code></div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={clear}><Trash2 size={14} /> Clear</button>
      </div>
      <p className="hint full">Autofill puts the password in without key presses, so a basic keylogger sees nothing. Advanced spyware can still grab form data, so <b>MFA</b> is your final shield.</p>
    </div>
  );
}

function RiskLab({ complete }) {
  const [verdicts, setVerdicts] = useState({});
  const [checked, setChecked] = useState(false);
  const allJudged = APPS.every((_, i) => verdicts[i] !== undefined);
  const correct = APPS.filter((a, i) => verdicts[i] === a.risky).length;

  const check = () => {
    setChecked(true);
    sfx(correct === APPS.length ? 'good' : 'bad');
    if (correct === APPS.length) complete('spot-risk');
  };

  return (
    <div>
      <p className="lab-intro">Six apps want to install on your phone. Read each permission request and mark it <b>Safe</b> or <b>Suspicious</b>.</p>
      <div className="apps-grid">
        {APPS.map((a, i) => {
          const v = verdicts[i];
          const right = checked && v === a.risky;
          return (
            <div key={a.name} className={`app-card ${checked ? (right ? 'right' : 'wrong') : ''}`}>
              <div className="app-head"><span className="app-icon">{a.icon}</span><strong>{a.name}</strong></div>
              <small>Requests:</small>
              <ul>{a.perms.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="row-gap">
                <button className={`chip ${v === false ? 'on ok' : ''}`} onClick={() => { setChecked(false); setVerdicts({ ...verdicts, [i]: false }); }}>✔ Safe</button>
                <button className={`chip ${v === true ? 'on bad' : ''}`} onClick={() => { setChecked(false); setVerdicts({ ...verdicts, [i]: true }); }}>⚠ Suspicious</button>
              </div>
              {checked && <p className="app-why">{right ? <CheckCircle2 size={14} /> : <XCircle size={14} />} {a.why}</p>}
            </div>
          );
        })}
      </div>
      <div className="row-gap" style={{ marginTop: 14 }}>
        <button className="btn btn-primary" disabled={!allJudged} onClick={check}>Check my verdicts</button>
        {checked && <strong>{correct}/{APPS.length} correct {correct === APPS.length ? '🎉' : ' (fix the red ones and check again)'}</strong>}
      </div>
    </div>
  );
}

export default function KeyloggerLab() {
  const { complete } = useMission('keylogger');
  const [tab, setTab] = useState('capture');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'capture' ? 'active' : ''} onClick={() => setTab('capture')}><Keyboard size={15} /> Keystroke capture</button>
        <button className={tab === 'risk' ? 'active' : ''} onClick={() => setTab('risk')}><ScanSearch size={15} /> Spot the spyware</button>
      </div>
      {tab === 'capture' ? <CaptureLab complete={complete} /> : <RiskLab complete={complete} />}
    </div>
  );
}
