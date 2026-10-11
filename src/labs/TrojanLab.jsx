import { useEffect, useRef, useState } from 'react';
import { Download, ShieldCheck, ShieldAlert, WifiOff, RotateCcw, BadgeCheck, AlertTriangle, FileCheck2, Upload } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const ROUNDS = [
  {
    need: 'You need a free PDF editor for your assignment.',
    options: [
      { name: 'PDF_Editor_PRO_Full_Crack.exe', source: 'free-softwarez-dl.xyz', publisher: 'Unknown (unsigned)', size: '2.1 MB', perms: ['Run as administrator', 'Start automatically with Windows'], reviews: '“works 100%!!!” (3 reviews)', safe: false, flags: ['"Crack" software is the #1 Trojan bait', 'Unsigned, with an unknown publisher', 'Suspiciously small for a full editor', 'Wants to run at startup'] },
      { name: 'PDF Editor', source: 'Microsoft Store', publisher: 'Docs Labs Ltd ✔ verified', size: '84 MB', perms: ['Access files you open'], reviews: '★ 4.5 (12,400 reviews)', safe: true, flags: ['Official store', 'Verified publisher', 'Minimal permissions'] },
      { name: 'Invoice_PDF_Tool.pdf.exe', source: 'Email attachment from unknown sender', publisher: 'Unknown', size: '640 KB', perms: ['Run as administrator'], reviews: 'No reviews', safe: false, flags: ['Double extension .pdf.exe hides a program', 'Unexpected attachment from a stranger'] },
    ],
  },
  {
    need: 'A friend says there’s a mod that gives free diamonds in your favourite game.',
    options: [
      { name: 'FreeDiamonds_Hack.apk', source: 'Telegram channel', publisher: 'Unknown', size: '3.4 MB', perms: ['Read SMS', 'Accessibility service', 'Read contacts'], reviews: '“legit bro” (forwarded message)', safe: false, flags: ['Sideloaded APK from a chat channel', 'Games never need SMS or accessibility access', '"Free premium items" is classic bait'] },
      { name: 'Mod Installer v2', source: 'gaming-forum.example', publisher: 'Unknown', size: '12 MB', perms: ['Requires you to DISABLE antivirus first'], reviews: '★ 3.1 (40 reviews)', safe: false, flags: ['Any installer asking you to turn off antivirus is a huge red flag'] },
      { name: 'Official Mod Pack', source: 'In-game store / Play Store', publisher: 'Game Studio ✔ verified', size: '210 MB', perms: ['Storage'], reviews: '★ 4.3 (88,000 reviews)', safe: true, flags: ['Official source', 'Verified developer', 'Sensible permissions'] },
    ],
  },
  {
    need: 'You want a browser ad-blocker extension.',
    options: [
      { name: 'uBlock Origin', source: 'Chrome Web Store', publisher: 'Raymond Hill ✔ established', size: '3.5 MB', perms: ['Read and change site data (needed to block ads)'], reviews: '★ 4.7 · 10M+ users', safe: true, flags: ['Official store', 'Long track record, open source', 'Permission matches its purpose'] },
      { name: 'AdBlock Ultimate Speed Booster', source: 'Chrome Web Store', publisher: 'speedboost-dev (new)', size: '0.4 MB', perms: ['Read browsing history', 'Manage downloads', 'Communicate with external server'], reviews: '★ 5.0 · 120 users · created 3 days ago', safe: false, flags: ['Brand new with too-perfect reviews', 'Download & history access not needed for ad blocking', 'Sends data to an external server'] },
      { name: 'browser_update_ext.crx', source: 'Pop-up: “Your browser is outdated!”', publisher: 'Unknown', size: '0.2 MB', perms: ['All websites, all data'], reviews: 'None', safe: false, flags: ['Browsers update themselves, not through pop-ups', 'Manually installed extension file'] },
    ],
  },
  {
    need: 'A flashing pop-up says: “WARNING! 37 viruses found! Act now!”',
    options: [
      { name: 'CleanerX_Free.exe', source: 'The pop-up’s download button', publisher: 'Unknown', size: '1.2 MB', perms: ['Run as administrator', 'Start with Windows'], reviews: 'None', safe: false, flags: ['Fake antivirus (scareware) is a common Trojan', 'Created to panic you into clicking'] },
      { name: 'Call “Microsoft Support”', source: 'Phone number in the pop-up', publisher: '—', size: '—', perms: ['They ask you to install remote-access software'], reviews: '—', safe: false, flags: ['Tech-support scam', 'Remote access gives them full control of your PC'] },
      { name: 'Close the tab and run Windows Security', source: 'Built into Windows', publisher: 'Microsoft ✔', size: '—', perms: ['Full scan with built-in antivirus'], reviews: 'Trusted', safe: true, flags: ['Never trust pop-up warnings in a browser', 'Use the antivirus you already have'] },
    ],
  },
];

