import { useState } from 'react';
import { FolderSearch, Bell, Landmark, FileBarChart, HeartPulse, Flag, RotateCcw, ListOrdered, Tags } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const EVIDENCE = [
  { id: 'a1', src: 'alerts', text: '02:14 · OTP 482913 to log in to MyBank from a NEW device', bad: true, why: 'He was asleep at 2 am. A login attempt from a new device means someone has his credentials.' },
  { id: 'a2', src: 'alerts', text: '09:30 · Electricity bill of ₹1,240 is due on 15th', bad: false, why: 'A normal monthly bill.' },
  { id: 'a3', src: 'alerts', text: '02:20 · Your email password was changed', bad: true, why: 'He didn’t change it. This is an account takeover of his primary email.' },
  { id: 'a4', src: 'alerts', text: '11:05 · Welcome to QuickLoan! Your loan of ₹50,000 is approved', bad: true, why: 'He never applied for a loan.' },
  { id: 'b1', src: 'bank', text: 'CREDIT · Pension · ₹32,000', bad: false, why: 'His regular pension.' },
  { id: 'b2', src: 'bank', text: 'UPI · Fresh Mart · ₹640', bad: false, why: 'Routine grocery purchase near home.' },
  { id: 'b3', src: 'bank', text: 'DEBIT · verify-acct · ₹1', bad: true, why: 'A tiny "test" debit before a larger theft is a classic pattern.' },
  { id: 'b4', src: 'bank', text: 'IMPS · R K Traders · ₹45,000', bad: true, why: 'A large transfer to an unknown payee right after the takeover.' },
  { id: 'c1', src: 'credit', text: 'Home loan · SBI · closed 2015', bad: false, why: 'His own old loan, correctly shown as closed.' },
  { id: 'c2', src: 'credit', text: 'Personal loan · QuickLoan · ₹50,000 · opened last week · address: Kolkata', bad: true, why: 'He lives in Pune and never applied: a loan opened in his name.' },
  { id: 'c3', src: 'credit', text: 'Enquiry · FastCard credit card · 3 days ago', bad: true, why: 'Someone is trying to open more credit with his identity.' },
  { id: 'm1', src: 'medical', text: 'Claim · Knee surgery · City Hospital, Jaipur · ₹1,80,000', bad: true, why: 'He never had surgery or visited Jaipur. His insurance is being misused.' },
  { id: 'm2', src: 'medical', text: 'Claim · Annual health check-up · Pune · ₹2,500', bad: false, why: 'His genuine yearly check-up.' },
];
const SOURCES = [
  { id: 'alerts', label: 'Phone & email alerts', icon: Bell },
  { id: 'bank', label: 'Bank statement', icon: Landmark },
  { id: 'credit', label: 'Credit report', icon: FileBarChart },
  { id: 'medical', label: 'Health-insurance claims', icon: HeartPulse },
];
const TYPES = [
  { id: 'financial', label: 'Financial identity theft', right: true },
  { id: 'medical', label: 'Medical identity theft', right: true },
  { id: 'ato', label: 'Account takeover', right: true },
  { id: 'criminal', label: 'Criminal identity theft', right: false },
  { id: 'synthetic', label: 'Synthetic identity theft', right: false },
];
const STEPS = [
  { id: 'secure', text: 'Secure email & bank logins from a clean device (new passwords, MFA, sign out all devices)' },
  { id: 'bank', text: 'Call the bank: block cards/UPI and report the ₹45,000 IMPS transfer' },
  { id: 'report', text: 'Report on 1930 / cybercrime.gov.in and file a police complaint' },
  { id: 'dispute', text: 'Dispute the loan with QuickLoan and the credit bureau, and report the fake claim to the insurer' },
  { id: 'monitor', text: 'Lock Aadhaar biometrics and monitor statements and credit report monthly' },
];

