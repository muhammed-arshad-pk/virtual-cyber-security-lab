import { useState } from 'react';
import { RotateCcw, History, GitCompare, HelpCircle } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const AREAS = [
  { area: 'Signatures', before: 'Only "digital signatures" using asymmetric crypto and hash (one technology).', after: 'Sec 3A adds technology-neutral "electronic signatures" (Second Schedule, e.g. Aadhaar eSign).' },
  { area: 'E-contracts', before: 'Electronic records recognised, but no explicit rule on contracts.', after: 'Sec 10A: contracts formed electronically are valid and enforceable.' },
  { area: 'Hacking / Sec 66', before: 'Sec 66 "hacking with computer system", with a narrow, debated definition.', after: 'Sec 66 "computer related offences": any Sec 43 act done dishonestly or fraudulently.' },
  { area: 'Identity & personation', before: 'No specific offences.', after: 'Sec 66C identity theft and Sec 66D cheating by personation.' },
  { area: 'Privacy & data', before: 'Only Sec 72 (breach of confidentiality by officials).', after: 'Sec 43A (corporate data protection), 66E (privacy violation), 72A (disclosure in breach of contract).' },
  { area: 'Cyberterrorism', before: 'Not covered.', after: 'Sec 66F: up to life imprisonment.' },
  { area: 'Obscene content', before: 'Sec 67 only.', after: 'Sec 67A (sexually explicit) and 67B (child sexual abuse material) added.' },
  { area: 'Intermediaries', before: 'Limited protection for "network service providers".', after: 'Sec 79 safe harbour with due diligence, plus Sec 67C data-preservation duty.' },
  { area: 'Institutions', before: 'CERT-In not in the statute.', after: 'Sec 70A (NCIIPC) and 70B (CERT-In) given statutory roles.' },
  { area: 'Investigation', before: 'Investigation by Deputy Superintendent of Police (DSP) rank.', after: 'Sec 78: Inspector rank. Sec 77B: bailable/cognizable rules.' },
];

const SCENARIOS = [
  { text: 'Someone breaks into a company’s server and deletes data.', ans: '2000', why: 'Hacking (Sec 66) and damage (Sec 43) existed in the original Act.' },
  { text: 'A fraudster uses a stolen password to log in to a victim’s bank account.', ans: '2008', why: 'Identity theft (Sec 66C) was added in 2008.' },
  { text: 'A hospital negligently leaks patients’ medical data.', ans: '2008', why: 'Sec 43A corporate data-protection liability was added in 2008.' },
  { text: 'A website publishes obscene material.', ans: '2000', why: 'Sec 67 was in the original Act.' },
  { text: 'A fake profile impersonates a celebrity to cheat fans.', ans: '2008', why: 'Sec 66D cheating by personation was added in 2008.' },
  { text: 'An employee alters source code that the law requires to be kept.', ans: '2000', why: 'Sec 65 (tampering with source documents) was in the original Act.' },
  { text: 'A cyberattack threatens a national power grid.', ans: '2008', why: 'Sec 66F cyberterrorism was added in 2008.' },
  { text: 'A marketplace seeks protection from liability for a seller’s listing.', ans: '2008', why: 'The broad Sec 79 safe harbour with due diligence came in 2008.' },
];

const TIMELINE = [
  { year: '2000', text: 'IT Act enacted. In force 17 October 2000.' },
  { year: '2008', text: 'IT (Amendment) Act passed by Parliament in December.' },
  { year: '2009', text: 'Amendment in force from 27 October 2009.' },
  { year: '2011', text: 'SPDI Rules (Sec 43A) and first Intermediary Guidelines.' },
  { year: '2015', text: 'Shreya Singhal: Sec 66A struck down, Sec 79 read down.' },
  { year: '2017', text: 'Puttaswamy: privacy declared a fundamental right.' },
  { year: '2021', text: 'IT (Intermediary Guidelines & Digital Media Ethics Code) Rules.' },
  { year: '2022', text: 'CERT-In Directions: 6-hour reporting, 180-day logs.' },
  { year: '2023', text: 'DPDP Act, and BNS, BNSS and BSA enacted.' },
  { year: '2024', text: 'BNS, BNSS and BSA in force from 1 July 2024.' },
];

