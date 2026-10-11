import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { allTopics, findTopicByLab } from '../data/units';
import { sfx } from '../effects/sfx';
import { burst } from '../effects/Confetti';

const TOAST_SOUND = { xp: 'coin', badge: 'fanfare', level: 'fanfare' };

const STORAGE_KEY = 'cybershield-game-v1';
const EMPTY = { xp: 0, completed: {}, quizBest: {}, objectives: {}, badges: {}, arcadeBest: 0 };

export const LEVELS = [
  { min: 0, name: 'Rookie Analyst' },
  { min: 150, name: 'Junior Defender' },
  { min: 400, name: 'Security Analyst' },
  { min: 800, name: 'Threat Hunter' },
  { min: 1300, name: 'Cyber Guardian' },
  { min: 2000, name: 'Cyber Shield Master' },
];

export function levelInfo(xp) {
  let idx = 0;
  LEVELS.forEach((l, i) => { if (xp >= l.min) idx = i; });
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const pct = next ? Math.round(((xp - cur.min) / (next.min - cur.min)) * 100) : 100;
  return { level: idx + 1, name: cur.name, next, pct };
}

const labBadge = (key, name, emoji, desc) => ({
  id: `lab-${key}`, name, emoji, desc,
  check: (s) => {
    const t = findTopicByLab(key);
    return !!t && t.lab.objectives.every((o) => s.objectives[key]?.[o.id]);
  },
});

export const BADGES = [
  { id: 'first-step', name: 'First Steps', emoji: '🚀', desc: 'Complete your first mission objective', check: (s) => Object.values(s.objectives).some((o) => Object.keys(o).length) },
  labBadge('cyberstalking', 'Privacy Protector', '🛡️', 'Finish every Cyberstalking objective'),
  labBadge('botnets', 'Botnet Buster', '🕸️', 'Finish every Botnet objective'),
  labBadge('password', 'Password Fortress', '🔐', 'Finish every Password objective'),
  labBadge('keylogger', 'Key Guardian', '⌨️', 'Finish every Keylogger objective'),
  labBadge('ddos', 'Uptime Hero', '📡', 'Finish every DoS/DDoS objective'),
  labBadge('trojan', 'Download Detective', '🕵️', 'Finish every Trojan objective'),
  // Labs that declare their own badge (Unit III onwards).
  ...allTopics().filter((t) => t.lab?.badge).map((t) => labBadge(t.lab.key, t.lab.badge.name, t.lab.badge.emoji, `Finish every ${t.title} objective`)),
  { id: 'quiz-ace', name: 'Perfect Score', emoji: '🎯', desc: 'Score 100% on any knowledge check', check: (s) => Object.values(s.quizBest).some((v) => v === 100) },
  { id: 'arcade', name: 'Firewall Reflexes', emoji: '🕹️', desc: 'Score 300+ in Cyber Defender arcade', check: (s) => s.arcadeBest >= 300 },
  ...[{ id: 2, roman: 'II' }, { id: 3, roman: 'III' }, { id: 4, roman: 'IV' }, { id: 5, roman: 'V' }].map((u) => ({
    id: `unit${u.id}`, name: `Unit ${u.roman} Champion`, emoji: '🏆', desc: `Complete every available Unit ${u.roman} topic`,
    check: (s) => {
      const ts = allTopics().filter((t) => t.unitId === u.id && !t.comingSoon);
      return ts.length > 0 && ts.every((t) => s.completed[t.key]);
    },
  })),
];

function load() {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return EMPTY;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, setState] = useState(load);
  const [toasts, setToasts] = useState([]);
  // Mirror of state so updates can be computed synchronously and never double-award.
  const ref = useRef(state);

  const toast = useCallback((t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((ts) => [...ts, { id, ...t }]);
    sfx(TOAST_SOUND[t.kind]);
    if (t.kind !== 'xp') burst();
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4000);
  }, []);

  const update = useCallback((fn) => {
    const prev = ref.current;
    let next = fn(prev);
    if (next === prev) return;
    const earned = BADGES.filter((b) => !next.badges[b.id] && b.check(next));
    if (earned.length) {
      next = { ...next, badges: { ...next.badges } };
      earned.forEach((b) => {
        next.badges[b.id] = Date.now();
        toast({ kind: 'badge', title: `Badge unlocked: ${b.name}`, text: b.desc, emoji: b.emoji });
      });
    }
    const before = levelInfo(prev.xp).level;
    const after = levelInfo(next.xp);
    if (after.level > before) toast({ kind: 'level', title: `Level up! Level ${after.level}`, text: after.name, emoji: '⭐' });
    ref.current = next;
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  }, [toast]);

  const completeObjective = useCallback((labKey, objective) => {
    if (ref.current.objectives[labKey]?.[objective.id]) return;
    update((s) => ({
      ...s,
      xp: s.xp + objective.xp,
      objectives: { ...s.objectives, [labKey]: { ...s.objectives[labKey], [objective.id]: true } },
    }));
    toast({ kind: 'xp', title: `+${objective.xp} XP`, text: objective.label, emoji: '✅' });
    const all = findTopicByLab(labKey)?.lab.objectives ?? [];
    if (all.length && all.every((o) => ref.current.objectives[labKey]?.[o.id])) {
      burst({ count: 200 });
      toast({ kind: 'mission', title: 'Mission complete!', text: 'Every objective cleared. Great work, agent.', emoji: '🎖️' });
    }
  }, [update, toast]);

  // XP is only granted for improving your best score, so retakes can't be farmed.
  const recordQuiz = useCallback((key, pct) => {
    const prevBest = ref.current.quizBest[key] ?? 0;
    const gain = Math.max(0, pct - prevBest);
    update((s) => ({
      ...s,
      xp: s.xp + gain,
      quizBest: { ...s.quizBest, [key]: Math.max(pct, prevBest) },
      completed: pct >= 60 ? { ...s.completed, [key]: true } : s.completed,
    }));
    if (gain) toast({ kind: 'xp', title: `+${gain} XP`, text: `New best: ${pct}%`, emoji: '🧠' });
    if (pct >= 60) burst({ count: pct === 100 ? 220 : 110 });
  }, [update, toast]);

  const recordArcade = useCallback((score) => {
    const prevBest = ref.current.arcadeBest;
    if (score <= prevBest) return;
    const gain = Math.floor((score - prevBest) / 5);
    update((s) => ({ ...s, arcadeBest: score, xp: s.xp + gain }));
    toast({ kind: 'xp', title: `+${gain} XP`, text: `New arcade high score: ${score}`, emoji: '🕹️' });
  }, [update, toast]);

  const markComplete = useCallback((key) => {
    if (ref.current.completed[key]) return;
    update((s) => ({ ...s, completed: { ...s.completed, [key]: true } }));
  }, [update]);

  const reset = useCallback(() => update(() => EMPTY), [update]);

  return (
    <GameContext.Provider value={{ state, toasts, completeObjective, recordQuiz, recordArcade, markComplete, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);

// Used by each lab: `complete('objective-id')` awards that objective once.
export function useMission(labKey) {
  const { state, completeObjective } = useGame();
  const objectives = findTopicByLab(labKey)?.lab.objectives ?? [];
  const done = state.objectives[labKey] ?? {};
  const complete = useCallback((id) => {
    const o = objectives.find((x) => x.id === id);
    if (o) completeObjective(labKey, o);
  }, [objectives, completeObjective, labKey]);
  return { done, complete, objectives };
}
