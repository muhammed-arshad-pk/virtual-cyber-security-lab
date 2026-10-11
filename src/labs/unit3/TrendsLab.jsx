import { useEffect, useRef, useState } from 'react';
import { Gauge, Play, RotateCcw, Link2 } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const GENS = [
  { id: '1G', year: '1980s', tech: 'Analogue (AMPS)', speed: 'Voice only', feature: 'First mobile phones: brick-sized, voice calls only.', security: 'No encryption at all. Anyone with a radio scanner could listen to calls, and phone identities could be cloned.', level: 0 },
  { id: '2G', year: '1991', tech: 'GSM / CDMA', speed: '≈ 0.1 Mbps', feature: 'Digital voice, SMS and the SIM card.', security: 'Encryption (A5/1) added, now broken. Only the phone is authenticated, not the network, so fake base stations (IMSI catchers) work.', level: 1 },
  { id: '3G', year: '2001', tech: 'UMTS / HSPA', speed: '≈ 2–40 Mbps', feature: 'Mobile internet, video calls, app stores.', security: 'Mutual authentication: the phone also verifies the network. Stronger ciphers and integrity protection.', level: 2 },
  { id: '4G', year: '2009', tech: 'LTE', speed: '≈ 20–100 Mbps', feature: 'All-IP network, HD streaming, VoLTE.', security: 'Improved key hierarchy (EPS-AKA). The subscriber ID (IMSI) can still be requested in clear text.', level: 3 },
  { id: '5G', year: '2019', tech: 'NR (New Radio)', speed: '≈ 100 Mbps – several Gbps', feature: 'Ultra-low latency, massive IoT, network slicing.', security: 'SUCI encrypts the subscriber ID, with stronger authentication and core-network security. New risks come from slicing and virtualised software.', level: 4 },
];

const TRENDS = [
  { id: '5g', label: '5G & massive IoT', risk: 'iot' },
  { id: 'cloud', label: 'Cloud computing', risk: 'misconfig' },
  { id: 'edge', label: 'Edge computing', risk: 'physical' },
  { id: 'byod', label: 'BYOD', risk: 'leak' },
  { id: 'wear', label: 'Wearables', risk: 'health' },
  { id: 'pay', label: 'Mobile payments / UPI', risk: 'social' },
  { id: 'ai', label: 'AI-powered apps', risk: 'deepfake' },
];
const RISKS = [
  { id: 'iot', label: 'Millions of weak devices connected at high speed' },
  { id: 'misconfig', label: 'Misconfigured storage exposing data publicly' },
  { id: 'physical', label: 'Distributed nodes that are physically exposed and hard to patch' },
  { id: 'leak', label: 'Company data leaking onto unmanaged personal devices' },
  { id: 'health', label: 'Collection of sensitive health and location data' },
  { id: 'social', label: 'Fake collect requests and QR-code payment scams' },
  { id: 'deepfake', label: 'Voice-clone and deepfake impersonation scams' },
];

function Generations({ onAll }) {
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const open = (g) => {
    setSel(g.id); sfx('whoosh');
    const n = new Set(seen).add(g.id);
    setSeen(n);
    if (n.size === GENS.length) onAll();
  };
  const g = GENS.find((x) => x.id === sel);
  return (
    <div className="lab-card">
      <h3>📶 Time machine: 1G → 5G</h3>
      <div className="gen-track">
        {GENS.map((x) => (
          <button key={x.id} className={`gen-node ${sel === x.id ? 'on' : ''} ${seen.has(x.id) ? 'seen' : ''}`} onClick={() => open(x)}>
            <strong>{x.id}</strong><small>{x.year}</small>
          </button>
        ))}
      </div>
      {g ? (
        <div className="gen-detail" key={g.id}>
          <div className="gen-head"><span className="tag">{g.tech}</span><span className="tag">{g.speed}</span></div>
          <p><b>What it brought:</b> {g.feature}</p>
          <p><b>Security:</b> {g.security}</p>
          <div className="sec-meter"><small>Security strength</small>{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i <= g.level ? 'on' : ''} />)}</div>
        </div>
      ) : <p className="hint">Tap each generation to travel through time.</p>}
    </div>
  );
}

const LANES = [
  { id: '4G', rtt: 50, mbps: 30 },
  { id: '5G', rtt: 10, mbps: 300 },
];
const SLOW = 18; // slow-motion factor so packets are visible

