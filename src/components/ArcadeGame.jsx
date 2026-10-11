import { useCallback, useEffect, useRef, useState } from 'react';
import { Heart, Play, Server } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const THREATS = [
  { label: '📎 Invoice.pdf.exe', bad: true, tip: 'Double extension: a Trojan' },
  { label: '🧟 Command from C2 server', bad: true, tip: 'Botnet traffic' },
  { label: '🔑 Login guess #4,812', bad: true, tip: 'Password guessing attack' },
  { label: '⌨️ keylog_upload.dat', bad: true, tip: 'Spyware sending keystrokes out' },
  { label: '🎁 FreeGame_Crack.exe', bad: true, tip: 'Cracked software = Trojan bait' },
  { label: '👀 “I know where you are”', bad: true, tip: 'Cyberstalking threat' },
  { label: '🌊 Traffic flood burst', bad: true, tip: 'DoS traffic' },
  { label: '📲 Flashlight wants SMS access', bad: true, tip: 'Spyware permissions' },
  { label: '📩 “KYC expired, click bit.ly/x”', bad: true, tip: 'Smishing link' },
  { label: '📶 Evil-twin “Cafe_WiFi”', bad: true, tip: 'Rogue hotspot' },
  { label: '💸 UPI collect “to receive ₹5,000”', bad: true, tip: 'You never need a PIN to receive' },
  { label: '📞 “Bank” asks for your OTP', bad: true, tip: 'Vishing: banks never ask for OTP' },
  { label: '📲 SIM swap request from stranger', bad: true, tip: 'SIM-swap fraud' },
  { label: '✅ Windows Update (signed)', bad: false, tip: 'Legitimate signed update' },
  { label: '🔐 Passkey login', bad: false, tip: 'Phishing-resistant sign-in' },
  { label: '🏢 MDM compliance check', bad: false, tip: 'Normal device management' },
  { label: '👩‍🎓 Student login', bad: false, tip: 'Normal user' },
  { label: '📚 Assignment from teacher', bad: false, tip: 'Expected email' },
  { label: '🛒 Normal shopper', bad: false, tip: 'Legit traffic' },
  { label: '📦 App from Play Store', bad: false, tip: 'Official source' },
  { label: '💬 “Dinner’s ready” from Mom', bad: false, tip: 'Normal message' },
];
const LANES = 5;

