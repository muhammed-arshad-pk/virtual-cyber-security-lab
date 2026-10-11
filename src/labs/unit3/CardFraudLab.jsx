import { useEffect, useMemo, useState } from 'react';
import { CreditCard, ShieldCheck, Ban, Check, User, Calculator, Database, Skull, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

/* ---------------- Fraud analyst console ---------------- */
const TX = [
  { time: '09:12', merchant: 'Big Bazaar', place: 'Pune', amount: 1840, channel: 'Chip + PIN (card present)', device: '—', fraud: false, why: 'Normal grocery spend in her home city, verified by chip and PIN.' },
  { time: '13:05', merchant: 'Swiggy (app)', place: 'Pune', amount: 420, channel: 'Online, tokenized card', device: 'Her usual Android phone', fraud: false, why: 'Known device, a token stored in a trusted app, a typical amount.' },
  { time: '02:47', merchant: 'ElectroMart Online', place: 'IP: Romania', amount: 74999, channel: 'Online (card not present)', device: 'New Windows PC', note: 'Ship-to address differs from billing', fraud: true, why: 'New device, foreign IP, 2:47 am, a high-value electronics purchase, and a different shipping address. Classic CNP fraud.' },
  { time: '02:49', merchant: 'ElectroMart Online', place: 'IP: Romania', amount: 74999, channel: 'Online (card not present)', device: 'Same new Windows PC', note: '2 minutes after the previous attempt', fraud: true, why: 'Velocity: a repeat high-value attempt minutes later from the same suspicious device.' },
  { time: '18:30', merchant: 'HP Petrol Pump', place: 'Pune', amount: 2000, channel: 'Contactless tap', device: '—', fraud: false, why: 'Routine fuel purchase in her city, within the contactless limit.' },
  { time: '18:31', merchant: 'Gold Souk Jewels', place: 'Dubai', amount: 120000, channel: 'Magnetic-stripe swipe', device: '—', note: 'Card was used in Pune 1 minute ago', fraud: true, why: 'Impossible travel: Pune and Dubai within a minute. A stripe swipe suggests a cloned card.' },
  { time: '20:10', merchant: 'Netflix', place: 'Online', amount: 649, channel: 'Recurring, tokenized', device: '—', fraud: false, why: 'An established monthly subscription using a token.' },
  { time: '21:02', merchant: 'gift-cards-4u.shop', place: 'Online', amount: 1, channel: 'Online (card not present)', device: 'New device', note: 'Merchant never seen before', fraud: true, why: 'A ₹1 charge on an unknown site from a new device is card testing, checking if stolen details work.' },
  { time: '22:15', merchant: 'BookMyShow', place: 'Pune', amount: 600, channel: 'Online + OTP passed', device: 'Her usual Android phone', fraud: false, why: 'Known device, OTP verified, normal entertainment spend.' },
  { time: '23:40', merchant: 'Amazon', place: 'Online', amount: 2499, channel: 'Online, tokenized', device: 'Her usual Android phone', note: 'Delivery to home address', fraud: false, why: 'Trusted device, home delivery address, a normal amount.' },
];
const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

function FraudConsole({ complete }) {
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const done = i >= TX.length;
  const tx = TX[i];

  const decide = (decline) => {
    if (done) return;
    const right = decline === tx.fraud;
    sfx(right ? 'good' : 'bad');
    const next = [{ ...tx, decline, right }, ...log];
    setLog(next);
    setI(i + 1);
    if (i + 1 === TX.length && next.every((l) => l.right)) complete('analyst');
  };
  const restart = () => { setI(0); setLog([]); };

  const stats = useMemo(() => ({
    caught: log.filter((l) => l.fraud && l.decline).length,
    missed: log.filter((l) => l.fraud && !l.decline).reduce((s, l) => s + l.amount, 0),
    falseDeclines: log.filter((l) => !l.fraud && l.decline).length,
    saved: log.filter((l) => l.fraud && l.decline).reduce((s, l) => s + l.amount, 0),
  }), [log]);

  return (
    <div className="fc-grid">
      <div className="fc-main">
        <div className="lab-card profile">
          <User size={30} />
          <div>
            <strong>Cardholder: Priya Kulkarni · Visa •••• 4821</strong>
            <small>Lives in Pune · usually spends ₹300–₹5,000 · uses one Android phone · no foreign travel planned</small>
          </div>
        </div>
        {!done ? (
          <div className="tx-card" key={i}>
            <div className="tx-head"><span className="tag">Incoming {i + 1}/{TX.length}</span><span className="tx-time">{tx.time}</span></div>
            <div className="tx-amount">{inr(tx.amount)}</div>
            <dl>
              <dt>Merchant</dt><dd>{tx.merchant}</dd>
              <dt>Location</dt><dd>{tx.place}</dd>
              <dt>Channel</dt><dd>{tx.channel}</dd>
              <dt>Device</dt><dd>{tx.device}</dd>
              {tx.note && <><dt>Note</dt><dd className="warn-text">{tx.note}</dd></>}
            </dl>
            <div className="row-gap">
              <button className="btn btn-ok" onClick={() => decide(false)}><Check size={16} /> Approve</button>
              <button className="btn btn-danger" onClick={() => decide(true)}><Ban size={16} /> Decline & alert</button>
            </div>
          </div>
        ) : (
          <div className="lab-card pop center">
            <h3>{log.every((l) => l.right) ? '🏆 Perfect shift!' : 'Shift complete'}</h3>
            <p>Fraud stopped: {stats.caught}/4 · Genuine payments wrongly declined: {stats.falseDeclines}</p>
            <button className="btn btn-primary btn-sm" onClick={restart}><RotateCcw size={14} /> New shift</button>
          </div>
        )}
      </div>
      <div className="fc-side">
        <div className="fc-stats">
          <div><small>Fraud blocked</small><strong className="green">{inr(stats.saved)}</strong></div>
          <div><small>Fraud missed</small><strong className="red">{inr(stats.missed)}</strong></div>
          <div><small>False declines</small><strong>{stats.falseDeclines}</strong></div>
        </div>
        <div className="tx-log">
          {log.map((l) => (
            <div key={l.time + l.merchant + l.amount} className={`tx-log-row ${l.right ? 'right' : 'wrong'}`}>
              <span>{l.time} · {l.merchant} · {inr(l.amount)}</span>
              <small>{l.decline ? 'Declined' : 'Approved'}: {l.right ? '✔' : '✘'} {l.why}</small>
            </div>
          ))}
          {!log.length && <p className="hint">Your decisions and the fraud engine’s explanation will appear here.</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Luhn validator ---------------- */
function network(n) {
  if (/^4/.test(n)) return 'Visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'American Express';
  if (/^(60|65|81|82|508)/.test(n)) return 'RuPay';
  return 'Unknown network';
}

function LuhnTool({ complete }) {
  const [num, setNum] = useState('4111 1111 1111 1112');
  const digits = num.replace(/\D/g, '').split('').map(Number);
  const rows = digits.map((d, idx) => {
    const fromRight = digits.length - 1 - idx;
    const dbl = fromRight % 2 === 1;
    let v = dbl ? d * 2 : d;
    if (v > 9) v -= 9;
    return { d, dbl, v };
  });
  const sum = rows.reduce((s, r) => s + r.v, 0);
  const valid = digits.length >= 12 && sum % 10 === 0;

  useEffect(() => { if (valid) complete('luhn'); }, [valid, complete]);

  return (
    <div className="lab-card">
      <h3><Calculator size={18} /> Luhn check-digit validator</h3>
      <p>Every card number ends with a check digit. Starting from the right, double every second digit (subtract 9 if the result is over 9) and add everything up. A valid number’s total is divisible by 10.</p>
      <input className="dark-input luhn-input" value={num} onChange={(e) => setNum(e.target.value.replace(/[^\d ]/g, '').slice(0, 23))} inputMode="numeric" />
      <div className="row-gap">
        {['4111 1111 1111 1111', '5555 5555 5555 4444', '6522 2222 2222 2222', '4111 1111 1111 1112'].map((t) => (
          <button key={t} className="chip" onClick={() => { setNum(t); sfx('click'); }}>{t}</button>
        ))}
      </div>
      <div className="luhn-grid">
        {rows.map((r, idx) => (
          <span key={idx} className={`luhn-cell ${r.dbl ? 'dbl' : ''}`} style={{ animationDelay: `${idx * 0.03}s` }}>
            <b>{r.d}</b><small>{r.dbl ? `×2→${r.v}` : r.v}</small>
          </span>
        ))}
      </div>
      <div className="luhn-result">
        <span>Network: <b>{network(digits.join(''))}</b></span>
        <span>Sum: <b>{sum}</b></span>
        <span className={valid ? 'green' : 'red'}><b>{digits.length < 12 ? 'Too short' : valid ? '✔ Passes Luhn' : '✘ Fails Luhn'}</b></span>
      </div>
      <p className="hint">These are public test numbers. Luhn only catches typos. It says nothing about whether a card is real or authorised.</p>
    </div>
  );
}

/* ---------------- Tokenization breach demo ---------------- */
function TokenDemo({ complete }) {
  const [mode, setMode] = useState('pan');
  const [stage, setStage] = useState(0);
  const run = () => {
    setStage(1); sfx('alarm');
    setTimeout(() => { setStage(2); sfx('whoosh'); }, 1200);
    setTimeout(() => {
      setStage(3);
      sfx(mode === 'pan' ? 'bad' : 'good');
      if (mode === 'token') complete('token');
    }, 2600);
  };
  const rows = mode === 'pan'
    ? [['Priya K.', '4111 1111 1111 1111', '08/28'], ['Rahul S.', '5555 5555 5555 4444', '11/27']]
    : [['Priya K.', 'TKN 4895 7012 3344 9021', 'bound: ShopKart + device'], ['Rahul S.', 'TKN 5310 8841 0027 6612', 'bound: ShopKart + device']];
  return (
    <div className="lab-card">
      <h3><Database size={18} /> Merchant data breach: before vs after tokenization</h3>
      <div className="seg small">
        <button className={mode === 'pan' ? 'active' : ''} onClick={() => { setMode('pan'); setStage(0); }}>Before 2022: card numbers stored</button>
        <button className={mode === 'token' ? 'active' : ''} onClick={() => { setMode('token'); setStage(0); }}>After RBI tokenization</button>
      </div>
      <div className={`db-table ${stage >= 1 ? 'breached' : ''}`}>
        <div className="db-row head"><span>customer</span><span>{mode === 'pan' ? 'card number (PAN)' : 'token'}</span><span>{mode === 'pan' ? 'expiry' : 'scope'}</span></div>
        {rows.map((r) => <div key={r[0]} className="db-row"><span>{r[0]}</span><span className="mono">{r[1]}</span><span>{r[2]}</span></div>)}
      </div>
      <div className="breach-steps">
        <span className={stage >= 1 ? 'on' : ''}><Skull size={14} /> Hackers dump ShopKart’s database</span>
        <span className={stage >= 2 ? 'on' : ''}><CreditCard size={14} /> They try the data at another online shop</span>
        <span className={stage >= 3 ? `on ${mode === 'pan' ? 'bad' : 'good'}` : ''}>{mode === 'pan' ? '💸 APPROVED: real card numbers work anywhere' : '🛡 DECLINED: the token only works for ShopKart on that device'}</span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={run} disabled={stage > 0 && stage < 3}><Skull size={14} /> Simulate breach</button>
    </div>
  );
}

export default function CardFraudLab() {
  const { complete } = useMission('u3-card');
  const [tab, setTab] = useState('console');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'console' ? 'active' : ''} onClick={() => setTab('console')}><ShieldCheck size={15} /> Fraud analyst console</button>
        <button className={tab === 'tools' ? 'active' : ''} onClick={() => setTab('tools')}><Calculator size={15} /> Luhn & tokenization</button>
      </div>
      {tab === 'console' ? <FraudConsole complete={complete} /> : (
        <div className="cf-tools"><LuhnTool complete={complete} /><TokenDemo complete={complete} /></div>
      )}
    </div>
  );
}
