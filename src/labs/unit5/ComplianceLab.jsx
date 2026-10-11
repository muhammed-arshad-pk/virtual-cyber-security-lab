import { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, Grid3x3, Siren, Clock, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const CONTROLS = [
  { id: 'inventory', label: 'Personal-data inventory & classification', law: 'DPDP Act' },
  { id: 'consent', label: 'Consent management & privacy notice', law: 'DPDP Act' },
  { id: 'mfa', label: 'MFA for admin and remote access', law: 'IT Act 43A (reasonable security)' },
  { id: 'encrypt', label: 'Encryption at rest and in transit', law: 'IT Act 43A / DPDP safeguards' },
  { id: 'logs', label: '180-day log retention + NTP clock sync', law: 'CERT-In Directions 2022' },
  { id: 'irp', label: 'Incident-response plan with CERT-In contact', law: 'CERT-In 6-hour reporting' },
  { id: 'training', label: 'Staff security-awareness training', law: 'Best practice / ISO 27001' },
  { id: 'vendor', label: 'Vendor contracts with confidentiality clauses', law: 'IT Act 72A' },
  { id: 'grievance', label: 'Published grievance officer / contact', law: 'DPDP Act / IT Rules 2021' },
  { id: 'backup', label: 'Tested offline backups', law: 'Resilience best practice' },
];
const RISKS = [
  { id: 'r1', name: 'Ransomware', L: 4, I: 5, fx: { mfa: [1, 0], training: [1, 0], backup: [0, 2] } },
  { id: 'r2', name: 'Customer data breach', L: 4, I: 5, fx: { encrypt: [0, 2], mfa: [1, 0], inventory: [1, 0] } },
  { id: 'r3', name: 'Phishing account takeover', L: 5, I: 3, fx: { mfa: [2, 0], training: [1, 0] } },
  { id: 'r4', name: 'Late incident reporting', L: 4, I: 4, fx: { irp: [3, 0], logs: [1, 0] } },
  { id: 'r5', name: 'Vendor data leak', L: 3, I: 4, fx: { vendor: [2, 0] } },
  { id: 'r6', name: 'Processing without consent', L: 4, I: 4, fx: { consent: [3, 0], grievance: [1, 0], inventory: [1, 0] } },
];
const zone = (s) => (s >= 15 ? 'red' : s >= 8 ? 'amber' : 'green');

const DRILL = [
  { id: 'isolate', label: 'Isolate the affected server', mins: 30, req: true },
  { id: 'preserve', label: 'Preserve logs and evidence', mins: 45, req: true },
  { id: 'mgmt', label: 'Brief management and legal', mins: 20, req: true },
  { id: 'certin', label: 'Report to CERT-In (incident@cert-in.org.in)', mins: 30, req: true, deadline: true },
  { id: 'dpb', label: 'Notify the Data Protection Board and affected users', mins: 60, req: true },
  { id: 'blame', label: 'Hold a 3-hour meeting to decide who to blame', mins: 180 },
  { id: 'wait', label: 'Wait to see if anyone notices', mins: 240 },
  { id: 'delete', label: 'Delete logs so the breach can’t be traced', mins: 10, illegal: true },
];
const hm = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;

function GapAndRisk({ complete }) {
  const [on, setOn] = useState(() => new Set());
  const pct = Math.round((on.size / CONTROLS.length) * 100);
  const risks = useMemo(() => RISKS.map((r) => {
    let L = r.L; let I = r.I;
    Object.entries(r.fx).forEach(([c, [dl, di]]) => { if (on.has(c)) { L -= dl; I -= di; } });
    L = Math.max(1, L); I = Math.max(1, I);
    return { ...r, l: L, i: I, s: L * I };
  }), [on]);
  const reds = risks.filter((r) => zone(r.s) === 'red').length;

  useEffect(() => { if (pct === 100) complete('gap'); }, [pct, complete]);
  useEffect(() => { if (reds === 0) complete('risk'); }, [reds, complete]);

  const toggle = (id) => { const n = new Set(on); n.has(id) ? n.delete(id) : n.add(id); setOn(n); sfx(n.has(id) ? 'good' : 'click'); };

  return (
    <div className="cmp-grid">
      <div className="lab-card">
        <h3><ClipboardCheck size={18} /> Gap assessment: Cyber Shield Corp</h3>
        <div className="audit-score"><div className="bar big"><span style={{ width: `${pct}%` }} className={pct < 50 ? 'low' : ''} /></div><strong>{pct}%</strong></div>
        <div className="ctrl-list">
          {CONTROLS.map((c) => (
            <div key={c.id} className={`radio-row ${on.has(c.id) ? 'on' : ''}`}>
              <ClipboardCheck size={16} />
              <div><strong>{c.label}</strong><small>{c.law}</small></div>
              <label className="toggle"><input type="checkbox" checked={on.has(c.id)} onChange={() => toggle(c.id)} /><span /></label>
            </div>
          ))}
        </div>
      </div>
      <div className="lab-card">
        <h3><Grid3x3 size={18} /> Live risk heat-map <span className="tag">{reds} in red</span></h3>
        <div className="heat">
          <span className="heat-y">Likelihood →</span>
          <div className="heat-grid">
            {[5, 4, 3, 2, 1].map((L) => [1, 2, 3, 4, 5].map((I) => (
              <div key={`${L}-${I}`} className={`heat-cell ${zone(L * I)}`}>
                {risks.filter((r) => r.l === L && r.i === I).map((r) => <span key={r.id} className="heat-dot" title={r.name}>{r.name}</span>)}
              </div>
            )))}
          </div>
          <span className="heat-x">Impact →</span>
        </div>
        <ul className="risk-list">{risks.map((r) => <li key={r.id} className={zone(r.s)}><b>{r.s}</b> {r.name} <small>(L{r.l} × I{r.i})</small></li>)}</ul>
      </div>
    </div>
  );
}

function Drill({ complete }) {
  const [done, setDone] = useState([]);
  const [clock, setClock] = useState(0);
  const [certinAt, setCertinAt] = useState(null);
  const [failed, setFailed] = useState(null);
  const finished = DRILL.filter((d) => d.req).every((d) => done.includes(d.id));

  const act = (d) => {
    if (done.includes(d.id) || failed || finished) return;
    if (d.illegal) { setFailed('Destroying evidence is illegal and makes things far worse. Drill failed.'); sfx('alarm'); return; }
    const t = clock + d.mins;
    setClock(t); setDone([...done, d.id]);
    if (d.deadline) setCertinAt(t);
    sfx(d.req ? 'good' : 'bad');
  };
  useEffect(() => {
    if (finished && certinAt !== null && certinAt <= 360) complete('drill');
  }, [finished, certinAt, complete]);
  const reset = () => { setDone([]); setClock(0); setCertinAt(null); setFailed(null); };
  const pct = Math.min(100, (clock / 360) * 100);

  return (
    <div className="lab-card">
      <h3><Siren size={18} /> Breach drill: 10:00 am, customer records exposed</h3>
      <div className="drill-clock">
        <Clock size={18} /> <strong>T + {hm(clock)}</strong>
        <div className="bar big"><span style={{ width: `${pct}%` }} className={clock > 300 ? 'low' : ''} /></div>
        <small>CERT-In deadline: 6h 00m</small>
      </div>
      <div className="drill-actions">
        {DRILL.map((d) => (
          <button key={d.id} className={`drill-act ${done.includes(d.id) ? 'done' : ''} ${d.illegal ? 'illegal' : ''}`} onClick={() => act(d)} disabled={done.includes(d.id) || !!failed || finished}>
            <span>{d.label}</span><small>{d.mins} min</small>
          </button>
        ))}
      </div>
      {failed && <p className="result bad">{failed}</p>}
      {finished && !failed && (
        <p className={`result ${certinAt <= 360 ? 'good' : 'bad'}`}>
          {certinAt <= 360 ? `✔ All required steps done. CERT-In notified at T+${hm(certinAt)}, inside the 6-hour window.` : `✘ CERT-In was notified at T+${hm(certinAt)}, after the 6-hour deadline. Skip the time-wasters.`}
        </p>
      )}
      <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> Restart drill</button>
    </div>
  );
}

export default function ComplianceLab() {
  const { complete } = useMission('u5-comply');
  const [tab, setTab] = useState('gap');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'gap' ? 'active' : ''} onClick={() => setTab('gap')}>Gap assessment & risk</button>
        <button className={tab === 'drill' ? 'active' : ''} onClick={() => setTab('drill')}>6-hour breach drill</button>
      </div>
      {tab === 'gap' ? <GapAndRisk complete={complete} /> : <Drill complete={complete} />}
    </div>
  );
}