const INFECTION = [
  'Installing… 34%',
  'Installing… 78%',
  'Also installing: svch0st.exe (hidden)',
  'Adding svch0st.exe to Windows startup…',
  'Opening backdoor on port 4444…',
  'Connecting to remote host 203.0.113.66…',
  'REMOTE SESSION STARTED: attacker can now see your screen',
  'Reading saved browser passwords…',
];

function Infection({ onRespond }) {
  const [step, setStep] = useState(0);
  const t = useRef(null);
  useEffect(() => {
    if (step === 7) sfx('alarm');
    else if (step > 0) sfx(step >= 2 ? 'bad' : 'tick');
    if (step < INFECTION.length) t.current = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t.current);
  }, [step]);
  const hacked = step >= 6;
  return (
    <div className={`infection ${hacked ? 'glitch' : ''}`}>
      <div className="install-bar"><span style={{ width: `${Math.min(100, (step / INFECTION.length) * 100)}%` }} /></div>
      <div className="term">
        {INFECTION.slice(0, step).map((l, i) => <div key={l} className={i >= 2 ? 'red' : ''}>{i >= 2 ? '⚠ ' : '› '}{l}</div>)}
      </div>
      {hacked && (
        <div className="hacked-banner">
          <ShieldAlert size={22} /> Your PC is compromised! A Trojan installed a backdoor.
          <button className="btn btn-ok btn-sm" onClick={onRespond}><WifiOff size={14} /> Respond: disconnect, scan & change passwords</button>
        </div>
      )}
    </div>
  );
}