function Compare({ complete }) {
  const [flipped, setFlipped] = useState(() => new Set());
  const flip = (a) => {
    const n = new Set(flipped); n.has(a) ? n.delete(a) : n.add(a); setFlipped(n); sfx('whoosh');
    if (AREAS.every((x) => n.has(x.area) || x.area === a)) complete('compare');
  };
  return (
    <div className="lab-card">
      <h3><GitCompare size={18} /> Flip each area: 2000 → 2008 <span className="tag">{flipped.size}/{AREAS.length}</span></h3>
      <div className="amend-grid">
        {AREAS.map((x) => (
          <button key={x.area} className={`flip amend ${flipped.has(x.area) ? 'flipped' : ''}`} onClick={() => flip(x.area)}>
            <span className="flip-inner">
              <span className="flip-face front"><em>2000 · {x.area}</em>{x.before}<small>tap to see 2008 ↻</small></span>
              <span className="flip-face back"><em>2008 · {x.area}</em>{x.after}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Which({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const done = i >= SCENARIOS.length;
  const s = SCENARIOS[i];
  const pick = (v) => {
    if (picked) return;
    setPicked(v);
    const ok = v === s.ans; sfx(ok ? 'good' : 'bad');
    if (!ok) setMistakes((m) => m + 1);
    if (ok && i === SCENARIOS.length - 1 && mistakes === 0) complete('which');
  };
  return (
    <div className="lab-card">
      <h3><HelpCircle size={18} /> Which version first covered this specifically?</h3>
      {!done ? (
        <>
          <div className="sort-card" key={i}>{s.text}</div>
          <div className="row-gap center-row">
            <button className={`btn ${picked === '2000' ? (s.ans === '2000' ? 'btn-ok' : 'btn-danger') : 'btn-ghost'}`} onClick={() => pick('2000')} disabled={!!picked}>Original IT Act (2000)</button>
            <button className={`btn ${picked === '2008' ? (s.ans === '2008' ? 'btn-ok' : 'btn-danger') : 'btn-ghost'}`} onClick={() => pick('2008')} disabled={!!picked}>Added by 2008 Amendment</button>
          </div>
          {picked && (
            <div className={`explain ${picked === s.ans ? 'good' : 'bad'}`}>{s.why}
              <button className="btn btn-primary btn-sm" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 < SCENARIOS.length ? 'Next' : 'Finish'}</button>
            </div>
          )}
          <small className="hint">{i + 1} / {SCENARIOS.length}</small>
        </>
      ) : (
        <div className="explain good">{mistakes === 0 ? '🏆 Perfect, you know your amendments!' : `Done with ${mistakes} mistake(s).`}
          <button className="btn btn-ghost btn-sm" onClick={() => { setI(0); setPicked(null); setMistakes(0); }}><RotateCcw size={14} /> Replay</button>
        </div>
      )}
    </div>
  );
}

function Timeline({ complete }) {
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const open = (t) => {
    setSel(t.year); sfx('click');
    const n = new Set(seen).add(t.year); setSeen(n);
    if (n.size === TIMELINE.length) complete('timeline');
  };
  const cur = TIMELINE.find((t) => t.year === sel);
  return (
    <div className="lab-card">
      <h3><History size={18} /> Cyber-law timeline</h3>
      <div className="gen-track law-track">
        {TIMELINE.map((t) => <button key={t.year} className={`gen-node ${sel === t.year ? 'on' : ''} ${seen.has(t.year) ? 'seen' : ''}`} onClick={() => open(t)}><strong>{t.year}</strong></button>)}
      </div>
      {cur ? <p className="gen-detail" key={cur.year}><b>{cur.year}:</b> {cur.text}</p> : <p className="hint">Tap each year.</p>}
    </div>
  );
}

export default function AmendLab() {
  const { complete } = useMission('u5-amend');
  const [tab, setTab] = useState('compare');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'compare' ? 'active' : ''} onClick={() => setTab('compare')}>2000 vs 2008</button>
        <button className={tab === 'which' ? 'active' : ''} onClick={() => setTab('which')}>Which version?</button>
        <button className={tab === 'time' ? 'active' : ''} onClick={() => setTab('time')}>Timeline</button>
      </div>
      {tab === 'compare' && <Compare complete={complete} />}
      {tab === 'which' && <Which complete={complete} />}
      {tab === 'time' && <Timeline complete={complete} />}
    </div>
  );
}
