import { useState } from 'react';
import { Gavel, Scale, RotateCcw, Info } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const PROVISIONS = ['Sec 66 (with 43)', 'Sec 66B', 'Sec 66C', 'Sec 66D', 'Sec 66E', 'Sec 66F', 'Sec 67', 'Sec 72A'];
const SCENARIOS = [
  { text: 'An employee dishonestly deletes a colleague’s system logs without permission to hide their own mistakes.', ans: 'Sec 66 (with 43)', why: 'A Sec 43 act (damage/deletion) done dishonestly becomes a Sec 66 offence.' },
  { text: 'Someone creates a fake account in another person’s name and uses it to cheat buyers.', ans: 'Sec 66D', why: 'Cheating by personation using a computer resource.' },
  { text: 'A person logs into their ex-friend’s email using a password they stole.', ans: 'Sec 66C', why: 'Fraudulent use of another person’s password is identity theft.' },
  { text: 'Someone shares intimate photos of a person without their consent.', ans: 'Sec 66E', why: 'Violation of privacy. Other laws may also apply.' },
  { text: 'An attack disables a power-grid control system to threaten national security.', ans: 'Sec 66F', why: 'Cyberterrorism, punishable with up to life imprisonment.' },
  { text: 'A buyer knowingly purchases a stolen laptop containing company data.', ans: 'Sec 66B', why: 'Dishonestly receiving a stolen computer resource.' },
  { text: 'A vendor’s employee sells customer data obtained under a service contract.', ans: 'Sec 72A', why: 'Disclosure of personal information in breach of a lawful contract.' },
  { text: 'A user publishes obscene material on a public website.', ans: 'Sec 67', why: 'Publishing or transmitting obscene material electronically.' },
];
const PENALTIES = [
  { sec: '66', name: 'Computer-related offences', max: 'Up to 3 years and/or ₹5 lakh', note: 'Bailable · cognizable (Sec 77B)' },
  { sec: '66C', name: 'Identity theft', max: 'Up to 3 years + up to ₹1 lakh', note: 'Bailable · cognizable' },
  { sec: '66D', name: 'Cheating by personation', max: 'Up to 3 years + up to ₹1 lakh', note: 'Bailable · cognizable' },
  { sec: '66E', name: 'Violation of privacy', max: 'Up to 3 years and/or ₹2 lakh', note: 'Bailable · cognizable' },
  { sec: '66F', name: 'Cyberterrorism', max: 'Up to life imprisonment', note: 'Non-bailable · cognizable' },
  { sec: '67', name: 'Obscene material', max: '1st: 3 yrs + ₹5 lakh · repeat: 5 yrs + ₹10 lakh', note: 'Repeat offence non-bailable' },
  { sec: '67A', name: 'Sexually explicit material', max: '1st: 5 yrs + ₹10 lakh · repeat: 7 yrs', note: 'Non-bailable' },
  { sec: '72A', name: 'Disclosure in breach of contract', max: 'Up to 3 years and/or ₹5 lakh', note: 'Bailable · cognizable' },
];
const PRINCIPLES = [
  { text: 'An FIR being filed means the accused is guilty.', ans: false, why: 'Everyone is presumed innocent until proven guilty in court.' },
  { text: 'The same act can attract both the IT Act and the BNS.', ans: true, why: 'E.g. personation (IT Act 66D) plus cheating (BNS 318/319).' },
  { text: 'Sec 66A can be used to arrest someone for an offensive post.', ans: false, why: 'It was struck down in Shreya Singhal (2015).' },
  { text: 'Compensation under Sec 43 does not require criminal intent.', ans: true, why: 'Sec 43 is civil liability. Dishonest intent makes it Sec 66.' },
  { text: 'The punishments in the Act are fixed sentences every offender receives.', ans: false, why: 'They are maximums. Courts decide based on facts and evidence.' },
];

