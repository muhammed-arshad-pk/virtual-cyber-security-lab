import { useState } from 'react';
import { Upload, FileText, ShieldCheck, ShieldX, Download, ArrowRightLeft, Layers, RotateCcw, FlaskConical } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const sha256 = async (bytes) => hex(await crypto.subtle.digest('SHA-256', bytes));
const stamp = () => new Date().toLocaleString('en-IN', { hour12: false });
const enc = new TextEncoder();

const DEMO = [
  { name: 'server-auth.log', text: '2026-10-11 02:14:07 LOGIN SUCCESS user=arvind ip=203.0.113.45 device=NEW\n2026-10-11 02:20:31 PASSWORD_CHANGE user=arvind ip=203.0.113.45\n2026-10-11 02:31:12 IMPS_TRANSFER amount=45000 to=RKTRADERS ref=UTR4F82910' },
  { name: 'suspicious-email.eml', text: 'From: "Bank Security" <alerts@secure-bank-verify.example>\nTo: arvind@example.com\nDate: Sat, 10 Oct 2026 21:42:10 +0530\nSubject: Urgent: verify your account\n\nYour account will be blocked today. Verify now.' },
  { name: 'transactions.csv', text: 'date,description,amount,utr\n2026-10-11,IMPS RKTRADERS,-45000,UTR4F82910\n2026-10-11,DEBIT verify-acct,-1,UTR4F82877\n2026-10-01,PENSION CREDIT,32000,UTR4E11002' },
];
const HANDLERS = ['SI Meena Rao (Cyber Cell)', 'Evidence Room Clerk', 'Forensic Analyst R. Iyer', 'Public Prosecutor’s Office'];
const ACTIONS = ['Collected', 'Transferred', 'Stored in evidence room', 'Forensic examination', 'Produced in court'];
const VOLATILITY = ['RAM & running processes', 'Active network connections', 'Temporary files', 'Disk drive contents', 'Remote server logs', 'Archived backups'];

