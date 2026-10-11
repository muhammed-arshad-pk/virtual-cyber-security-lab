import { useEffect, useMemo, useState } from 'react';
import { Smartphone, Tablet, ShieldCheck, ShieldAlert, Ban, Send, Wrench, Settings2, Siren, RotateCcw, CircleSlash } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const FLEET = [
  { id: 1, name: 'Ananya: iPhone 15', icon: Smartphone, own: 'Corporate (COPE)', os: 'iOS', ver: 18, maxVer: 18, passcode: true, encrypted: true, rooted: false, enrolled: true },
  { id: 2, name: 'Rahul: Galaxy S21', icon: Smartphone, own: 'BYOD', os: 'Android', ver: 14, maxVer: 14, passcode: false, encrypted: true, rooted: false, enrolled: true },
  { id: 3, name: 'Meera: Pixel 6', icon: Smartphone, own: 'BYOD', os: 'Android', ver: 12, maxVer: 15, passcode: true, encrypted: true, rooted: false, enrolled: true },
  { id: 4, name: 'Kabir: Redmi Note 8', icon: Smartphone, own: 'BYOD', os: 'Android', ver: 10, maxVer: 11, passcode: true, encrypted: true, rooted: false, enrolled: true },
  { id: 5, name: 'Sara: OnePlus 9', icon: Smartphone, own: 'BYOD', os: 'Android', ver: 14, maxVer: 14, passcode: true, encrypted: true, rooted: true, enrolled: true },
  { id: 6, name: 'Dev: iPad Air', icon: Tablet, own: 'Corporate', os: 'iOS', ver: 17, maxVer: 18, passcode: true, encrypted: true, rooted: false, enrolled: false },
  { id: 7, name: 'Field Tablet 07', icon: Tablet, own: 'Corporate (COBO)', os: 'Android', ver: 14, maxVer: 14, passcode: true, encrypted: false, rooted: false, enrolled: true },
  { id: 8, name: 'Vikram: iPhone 12', icon: Smartphone, own: 'Corporate (COPE)', os: 'iOS', ver: 17, maxVer: 18, passcode: true, encrypted: true, rooted: false, enrolled: true },
];
const MIN = { Android: 13, iOS: 17 };
const POLICIES = [
  { id: 'passcode', label: 'Require passcode' },
  { id: 'encryption', label: 'Require device encryption' },
  { id: 'minOs', label: 'Minimum OS: Android 13 / iOS 17' },
  { id: 'root', label: 'Block rooted / jailbroken devices' },
];

function issuesOf(d, p) {
  const out = [];
  if (p.passcode && !d.passcode) out.push({ id: 'passcode', text: 'No passcode', fix: true });
  if (p.encryption && !d.encrypted) out.push({ id: 'enc', text: 'Encryption off', fix: true });
  if (p.minOs && d.ver < MIN[d.os]) out.push({ id: 'os', text: `${d.os} ${d.ver} below minimum`, fix: d.maxVer >= MIN[d.os] });
  if (p.root && d.rooted) out.push({ id: 'root', text: 'Rooted device', fix: false });
  return out;
}
function statusOf(d, p) {
  if (!d.enrolled) return 'unenrolled';
  if (d.blocked) return 'quarantined';
  return issuesOf(d, p).length ? 'noncompliant' : 'compliant';
}
const needsQuarantine = (d) => d.rooted || d.maxVer < MIN[d.os];

const INCIDENTS = [
  { text: 'Ananya reports her corporate iPhone lost at the airport.', options: ['Wait until she is back in office', 'Remote-lock it and revoke sessions now; full wipe if it isn’t recovered', 'Selective wipe of only the mail app, then forget it'], answer: 1, why: 'A corporate device is fully managed: lock immediately, and a full wipe is appropriate if it’s gone.' },
  { text: 'Rahul (BYOD) resigns today.', options: ['Factory-reset his personal phone remotely', 'Selectively wipe the work profile and disable his accounts', 'Leave access on until his notice period ends'], answer: 1, why: 'Selective wipe removes company data while respecting his personal photos and apps. A full wipe would be a privacy violation.' },
  { text: 'Sara asks: "Can IT read my personal WhatsApp through MDM?"', options: ['Yes, MDM sees everything on the phone', 'No. On BYOD we manage only the work profile, and personal apps and messages aren’t visible', 'Only on weekends'], answer: 1, why: 'Transparency builds trust. A BYOD work profile can’t see personal content.' },
  { text: 'Alert: Field Tablet 07 is outside the warehouse geofence at 2 AM.', options: ['Ignore it, since tablets move around', 'Post about it in the company group chat', 'Lock it remotely, alert security and investigate; wipe if theft is confirmed'], answer: 2, why: 'Contain first (lock), then investigate. That is the incident-response flow.' },
];

