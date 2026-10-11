import { useEffect, useRef, useState } from 'react';
import { Flag, ThumbsUp, RotateCcw, ShieldCheck, Smartphone } from 'lucide-react';
import { useMission } from '../context/GameContext';
import { sfx } from '../effects/sfx';

// Fictional message feed. `warn` marks a cyberstalking warning sign.
const FEED = [
  { from: 'Aarav (classmate)', text: 'Congrats on the hackathon win! 🎉', warn: false, why: 'A friendly one-off message from someone you know.' },
  { from: 'unknown_user_27', text: 'Why aren’t you replying?? This is my 14th message today.', warn: true, why: 'Repeated unwanted contact after being ignored is a core sign of stalking.' },
  { from: 'CSE Group', text: 'Reminder: lab record due Friday 📚', warn: false, why: 'A normal group announcement.' },
  { from: 'unknown_user_27', text: 'Nice red jacket at the library today 👀', warn: true, why: 'Someone is watching your physical location without your consent.' },
  { from: 'Priya', text: 'Can you share the cyber security notes?', warn: false, why: 'An ordinary request from a classmate.' },
  { from: 'new_account_9081', text: 'You blocked me? Made a new account. You can’t ignore me.', warn: true, why: 'Creating new accounts to evade a block is a strong warning sign.' },
  { from: 'new_account_9081', text: 'Reply or everyone sees your old photos.', warn: true, why: 'This is a threat meant to intimidate. Save it as evidence.' },
  { from: 'Mom', text: 'Reached home? Dinner is ready 🍲', warn: false, why: 'Family checking in, which is normal and welcome.' },
  { from: 'maya.s_official', text: '(A profile using YOUR name and photos sent a follow request to your friends)', warn: true, why: 'Impersonation: a fake profile pretending to be you.' },
  { from: 'unknown_user_27', text: 'I know you got home at 9:40 last night.', warn: true, why: 'Tracking your movements causes fear. Check location sharing now.' },
];

const PLAN = [
  { text: 'Take screenshots and save message links as evidence', good: true },
  { text: 'Block and report the accounts on the platform', good: true },
  { text: 'Turn off live location sharing and make accounts private', good: true },
  { text: 'Tell a trusted friend, family member or teacher', good: true },
  { text: 'Report at cybercrime.gov.in or call 1930', good: true },
  { text: 'Reply angrily so they know you’re not scared', good: false },
  { text: 'Delete all the messages so you never see them again', good: false },
  { text: 'Share your location publicly to show you don’t care', good: false },
];