function Locker({ complete }) {
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState(null);
  const [handler, setHandler] = useState(HANDLERS[0]);
  const [action, setAction] = useState(ACTIONS[0]);
  const [checks, setChecks] = useState({});
  const [drag, setDrag] = useState(false);

  const register = async (name, bytes, demo) => {
    const hash = await sha256(bytes);
    const item = { id: Date.now() + Math.random(), name, size: bytes.byteLength, hash, bytes, demo, added: stamp(), log: [{ t: stamp(), who: HANDLERS[0], what: 'Collected & hashed (SHA-256)' }] };
    setItems((x) => [...x, item]); setSel(item.id); sfx('coin'); complete('hash');
  };
  const onFile = async (f) => { if (f) register(f.name, new Uint8Array(await f.arrayBuffer()), false); };
  const addDemo = (d) => register(d.name, enc.encode(d.text), true);

  const item = items.find((x) => x.id === sel);
  const patch = (id, fn) => setItems((xs) => xs.map((x) => (x.id === id ? fn(x) : x)));

  const addCustody = () => {
    patch(item.id, (x) => ({ ...x, log: [...x.log, { t: stamp(), who: handler, what: action }] }));
    sfx('click');
    if (item.log.length + 1 >= 4) complete('custody');
  };
  const tamper = () => {
    patch(item.id, (x) => { const b = new Uint8Array(x.bytes); b[Math.floor(b.length / 2)] ^= 1; return { ...x, bytes: b, tampered: true }; });
    setChecks((c) => ({ ...c, [item.id]: null })); sfx('bad');
  };
  const verify = async () => {
    const now = await sha256(item.bytes);
    const ok = now === item.hash;
    setChecks((c) => ({ ...c, [item.id]: { ok, now } }));
    patch(item.id, (x) => ({ ...x, log: [...x.log, { t: stamp(), who: handler, what: `Integrity check: ${ok ? 'MATCH' : 'MISMATCH'}` }] }));
    sfx(ok ? 'good' : 'alarm');
    if (!ok) complete('integrity');
  };
  const exportReport = () => {
    const report = items.map((x) => ({ evidence: x.name, size_bytes: x.size, sha256_at_collection: x.hash, chain_of_custody: x.log }));
    const blob = new Blob([JSON.stringify({ case: 'CS-889 (training)', generated: stamp(), items: report }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chain-of-custody-report.json'; a.click();
    URL.revokeObjectURL(a.href); sfx('good');
  };

  const check = item && checks[item.id];

  return (
    <div className="ev-grid">
      <div className="lab-card">
        <h3><Upload size={18} /> Register evidence</h3>
        <label className={`dropzone ${drag ? 'drag' : ''}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}>
          <Upload size={20} /><span><b>Drop a file</b> or click to choose</span><small>Hashed locally. Nothing is uploaded.</small>
          <input type="file" hidden onChange={(e) => onFile(e.target.files[0])} />
        </label>
        <small className="hint">Or load fictional demo evidence:</small>
        <div className="row-gap">{DEMO.map((d) => <button key={d.name} className="chip" onClick={() => addDemo(d)}><FileText size={12} /> {d.name}</button>)}</div>
        <div className="ev-list">
          {items.map((x) => (
            <button key={x.id} className={`ev-item ${sel === x.id ? 'sel' : ''} ${checks[x.id]?.ok === false ? 'bad' : checks[x.id]?.ok ? 'good' : ''}`} onClick={() => setSel(x.id)}>
              <FileText size={14} /><span>{x.name}<small>{x.size} bytes · {x.log.length} log entries</small></span>
            </button>
          ))}
          {!items.length && <p className="hint">No evidence registered yet.</p>}
        </div>
        {items.length > 0 && <button className="btn btn-ghost btn-sm" onClick={exportReport}><Download size={14} /> Export custody report (JSON)</button>}
      </div>

      <div className="lab-card">
        {!item ? <p className="hint">Register or select an item to see its custody record.</p> : (
          <>
            <h3><FileText size={18} /> {item.name}</h3>
            <small className="hint">SHA-256 at collection</small>
            <code className="hash small">{item.hash}</code>
            <div className="custody-form">
              <select className="set-select" value={handler} onChange={(e) => setHandler(e.target.value)}>{HANDLERS.map((h) => <option key={h}>{h}</option>)}</select>
              <select className="set-select" value={action} onChange={(e) => setAction(e.target.value)}>{ACTIONS.map((a) => <option key={a}>{a}</option>)}</select>
              <button className="btn btn-primary btn-sm" onClick={addCustody}><ArrowRightLeft size={14} /> Log transfer</button>
            </div>
            <ol className="custody-log">
              {item.log.map((l, k) => <li key={k}><span className="dim">{l.t}</span> <b>{l.who}</b> · {l.what}</li>)}
            </ol>
            <div className="row-gap">
              <button className="btn btn-ok btn-sm" onClick={verify}><ShieldCheck size={14} /> Re-verify integrity</button>
              {item.demo && <button className="btn btn-danger btn-sm" onClick={tamper}><FlaskConical size={14} /> Simulate tampering (flip 1 bit)</button>}
            </div>
            {check && (
              <div className={`verdict ${check.ok ? 'ok' : 'bad'}`}>
                {check.ok ? <ShieldCheck size={28} /> : <ShieldX size={28} />}
                <div>
                  <strong>{check.ok ? 'INTEGRITY VERIFIED' : 'INTEGRITY FAILURE'}</strong>
                  <small>{check.ok ? 'Current hash matches the hash recorded at collection.' : `Current hash ${check.now.slice(0, 16)}… differs, so the evidence was altered after collection. Its admissibility is now in doubt.`}</small>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Volatility({ complete }) {
  const [pool] = useState(() => [...VOLATILITY].sort(() => Math.random() - 0.5));
  const [order, setOrder] = useState([]);
  const [result, setResult] = useState(null);
  const add = (v) => { if (order.includes(v)) return; setOrder([...order, v]); setResult(null); sfx('click'); };
  const check = () => {
    const ok = order.every((v, i) => v === VOLATILITY[i]);
    setResult(ok); sfx(ok ? 'good' : 'bad'); if (ok) complete('volatility');
  };
  return (
    <div className="lab-card">
      <h3><Layers size={18} /> Order of volatility: collect the most fragile evidence first</h3>
      <div className="order-grid">
        <div className="order-pool">{pool.filter((v) => !order.includes(v)).map((v) => <button key={v} className="match-risk" onClick={() => add(v)}>{v}</button>)}</div>
        <ol className="order-list">
          {order.map((v, i) => <li key={v} className={result === null ? '' : v === VOLATILITY[i] ? 'right' : 'wrongi'}><b>{i + 1}</b>{v}</li>)}
          {!order.length && <li className="dim">Click items in collection order…</li>}
        </ol>
      </div>
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={check} disabled={order.length !== VOLATILITY.length}>Check order</button>
        <button className="btn btn-ghost btn-sm" onClick={() => { setOrder([]); setResult(null); }}><RotateCcw size={14} /> Clear</button>
        {result === true && <span className="result good">✔ Correct: memory vanishes at power-off, while archives last for years (RFC 3227).</span>}
        {result === false && <span className="result bad">Not quite. What disappears first when a device is switched off?</span>}
      </div>
    </div>
  );
}

export default function EvidenceLab() {
  const { complete } = useMission('u5-evidence');
  const [tab, setTab] = useState('locker');
  if (!window.crypto?.subtle) return <p className="result bad">This lab needs a secure context: open it via localhost or https.</p>;
  return (
    <div>
      <div className="seg">
        <button className={tab === 'locker' ? 'active' : ''} onClick={() => setTab('locker')}>Evidence locker</button>
        <button className={tab === 'vol' ? 'active' : ''} onClick={() => setTab('vol')}>Order of volatility</button>
      </div>
      {tab === 'locker' ? <Locker complete={complete} /> : <Volatility complete={complete} />}
    </div>
  );
}