function Ring({ value }) {
  const r = 34; const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 84 84" className="mini-ring">
      <circle cx="42" cy="42" r={r} className="track" />
      <circle cx="42" cy="42" r={r} className="val" style={{ strokeDasharray: c, strokeDashoffset: c * (1 - value / 100), stroke: value === 100 ? '#22c55e' : value >= 60 ? '#facc15' : '#ef4444' }} />
      <text x="42" y="47">{value}%</text>
    </svg>
  );
}

export default function MdmLab() {
  const { complete } = useMission('u3-mdm');
  const [policy, setPolicy] = useState({ passcode: false, encryption: false, minOs: false, root: false });
  const [fleet, setFleet] = useState(FLEET);
  const [busy, setBusy] = useState({});
  const [log, setLog] = useState(['Console ready. 8 devices. No security policies are active yet.']);
  const [inc, setInc] = useState(0);
  const [picked, setPicked] = useState(null);
  const [incMistakes, setIncMistakes] = useState(0);

  const addLog = (l) => setLog((x) => [l, ...x].slice(0, 12));
  const allPolicies = Object.values(policy).every(Boolean);
  const statuses = fleet.map((d) => statusOf(d, policy));
  const counts = useMemo(() => ({
    compliant: statuses.filter((s) => s === 'compliant').length,
    noncompliant: statuses.filter((s) => s === 'noncompliant').length,
    quarantined: statuses.filter((s) => s === 'quarantined').length,
    unenrolled: statuses.filter((s) => s === 'unenrolled').length,
  }), [statuses]);
  const secured = counts.compliant + counts.quarantined;
  const pct = Math.round((counts.compliant / fleet.length) * 100);
  const overBlocked = fleet.filter((d) => d.blocked && !needsQuarantine(d));

  useEffect(() => { if (allPolicies) complete('policies'); }, [allPolicies, complete]);
  useEffect(() => {
    if (allPolicies && secured === fleet.length && overBlocked.length === 0) complete('fleet');
  }, [allPolicies, secured, fleet.length, overBlocked.length, complete]);

  const togglePolicy = (id) => {
    const on = !policy[id];
    setPolicy((p) => ({ ...p, [id]: on }));
    sfx('click');
    addLog(`Policy ${on ? 'enabled' : 'disabled'}: ${POLICIES.find((p) => p.id === id).label}`);
  };
  const patch = (id, fn) => setFleet((f) => f.map((d) => (d.id === id ? { ...d, ...fn(d) } : d)));
  const work = (d, label, ms, fn, msg) => {
    setBusy((b) => ({ ...b, [d.id]: label }));
    sfx('whoosh');
    setTimeout(() => {
      fn();
      setBusy((b) => { const n = { ...b }; delete n[d.id]; return n; });
      addLog(msg);
    }, ms);
  };

  const enroll = (d) => work(d, 'Enrolling…', 1200, () => { patch(d.id, () => ({ enrolled: true })); sfx('good'); }, `${d.name}: enrolled in MDM.`);
  const remediate = (d) => {
    const iss = issuesOf(d, policy);
    work(d, 'Remediating…', 1500, () => {
      patch(d.id, (x) => ({
        passcode: true,
        encrypted: true,
        ver: x.maxVer >= MIN[x.os] ? Math.max(x.ver, MIN[x.os]) : x.ver,
      }));
      const stuck = iss.filter((i) => !i.fix);
      sfx(stuck.length ? 'bad' : 'good');
    }, iss.some((i) => !i.fix)
      ? `${d.name}: user notified, but "${iss.filter((i) => !i.fix).map((i) => i.text).join(', ')}" can’t be fixed. Quarantine it.`
      : `${d.name}: remediated (${iss.map((i) => i.text).join(', ')} fixed).`);
  };
  const quarantine = (d) => {
    patch(d.id, (x) => ({ blocked: !x.blocked }));
    sfx(needsQuarantine(d) ? 'good' : 'bad');
    addLog(d.blocked ? `${d.name}: released from quarantine.` : needsQuarantine(d)
      ? `${d.name}: quarantined. Conditional access now denies email and apps.`
      : `${d.name}: quarantined, but this device could have been remediated (over-blocking hurts productivity).`);
  };

  const chooseInc = (k) => {
    if (picked !== null) return;
    setPicked(k);
    const ok = k === INCIDENTS[inc].answer;
    sfx(ok ? 'good' : 'bad');
    if (!ok) setIncMistakes((m) => m + 1);
    if (ok && inc === INCIDENTS.length - 1 && incMistakes === 0) complete('incidents');
  };

  const reset = () => { setPolicy({ passcode: false, encryption: false, minOs: false, root: false }); setFleet(FLEET); setLog(['Console reset.']); };

  return (
    <div className="mdm">
      <div className="mdm-tiles">
        <div className="mdm-tile"><Ring value={pct} /><small>Fleet compliance</small></div>
        <div className="mdm-tile good"><ShieldCheck size={18} /><strong>{counts.compliant}</strong><small>Compliant</small></div>
        <div className="mdm-tile warn"><ShieldAlert size={18} /><strong>{counts.noncompliant}</strong><small>Needs action</small></div>
        <div className="mdm-tile bad"><Ban size={18} /><strong>{counts.quarantined}</strong><small>Quarantined</small></div>
        <div className="mdm-tile dim"><CircleSlash size={18} /><strong>{counts.unenrolled}</strong><small>Not enrolled</small></div>
      </div>
      {!allPolicies && counts.compliant > 0 && <p className="hint">⚠ Devices look "compliant" only because there are no policies yet. Compliance means nothing without rules.</p>}

      <div className="mdm-grid">
        <div className="lab-card">
          <h3><Settings2 size={18} /> Security baseline policies</h3>
          {POLICIES.map((p) => (
            <div key={p.id} className={`radio-row ${policy[p.id] ? 'on' : ''}`}>
              <ShieldCheck size={16} />
              <div><strong>{p.label}</strong></div>
              <label className="toggle"><input type="checkbox" checked={policy[p.id]} onChange={() => togglePolicy(p.id)} /><span /></label>
            </div>
          ))}
          <div className="term log">{log.map((l, i) => <div key={i + l}>{l}</div>)}</div>
          <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> Reset console</button>
        </div>

        <div className="lab-card">
          <h3><Smartphone size={18} /> Devices</h3>
          <div className="dev-table">
            {fleet.map((d, idx) => {
              const st = statuses[idx];
              const iss = issuesOf(d, policy);
              return (
                <div key={d.id} className={`dev-row ${st}`}>
                  <d.icon size={18} />
                  <div className="dev-info">
                    <strong>{d.name}</strong>
                    <small>{d.own} · {d.os} {d.ver}{d.rooted ? ' · rooted' : ''}</small>
                    {st === 'noncompliant' && <small className="warn-text">{iss.map((i) => i.text).join(' · ')}</small>}
                  </div>
                  <span className={`st-chip ${st}`}>{st === 'noncompliant' ? 'needs action' : st === 'unenrolled' ? 'not enrolled' : st}</span>
                  <div className="dev-actions">
                    {busy[d.id] ? <span className="busy">{busy[d.id]}</span> : (
                      <>
                        {st === 'unenrolled' && <button className="chip" onClick={() => enroll(d)}><Send size={12} /> Invite</button>}
                        {st === 'noncompliant' && <button className="chip" onClick={() => remediate(d)}><Wrench size={12} /> Remediate</button>}
                        {(st === 'noncompliant' || st === 'quarantined') && <button className={`chip ${d.blocked ? 'on' : ''}`} onClick={() => quarantine(d)}><Ban size={12} /> {d.blocked ? 'Release' : 'Quarantine'}</button>}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lab-card">
        <h3><Siren size={18} /> Incident queue</h3>
        {inc < INCIDENTS.length ? (
          <>
            <div className="alert-box" key={inc}><Siren size={16} /> {inc + 1}/{INCIDENTS.length}: {INCIDENTS[inc].text}</div>
            <div className="quiz-options">
              {INCIDENTS[inc].options.map((o, k) => (
                <button key={o} className={`quiz-option ${picked === null ? '' : k === INCIDENTS[inc].answer ? 'correct' : k === picked ? 'wrong' : 'dim'}`} onClick={() => chooseInc(k)} disabled={picked !== null}>{o}</button>
              ))}
            </div>
            {picked !== null && (
              <div className={`explain ${picked === INCIDENTS[inc].answer ? 'good' : 'bad'}`}>
                {INCIDENTS[inc].why}
                <button className="btn btn-primary btn-sm" onClick={() => { setInc(inc + 1); setPicked(null); }}>Next</button>
              </div>
            )}
          </>
        ) : (
          <div className="explain good">
            {incMistakes === 0 ? '🏆 All incidents handled correctly and with respect for privacy.' : `Done with ${incMistakes} mistake(s). Replay to get a perfect run.`}
            <button className="btn btn-ghost btn-sm" onClick={() => { setInc(0); setPicked(null); setIncMistakes(0); }}><RotateCcw size={14} /> Replay</button>
          </div>
        )}
      </div>
    </div>
  );
}