function Race({ onDone }) {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const raf = useRef(null);
  const DURATION = 1000; // simulated milliseconds

  const start = () => {
    setRunning(true); setT(0); sfx('whoosh');
    const t0 = performance.now();
    const step = (now) => {
      const sim = Math.min(DURATION, (now - t0) / (SLOW / 3));
      setT(sim);
      if (sim < DURATION) raf.current = requestAnimationFrame(step);
      else { setRunning(false); sfx('good'); onDone(); }
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div className="lab-card">
      <h3><Gauge size={18} /> Latency race: 1 second of gaming traffic</h3>
      <p>Each dot is a request going to a server and back. Lower latency means more round trips per second, which is why 5G suits AR, remote surgery and self-driving cars. (Illustrative typical values.)</p>
      {LANES.map((l) => {
        const trips = Math.floor(t / l.rtt);
        const phase = (t % l.rtt) / l.rtt;
        const x = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
        return (
          <div key={l.id} className="race-lane">
            <span className="race-label">{l.id}<small>{l.rtt} ms</small></span>
            <div className="race-track">
              <span className="race-dot" style={{ left: `${x * 100}%` }} />
              <span className="race-end">🖥️</span>
            </div>
            <strong className="race-count">{trips}</strong>
          </div>
        );
      })}
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={start} disabled={running}><Play size={14} /> {t ? 'Race again' : 'Start race'}</button>
        {t >= DURATION && <span className="hint">Downloading a 2 GB movie: 4G ≈ {Math.round((2000 * 8) / LANES[0].mbps / 60)} min vs 5G ≈ {Math.round((2000 * 8) / LANES[1].mbps)} s</span>}
      </div>
    </div>
  );
}

function Matcher({ onWin }) {
  const [order] = useState(() => [...RISKS].sort(() => Math.random() - 0.5));
  const [active, setActive] = useState(TRENDS[0].id);
  const [pairs, setPairs] = useState({});
  const [checked, setChecked] = useState(false);

  const assign = (riskId) => {
    if (!active) return;
    sfx('click'); setChecked(false);
    const next = { ...pairs };
    Object.keys(next).forEach((k) => { if (next[k] === riskId) delete next[k]; });
    next[active] = riskId;
    setPairs(next);
    const nextTrend = TRENDS.find((tr) => !next[tr.id]);
    setActive(nextTrend?.id ?? null);
  };
  const correct = TRENDS.filter((tr) => pairs[tr.id] === tr.risk).length;
  const check = () => {
    setChecked(true);
    const win = correct === TRENDS.length;
    sfx(win ? 'good' : 'bad');
    if (win) onWin();
  };

  return (
    <div className="lab-card">
      <h3><Link2 size={18} /> Match each trend to its biggest risk</h3>
      <p className="hint">Select a trend on the left, then its risk on the right.</p>
      <div className="match-grid">
        <div className="match-col">
          {TRENDS.map((tr) => {
            const r = RISKS.find((x) => x.id === pairs[tr.id]);
            const st = checked ? (pairs[tr.id] === tr.risk ? 'right' : 'wrong') : '';
            return (
              <button key={tr.id} className={`match-item ${active === tr.id ? 'active' : ''} ${st}`} onClick={() => { setActive(tr.id); sfx('click'); }}>
                <strong>{tr.label}</strong>
                <small>{r ? `→ ${r.label}` : 'not matched yet'}</small>
              </button>
            );
          })}
        </div>
        <div className="match-col">
          {order.map((r) => {
            const used = Object.values(pairs).includes(r.id);
            return <button key={r.id} className={`match-risk ${used ? 'used' : ''}`} onClick={() => assign(r.id)}>{r.label}</button>;
          })}
        </div>
      </div>
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={check} disabled={Object.keys(pairs).length < TRENDS.length}>Check matches</button>
        <button className="btn btn-ghost btn-sm" onClick={() => { setPairs({}); setActive(TRENDS[0].id); setChecked(false); }}><RotateCcw size={14} /> Clear</button>
        {checked && <strong>{correct}/{TRENDS.length} correct</strong>}
      </div>
    </div>
  );
}

export default function TrendsLab() {
  const { complete } = useMission('u3-trends');
  return (
    <div className="tr-lab">
      <Generations onAll={() => complete('generations')} />
      <Race onDone={() => complete('race')} />
      <Matcher onWin={() => complete('match')} />
    </div>
  );
}
