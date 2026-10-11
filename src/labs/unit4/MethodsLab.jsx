import { useState } from 'react';
import { Mail, MessageSquare, PhoneCall, Users, RotateCcw, HelpCircle } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const METHODS = ['Email phishing', 'Website/URL phishing', 'Smishing', 'Vishing', 'Social media phishing', 'Domain spoofing'];

// Challenges A–D from the course notes. Fictional, simulated messages only.
const CHALLENGES = [
  {
    id: 'A', kind: 'email', icon: Mail,
    header: 'From: Account Services · Subject: Your account has been suspended',
    body: 'We detected unusual activity. Your account has been suspended. Restore access within 24 hours: [unfamiliar link]',
    answer: 'Email phishing',
    signs: ['Unfamiliar sender', 'Urgent, threatening language', 'Suspicious, unfamiliar link'],
  },
  {
    id: 'B', kind: 'sms', icon: MessageSquare,
    header: 'SMS from an unknown number',
    body: 'Your parcel delivery is on hold. Update your personal details using this link to avoid return.',
    answer: 'Smishing',
    signs: ['Unexpected delivery alert', 'Unfamiliar link in a text message', 'Request for personal details'],
  },
  {
    id: 'C', kind: 'call', icon: PhoneCall,
    header: 'Incoming call: "Bank Security Team"',
    body: '"Sir, your account will be blocked in 10 minutes. Please read out the OTP you just received so we can stop it."',
    answer: 'Vishing',
    signs: ['Pressure to act immediately', 'Request for an OTP', 'Unsolicited call claiming to be the bank'],
  },
  {
    id: 'D', kind: 'social', icon: Users,
    header: 'Direct message from "your friend" (new profile)',
    body: 'Hey! I’m stuck and need money urgently for an emergency. Can you send it right now? Please don’t call, I can’t talk.',
    answer: 'Social media phishing',
    signs: ['Unexpected request for money', 'Newly created / impersonated profile', 'Message unusual for that sender'],
  },
];

const SCENARIO = [
  { q: 'Which phishing method was used in "The Fake Bank Alert"?', options: ['Vishing', 'Smishing (a text message with a link)', 'Social media phishing'], answer: 1 },
  { q: 'Which warning signs were present?', options: ['A bill on its usual date', 'An urgent threat of blocking and an unfamiliar domain', 'A message from a saved contact'], answer: 1 },
  { q: 'What could have happened if the student had entered their information?', options: ['Nothing', 'Their login details could have been exposed to the attacker', 'Their phone would charge faster'], answer: 1 },
  { q: 'What was the safest response?', options: ['Reply to the message', 'Click the link to check', 'Open the bank’s official app and check the account'], answer: 2 },
];

function Identify({ complete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [wrong, setWrong] = useState(0);
  const done = i >= CHALLENGES.length;
  const c = CHALLENGES[i];

  const choose = (m) => {
    if (picked) return;
    setPicked(m);
    const ok = m === c.answer;
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('first'); else setWrong((w) => w + 1);
    if (ok && i === CHALLENGES.length - 1 && wrong === 0) complete('all');
  };
  const next = () => { setI(i + 1); setPicked(null); sfx('message'); };
  const restart = () => { setI(0); setPicked(null); setWrong(0); };

  if (done) {
    return (
      <div className="lab-card pop center">
        <h3>{wrong === 0 ? '🎣 All four identified correctly!' : `Finished with ${wrong} mistake(s)`}</h3>
        <p>Stop, inspect and verify before you click, reply, call back or share information.</p>
        <button className="btn btn-primary btn-sm" onClick={restart}><RotateCcw size={14} /> Play again</button>
      </div>
    );
  }

  return (
    <div className="mt-grid">
      <div className={`msg-sim ${c.kind}`} key={c.id}>
        <span className="tag">Challenge {c.id}</span>
        <div className="msg-sim-head"><c.icon size={18} /> {c.header}</div>
        <p className="msg-sim-body">{c.body}</p>
        <small className="hint">Simulated message for training only.</small>
      </div>
      <div className="lab-card">
        <h3>Which phishing method is this?</h3>
        <div className="method-grid">
          {METHODS.map((m) => (
            <button key={m} className={`quiz-option ${!picked ? '' : m === c.answer ? 'correct' : m === picked ? 'wrong' : 'dim'}`} onClick={() => choose(m)} disabled={!!picked}>{m}</button>
          ))}
        </div>
        {picked && (
          <div className={`explain ${picked === c.answer ? 'good' : 'bad'}`}>
            <div>
              <strong>{picked === c.answer ? 'Correct!' : `It’s ${c.answer}.`}</strong> Warning signs:
              <ul className="sign-list">{c.signs.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <button className="btn btn-primary btn-sm" onClick={next}>{i + 1 < CHALLENGES.length ? 'Next challenge' : 'Finish'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Scenario({ complete }) {
  const [ans, setAns] = useState({});
  const [checked, setChecked] = useState(false);
  const allAnswered = SCENARIO.every((_, k) => ans[k] !== undefined);
  const correct = SCENARIO.filter((s, k) => ans[k] === s.answer).length;
  const check = () => {
    setChecked(true);
    const ok = correct === SCENARIO.length;
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('scenario');
  };
  return (
    <div className="lab-card">
      <h3><HelpCircle size={18} /> Scenario: The Fake Bank Alert</h3>
      <div className="sms-text">Your bank account will be blocked today unless you update your information immediately: [link to an unfamiliar domain]</div>
      {SCENARIO.map((s, k) => (
        <div key={s.q} className="scenario-q">
          <strong>{k + 1}. {s.q}</strong>
          <div className="row-gap">
            {s.options.map((o, j) => {
              const st = checked ? (j === s.answer ? 'on ok' : ans[k] === j ? 'on bad' : '') : ans[k] === j ? 'on' : '';
              return <button key={o} className={`chip ${st}`} onClick={() => { setAns({ ...ans, [k]: j }); setChecked(false); sfx('click'); }}>{o}</button>;
            })}
          </div>
        </div>
      ))}
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={check} disabled={!allAnswered}>Check answers</button>
        {checked && <strong>{correct}/{SCENARIO.length} correct{correct === SCENARIO.length ? '. Urgent messages should always be verified independently.' : ''}</strong>}
      </div>
    </div>
  );
}

export default function MethodsLab() {
  const { complete } = useMission('u4-methods');
  const [tab, setTab] = useState('identify');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'identify' ? 'active' : ''} onClick={() => setTab('identify')}>Identify the method</button>
        <button className={tab === 'scenario' ? 'active' : ''} onClick={() => setTab('scenario')}>Scenario questions</button>
      </div>
      {tab === 'identify' ? <Identify complete={complete} /> : <Scenario complete={complete} />}
    </div>
  );
}
