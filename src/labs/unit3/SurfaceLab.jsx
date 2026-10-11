import { useEffect, useMemo, useState } from 'react';
import { Smartphone, Laptop, Watch, Tv, Car, Speaker, Wifi, Bluetooth, Nfc, RadioTower, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const RADIOS = {
  wifi: { label: 'Wi-Fi', icon: Wifi, risk: 3, threat: 'Rogue / evil-twin hotspots and snooping on open networks.' },
  bluetooth: { label: 'Bluetooth', icon: Bluetooth, risk: 3, threat: 'Bluesnarfing / bluebugging and unpatched stacks (BlueBorne-style flaws).' },
  nfc: { label: 'NFC', icon: Nfc, risk: 1, threat: 'Very short range, but relay attacks are possible if a reader is held close.' },
  cellular: { label: 'Cellular', icon: RadioTower, risk: 2, threat: 'Fake base stations on legacy 2G, and SIM-swap fraud on your number.' },
  gps: { label: 'GPS / Location', icon: MapPin, risk: 1, threat: 'Apps can track and share your precise location.' },
};

const DEVICES = [
  { id: 'phone', name: 'Smartphone', icon: Smartphone, context: 'On a bus: needs phone calls and live navigation.', radios: ['cellular', 'gps', 'wifi', 'bluetooth', 'nfc'], needs: ['cellular', 'gps'] },
  { id: 'laptop', name: 'Laptop', icon: Laptop, context: 'In the college library: needs the internet for an assignment.', radios: ['wifi', 'bluetooth'], needs: ['wifi'] },
  { id: 'watch', name: 'Smartwatch', icon: Watch, context: 'Shows notifications from the paired phone.', radios: ['bluetooth', 'wifi', 'nfc', 'gps'], needs: ['bluetooth'] },
  { id: 'tv', name: 'Smart TV', icon: Tv, context: 'Streaming a movie from the internet.', radios: ['wifi', 'bluetooth'], needs: ['wifi'] },
  { id: 'car', name: 'Connected Car', icon: Car, context: 'Driving with hands-free calls and in-car navigation.', radios: ['bluetooth', 'gps', 'cellular', 'wifi'], needs: ['bluetooth', 'gps'] },
  { id: 'speaker', name: 'Smart Speaker', icon: Speaker, context: 'Playing an online radio station.', radios: ['wifi', 'bluetooth'], needs: ['wifi'] },
];

const RANGES = [
  { id: 'nfc', label: 'NFC', range: '≈ 4 cm', r: 22, note: 'Tap-to-pay works only when touching, so an attacker must be almost in contact.' },
  { id: 'bluetooth', label: 'Bluetooth', range: '≈ 10 m', r: 70, note: 'About a room. Anyone in the same café or bus could be in range.' },
  { id: 'wifi', label: 'Wi-Fi', range: '≈ 30–50 m', r: 115, note: 'Passes through walls, so neighbours and the street outside can see your network.' },
  { id: 'cellular', label: 'Cellular', range: 'kilometres', r: 165, note: 'Towers cover whole neighbourhoods, and fake towers can be set up nearby.' },
];

const riskOf = (ids) => ids.reduce((s, r) => s + RADIOS[r].risk, 0);
const INITIAL = DEVICES.reduce((s, d) => s + riskOf(d.radios), 0);
const MINIMAL = DEVICES.reduce((s, d) => s + riskOf(d.needs), 0);

function RangeVisualizer({ onAll }) {
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const pick = (r) => {
    setSel(r.id);
    sfx('whoosh');
    const n = new Set(seen).add(r.id);
    setSeen(n);
    if (n.size === RANGES.length) onAll();
  };
  const cur = RANGES.find((r) => r.id === sel);
  return (
    <div className="lab-card">
      <h3><RadioTower size={18} /> How far does each signal reach?</h3>
      <div className="row-gap">
        {RANGES.map((r) => (
          <button key={r.id} className={`chip ${sel === r.id ? 'on' : ''} ${seen.has(r.id) ? 'seen' : ''}`} onClick={() => pick(r)}>{r.label}</button>
        ))}
      </div>
      <svg viewBox="0 0 360 360" className="range-svg" role="img" aria-label="Wireless range comparison">
        {RANGES.map((r) => (
          <circle key={r.id} cx="180" cy="180" r={r.r} className={`range-ring ${sel === r.id ? 'on' : ''} ${seen.has(r.id) ? 'seen' : ''}`} />
        ))}
        {cur && <circle key={cur.id} cx="180" cy="180" r={cur.r} className="range-pulse" />}
        <circle cx="180" cy="180" r="9" className="range-you" />
        <text x="180" y="205" className="range-label">you</text>
      </svg>
      {cur ? <p><b>{cur.label}: {cur.range}.</b> {cur.note}</p> : <p className="hint">Pick a technology. The rings are not to scale: the real differences are far larger.</p>}
    </div>
  );
}

export default function SurfaceLab() {
  const { complete } = useMission('u3-surface');
  const [on, setOn] = useState(() => Object.fromEntries(DEVICES.map((d) => [d.id, new Set(d.radios)])));
  const [sel, setSel] = useState('phone');
  const [visited, setVisited] = useState(() => new Set(['phone']));

  const score = useMemo(() => DEVICES.reduce((s, d) => s + riskOf([...on[d.id]]), 0), [on]);
  const broken = DEVICES.filter((d) => d.needs.some((n) => !on[d.id].has(n)));

  useEffect(() => { if (visited.size === DEVICES.length) complete('inspect'); }, [visited, complete]);
  useEffect(() => { if (score === MINIMAL && broken.length === 0) complete('minimal'); }, [score, broken.length, complete]);

  const select = (id) => { setSel(id); sfx('click'); setVisited((v) => new Set(v).add(id)); };
  const toggle = (dev, radio) => {
    const isOn = on[dev.id].has(radio);
    sfx(isOn ? (dev.needs.includes(radio) ? 'bad' : 'good') : 'click');
    setOn((o) => {
      const n = new Set(o[dev.id]);
      isOn ? n.delete(radio) : n.add(radio);
      return { ...o, [dev.id]: n };
    });
  };
  const reset = () => { setOn(Object.fromEntries(DEVICES.map((d) => [d.id, new Set(d.radios)]))); sfx('click'); };

  const dev = DEVICES.find((d) => d.id === sel);
  const pct = ((score - MINIMAL) / (INITIAL - MINIMAL)) * 100;

  return (
    <div className="sf-lab">
      <div className="surface-meter">
        <div className="row-between">
          <strong>Total attack surface</strong>
          <span>{score} pts <small className="hint">(minimum possible: {MINIMAL})</small></span>
        </div>
        <div className="surface-bar"><span style={{ width: `${Math.max(4, pct)}%` }} className={pct < 5 ? 'good' : pct < 50 ? 'mid' : ''} /></div>
        {broken.length > 0 && <p className="result bad"><AlertTriangle size={14} /> Broken: {broken.map((d) => d.name).join(', ')}. You switched off a radio it needs!</p>}
        {score === MINIMAL && broken.length === 0 && <p className="result good"><CheckCircle2 size={14} /> Minimal attack surface with everything still working. Exactly the goal.</p>}
      </div>

      <div className="sf-grid">
        <div className="device-grid">
          {DEVICES.map((d) => {
            const n = on[d.id].size;
            const isBroken = broken.includes(d);
            return (
              <button key={d.id} className={`device-tile ${sel === d.id ? 'sel' : ''} ${isBroken ? 'broken' : ''} ${visited.has(d.id) ? 'seen' : ''}`} onClick={() => select(d.id)}>
                <span className="waves" style={{ '--n': n }}>{[...Array(n)].map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.35}s` }} />)}</span>
                <d.icon size={30} />
                <strong>{d.name}</strong>
                <small>{n} radio{n === 1 ? '' : 's'} on</small>
              </button>
            );
          })}
        </div>

        <div className="lab-card">
          <h3><dev.icon size={18} /> {dev.name}</h3>
          <p className="ctx">📍 {dev.context}</p>
          <div className="radio-list">
            {dev.radios.map((r) => {
              const R = RADIOS[r];
              const isOn = on[dev.id].has(r);
              return (
                <div key={r} className={`radio-row ${isOn ? 'on' : ''}`}>
                  <R.icon size={18} />
                  <div><strong>{R.label}</strong><small>{R.threat}</small></div>
                  <label className="toggle">
                    <input type="checkbox" checked={isOn} onChange={() => toggle(dev, r)} />
                    <span />
                  </label>
                </div>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={reset}>Reset all devices</button>
        </div>
      </div>

      <RangeVisualizer onAll={() => complete('range')} />
    </div>
  );
}
