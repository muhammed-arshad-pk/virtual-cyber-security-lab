import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Gamepad2, Sparkles, Trophy, Zap } from 'lucide-react';
import { units, allTopics } from '../data/units';
import { useGame, levelInfo, BADGES } from '../context/GameContext';
import Logo from '../components/Logo';
import ParticleField from '../effects/ParticleField';
import { tilt } from '../effects/interactions';

export default function Dashboard() {
  const { state } = useGame();
  const topics = allTopics().filter((t) => !t.comingSoon);
  const nextTopic = topics.find((t) => !state.completed[t.key]);
  const lvl = levelInfo(state.xp);
  const objectivesDone = Object.values(state.objectives).reduce((n, o) => n + Object.keys(o).length, 0);
  const objectivesTotal = topics.reduce((n, t) => n + (t.lab?.objectives.length ?? 0), 0);

  return (
    <div className="page">
      <section className="dash-hero">
        <ParticleField />
        <div className="hero-copy">
          <span className="eyebrow">Virtual Cyber Security Lab</span>
          <h1>Learn cyber security by <span className="grad">doing it.</span></h1>
          <p>Step inside realistic simulations. Defend a network from a botnet, watch a keylogger steal keystrokes, spot Trojans in disguise, and earn XP and badges along the way.</p>
          <div className="hero-actions">
            {nextTopic && (
              <Link className="btn btn-primary" to={`/unit/${nextTopic.unitId}/${nextTopic.slug}`}>
                <Sparkles size={16} /> {Object.keys(state.completed).length ? 'Continue' : 'Start'}: {nextTopic.title}
              </Link>
            )}
            <Link className="btn btn-glass" to="/games"><Gamepad2 size={16} /> Play Cyber Defender</Link>
          </div>
        </div>
        <div className="dash-hero-art" aria-hidden="true">
          <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
          <Logo size={120} />
        </div>
      </section>

      <div className="stats">
        <div className="stat"><Zap size={20} /><div><strong>{state.xp}</strong><span>XP · Level {lvl.level}</span></div></div>
        <div className="stat"><FlaskConical size={20} /><div><strong>{objectivesDone}/{objectivesTotal}</strong><span>Mission objectives</span></div></div>
        <div className="stat"><Trophy size={20} /><div><strong>{Object.keys(state.badges).length}/{BADGES.length}</strong><span>Badges earned</span></div></div>
        <div className="stat"><Sparkles size={20} /><div><strong>{topics.filter((t) => state.completed[t.key]).length}/{topics.length}</strong><span>Topics completed</span></div></div>
      </div>

      <h2 className="section-title">Learn by Units</h2>
      <div className="unit-grid">
        {units.map((u) => {
          const ts = u.topics.filter((t) => !t.comingSoon);
          const done = ts.filter((t) => state.completed[`${u.id}/${t.slug}`]).length;
          const empty = u.topics.length === 0;
          return (
            <Link key={u.id} to={`/unit/${u.id}`} className={`unit-card tilt ${empty ? 'soon' : ''}`} {...tilt}>
              <span className="unit-badge">Unit {u.roman}</span>
              <h3>{u.title}</h3>
              <p>{u.summary}</p>
              {empty ? (
                <em className="soon-tag">Coming soon</em>
              ) : (
                <>
                  <div className="bar"><span style={{ width: `${ts.length ? (done / ts.length) * 100 : 0}%` }} /></div>
                  <small>{done}/{ts.length} topics · {u.topics.length} total <ArrowRight size={14} /></small>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
