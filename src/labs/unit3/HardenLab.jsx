import { useEffect, useState } from 'react';
import { Lock, ShieldCheck, Download, Wifi, Bluetooth, MapPin, CloudUpload, Bell, Usb, AppWindow, Package, Smartphone, RotateCcw, Siren, Clock } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const LOCKS = [
  { id: 'none', label: 'None', pts: 0 },
  { id: 'swipe', label: 'Swipe', pts: 0 },
  { id: 'pin4', label: '4-digit PIN', pts: 5 },
  { id: 'strong', label: '6+ digit PIN + fingerprint', pts: 15 },
];
const APPS = [
  { id: 'torch', name: 'Torch Pro', perm: 'Contacts & SMS', why: 'A torch never needs your contacts or SMS.' },
  { id: 'game', name: 'Bubble Pop', perm: 'Microphone (always)', why: 'Always-on microphone access in a game is a spying risk.' },
  { id: 'wall', name: 'HD Wallpapers', perm: 'Precise location', why: 'Wallpapers don’t need to know where you are.' },
];

const INITIAL = { lock: 'swipe', update: 'pending', unknown: true, autojoin: true, btVisible: true, findMy: false, backup: false, notif: 'show', usb: true, revoked: [] };

function score(s) {
  const lockPts = LOCKS.find((l) => l.id === s.lock).pts;
  const enc = s.lock === 'pin4' || s.lock === 'strong' ? 10 : 0;
  return lockPts + enc
    + (s.update === 'done' ? 15 : 0)
    + (!s.unknown ? 10 : 0)
    + (!s.autojoin ? 10 : 0)
    + (!s.btVisible ? 5 : 0)
    + (s.findMy ? 10 : 0)
    + (s.backup ? 5 : 0)
    + (s.notif === 'hide' ? 5 : 0)
    + (!s.usb ? 5 : 0)
    + Math.round((s.revoked.length / APPS.length) * 10);
}

function Ring({ value }) {
  const r = 52; const c = 2 * Math.PI * r;
  const color = value >= 100 ? '#22c55e' : value >= 60 ? '#facc15' : '#ef4444';
  return (
    <svg viewBox="0 0 130 130" className="score-gauge">
      <circle cx="65" cy="65" r={r} className="track" />
      <circle cx="65" cy="65" r={r} className="val" style={{ stroke: color, strokeDasharray: c, strokeDashoffset: c * (1 - value / 100) }} />
      <text x="65" y="62" className="num">{value}</text>
      <text x="65" y="82" className="lbl">security score</text>
    </svg>
  );
}

