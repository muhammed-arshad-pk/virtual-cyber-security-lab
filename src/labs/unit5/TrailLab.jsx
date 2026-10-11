import { useState } from 'react';
import { MapPin, RotateCcw, Link2 } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const HOPS = [
  { place: 'Pune, India', clue: 'The victim reports a ₹3 lakh "investment app" fraud at 9 pm on a Sunday.', options: ['Tell them to wait until the local station opens on Monday', 'Call 1930 / file on cybercrime.gov.in at once so banks can freeze the money', 'Ask the victim to message the scammer for a refund'], answer: 1, why: 'The "golden hour" matters: the Citizen Financial Cyber Fraud Reporting system alerts banks to freeze funds.' },
  { place: 'Jharkhand, India', clue: 'The money landed in a mule bank account in another state.', options: ['Ignore it, since it’s another state’s jurisdiction', 'Send a lawful notice to the bank to hold the funds and share KYC records', 'Post the account number on social media'], answer: 1, why: 'Banks act on police requests. Zero FIR and interstate coordination make jurisdiction workable.' },
  { place: 'Hosting provider, abroad', clue: 'The scam app runs on a server in another country.', options: ['Hack the server to collect evidence', 'Send a preservation request and pursue an MLAT through the MHA', 'Give up, since it’s foreign'], answer: 1, why: 'Preservation stops deletion, and the MLAT gets lawful access. "Hacking back" is itself an offence.' },
  { place: 'Email provider, USA', clue: 'The suspect used a US-based email account.', options: ['Guess the suspect’s password', 'Use the provider’s law-enforcement request process / MLAT for content', 'Email the suspect politely'], answer: 1, why: 'Many providers share basic records on lawful request. Content usually needs an MLAT.' },
  { place: 'Crypto exchange, abroad', clue: 'Funds were converted to crypto on a foreign exchange.', options: ['Request the exchange to freeze the wallet and share KYC through law-enforcement channels', 'Buy crypto to track it', 'Close the case'], answer: 0, why: 'Exchanges keep KYC data and can freeze assets on lawful request.' },
  { place: 'Suspect located abroad', clue: 'The main suspect has been identified in another country.', options: ['Arrange an unofficial "pickup"', 'Seek an Interpol notice and extradition through proper channels', 'Wait for them to visit India'], answer: 1, why: 'Interpol notices and extradition treaties are the lawful route.' },
];

const CHALLENGES = [
  { c: 'Jurisdiction', r: 'IT Act Sec 75 and zero / e-FIR' },
  { c: 'Cross-border evidence', r: 'MLAT and provider law-enforcement portals' },
  { c: 'Anonymity (VPNs, fake SIMs)', r: 'ISP/platform logs, KYC and financial-trail analysis' },
  { c: 'Volatile evidence', r: 'Preservation requests and CERT-In 180-day log retention' },
  { c: 'Skills shortage', r: 'I4C CyTrain training and state cyber labs' },
  { c: 'Underreporting', r: '1930, cybercrime.gov.in and awareness campaigns' },
];

function Trail({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const done = i >= HOPS.length;
  const hop = HOPS[i];
  const choose = (k) => {
    if (picked !== null) return;
    setPicked(k);
    const ok = k === hop.answer;
    sfx(ok ? 'good' : 'bad');
    if (!ok) setMistakes((m) => m + 1);
    if (ok && i === HOPS.length - 1 && mistakes === 0) complete('trail');
  };
  return (
    <div className="lab-card">
      <h3><MapPin size={18} /> The cross-border trail</h3>
      <div className="trail">
        {HOPS.map((h, k) => <span key={h.place} className={`trail-stop ${k < i ? 'done' : k === i ? 'now' : ''}`}><MapPin size={12} /> {h.place}</span>)}
      </div>
      {!done ? (
        <>
          <div className="alert-box" key={i}><MapPin size={16} /> <b>{hop.place}:</b>&nbsp;{hop.clue}</div>
          <div className="quiz-options">
            {hop.options.map((o, k) => (
              <button key={o} className={`quiz-option ${picked === null ? '' : k === hop.answer ? 'correct' : k === picked ? 'wrong' : 'dim'}`} onClick={() => choose(k)} disabled={picked !== null}>{o}</button>
            ))}
          </div>
          {picked !== null && (
            <div className={`explain ${picked === hop.answer ? 'good' : 'bad'}`}>
              {hop.why}
              <button className="btn btn-primary btn-sm" onClick={() => { setI(i + 1); setPicked(null); sfx('whoosh'); }}>{i + 1 < HOPS.length ? 'Follow the trail →' : 'Close the case'}</button>
            </div>
          )}
        </>
      ) : (
        <div className="explain good">
          {mistakes === 0 ? '🏁 Trail followed lawfully from Pune to abroad, with every step admissible.' : `Case closed with ${mistakes} misstep(s). Replay for a clean investigation.`}
          <button className="btn btn-ghost btn-sm" onClick={() => { setI(0); setPicked(null); setMistakes(0); }}><RotateCcw size={14} /> Replay</button>
        </div>
      )}
    </div>
  );
}

function Matcher({ complete }) {
  const [order] = useState(() => [...CHALLENGES].sort(() => Math.random() - 0.5));
  const [active, setActive] = useState(CHALLENGES[0].c);
  const [pairs, setPairs] = useState({});
  const [checked, setChecked] = useState(false);
  const assign = (r) => {
    if (!active) return;
    const n = { ...pairs };
    Object.keys(n).forEach((k) => { if (n[k] === r) delete n[k]; });
    n[active] = r; setPairs(n); setChecked(false); sfx('click');
    setActive(CHALLENGES.find((x) => !n[x.c])?.c ?? null);
  };
  const correct = CHALLENGES.filter((x) => pairs[x.c] === x.r).length;
  const check = () => { setChecked(true); const ok = correct === CHALLENGES.length; sfx(ok ? 'good' : 'bad'); if (ok) complete('match'); };
  return (
    <div className="lab-card">
      <h3><Link2 size={18} /> Match each challenge to its best response</h3>
      <div className="match-grid">
        <div className="match-col">
          {CHALLENGES.map((x) => (
            <button key={x.c} className={`match-item ${active === x.c ? 'active' : ''} ${checked ? (pairs[x.c] === x.r ? 'right' : 'wrong') : ''}`} onClick={() => setActive(x.c)}>
              <strong>{x.c}</strong><small>{pairs[x.c] ? `→ ${pairs[x.c]}` : 'not matched yet'}</small>
            </button>
          ))}
        </div>
        <div className="match-col">
          {order.map((x) => <button key={x.r} className={`match-risk ${Object.values(pairs).includes(x.r) ? 'used' : ''}`} onClick={() => assign(x.r)}>{x.r}</button>)}
        </div>
      </div>
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={check} disabled={Object.keys(pairs).length < CHALLENGES.length}>Check</button>
        {checked && <strong>{correct}/{CHALLENGES.length} correct</strong>}
      </div>
    </div>
  );
}

export default function TrailLab() {
  const { complete } = useMission('u5-challenges');
  const [tab, setTab] = useState('trail');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'trail' ? 'active' : ''} onClick={() => setTab('trail')}>Cross-border trail</button>
        <button className={tab === 'match' ? 'active' : ''} onClick={() => setTab('match')}>Challenge matcher</button>
      </div>
      {tab === 'trail' ? <Trail complete={complete} /> : <Matcher complete={complete} />}
    </div>
  );
}