function Match({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const done = i >= SCENARIOS.length;
  const s = SCENARIOS[i];
  const pick = (p) => {
    if (picked) return;
    setPicked(p);
    const ok = p === s.ans; sfx(ok ? 'good' : 'bad');
    if (!ok) setMistakes((m) => m + 1);
    if (ok && i === SCENARIOS.length - 1 && mistakes === 0) complete('match');
  };
  return (
    <div className="lab-card">
      <h3><Gavel size={18} /> Match the offence to the legal concept</h3>
      {!done ? (
        <>
          <div className="alert-box scenario" key={i}><Info size={16} /> Scenario {i + 1}/{SCENARIOS.length}: {s.text}</div>
          <div className="method-grid four">
            {PROVISIONS.map((p) => <button key={p} className={`quiz-option ${!picked ? '' : p === s.ans ? 'correct' : p === picked ? 'wrong' : 'dim'}`} onClick={() => pick(p)} disabled={!!picked}>{p}</button>)}
          </div>
          {picked && (
            <div className={`explain ${picked === s.ans ? 'good' : 'bad'}`}>{s.why}
              <button className="btn btn-primary btn-sm" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 < SCENARIOS.length ? 'Next' : 'Finish'}</button>
            </div>
          )}
        </>
      ) : (
        <div className="explain good">{mistakes === 0 ? '🦅 Perfect matching!' : `Done with ${mistakes} mistake(s).`}
          <button className="btn btn-ghost btn-sm" onClick={() => { setI(0); setPicked(null); setMistakes(0); }}><RotateCcw size={14} /> Replay</button>
        </div>
      )}
      <p className="hint">Educational simulation: real cases may involve several provisions, and outcomes depend on facts and court process.</p>
    </div>
  );
}

function Penalties({ complete }) {
  const [flipped, setFlipped] = useState(() => new Set());
  const flip = (sec) => {
    const n = new Set(flipped); n.add(sec); setFlipped(n); sfx('whoosh');
    if (n.size >= 6) complete('explore');
  };
  return (
    <div className="lab-card">
      <h3><Scale size={18} /> Penalty explorer <span className="tag">{flipped.size}/6 explored</span></h3>
      <div className="amend-grid">
        {PENALTIES.map((p) => (
          <button key={p.sec} className={`flip pen ${flipped.has(p.sec) ? 'flipped' : ''}`} onClick={() => flip(p.sec)}>
            <span className="flip-inner">
              <span className="flip-face front"><em>IT ACT</em><span className="pen-sec">§ {p.sec}</span>{p.name}<small>tap to reveal ↻</small></span>
              <span className="flip-face back"><em>MAXIMUM</em>{p.max}<small>{p.note}</small></span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Principles({ complete }) {
  const [ans, setAns] = useState({});
  const set = (k, v) => {
    const n = { ...ans, [k]: v }; setAns(n);
    sfx(v === PRINCIPLES[k].ans ? 'good' : 'bad');
    if (PRINCIPLES.every((p, i) => n[i] === p.ans)) complete('principles');
  };
  return (
    <div className="lab-card">
      <h3>Key legal principles: true or false?</h3>
      {PRINCIPLES.map((p, k) => (
        <div key={p.text} className={`scope-row ${ans[k] === undefined ? '' : ans[k] === p.ans ? 'right' : 'wrong'}`}>
          <span>{p.text}</span>
          <div className="row-gap">
            <button className={`chip ${ans[k] === true ? 'on' : ''}`} onClick={() => set(k, true)}>True</button>
            <button className={`chip ${ans[k] === false ? 'on' : ''}`} onClick={() => set(k, false)}>False</button>
          </div>
          {ans[k] !== undefined && <small>{ans[k] === p.ans ? '✔ ' : '✘ '}{p.why}</small>}
        </div>
      ))}
    </div>
  );
}

export default function PunishLab() {
  const { complete } = useMission('u5-punish');
  const [tab, setTab] = useState('match');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'match' ? 'active' : ''} onClick={() => setTab('match')}>Match the offence</button>
        <button className={tab === 'pen' ? 'active' : ''} onClick={() => setTab('pen')}>Penalty explorer</button>
        <button className={tab === 'prin' ? 'active' : ''} onClick={() => setTab('prin')}>Legal principles</button>
      </div>
      {tab === 'match' && <Match complete={complete} />}
      {tab === 'pen' && <Penalties complete={complete} />}
      {tab === 'prin' && <Principles complete={complete} />}
    </div>
  );
}
