import { useMemo, useState } from 'react';
import { Search, BookOpen, Globe2, FileX2, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const SECTIONS = [
  { sec: '1(2) & 75', title: 'Extent & offences outside India', cat: 'Scope', text: 'The Act extends to the whole of India and applies to offences committed outside India by any person if the act involves a computer, system or network located in India.' },
  { sec: '2', title: 'Definitions', cat: 'Scope', text: 'Defines key terms: computer, computer resource, electronic record, electronic signature, intermediary, data, and more.' },
  { sec: '3 & 3A', title: 'Digital & electronic signatures', cat: 'Recognition', text: 'Sec 3: authentication of electronic records by digital signature (asymmetric crypto + hash). Sec 3A (2008): reliable electronic signatures listed in the Second Schedule, such as Aadhaar eSign.' },
  { sec: '4', title: 'Legal recognition of electronic records', cat: 'Recognition', text: 'Where law requires information in writing, an electronic record that is accessible for later reference satisfies it.' },
  { sec: '5', title: 'Legal recognition of signatures', cat: 'Recognition', text: 'Where law requires a signature, an electronic or digital signature satisfies it.' },
  { sec: '6', title: 'Electronic governance', cat: 'E-governance', text: 'Government filings, licences, receipts and payments may be made electronically.' },
  { sec: '10A', title: 'Validity of e-contracts', cat: 'E-governance', text: 'A contract is not unenforceable merely because it was formed using electronic records or communication.' },
  { sec: '17', title: 'Controller of Certifying Authorities', cat: 'Institutions', text: 'The CCA licenses and regulates Certifying Authorities and runs the Root CA of India.' },
  { sec: '43', title: 'Penalty & compensation for damage', cat: 'Civil', text: 'Unauthorised access, downloading, introducing viruses, damage, disruption or denial of access: the person must pay compensation.' },
  { sec: '43A', title: 'Failure to protect data', cat: 'Civil', text: 'A body corporate negligent in maintaining reasonable security practices for sensitive personal data must compensate those affected.' },
  { sec: '65', title: 'Tampering with source documents', cat: 'Offences', text: 'Concealing, destroying or altering computer source code required to be kept by law: up to 3 years and/or ₹2 lakh.' },
  { sec: '66', title: 'Computer-related offences', cat: 'Offences', text: 'Any act in Sec 43 done dishonestly or fraudulently: up to 3 years and/or ₹5 lakh.' },
  { sec: '66C', title: 'Identity theft', cat: 'Offences', text: 'Fraudulent or dishonest use of another person’s electronic signature, password or unique ID: up to 3 years plus fine up to ₹1 lakh.' },
  { sec: '66D', title: 'Cheating by personation', cat: 'Offences', text: 'Cheating by personation using a communication device or computer resource: up to 3 years plus fine up to ₹1 lakh.' },
  { sec: '66E', title: 'Violation of privacy', cat: 'Offences', text: 'Capturing, publishing or transmitting images of a person’s private area without consent: up to 3 years and/or ₹2 lakh.' },
  { sec: '66F', title: 'Cyberterrorism', cat: 'Offences', text: 'Acts intended to threaten the unity, integrity, security or sovereignty of India through cyber means: up to life imprisonment.' },
  { sec: '67, 67A, 67B', title: 'Obscene & prohibited content', cat: 'Offences', text: 'Publishing or transmitting obscene material (67), sexually explicit material (67A) and child sexual abuse material (67B), with escalating penalties.' },
  { sec: '69 & 69A', title: 'Interception & blocking', cat: 'Powers', text: 'Government powers to intercept, monitor or decrypt information (69), and to block public access to content (69A), under prescribed safeguards.' },
  { sec: '70B', title: 'CERT-In', cat: 'Institutions', text: 'The Indian Computer Emergency Response Team is the national agency for incident response.' },
  { sec: '72A', title: 'Disclosure in breach of contract', cat: 'Offences', text: 'Disclosing personal information obtained under a contract without consent, intending wrongful loss or gain: up to 3 years and/or ₹5 lakh.' },
  { sec: '79', title: 'Intermediary safe harbour', cat: 'Intermediaries', text: 'Intermediaries are not liable for third-party content if they only provide access, don’t modify content, and follow due diligence and lawful orders.' },
];
const CATS = ['All', 'Scope', 'Recognition', 'E-governance', 'Institutions', 'Civil', 'Offences', 'Powers', 'Intermediaries'];

const SCOPE = [
  { text: 'A hacker sitting in another country breaks into a server located in Mumbai.', yes: true, why: 'Sec 75 applies because a computer system in India is involved.' },
  { text: 'Two Bengaluru companies agree a supply contract entirely over email.', yes: true, why: 'Sec 10A: e-contracts are valid and enforceable.' },
  { text: 'A person makes their will only as an electronic document.', yes: false, why: 'Wills are excluded by the First Schedule. The Act doesn’t make them valid electronically.' },
  { text: 'An Indian citizen attacks a German server with no Indian computer involved.', yes: false, why: 'Sec 75 needs a computer, system or network located in India. Other countries’ laws apply here.' },
  { text: 'A state government accepts licence applications through an online form.', yes: true, why: 'Sec 6 permits electronic governance.' },
];

const DOCS = [
  { text: 'Will', excluded: true }, { text: 'Power of attorney', excluded: true }, { text: 'Trust deed', excluded: true },
  { text: 'Sale deed for a flat', excluded: true }, { text: 'Promissory note', excluded: true },
  { text: 'Online shopping contract', excluded: false }, { text: 'Offer letter signed with a DSC', excluded: false },
  { text: 'Electronic cheque', excluded: false }, { text: 'Income-tax return', excluded: false }, { text: 'App-based car rental agreement', excluded: false },
];

function Navigator({ complete }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const list = useMemo(() => SECTIONS.filter((s) => (cat === 'All' || s.cat === cat)
    && `${s.sec} ${s.title} ${s.text}`.toLowerCase().includes(q.toLowerCase())), [q, cat]);
  const pick = (s) => {
    setOpen(open === s.sec ? null : s.sec); sfx('click');
    const n = new Set(seen).add(s.sec); setSeen(n);
    if (n.size >= 8) complete('explore');
  };
  return (
    <div className="lab-card">
      <h3><BookOpen size={18} /> IT Act section navigator <span className="tag">{seen.size}/8 explored</span></h3>
      <div className="pw-field"><input className="dark-input" placeholder="Search: identity, privacy, 66, signature…" value={q} onChange={(e) => setQ(e.target.value)} /><span className="icon-btn"><Search size={16} /></span></div>
      <div className="row-gap">{CATS.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="sec-grid">
        {list.map((s) => (
          <button key={s.sec} className={`sec-card ${open === s.sec ? 'open' : ''} ${seen.has(s.sec) ? 'seen' : ''}`} onClick={() => pick(s)}>
            <span className="sec-no">§ {s.sec}</span>
            <strong>{s.title}</strong>
            <small className="sec-cat">{s.cat}</small>
            {open === s.sec && <p className="sec-text">{s.text}</p>}
          </button>
        ))}
        {!list.length && <p className="hint">No sections match.</p>}
      </div>
    </div>
  );
}

function Scope({ complete }) {
  const [ans, setAns] = useState({});
  const answer = (k, v) => {
    const n = { ...ans, [k]: v }; setAns(n);
    sfx(v === SCOPE[k].yes ? 'good' : 'bad');
    if (SCOPE.every((s, i) => n[i] === s.yes)) complete('scope');
  };
  return (
    <div className="lab-card">
      <h3><Globe2 size={18} /> Does the IT Act apply / validate this?</h3>
      {SCOPE.map((s, k) => (
        <div key={s.text} className={`scope-row ${ans[k] === undefined ? '' : ans[k] === s.yes ? 'right' : 'wrong'}`}>
          <span>{s.text}</span>
          <div className="row-gap">
            <button className={`chip ${ans[k] === true ? 'on' : ''}`} onClick={() => answer(k, true)}>Yes</button>
            <button className={`chip ${ans[k] === false ? 'on' : ''}`} onClick={() => answer(k, false)}>No</button>
          </div>
          {ans[k] !== undefined && <small>{ans[k] === s.yes ? '✔ ' : '✘ '}{s.why}</small>}
        </div>
      ))}
    </div>
  );
}

function Schedule({ complete }) {
  const [i, setI] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(null);
  const doc = DOCS[i];
  const done = i >= DOCS.length;
  const drop = (excluded) => {
    if (done) return;
    if (excluded !== doc.excluded) { setShake(excluded ? 'x' : 'ok'); setMistakes((m) => m + 1); sfx('bad'); setTimeout(() => setShake(null), 450); return; }
    sfx('good'); setPlaced([...placed, doc]);
    if (i + 1 === DOCS.length && mistakes === 0) complete('schedule');
    setI(i + 1);
  };
  return (
    <div className="lab-card">
      <h3><FileX2 size={18} /> First Schedule sorter</h3>
      <div className="sort-card-slot">
        {!done ? <div className="sort-card" key={i}>{doc.text}</div> : (
          <div className="sort-card done">{mistakes === 0 ? '🎉 Perfect!' : `Done with ${mistakes} mistake(s).`}
            <button className="btn btn-ghost btn-sm" onClick={() => { setI(0); setPlaced([]); setMistakes(0); }}><RotateCcw size={14} /> Replay</button></div>
        )}
      </div>
      <div className="buckets">
        <button className={`bucket ok ${shake === 'ok' ? 'shake' : ''}`} onClick={() => drop(false)} disabled={done}>
          <span className="bucket-head">✔ Can be electronic</span>
          {placed.filter((p) => !p.excluded).map((p) => <span key={p.text} className="bucket-item">{p.text}</span>)}
        </button>
        <button className={`bucket bad ${shake === 'x' ? 'shake' : ''}`} onClick={() => drop(true)} disabled={done}>
          <span className="bucket-head">✘ Excluded (First Schedule)</span>
          {placed.filter((p) => p.excluded).map((p) => <span key={p.text} className="bucket-item">{p.text}</span>)}
        </button>
      </div>
    </div>
  );
}

export default function ItActLab() {
  const { complete } = useMission('u5-itact');
  const [tab, setTab] = useState('nav');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'nav' ? 'active' : ''} onClick={() => setTab('nav')}>Section navigator</button>
        <button className={tab === 'scope' ? 'active' : ''} onClick={() => setTab('scope')}>Applicability</button>
        <button className={tab === 'sched' ? 'active' : ''} onClick={() => setTab('sched')}>First Schedule</button>
      </div>
      {tab === 'nav' && <Navigator complete={complete} />}
      {tab === 'scope' && <Scope complete={complete} />}
      {tab === 'sched' && <Schedule complete={complete} />}
    </div>
  );
}
