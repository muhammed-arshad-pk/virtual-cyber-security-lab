import { useState } from 'react';
import { Server, User, Users, RotateCcw, Siren } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const FACTS = [
  { text: 'Comes from a single machine', type: 'dos' },
  { text: 'Uses a botnet of thousands of devices', type: 'ddos' },
  { text: 'Blocking one address can stop it', type: 'dos' },
  { text: 'Traffic looks like real users from all over the world', type: 'ddos' },
  { text: 'Easier to trace back to its source', type: 'dos' },
  { text: 'Usually needs a CDN or scrubbing service to absorb it', type: 'ddos' },
  { text: 'The 2016 Mirai attack on Dyn', type: 'ddos' },
  { text: 'Smaller in scale', type: 'dos' },
];

const INCIDENTS = [
  {
    alert: 'One address is sending thousands of requests per second to your login page.',
    options: ['Block that address and apply rate limiting', 'Buy a new domain name', 'Shut the website down for a week', 'Ignore it'],
    answer: 0,
    why: 'Single source means DoS. Blocking the address and rate limiting stop it quickly.',
  },
  {
    alert: 'Traffic spike from 40,000 addresses in 90 countries. Your internet link is completely full.',
    options: ['Block the addresses one at a time', 'Activate your CDN / DDoS protection and inform your ISP', 'Restart the server again and again', 'Post about it on social media'],
    answer: 1,
    why: 'A distributed flood needs upstream capacity: a scrubbing service or the ISP can absorb it before it reaches you.',
  },
  {
    alert: 'Exam results day: traffic is 10× normal, but it is all real students checking results.',
    options: ['Block all the students', 'Report it as a cybercrime', 'Scale up servers and use load balancing', 'Turn off the results page'],
    answer: 2,
    why: 'Not every spike is an attack! This is a "flash crowd". Plan capacity for known busy days.',
  },
  {
    alert: 'The site was down for 3 hours and nobody noticed until users complained.',
    options: ['Set up traffic monitoring and automatic alerts', 'Hire more designers', 'Change the logo', 'Nothing can be done'],
    answer: 0,
    why: 'Monitoring and alerting give early warning so you can respond in minutes, not hours.',
  },
];

function SortGame({ complete }) {
  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [shake, setShake] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const fact = FACTS[idx];
  const done = idx >= FACTS.length;

  const drop = (type) => {
    if (done) return;
    if (type !== fact.type) {
      setShake(type); setMistakes((m) => m + 1);
      sfx('bad');
      setTimeout(() => setShake(null), 450);
      return;
    }
    sfx('good');
    setPlaced((p) => [...p, fact]);
    if (idx + 1 === FACTS.length && mistakes === 0) complete('sort');
    setIdx(idx + 1);
  };

  const restart = () => { setIdx(0); setPlaced([]); setMistakes(0); };

  return (
    <div className="lab-card">
      <h3>Round 1: Sort the facts</h3>
      <div className="sort-card-slot">
        {!done ? (
          <div className="sort-card" key={idx}>{fact.text}</div>
        ) : (
          <div className="sort-card done">
            {mistakes === 0 ? '🎉 Perfect sort!' : `Done with ${mistakes} mistake${mistakes > 1 ? 's' : ''}. Replay for a perfect run.`}
            <button className="btn btn-ghost btn-sm" onClick={restart}><RotateCcw size={14} /> Replay</button>
          </div>
        )}
      </div>
      <div className="buckets">
        {[['dos', 'DoS', User], ['ddos', 'DDoS', Users]].map(([type, label, Icon]) => (
          <button key={type} className={`bucket ${shake === type ? 'shake' : ''}`} onClick={() => drop(type)} disabled={done}>
            <span className="bucket-head"><Icon size={18} /> {label}</span>
            {placed.filter((p) => p.type === type).map((p) => <span key={p.text} className="bucket-item">{p.text}</span>)}
          </button>
        ))}
      </div>
    </div>
  );
}

function IncidentGame({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [allRight, setAllRight] = useState(true);
  const [uptime, setUptime] = useState(100);
  const inc = INCIDENTS[i];
  const finished = i >= INCIDENTS.length;

  const choose = (k) => {
    if (picked !== null) return;
    setPicked(k);
    const ok = k === inc.answer;
    sfx(ok ? 'good' : 'bad');
    if (!ok) setAllRight(false);
    setUptime((u) => Math.max(0, Math.min(100, u + (ok ? 0 : -20))));
    if (ok && i + 1 === INCIDENTS.length && allRight) complete('defend');
  };
  const next = () => { setI(i + 1); setPicked(null); if (i + 1 < INCIDENTS.length) sfx('alarm'); };
  const restart = () => { setI(0); setPicked(null); setAllRight(true); setUptime(100); };

  const status = finished ? 'ok' : picked === null ? 'alert' : picked === inc.answer ? 'ok' : 'down';

  return (
    <div className="lab-card">
      <h3>Round 2: You’re on call 🚨</h3>
      <div className="incident-top">
        <div className={`server-status ${status}`}>
          <Server size={34} />
          <span>{status === 'alert' ? 'ALERT' : status === 'ok' ? 'ONLINE' : 'DEGRADED'}</span>
        </div>
        <div className="uptime">
          <small>Service availability</small>
          <div className="bar"><span style={{ width: `${uptime}%` }} className={uptime < 60 ? 'low' : ''} /></div>
          <strong>{uptime}%</strong>
        </div>
      </div>
      {!finished ? (
        <>
          <div className="alert-box" key={i}><Siren size={16} /> Incident {i + 1}/{INCIDENTS.length}: {inc.alert}</div>
          <div className="quiz-options">
            {inc.options.map((o, k) => (
              <button
                key={o}
                className={`quiz-option ${picked === null ? '' : k === inc.answer ? 'correct' : k === picked ? 'wrong' : 'dim'}`}
                onClick={() => choose(k)}
                disabled={picked !== null}
              >{o}</button>
            ))}
          </div>
          {picked !== null && (
            <div className={`explain ${picked === inc.answer ? 'good' : 'bad'}`}>
              {inc.why}
              <button className="btn btn-primary btn-sm" onClick={next}>{i + 1 < INCIDENTS.length ? 'Next incident' : 'Finish shift'}</button>
            </div>
          )}
        </>
      ) : (
        <div className="explain good">
          Shift over! Final availability: <strong>{uptime}%</strong>. {allRight ? 'Flawless incident response 🏆' : 'Replay for a perfect shift.'}
          <button className="btn btn-ghost btn-sm" onClick={restart}><RotateCcw size={14} /> Replay</button>
        </div>
      )}
    </div>
  );
}

export default function DdosLab() {
  const { complete } = useMission('ddos');
  return (
    <div className="dd-lab">
      <SortGame complete={complete} />
      <IncidentGame complete={complete} />
    </div>
  );
}