async function sha256Bytes(buf) {
  const h = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const DEMO = 'CampusNotes Setup v2.4\nPublisher: CampusSoft Pvt Ltd\nThis is a harmless demo installer file.\n';
const TAMPERED = DEMO + '\n[hidden] payload=backdoor.dll\n';

function ChecksumVerifier({ complete }) {
  const [name, setName] = useState('');
  const [hash, setHash] = useState('');
  const [expected, setExpected] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [drag, setDrag] = useState(false);

  const hashBuffer = async (buf, fileName) => {
    if (!window.crypto?.subtle) { setError('Hashing needs a secure context (localhost or https).'); return; }
    setBusy(true); setError(''); setName(fileName); setHash('');
    const h = await sha256Bytes(buf);
    setHash(h); setBusy(false); sfx('click');
  };

  const onFile = async (file) => {
    if (!file) return;
    if (file.size > 500 * 1024 * 1024) { setError('Please choose a file under 500 MB.'); return; }
    hashBuffer(await file.arrayBuffer(), file.name);
  };

  const loadDemo = async (tampered) => {
    const enc = new TextEncoder();
    setExpected(await sha256Bytes(enc.encode(DEMO)));
    hashBuffer(enc.encode(tampered ? TAMPERED : DEMO), tampered ? 'CampusNotes_Setup.exe (from mirror site)' : 'CampusNotes_Setup.exe (official)');
  };

  const exp = expected.trim().toLowerCase();
  const verdict = hash && exp ? (hash === exp ? 'match' : 'mismatch') : null;

  useEffect(() => {
    if (!verdict) return;
    sfx(verdict === 'match' ? 'good' : 'alarm');
    complete('checksum');
  }, [verdict, complete]);

  return (
    <div className="ck-grid">
      <div className="lab-card">
        <h3><FileCheck2 size={18} /> SHA-256 Checksum Verifier</h3>
        <p>Vendors publish a SHA-256 checksum next to their downloads. If your file’s hash matches, it’s byte-for-byte the genuine file. A single changed byte, such as an injected backdoor, gives a totally different hash.</p>
        <label
          className={`dropzone ${drag ? 'drag' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}
        >
          <Upload size={22} />
          <span><b>Drop any file here</b> or click to choose</span>
          <small>Hashed locally in your browser. The file never leaves your computer.</small>
          <input type="file" hidden onChange={(e) => onFile(e.target.files[0])} />
        </label>
        <div className="row-gap">
          <small className="hint">No file handy? Try the demo:</small>
          <button className="chip" onClick={() => loadDemo(false)}>Official download</button>
          <button className="chip" onClick={() => loadDemo(true)}>Download from mirror site</button>
        </div>
      </div>
      <div className="lab-card">
        <h3>Compare</h3>
        <small className="hint">File</small>
        <code className="hash small">{busy ? 'hashing…' : name || '—'}</code>
        <small className="hint">Computed SHA-256</small>
        <code className="hash">{hash || '—'}</code>
        <label className="field-label">Expected SHA-256 (from the vendor’s website)
          <input className="dark-input" value={expected} onChange={(e) => setExpected(e.target.value)} placeholder="paste the published checksum" />
        </label>
        {error && <p className="result bad">{error}</p>}
        {verdict === 'match' && <p className="result good">✔ MATCH: this is the genuine, unmodified file.</p>}
        {verdict === 'mismatch' && <p className="result bad">✘ MISMATCH: the file was modified or corrupted. Don’t run it!</p>}
        <p className="hint">PowerShell equivalent: <code>Get-FileHash .\file.exe -Algorithm SHA256</code></p>
      </div>
    </div>
  );
}

export default function TrojanLab() {
  const { complete } = useMission('trojan');
  const [tab, setTab] = useState('detective');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'detective' ? 'active' : ''} onClick={() => setTab('detective')}><Download size={15} /> Download Detective</button>
        <button className={tab === 'checksum' ? 'active' : ''} onClick={() => setTab('checksum')}><FileCheck2 size={15} /> Checksum Verifier</button>
      </div>
      {tab === 'detective' ? <DownloadDetective complete={complete} /> : <ChecksumVerifier complete={complete} />}
    </div>
  );
}

function DownloadDetective({ complete }) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState(null);
  const [infections, setInfections] = useState(0);
  const [infecting, setInfecting] = useState(false);
  const [wins, setWins] = useState(0);
  const finished = round >= ROUNDS.length;
  const r = ROUNDS[round];

  const pick = (k) => {
    if (picked !== null) return;
    setPicked(k);
    if (r.options[k].safe) {
      sfx('good');
      complete('first');
      const w = wins + 1;
      setWins(w);
      if (w === ROUNDS.length && infections === 0) complete('perfect');
    } else {
      setInfections((n) => n + 1);
      setInfecting(true);
    }
  };

  const respond = () => { setInfecting(false); complete('infection'); };
  const next = () => { setRound(round + 1); setPicked(null); };
  const restart = () => { setRound(0); setPicked(null); setInfections(0); setWins(0); setInfecting(false); };

  if (finished) {
    return (
      <div className="lab-card pop center">
        <h3>{infections === 0 ? '🕵️ Master Detective: zero infections!' : `Case closed: ${infections} infection${infections > 1 ? 's' : ''}`}</h3>
        <p>Safe picks: {wins}/{ROUNDS.length}. Remember: official source, verified publisher, sensible permissions, no "cracks".</p>
        <button className="btn btn-primary" onClick={restart}><RotateCcw size={15} /> Play again</button>
      </div>
    );
  }

  return (
    <div className="tj-lab">
      <div className="tj-top">
        <span className="tag">Round {round + 1}/{ROUNDS.length}</span>
        <strong>{r.need}</strong>
        <span className="tj-score">✅ {wins} · ☠ {infections}</span>
      </div>
      <div className="dl-grid">
        {r.options.map((o, k) => {
          const reveal = picked !== null;
          return (
            <div key={o.name} className={`dl-card ${reveal ? (o.safe ? 'safe' : 'unsafe') : ''} ${picked === k ? 'picked' : ''}`}>
              <div className="dl-name"><Download size={16} /> {o.name}</div>
              <dl>
                <dt>Source</dt><dd>{o.source}</dd>
                <dt>Publisher</dt><dd>{o.publisher}</dd>
                <dt>Size</dt><dd>{o.size}</dd>
                <dt>Reviews</dt><dd>{o.reviews}</dd>
              </dl>
              <small>Permissions:</small>
              <ul>{o.perms.map((p) => <li key={p}>{p}</li>)}</ul>
              {!reveal && <button className="btn btn-primary btn-sm w100" onClick={() => pick(k)}>Install this</button>}
              {reveal && (
                <div className="dl-verdict">
                  {o.safe ? <><BadgeCheck size={16} /> SAFE</> : <><AlertTriangle size={16} /> TROJAN RISK</>}
                  <ul>{o.flags.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {infecting && <Infection onRespond={respond} />}
      {picked !== null && !infecting && (
        <div className={`explain ${r.options[picked].safe ? 'good' : 'bad'}`}>
          {r.options[picked].safe ? <><ShieldCheck size={16} /> Good call! Look at the red flags you avoided above.</> : 'Incident contained. Study the red flags above before the next round.'}
          <button className="btn btn-primary btn-sm" onClick={next}>{round + 1 < ROUNDS.length ? 'Next round' : 'See results'}</button>
        </div>
      )}
    </div>
  );
}
