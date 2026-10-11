import { useEffect, useRef, useState } from 'react';
import { Camera, Laptop, Monitor, Printer, Router, Server, Smartphone, Tablet, Tv, Lightbulb, Skull, Globe, Shield, Wrench, RotateCcw, Play, Radio } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const DEVICES = [
  { name: 'Riya’s Laptop', icon: Laptop, x: 300, y: 70, vuln: true, issue: 'User clicks links in unknown emails', fix: 'Security awareness + email filtering' },
  { name: 'Smart Camera', icon: Camera, x: 410, y: 55, vuln: true, issue: 'Still uses default login admin/admin', fix: 'Set a strong unique password' },
  { name: 'Home Router', icon: Router, x: 520, y: 80, vuln: true, issue: 'Firmware not updated since 2019', fix: 'Update the firmware' },
  { name: 'Smart TV', icon: Tv, x: 290, y: 185, vuln: false, issue: 'Auto-updates on, strong password', fix: '' },
  { name: 'Office Desktop', icon: Monitor, x: 410, y: 170, vuln: false, issue: 'Patched, antivirus up to date', fix: '' },
  { name: 'Network Printer', icon: Printer, x: 530, y: 195, vuln: true, issue: 'Telnet port open to the internet', fix: 'Disable Telnet / close the port' },
  { name: 'Phone', icon: Smartphone, x: 300, y: 300, vuln: true, issue: 'Installs APKs from unknown sources', fix: 'Install apps only from the Play Store' },
  { name: 'Tablet', icon: Tablet, x: 410, y: 285, vuln: false, issue: 'Updated, apps only from official store', fix: '' },
  { name: 'Smart Bulb Hub', icon: Lightbulb, x: 520, y: 310, vuln: false, issue: 'Isolated on a separate guest network', fix: '' },
  { name: 'File Server', icon: Server, x: 410, y: 385, vuln: false, issue: 'Firewall + MFA for admins', fix: '' },
];
const C2 = { x: 95, y: 220 };
const TARGET = { x: 660, y: 220 };
const BUDGET = 5;

const COMMANDS = [
  { id: 'ddos', label: 'Flood a website', target: 'shop.example', log: (n) => `C2 ▸ ${n} bots ordered to flood shop.example. The site slows to a crawl.` },
  { id: 'spam', label: 'Send spam', target: 'Inboxes', log: (n) => `C2 ▸ ${n} bots sending ${n * 5000} phishing emails per hour.` },
  { id: 'mine', label: 'Mine crypto', target: 'Mining pool', log: (n) => `C2 ▸ ${n} devices now mining crypto. Owners notice slow devices and high bills.` },
];