export default function CyberstalkingLab() {
  const { complete } = useMission('cyberstalking');
  const [shown, setShown] = useState(1);
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState('chat');
  const [plan, setPlan] = useState(() => new Set());
  const [planResult, setPlanResult] = useState(null);
  const scroller = useRef(null);

  const current = shown - 1;
  const answeredCurrent = answers[current] !== undefined;
  const finished = shown === FEED.length && answeredCurrent;
  const score = Object.entries(answers).filter(([i, a]) => a === FEED[i].warn).length;
  const alerts = Object.entries(answers).filter(([i, a]) => a && FEED[i].warn).length;

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [shown, answers, typing]);

  useEffect(() => {
    if (finished && score === FEED.length) complete('all-correct');
  }, [finished, score, complete]);

  const answer = (flag) => {
    if (answeredCurrent) return;
    setAnswers((a) => ({ ...a, [current]: flag }));
    sfx(flag === FEED[current].warn ? 'good' : 'bad');
    if (flag && FEED[current].warn) complete('first-flag');
    if (shown < FEED.length) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setShown((s) => s + 1);
        sfx(FEED[shown].warn ? 'alarm' : 'message');
      }, 1100);
    }
  };

  const restart = () => {
    setShown(1); setAnswers({}); setTyping(false); setPhase('chat'); setPlan(new Set()); setPlanResult(null);
  };

  const togglePlan = (i) => {
    setPlanResult(null);
    setPlan((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const checkPlan = () => {
    const ok = PLAN.every((p, i) => p.good === plan.has(i));
    setPlanResult(ok);
    sfx(ok ? 'good' : 'bad');
    if (ok) complete('safety-plan');
  };

  return (
    <div className="cs-lab">
      <div className={`phone ${FEED[current]?.warn && !answeredCurrent ? 'buzz' : ''}`}>
        <div className="phone-notch" />
        <div className="phone-top">
          <Smartphone size={14} /> Maya’s phone
          <span className="phone-alerts">🚩 {alerts}</span>
        </div>
        <div className="phone-feed" ref={scroller}>
          {FEED.slice(0, shown).map((m, i) => {
            const a = answers[i];
            const judged = a !== undefined;
            const right = judged && a === m.warn;
            return (
              <div key={i} className="msg-wrap">
                <div className={`msg ${m.from.match(/unknown|new_account|official/) ? 'stranger' : ''}`}>
                  <small>{m.from}</small>
                  <p>{m.text}</p>
                  {judged && <span className={`msg-stamp ${a ? 'flag' : 'ok'}`}>{a ? '🚩 flagged' : '👍 normal'}</span>}
                </div>
                {judged && <div className={`msg-feedback ${right ? 'good' : 'bad'}`}>{right ? '✔ ' : '✘ '}{m.why}</div>}
              </div>
            );
          })}
          {typing && <div className="typing"><span /><span /><span /></div>}
        </div>
        {!finished ? (
          <div className="phone-actions">
            <button className="btn btn-danger" disabled={answeredCurrent} onClick={() => answer(true)}><Flag size={16} /> Warning sign</button>
            <button className="btn btn-ok" disabled={answeredCurrent} onClick={() => answer(false)}><ThumbsUp size={16} /> Normal</button>
          </div>
        ) : (
          <div className="phone-actions done">
            <strong>{score}/{FEED.length} judged correctly</strong>
            <button className="btn btn-ghost btn-sm" onClick={restart}><RotateCcw size={14} /> Replay</button>
          </div>
        )}
      </div>

      <div className="cs-side">
        {phase === 'chat' && !finished && (
          <div className="lab-card">
            <h3>Your role</h3>
            <p>You are Maya’s friend helping her look through her inbox. For each new message, decide: is it a <b>warning sign</b> of cyberstalking, or <b>normal</b>?</p>
            <div className="meter-row">
              <span>Messages reviewed</span>
              <div className="bar"><span style={{ width: `${(Object.keys(answers).length / FEED.length) * 100}%` }} /></div>
            </div>
            <p className="hint">Look for: repetition, block evasion, threats, impersonation, someone knowing your location.</p>
          </div>
        )}
        {finished && phase === 'chat' && (
          <div className="lab-card pop">
            <h3>{score === FEED.length ? 'Perfect detective work!' : 'Inbox reviewed'}</h3>
            <p>You spotted {alerts} of {FEED.filter((m) => m.warn).length} warning signs. Maya is scared. What should she do next?</p>
            <button className="btn btn-primary" onClick={() => setPhase('plan')}><ShieldCheck size={16} /> Build her safety plan</button>
          </div>
        )}
        {phase === 'plan' && (
          <div className="lab-card pop">
            <h3>Safety plan: select every right action</h3>
            <div className="plan-list">
              {PLAN.map((p, i) => (
                <button
                  key={p.text}
                  className={`plan-item ${plan.has(i) ? 'on' : ''} ${planResult !== null ? (p.good ? 'should' : 'shouldnt') : ''}`}
                  onClick={() => togglePlan(i)}
                >
                  <span className="check-box">{plan.has(i) ? '✓' : ''}</span>{p.text}
                </button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={checkPlan}>Check plan</button>
            {planResult === true && <p className="result good">✅ Recognize, document, report and seek support. Maya is safer now.</p>}
            {planResult === false && <p className="result bad">Not quite. Green outlines show the right actions. Adjust and try again.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