function Row({ icon: I, title, sub, children, bad }) {
  return (
    <div className={`set-row ${bad ? 'bad' : 'ok'}`}>
      <I size={18} />
      <div><strong>{title}</strong><small>{sub}</small></div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return <label className="toggle"><input type="checkbox" checked={checked} onChange={onChange} /><span /></label>;
}

function SettingsPhone({ complete }) {
  const [s, setS] = useState(INITIAL);
  const [tip, setTip] = useState('Tap through the settings and fix anything risky.');
  const value = score(s);

  useEffect(() => { if (value >= 100) complete('harden'); }, [value, complete]);

  const set = (patch, message, good = true) => {
    setS((p) => ({ ...p, ...patch }));
    setTip(message);
    sfx(good ? 'good' : 'bad');
  };

  const install = () => {
    setS((p) => ({ ...p, update: 'installing' }));
    sfx('whoosh');
    setTimeout(() => {
      setS((p) => ({ ...p, update: 'done' }));
      setTip('Security patch installed. Known vulnerabilities fixed. Turn on auto-updates so this never waits again.');
      sfx('coin');
      complete('patch');
    }, 2200);
  };

  return (
    <div className="hd-grid">
      <div className="phone settings-phone">
        <div className="phone-notch" />
        <div className="phone-top"><Smartphone size={14} /> Settings</div>
        <div className="set-list">
          <Row icon={Lock} title="Screen lock" sub={LOCKS.find((l) => l.id === s.lock).label} bad={s.lock !== 'strong'}>
            <select className="set-select" value={s.lock} onChange={(e) => set({ lock: e.target.value }, e.target.value === 'strong' ? 'Strong passcode + biometric: convenient AND secure. It also protects your encryption keys.' : e.target.value === 'pin4' ? 'Better, but 4 digits is only 10,000 combinations and easy to shoulder-surf.' : 'No real lock means anyone holding the phone has everything, and encryption is unprotected.', e.target.value === 'strong')}>
              {LOCKS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </Row>
          <Row icon={ShieldCheck} title="Encryption" sub={s.lock === 'pin4' || s.lock === 'strong' ? 'Active: protected by your passcode' : 'Not protected: set a PIN or password'} bad={!(s.lock === 'pin4' || s.lock === 'strong')} />
          <Row icon={Download} title="System update" sub={s.update === 'done' ? 'Up to date ✔' : s.update === 'installing' ? 'Installing…' : 'Security patch available (2 months old)'} bad={s.update !== 'done'}>
            {s.update === 'pending' && <button className="btn btn-primary btn-sm" onClick={install}>Install</button>}
            {s.update === 'installing' && <div className="mini-progress"><span /></div>}
          </Row>
          <Row icon={Package} title="Install unknown apps" sub={s.unknown ? 'Allowed for Chrome & WhatsApp' : 'Blocked'} bad={s.unknown}>
            <Toggle checked={s.unknown} onChange={() => set({ unknown: !s.unknown }, s.unknown ? 'Blocked sideloading, the #1 way mobile malware arrives.' : 'Sideloading lets APKs from links bypass Play Store checks.', s.unknown)} />
          </Row>
          <Row icon={Wifi} title="Auto-join open Wi-Fi" sub={s.autojoin ? 'On' : 'Off'} bad={s.autojoin}>
            <Toggle checked={s.autojoin} onChange={() => set({ autojoin: !s.autojoin }, s.autojoin ? 'Now your phone won’t silently join evil-twin hotspots.' : 'Auto-joining open networks invites rogue hotspots.', s.autojoin)} />
          </Row>
          <Row icon={Bluetooth} title="Bluetooth visible to all" sub={s.btVisible ? 'Discoverable' : 'Hidden'} bad={s.btVisible}>
            <Toggle checked={s.btVisible} onChange={() => set({ btVisible: !s.btVisible }, s.btVisible ? 'Not discoverable, so strangers can’t see or target your phone over Bluetooth.' : 'Discoverable mode exposes you to bluejacking and worse.', s.btVisible)} />
          </Row>
          <Row icon={MapPin} title="Find My Device" sub={s.findMy ? 'On' : 'Off'} bad={!s.findMy}>
            <Toggle checked={s.findMy} onChange={() => set({ findMy: !s.findMy }, !s.findMy ? 'You can now locate, lock and erase the phone remotely if it’s lost.' : 'Without it you can’t locate or wipe a lost phone.', !s.findMy)} />
          </Row>
          <Row icon={CloudUpload} title="Encrypted backup" sub={s.backup ? 'Daily' : 'Off'} bad={!s.backup}>
            <Toggle checked={s.backup} onChange={() => set({ backup: !s.backup }, !s.backup ? 'Backups mean losing the phone, or ransomware, doesn’t mean losing your data.' : 'No backup: a lost phone means lost photos and files.', !s.backup)} />
          </Row>
          <Row icon={Bell} title="Lock-screen notifications" sub={s.notif === 'show' ? 'Show all content (incl. OTPs)' : 'Hide sensitive content'} bad={s.notif === 'show'}>
            <Toggle checked={s.notif === 'hide'} onChange={() => set({ notif: s.notif === 'show' ? 'hide' : 'show' }, s.notif === 'show' ? 'OTPs no longer appear on the lock screen for anyone holding your phone.' : 'OTPs visible on a locked phone defeat your 2FA.', s.notif === 'show')} />
          </Row>
          <Row icon={Usb} title="USB debugging" sub={s.usb ? 'On (developer option)' : 'Off'} bad={s.usb}>
            <Toggle checked={s.usb} onChange={() => set({ usb: !s.usb }, s.usb ? 'USB debugging off: a connected computer can no longer control the phone.' : 'USB debugging lets a computer install apps and read data.', s.usb)} />
          </Row>
          <div className="set-section">App permissions</div>
          {APPS.map((a) => {
            const revoked = s.revoked.includes(a.id);
            return (
              <Row key={a.id} icon={AppWindow} title={a.name} sub={revoked ? 'Permission revoked ✔' : `Has: ${a.perm}`} bad={!revoked}>
                {!revoked && <button className="btn btn-ghost btn-sm" onClick={() => set({ revoked: [...s.revoked, a.id] }, `Revoked. ${a.why}`)}>Revoke</button>}
              </Row>
            );
          })}
        </div>
      </div>
      <div className="hd-side">
        <div className="lab-card center">
          <Ring value={value} />
          <p className="tip" key={tip}>{tip}</p>
          {value >= 100 && <p className="result good">🛡 Fully hardened. This is defense in depth.</p>}
          <button className="btn btn-ghost btn-sm" onClick={() => { setS(INITIAL); setTip('Reset to the risky configuration.'); }}><RotateCcw size={14} /> Reset phone</button>
        </div>
      </div>
    </div>
  );
}

const LOST = [
  { time: '21:40', text: 'You realise your phone was left in a cab.', options: ['Use Find My Device from a laptop to locate it', 'Wait until tomorrow morning', 'Keep calling it and do nothing else'], answer: 0, why: 'Act fast. Location may help you recover it, and it starts the response.' },
  { time: '21:45', text: 'The map shows it moving away across the city.', options: ['Drive after the cab yourself', 'Remotely lock it and show a "call this number" message', 'Post your phone number on social media'], answer: 1, why: 'Locking protects data immediately, and an honest finder can contact you.' },
  { time: '21:55', text: 'The phone has been switched off.', options: ['It’s off, so it’s safe. Relax', 'Buy a new phone first', 'Call your telecom operator to block the SIM'], answer: 2, why: 'Blocking the SIM stops OTPs and calls reaching whoever has the phone.' },
  { time: '22:10', text: 'Your banking, UPI and email apps were logged in on it.', options: ['From another device: change passwords, sign out of all sessions, and ask the bank to block UPI/cards', 'Ignore it, since the phone is locked', 'Delete your email account'], answer: 0, why: 'Revoking sessions and credentials removes the attacker’s path to your money.' },
  { time: 'Next day', text: 'Still no sign of the phone.', options: ['Just get a duplicate SIM and forget it', 'File a police complaint and block the IMEI on Sanchar Saathi (CEIR)', 'Wait for the thief to call'], answer: 1, why: 'CEIR blocks the handset on every Indian network and helps trace it.' },
  { time: 'Day 3', text: 'Recovery looks unlikely.', options: ['Pay an online "phone tracker" service', 'Keep waiting forever', 'Remotely erase the device'], answer: 2, why: 'Remote wipe ensures your data can never be read, even if the lock is broken later.' },
];

function LostPhone({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const done = i >= LOST.length;
  const step = LOST[i];

  const choose = (k) => {
    if (picked !== null) return;
    setPicked(k);
    const ok = k === step.answer;
    sfx(ok ? 'good' : 'bad');
    if (!ok) setMistakes((m) => m + 1);
    if (ok && i === LOST.length - 1 && mistakes === 0) complete('lost');
  };
  const next = () => { setI(i + 1); setPicked(null); if (i + 1 < LOST.length) sfx('alarm'); };
  const restart = () => { setI(0); setPicked(null); setMistakes(0); };

  return (
    <div className="lab-card">
      <h3><Siren size={18} /> Emergency: lost phone</h3>
      <div className="lost-timeline">
        {LOST.map((l, k) => <span key={l.time} className={k < i ? 'done' : k === i ? 'now' : ''}><Clock size={11} /> {l.time}</span>)}
      </div>
      {!done ? (
        <>
          <div className="alert-box" key={i}><Clock size={16} /> <b>{step.time}:</b>&nbsp;{step.text}</div>
          <div className="quiz-options">
            {step.options.map((o, k) => (
              <button key={o} className={`quiz-option ${picked === null ? '' : k === step.answer ? 'correct' : k === picked ? 'wrong' : 'dim'}`} onClick={() => choose(k)} disabled={picked !== null}>{o}</button>
            ))}
          </div>
          {picked !== null && (
            <div className={`explain ${picked === step.answer ? 'good' : 'bad'}`}>
              {step.why}
              <button className="btn btn-primary btn-sm" onClick={next}>{i + 1 < LOST.length ? 'Next' : 'Finish'}</button>
            </div>
          )}
        </>
      ) : (
        <div className="explain good">
          {mistakes === 0 ? '🏆 Perfect response: locate → lock → block SIM → secure accounts → report & block IMEI → wipe.' : `Finished with ${mistakes} mistake${mistakes > 1 ? 's' : ''}. Replay for a perfect response.`}
          <button className="btn btn-ghost btn-sm" onClick={restart}><RotateCcw size={14} /> Replay</button>
        </div>
      )}
    </div>
  );
}

export default function HardenLab() {
  const { complete } = useMission('u3-harden');
  const [tab, setTab] = useState('settings');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}><ShieldCheck size={15} /> Harden the phone</button>
        <button className={tab === 'lost' ? 'active' : ''} onClick={() => setTab('lost')}><Siren size={15} /> Lost-phone emergency</button>
      </div>
      {tab === 'settings' ? <SettingsPhone complete={complete} /> : <LostPhone complete={complete} />}
    </div>
  );
}