export default function IdTheftLab() {
  const { complete } = useMission('u4-idtheft');
  const [stage, setStage] = useState(1);
  const [flags, setFlags] = useState(() => new Set());
  const [checked, setChecked] = useState(false);
  const [types, setTypes] = useState(() => new Set());
  const [typesChecked, setTypesChecked] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderResult, setOrderResult] = useState(null);

  const toggleFlag = (id) => {
    setChecked(false);
    sfx('click');
    const n = new Set(flags);
    n.has(id) ? n.delete(id) : n.add(id);
    setFlags(n);
  };
  const missed = EVIDENCE.filter((e) => e.bad && !flags.has(e.id)).length;
  const falseAlarms = EVIDENCE.filter((e) => !e.bad && flags.has(e.id)).length;
  const submitFlags = () => {
    setChecked(true);
    const ok = missed === 0 && falseAlarms === 0;
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('flags');
  };

  const typesOk = TYPES.every((t) => t.right === types.has(t.id));
  const submitTypes = () => { setTypesChecked(true); sfx(typesOk ? 'good' : 'bad'); if (typesOk) complete('types'); };

  const addStep = (id) => { if (order.includes(id)) return; setOrder([...order, id]); setOrderResult(null); sfx('click'); };
  const checkOrder = () => {
    const firstTwo = new Set(order.slice(0, 2));
    const ok = order.length === STEPS.length && firstTwo.has('secure') && firstTwo.has('bank') && order[4] === 'monitor';
    setOrderResult(ok);
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('recovery');
  };

  const reset = () => { setStage(1); setFlags(new Set()); setChecked(false); setTypes(new Set()); setTypesChecked(false); setOrder([]); setOrderResult(null); };

  return (
    <div className="case-file">
      <div className="case-head">
        <FolderSearch size={22} />
        <div>
          <strong>Case File #889: Arvind Rao, 64, retired teacher, Pune</strong>
          <small>"I keep getting strange messages and the bank says I sent money I never sent."</small>
        </div>
        <div className="case-steps">
          {['Evidence', 'Types', 'Recovery'].map((s, i) => (
            <button key={s} className={`case-step ${stage === i + 1 ? 'on' : ''} ${stage > i + 1 ? 'done' : ''}`} onClick={() => setStage(i + 1)}>{i + 1}. {s}</button>
          ))}
        </div>
      </div>

      {stage === 1 && (
        <>
          <p className="lab-intro"><Flag size={14} /> Click every entry that looks suspicious. Leave genuine activity unflagged.</p>
          <div className="evidence-grid">
            {SOURCES.map((s) => (
              <div key={s.id} className="lab-card evidence">
                <h3><s.icon size={16} /> {s.label}</h3>
                {EVIDENCE.filter((e) => e.src === s.id).map((e) => {
                  const on = flags.has(e.id);
                  const st = checked ? (e.bad === on ? 'right' : 'wrong') : '';
                  return (
                    <button key={e.id} className={`ev-row ${on ? 'flagged' : ''} ${st}`} onClick={() => toggleFlag(e.id)}>
                      <span className="ev-flag">{on ? '🚩' : '○'}</span>
                      <span>{e.text}{checked && (on || e.bad) && <small>{e.why}</small>}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="row-gap">
            <button className="btn btn-primary" onClick={submitFlags}>Submit findings ({flags.size} flagged)</button>
            {checked && (missed || falseAlarms
              ? <span className="result bad">Missed {missed} · false alarms {falseAlarms}. Adjust and resubmit.</span>
              : <><span className="result good">✔ All 8 red flags found with no false alarms.</span><button className="btn btn-ghost btn-sm" onClick={() => setStage(2)}>Next: identify types →</button></>)}
          </div>
        </>
      )}

      {stage === 2 && (
        <div className="lab-card">
          <h3><Tags size={18} /> Which types of identity theft is Mr Rao facing? Select all that apply.</h3>
          <div className="type-grid">
            {TYPES.map((t) => {
              const on = types.has(t.id);
              const st = typesChecked ? (t.right === on ? 'right' : 'wrong') : '';
              return (
                <button key={t.id} className={`factor ${on ? 'on' : ''} ${st}`} onClick={() => { const n = new Set(types); n.has(t.id) ? n.delete(t.id) : n.add(t.id); setTypes(n); setTypesChecked(false); sfx('click'); }}>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="row-gap">
            <button className="btn btn-primary btn-sm" onClick={submitTypes} disabled={!types.size}>Check</button>
            {typesChecked && (typesOk
              ? <><span className="result good">✔ Financial (loan + transfer), medical (fake claim) and account takeover (email + bank login). It’s not synthetic, because his real name and details are used.</span><button className="btn btn-ghost btn-sm" onClick={() => setStage(3)}>Next: recovery →</button></>
              : <span className="result bad">Not quite. Look again at the loan, the insurance claim and the email change.</span>)}
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="lab-card">
          <h3><ListOrdered size={18} /> Build Mr Rao’s recovery plan. Click the steps in the order he should do them.</h3>
          <div className="order-grid">
            <div className="order-pool">
              {STEPS.filter((s) => !order.includes(s.id)).map((s) => <button key={s.id} className="match-risk" onClick={() => addStep(s.id)}>{s.text}</button>)}
              {order.length === STEPS.length && <p className="hint">All steps placed.</p>}
            </div>
            <ol className="order-list">
              {order.map((id, i) => <li key={id} className={orderResult === null ? '' : orderResult ? 'right' : ''}><b>{i + 1}</b>{STEPS.find((s) => s.id === id).text}</li>)}
              {!order.length && <li className="dim">Your plan appears here…</li>}
            </ol>
          </div>
          <div className="row-gap">
            <button className="btn btn-primary btn-sm" onClick={checkOrder} disabled={order.length !== STEPS.length}>Check plan</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setOrder([]); setOrderResult(null); }}><RotateCcw size={14} /> Clear</button>
            {orderResult === true && <span className="result good">✔ Contain first (accounts + bank), then report and dispute, and keep monitoring.</span>}
            {orderResult === false && <span className="result bad">Stop the bleeding first: secure accounts and call the bank. Monitoring comes last.</span>}
          </div>
        </div>
      )}
      <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> Restart case</button>
    </div>
  );
}