export default function BotnetLab() {
  const { complete } = useMission('botnets');
  const [mode, setMode] = useState('attack');
  const [hardened, setHardened] = useState(() => new Set());
  const [infected, setInfected] = useState(() => new Set());
  const [probe, setProbe] = useState(null);
  const [running, setRunning] = useState(false);
  const [command, setCommand] = useState(null);
  const [selected, setSelected] = useState(0);
  const [log, setLog] = useState(['Network online. 10 devices connected.']);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const addLog = (line) => setLog((l) => [line, ...l].slice(0, 14));

  const reset = (nextMode = mode) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setInfected(new Set()); setProbe(null); setRunning(false); setCommand(null);
    if (nextMode === 'defend') setHardened(new Set());
    setLog([nextMode === 'defend' ? `Defender mode: you have ${BUDGET} security fixes. Inspect devices and harden the weak ones.` : 'Attacker view: launch an infection wave.']);
  };

  const switchMode = (m) => { setMode(m); reset(m); };

  const launch = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setInfected(new Set()); setCommand(null);
    setRunning(true);
    sfx('whoosh');
    addLog('C2 ▸ Scanning network for weak devices…');
    const found = new Set();
    DEVICES.forEach((d, i) => {
      timers.current.push(setTimeout(() => {
        setProbe(i);
        timers.current.push(setTimeout(() => {
          const falls = d.vuln && !(mode === 'defend' && hardened.has(i));
          if (falls) {
            found.add(i);
            setInfected(new Set(found));
            addLog(`⚠ ${d.name} infected: ${d.issue.toLowerCase()}`);
            sfx('bad');
          } else {
            addLog(`🛡 ${d.name} resisted the attack`);
            sfx('tick');
          }
        }, 380));
      }, i * 520));
    });
    timers.current.push(setTimeout(() => {
      setProbe(null); setRunning(false);
      addLog(`Wave finished: botnet size = ${found.size} bot${found.size === 1 ? '' : 's'}`);
      if (mode === 'attack') complete('infect');
      if (mode === 'defend' && found.size === 0) {
        complete('defend');
        addLog('🏆 Zero bots! Your fixes stopped the botnet completely.');
      }
    }, DEVICES.length * 520 + 500));
  };

  const sendCommand = (c) => {
    if (!infected.size || running) return;
    setCommand(c);
    addLog(c.log(infected.size));
    sfx('alarm');
    complete('command');
  };

  const toggleFix = (i) => {
    if (running) return;
    setInfected(new Set());
    if (!hardened.has(i) && hardened.size < BUDGET) sfx('coin');
    setHardened((h) => {
      const n = new Set(h);
      if (n.has(i)) n.delete(i);
      else if (n.size < BUDGET) n.add(i);
      return n;
    });
  };

  const sel = DEVICES[selected];
  const fixesLeft = BUDGET - hardened.size;

  return (
    <div className="bn-lab">
      <div className="seg">
        <button className={mode === 'attack' ? 'active' : ''} onClick={() => switchMode('attack')}><Skull size={15} /> Attacker view</button>
        <button className={mode === 'defend' ? 'active' : ''} onClick={() => switchMode('defend')}><Shield size={15} /> Defender mode</button>
      </div>

      <div className="bn-grid">
        <div className="bn-map">
          <svg viewBox="0 0 720 440" role="img" aria-label="Botnet network map">
            <defs>
              <radialGradient id="c2glow"><stop offset="0" stopColor="#ef4444" stopOpacity=".6" /><stop offset="1" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
            </defs>
            {DEVICES.map((d, i) => (
              <line key={`l${i}`} x1={C2.x} y1={C2.y} x2={d.x} y2={d.y} className={`bn-link ${infected.has(i) ? 'owned' : ''}`} />
            ))}
            {command && [...infected].map((i) => (
              <g key={`a${i}`}>
                <line x1={DEVICES[i].x} y1={DEVICES[i].y} x2={TARGET.x} y2={TARGET.y} className="bn-attack" />
                <circle r="4" className="bn-packet">
                  <animate attributeName="cx" from={DEVICES[i].x} to={TARGET.x} dur={`${0.8 + (i % 3) * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" from={DEVICES[i].y} to={TARGET.y} dur={`${0.8 + (i % 3) * 0.25}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            {probe !== null && (
              <circle key={`p${probe}`} r="6" className="bn-probe">
                <animate attributeName="cx" from={C2.x} to={DEVICES[probe].x} dur="0.38s" fill="freeze" />
                <animate attributeName="cy" from={C2.y} to={DEVICES[probe].y} dur="0.38s" fill="freeze" />
              </circle>
            )}

            <circle cx={C2.x} cy={C2.y} r="60" fill="url(#c2glow)" className={running ? 'pulse' : ''} />
            <g className="bn-node c2">
              <circle cx={C2.x} cy={C2.y} r="30" />
              <Skull x={C2.x - 14} y={C2.y - 14} size={28} />
              <text x={C2.x} y={C2.y + 50}>C2 Server</text>
            </g>

            <g className={`bn-node target ${command && infected.size ? 'hit' : ''}`}>
              <circle cx={TARGET.x} cy={TARGET.y} r="30" />
              <Globe x={TARGET.x - 14} y={TARGET.y - 14} size={28} />
              <text x={TARGET.x} y={TARGET.y + 50}>{command ? command.target : 'Target'}</text>
            </g>

            {DEVICES.map((d, i) => {
              const Icon = d.icon;
              const cls = infected.has(i) ? 'bot' : hardened.has(i) && mode === 'defend' ? 'hard' : '';
              return (
                <g
                  key={d.name}
                  className={`bn-node dev ${cls} ${selected === i ? 'sel' : ''}`}
                  onClick={() => setSelected(i)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(i)}
                >
                  <circle cx={d.x} cy={d.y} r="24" />
                  <Icon x={d.x - 11} y={d.y - 11} size={22} />
                  {cls === 'bot' && <text x={d.x + 18} y={d.y - 16} className="bn-badge">🧟</text>}
                  {cls === 'hard' && <text x={d.x + 18} y={d.y - 16} className="bn-badge">🛡</text>}
                </g>
              );
            })}
          </svg>
          <div className="bn-stats">
            <span>Bots: <strong className={infected.size ? 'red' : ''}>{infected.size}</strong></span>
            {mode === 'defend' && <span>Fixes left: <strong>{fixesLeft}</strong></span>}
          </div>
        </div>

        <div className="bn-side">
          <div className="lab-card">
            <h3><sel.icon size={18} /> {sel.name}</h3>
            {mode === 'attack' ? (
              <p className={sel.vuln ? 'red' : 'green'}>{sel.vuln ? '⚠ Weakness: ' : '✔ Secure: '}{sel.issue}</p>
            ) : (
              <p>Status report: {sel.issue}</p>
            )}
            {mode === 'defend' && (
              <button className="btn btn-primary btn-sm" disabled={running || (!hardened.has(selected) && fixesLeft === 0)} onClick={() => toggleFix(selected)}>
                <Wrench size={14} /> {hardened.has(selected) ? 'Undo fix' : sel.vuln ? `Apply fix: ${sel.fix}` : 'Apply a fix here'}
              </button>
            )}
            {mode === 'defend' && <p className="hint">Click devices on the map to read their status report. Spend fixes only where there is a real weakness.</p>}
          </div>

          <div className="lab-card">
            <button className="btn btn-primary w100" disabled={running} onClick={launch}><Play size={15} /> Launch infection wave</button>
            {mode === 'attack' && (
              <div className="cmd-row">
                <small><Radio size={13} /> C2 commands {infected.size ? '' : '(infect devices first)'}</small>
                {COMMANDS.map((c) => (
                  <button key={c.id} className={`chip ${command?.id === c.id ? 'on' : ''}`} disabled={!infected.size || running} onClick={() => sendCommand(c)}>{c.label}</button>
                ))}
              </div>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => reset()}><RotateCcw size={14} /> Reset</button>
          </div>

          <div className="term log">
            {log.map((l, i) => <div key={i + l}>{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
