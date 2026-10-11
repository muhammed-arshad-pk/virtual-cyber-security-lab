import { useEffect, useState } from 'react';
import { MemoryStick, ShieldCheck, Bird, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

// A purely visual model of a 16-byte buffer and the memory next to it.
const SIZE = 16;
const REGIONS = [
  { id: 'buf', label: 'username buffer (16 bytes)', len: SIZE },
  { id: 'var', label: 'is_admin flag', len: 4 },
  { id: 'canary', label: 'stack canary', len: 4 },
  { id: 'ret', label: 'return address', len: 8 },
];
const TOTAL = REGIONS.reduce((s, r) => s + r.len, 0);

export default function BufferLab() {
  const { complete } = useMission('u4-buffer');
  const [input, setInput] = useState('student01');
  const [bounds, setBounds] = useState(false);
  const [canary, setCanary] = useState(false);

  const written = bounds ? input.slice(0, SIZE - 1) : input; // leave room for the terminator when bounded
  const overflow = Math.max(0, input.length - SIZE);
  const spilled = !bounds && overflow > 0;

  let offset = 0;
  const cells = REGIONS.flatMap((r) => {
    const out = [];
    for (let k = 0; k < r.len; k++) {
      const pos = offset + k;
      const ch = pos < written.length ? written[pos] : null;
      out.push({ region: r.id, ch, corrupted: ch !== null && r.id !== 'buf' });
    }
    offset += r.len;
    return out;
  });
  const hit = (id) => cells.some((c) => c.region === id && c.corrupted);
  const detected = canary && hit('canary');
  const outcome = !spilled ? 'safe' : detected ? 'detected' : hit('ret') ? 'crash' : 'corrupt';

  useEffect(() => {
    if (outcome === 'corrupt' || outcome === 'crash') complete('overflow');
    if (bounds && overflow > 0) complete('bounds');
    if (outcome === 'detected') complete('canary');
  }, [outcome, bounds, overflow, complete]);

  useEffect(() => {
    if (outcome === 'crash' || outcome === 'corrupt') sfx('bad');
    else if (outcome === 'detected') sfx('alarm');
  }, [outcome]);

  const presets = [
    { label: 'Normal (9 chars)', v: 'student01' },
    { label: 'Exactly 16', v: 'abcdefghijklmnop' },
    { label: '+4 bytes', v: 'abcdefghijklmnopYYYY' },
    { label: '+24 bytes', v: 'abcdefghijklmnopAAAAAAAAAAAAAAAAAAAAAAAA' },
  ];

  return (
    <div className="bo-lab">
      <div className="lab-card">
        <h3><MemoryStick size={18} /> Memory buffer capacity lab</h3>
        <p>The program stores your username in a 16-byte buffer. Type more than 16 characters and watch what happens to the memory next to it. This is a visual model only: no real program, no exploit code.</p>
        <input className="dark-input" value={input} onChange={(e) => setInput(e.target.value.slice(0, TOTAL + 4))} spellCheck={false} />
        <div className="row-gap">
          {presets.map((p) => <button key={p.label} className="chip" onClick={() => { setInput(p.v); sfx('click'); }}>{p.label}</button>)}
          <span className="hint">{input.length} / {SIZE} bytes</span>
        </div>
        <div className="row-gap">
          <label className="switch dark"><input type="checkbox" checked={bounds} onChange={(e) => { setBounds(e.target.checked); sfx('click'); }} /><span><ShieldCheck size={14} /> Bounds checking (fgets / strlcpy)</span></label>
          <label className="switch dark"><input type="checkbox" checked={canary} onChange={(e) => { setCanary(e.target.checked); sfx('click'); }} /><span><Bird size={14} /> Stack canary</span></label>
        </div>
      </div>

      <div className="lab-card">
        <div className="mem-legend">
          {REGIONS.map((r) => <span key={r.id} className={`mem-l ${r.id} ${hit(r.id) ? 'hit' : ''}`}>{r.label}</span>)}
        </div>
        <div className="mem-row">
          {cells.map((c, i) => (
            <span key={i} className={`mem-cell ${c.region} ${c.ch !== null ? 'filled' : ''} ${c.corrupted ? 'corrupt' : ''}`} style={{ transitionDelay: `${i * 12}ms` }}>
              {c.ch ?? (c.region === 'canary' && canary ? '◆' : '')}
            </span>
          ))}
        </div>
        <div className={`bo-status ${outcome}`}>
          {outcome === 'safe' && (bounds && overflow > 0
            ? `✔ Bounds checking stopped the write at ${SIZE - 1} characters (+ terminator). The extra ${overflow} bytes were safely discarded.`
            : '✔ Input fits inside the buffer. Neighbouring memory is untouched.')}
          {outcome === 'corrupt' && `⚠ Buffer capacity exceeded by ${overflow} bytes! The is_admin flag next to the buffer was overwritten, so the program’s data is now corrupted.`}
          {outcome === 'crash' && `💥 Buffer capacity exceeded by ${overflow} bytes! Control data (the return address) was overwritten, so the program’s state is unpredictable and it would crash, or worse.`}
          {outcome === 'detected' && '🛡 Stack canary changed → "stack smashing detected". The program terminated safely before using corrupted control data.'}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { setInput('student01'); setBounds(false); setCanary(false); }}><RotateCcw size={14} /> Reset</button>
      </div>
    </div>
  );
}