export default function ArcadeGame() {
  const { state, recordArcade } = useGame();
  const [phase, setPhase] = useState('idle');
  const [, setFrame] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState(null);
  const g = useRef(null);
  const raf = useRef(null);

  const say = (text, good) => {
    setFlash({ text, good, id: Math.random() });
  };

  const end = useCallback((finalScore) => {
    cancelAnimationFrame(raf.current);
    sfx('fanfare');
    setPhase('over');
    recordArcade(finalScore);
  }, [recordArcade]);

  const loop = useCallback((t) => {
    const s = g.current;
    const dt = Math.min(50, t - (s.last || t));
    s.last = t;
    s.elapsed += dt;
    const speed = 0.012 + s.elapsed / 3_000_000; // % of width per ms, slowly ramps up
    if (s.elapsed > s.nextSpawn) {
      const th = THREATS[Math.floor(Math.random() * THREATS.length)];
      s.items.push({ id: s.uid++, ...th, lane: Math.floor(Math.random() * LANES), x: -28 });
      s.nextSpawn = s.elapsed + Math.max(550, 1500 - s.elapsed / 40);
    }
    s.items.forEach((it) => { it.x += speed * dt; });
    const arrived = s.items.filter((it) => it.x >= 84);
    s.items = s.items.filter((it) => it.x < 84);
    arrived.forEach((it) => {
      if (it.bad) {
        s.lives -= 1; s.combo = 0;
        sfx('bad');
        s.shakeUntil = performance.now() + 350;
        say(`Breach! ${it.tip}`, false);
      } else {
        s.score += 2;
      }
    });
    const now = performance.now();
    s.pops = s.pops.filter((p) => now - (p.t ?? (p.t = now)) < 700);
    setScore(s.score); setLives(s.lives); setCombo(s.combo);
    setFrame((f) => f + 1);
    if (s.lives <= 0) { end(s.score); return; }
    raf.current = requestAnimationFrame(loop);
  }, [end]);

  const start = () => {
    g.current = { items: [], pops: [], uid: 0, elapsed: 0, nextSpawn: 300, last: 0, score: 0, lives: 3, combo: 0, shakeUntil: 0 };
    sfx('whoosh');
    setScore(0); setLives(3); setCombo(0); setFlash(null);
    setPhase('play');
    raf.current = requestAnimationFrame(loop);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const hit = (item) => {
    const s = g.current;
    if (!s || phase !== 'play') return;
    s.items = s.items.filter((x) => x.id !== item.id);
    if (item.bad) {
      s.combo += 1;
      const pts = 10 * Math.min(5, 1 + Math.floor(s.combo / 3));
      s.score += pts;
      sfx(s.combo >= 3 ? 'coin' : 'good');
      s.pops.push({ id: s.uid++, x: item.x, lane: item.lane, text: `+${pts}`, good: true });
      say(`Blocked! +${pts} · ${item.tip}`, true);
    } else {
      s.lives -= 1; s.combo = 0;
      sfx('bad');
      s.pops.push({ id: s.uid++, x: item.x, lane: item.lane, text: '✖ legit!', good: false });
      say(`Oops, you blocked a legit user (${item.tip})`, false);
      if (s.lives <= 0) end(s.score);
    }
  };

  const items = g.current?.items ?? [];
  const pops = g.current?.pops ?? [];
  const shaking = g.current && performance.now() < g.current.shakeUntil;

  return (
    <div className="arcade">
      <div className="arcade-hud">
        <span>Score <strong>{score}</strong></span>
        <span>Combo <strong>×{Math.min(5, 1 + Math.floor(combo / 3))}</strong></span>
        <span className="lives">{[0, 1, 2].map((i) => <Heart key={i} size={16} className={i < lives ? 'full' : ''} />)}</span>
        <span>Best <strong>{state.arcadeBest}</strong></span>
      </div>
      <div className={`arcade-field ${shaking ? 'shake' : ''}`}>
        {[...Array(LANES)].map((_, i) => <div key={i} className="lane" style={{ top: `${(i / LANES) * 100}%`, height: `${100 / LANES}%` }} />)}
        <div className="arcade-server"><Server size={40} /><span>YOUR SERVER</span></div>
        {phase === 'play' && items.map((it) => (
          <button
            key={it.id}
            className="threat"
            style={{ left: `${it.x}%`, top: `calc(${(it.lane / LANES) * 100}% + 8px)` }}
            onMouseDown={() => hit(it)}
            onTouchStart={(e) => { e.preventDefault(); hit(it); }}
          >{it.label}</button>
        ))}
        {phase === 'play' && pops.map((p) => (
          <span key={p.id} className={`pop-score ${p.good ? 'good' : 'bad'}`} style={{ left: `${p.x}%`, top: `calc(${(p.lane / LANES) * 100}% + 4px)` }}>{p.text}</span>
        ))}
        {flash && phase === 'play' && <div key={flash.id} className={`arcade-flash ${flash.good ? 'good' : 'bad'}`}>{flash.text}</div>}
        {phase !== 'play' && (
          <div className="arcade-overlay">
            {phase === 'over' && <h3>Game over · {score} points</h3>}
            {phase === 'idle' && <h3>🕹️ Cyber Defender</h3>}
            <p>Traffic is heading for your server. <b>Click malicious items</b> to block them, and let legitimate users through. Blocking a real user or letting a threat reach the server costs a life.</p>
            <button className="btn btn-primary" onClick={start}><Play size={16} /> {phase === 'over' ? 'Play again' : 'Start game'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
