import { FlaskConical, Gamepad2, Layers, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page">
      <section className="unit-hero">
        <div>
          <span className="eyebrow">About Project</span>
          <h1>Cyber Shield: Virtual Cyber Security Lab</h1>
          <p>An interactive learning platform built for the Cyber Security course. Students learn each topic by stepping into a safe simulation, then test their understanding with game-style challenges.</p>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title"><FlaskConical size={18} /> Learning approach</h2>
          <ul className="plain-list">
            <li><b>Learn:</b> a concise explanation, key terms, attack flow and comparisons for each topic.</li>
            <li><b>Experience:</b> an interactive mission that puts the student inside the scenario.</li>
            <li><b>Defend:</b> every mission ends with protective actions, not just the attack.</li>
            <li><b>Check:</b> a timed knowledge check with streaks and instant explanations.</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><Gamepad2 size={18} /> Gamification</h2>
          <ul className="plain-list">
            <li>XP for every mission objective and quiz improvement</li>
            <li>6 levels from Rookie Analyst to Cyber Shield Master</li>
            <li>Badges for finishing missions, perfect scores and the arcade</li>
            <li>Progress saved automatically in the browser</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><Layers size={18} /> Technology</h2>
          <ul className="plain-list">
            <li>React 18 + Vite</li>
            <li>React Router (hash routing, so it can be hosted anywhere)</li>
            <li>Lucide icons, hand-written CSS animations and SVG</li>
            <li>No backend: every simulation runs client-side</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><ShieldCheck size={18} /> Ethics & safety</h2>
          <p>All simulations use fictional data and never contact real systems. Concepts are taught so students can recognise and defend against attacks. Attacking systems without permission is illegal under the IT Act, 2000.</p>
        </section>
      </div>
    </div>
  );
}
