import { useMemo, useState } from 'react';
import { MessageSquare, Wifi, WifiOff, Lock, Unlock, Search, Laptop, Smartphone, Globe, Send, ShieldCheck, Eye } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

/* ---------------- Smishing inbox ---------------- */
const SMS = [
  { from: 'AX-HDFCBK', kind: 'header', text: 'Rs 1,250.00 debited from A/c XX4521 to AMAZON on 10-Oct. Not you? Report via the bank app or call the number on the back of your card.', scam: false, why: 'Registered bank header, no link and no OTP request. It points you to official channels.' },
  { from: '+91 98765 1xx34', kind: 'number', text: 'Dear Consumer, your electricity will be disconnected tonight at 9:30 PM as last month bill was not updated. Immediately contact our officer 9xxxxxxx21.', scam: true, why: 'A personal mobile number, a threat and urgency. Electricity boards don’t ask you to call an "officer" on WhatsApp numbers.' },
  { from: '+91 70xxx xxx09', kind: 'number', text: 'India Post: your parcel is on hold due to incomplete address. Update within 12 hrs: https://indiapost-redelivery.top/track', link: 'https://indiapost-redelivery.top/track', brand: { name: 'India Post', official: 'indiapost.gov.in' }, scam: true, why: 'The real domain is indiapost-redelivery.top, not indiapost.gov.in, and the deadline is designed to rush you.' },
  { from: 'JD-SWIGGY', kind: 'header', text: '482913 is your OTP to log in to Swiggy. Do not share it with anyone. -Swiggy', scam: false, why: 'An expected OTP from a registered header that warns you not to share it. Fine, as long as YOU requested it.' },
  { from: '+91 63xxx xxx77', kind: 'number', text: 'Congratulations! Your number won ₹25,00,000 in KBC Lucky Draw. Pay ₹4,999 processing fee to claim: https://kbc-lottery-winner.in.net/claim', link: 'https://kbc-lottery-winner.in.net/claim', brand: { name: 'KBC', official: 'no lottery exists' }, scam: true, why: 'A lottery you never entered plus a "processing fee" is a classic advance-fee fraud.' },
  { from: '+91 81xxx xxx40', kind: 'number', text: 'SBI: Your YONO account will be blocked today. Update PAN now: https://sbi.co.in.kyc-verify.com/login', link: 'https://sbi.co.in.kyc-verify.com/login', brand: { name: 'SBI', official: 'sbi.co.in / onlinesbi.sbi' }, scam: true, why: 'The real domain is kyc-verify.com. "sbi.co.in" is just a subdomain prefix to fool you.' },
  { from: 'Mom', kind: 'contact', text: 'Call me when you are free. Bring milk on the way 🥛', scam: false, why: 'A saved contact with a normal request and nothing asked of your accounts.' },
  { from: 'VM-ICICIT', kind: 'header', text: 'Your ICICI Bank Credit Card statement is generated. Total due ₹3,420, due date 25-Oct. Pay via the iMobile app.', scam: false, why: 'Informational message from a registered header, with no link, pointing to the official app.' },
  { from: '+44 7xxx xxx812', kind: 'number', text: 'Hi Mum, I dropped my phone, this is my new number. Need ₹8,000 urgently for rent, please send now. Can’t call, mic broken.', scam: true, why: '"Hi Mum" impersonation: an unknown number, urgency, money, and avoiding a voice call that would expose the lie.' },
  { from: 'AD-AIRTEL', kind: 'header', text: 'Your Airtel bill of ₹599 is generated. Pay using the Airtel Thanks app or https://www.airtel.in/pay', link: 'https://www.airtel.in/pay', brand: { name: 'Airtel', official: 'airtel.in' }, scam: false, why: 'Registered header, and the link’s real domain is airtel.in, the official one.' },
];
const MULTI = ['gov.in', 'co.in', 'in.net', 'org.in', 'ac.in', 'net.in', 'co.uk', 'nic.in'];
function dissect(link) {
  try {
    const u = new URL(link);
    const labels = u.hostname.split('.');
    const last2 = labels.slice(-2).join('.');
    const n = MULTI.includes(last2) ? 3 : 2;
    const domain = labels.slice(-n).join('.');
    const sub = labels.slice(0, -n).join('.');
    return { protocol: u.protocol.replace(':', ''), sub, domain, path: u.pathname };
  } catch { return null; }
}
const URGENT = /(immediately|urgent(?:ly)?|today|tonight|blocked|disconnected|within \d+ hrs|won|congratulations|processing fee|now)/gi;

function highlight(text) {
  const parts = text.split(URGENT);
  return parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
}

function Smishing({ complete }) {
  const [sel, setSel] = useState(0);
  const [verdicts, setVerdicts] = useState({});
  const [checked, setChecked] = useState(false);
  const m = SMS[sel];
  const d = m.link ? dissect(m.link) : null;
  const all = SMS.every((_, i) => verdicts[i] !== undefined);
  const correct = SMS.filter((s, i) => verdicts[i] === s.scam).length;

  const choose = (i) => { setSel(i); sfx('click'); if (SMS[i].link) complete('inspect'); };
  const judge = (v) => { setVerdicts({ ...verdicts, [sel]: v }); setChecked(false); sfx('click'); const nxt = SMS.findIndex((_, i) => i > sel && verdicts[i] === undefined); if (nxt >= 0) setTimeout(() => choose(nxt), 250); };
  const check = () => { setChecked(true); const win = correct === SMS.length; sfx(win ? 'good' : 'bad'); if (win) complete('smish'); };

  return (
    <div className="sm-grid">
      <div className="phone sms-phone">
        <div className="phone-notch" />
        <div className="phone-top"><MessageSquare size={14} /> Messages <span className="phone-alerts">{Object.keys(verdicts).length}/{SMS.length}</span></div>
        <div className="sms-list">
          {SMS.map((s, i) => {
            const v = verdicts[i];
            const st = checked && v !== undefined ? (v === s.scam ? 'right' : 'wrong') : '';
            return (
              <button key={i} className={`sms-item ${sel === i ? 'sel' : ''} ${st}`} onClick={() => choose(i)}>
                <span className={`avatar ${s.kind}`}>{s.kind === 'contact' ? '❤' : s.kind === 'header' ? '🏢' : '#'}</span>
                <span className="sms-body"><strong>{s.from}</strong><small>{s.text}</small></span>
                {v !== undefined && <span className={`sms-tag ${v ? 'scam' : 'ok'}`}>{v ? 'SCAM' : 'OK'}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lab-card">
        <h3><Search size={18} /> Message inspector</h3>
        <div className="sms-open" key={sel}>
          <small className="hint">From</small>
          <div className="sender-row">
            <strong>{m.from}</strong>
            <span className={`tag ${m.kind}`}>{m.kind === 'header' ? 'Registered business header' : m.kind === 'contact' ? 'Saved contact' : 'Unknown phone number'}</span>
          </div>
          <p className="sms-text">{highlight(m.text)}</p>
          {d && (
            <div className="url-dissect">
              <small className="hint">Link dissection: the real owner is the registered domain</small>
              <code>
                <span className="u-proto">{d.protocol}://</span>
                {d.sub && <span className="u-sub">{d.sub}.</span>}
                <span className="u-dom">{d.domain}</span>
                <span className="u-path">{d.path}</span>
              </code>
              <div className="brand-check">
                <span>Claims to be: <b>{m.brand.name}</b></span>
                <span>Official: <b>{m.brand.official}</b></span>
                <span>Actual domain: <b className={m.brand.official.includes(d.domain) ? 'green' : 'red'}>{d.domain}</b></span>
              </div>
            </div>
          )}
          <div className="row-gap">
            <button className={`btn btn-sm ${verdicts[sel] === true ? 'btn-danger' : 'btn-ghost'}`} onClick={() => judge(true)}>🚩 Scam</button>
            <button className={`btn btn-sm ${verdicts[sel] === false ? 'btn-ok' : 'btn-ghost'}`} onClick={() => judge(false)}>✔ Legit</button>
          </div>
          {checked && verdicts[sel] !== undefined && <p className={`result ${verdicts[sel] === m.scam ? 'good' : 'bad'}`}>{m.why}</p>}
        </div>
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" disabled={!all} onClick={check}>Check all verdicts</button>
          {checked && <strong>{correct}/{SMS.length} correct</strong>}
        </div>
        <p className="hint"><mark>Highlighted</mark> words are pressure tactics. Legit Indian business SMS use registered headers like AX-XXXXXX.</p>
      </div>
    </div>
  );
}

/* ---------------- Café Wi-Fi ---------------- */
const NETS = [
  { id: 'legit', ssid: 'Brew&Bytes_Guest', secure: true, bars: 3, note: 'WPA2. The password is on the counter board.' },
  { id: 'twin', ssid: 'Brew&Bytes_Guest', secure: false, bars: 4, note: '' },
  { id: 'open', ssid: 'FREE_Public_WiFi', secure: false, bars: 2, note: '' },
];
const MODES = [
  { id: 'http', label: 'Old portal (http://)', icon: Unlock },
  { id: 'https', label: 'HTTPS site', icon: Lock },
  { id: 'vpn', label: 'HTTPS + VPN on', icon: ShieldCheck },
];

function sniff(net, mode) {
  if (mode === 'vpn') return { level: 'safe', lines: ['UDP 443 → vpn-gateway.example', '<encrypted tunnel: 1,284 bytes>', 'Can’t see which sites you visit or what you send.'] };
  if (mode === 'https') {
    return { level: 'mostly', lines: ['TLS ClientHello → SNI: results.college.example', '<encrypted application data>', 'Sees WHICH site, but not your username or password.', net === 'twin' ? '⚠ The rogue AP could show a fake certificate warning. Never click "proceed anyway".' : ''].filter(Boolean) };
  }
  if (net === 'legit') return { level: 'mostly', lines: ['802.11 frames encrypted with WPA2', 'Outsiders see scrambled radio traffic', 'But the café router, and anyone with the shared password in some setups, can still read HTTP. Use HTTPS anyway.'] };
  return { level: 'exposed', lines: ['POST /login HTTP/1.1', 'Host: results.college.example', 'username=riya.sharma&password=Exam@2024', net === 'twin' ? '⚠ Attacker controls this access point and can also MODIFY pages you receive.' : 'Anyone on this open network can capture this.'] };
}

function CafeWifi({ complete }) {
  const [net, setNet] = useState(null);
  const [mode, setMode] = useState('http');
  const [sent, setSent] = useState(false);
  const [anim, setAnim] = useState(0);
  const result = useMemo(() => (net && sent ? sniff(net, mode) : null), [net, mode, sent]);

  const send = () => {
    if (!net) return;
    setSent(true); setAnim((a) => a + 1); sfx('whoosh');
    const r = sniff(net, mode);
    setTimeout(() => sfx(r.level === 'exposed' ? 'alarm' : 'good'), 900);
    if (r.level === 'exposed') complete('see-plain');
    if (net === 'legit' && mode !== 'http') complete('safe-wifi');
  };

  return (
    <div className="wf-grid">
      <div className="lab-card">
        <h3><Wifi size={18} /> You’re at Brew & Bytes café</h3>
        <p className="hint">Pick a network. Look closely: two have the same name.</p>
        <div className="net-list">
          {NETS.map((n) => (
            <button key={n.id} className={`net ${net === n.id ? 'on' : ''}`} onClick={() => { setNet(n.id); setSent(false); sfx('click'); }}>
              <span className="bars">{[1, 2, 3, 4].map((b) => <i key={b} className={b <= n.bars ? 'on' : ''} />)}</span>
              <strong>{n.ssid}</strong>
              {n.secure ? <Lock size={14} /> : <span className="open-tag">Open</span>}
            </button>
          ))}
        </div>
        {net === 'twin' && sent && <p className="result bad">You joined an <b>evil twin</b>: same name, stronger signal, but no padlock. The real café network uses WPA2.</p>}
        {net === 'legit' && <p className="hint">{NETS[0].note}</p>}
        <p className="hint" style={{ marginTop: 8 }}>Now log in to the college results portal:</p>
        <div className="row-gap">
          {MODES.map((m) => (
            <button key={m.id} className={`chip ${mode === m.id ? 'on' : ''}`} onClick={() => { setMode(m.id); setSent(false); }}><m.icon size={13} /> {m.label}</button>
          ))}
        </div>
        <button className="btn btn-primary" disabled={!net} onClick={send}><Send size={15} /> Log in</button>
      </div>

      <div className="lab-card">
        <h3><Eye size={18} /> What the eavesdropper sees</h3>
        <div className={`wire ${result?.level || ''}`}>
          <span className="node"><Smartphone size={22} /><small>You</small></span>
          <span className="wire-line">{sent && <i key={anim} className={`pkt ${mode}`} />}</span>
          <span className="node">{net === 'twin' ? <Laptop size={22} /> : <Wifi size={22} />}<small>{net === 'twin' ? 'Attacker AP' : 'Access point'}</small></span>
          <span className="wire-line">{sent && <i key={`b${anim}`} className={`pkt ${mode} late`} />}</span>
          <span className="node"><Globe size={22} /><small>Website</small></span>
        </div>
        <div className="sniffer">
          <div className="win-bar dark"><Laptop size={14} /> packet-capture: {net ? (net === 'twin' ? 'rogue AP' : 'same network') : 'idle'}</div>
          <div className="term">
            {!result && <div className="dim">{net ? 'Press "Log in" to send traffic…' : 'Join a network first…'}</div>}
            {result && result.lines.map((l, i) => <div key={l} className={result.level === 'exposed' && i === 2 ? 'red' : result.level === 'safe' ? 'info' : ''} style={{ animationDelay: `${0.9 + i * 0.25}s` }}>{l}</div>)}
          </div>
        </div>
        {result && (
          <p className={`result ${result.level === 'exposed' ? 'bad' : 'good'}`}>
            {result.level === 'exposed' ? <><WifiOff size={14} /> Your password crossed the network in plain text.</> : result.level === 'safe' ? 'Fully tunnelled. The network learns nothing useful.' : 'Content is encrypted. Good! A VPN would also hide which site you visited.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MobileAttackLab() {
  const { complete } = useMission('u3-attacks');
  const [tab, setTab] = useState('sms');
  return (
    <div>
      <div className="seg">
        <button className={tab === 'sms' ? 'active' : ''} onClick={() => setTab('sms')}><MessageSquare size={15} /> Smishing inbox</button>
        <button className={tab === 'wifi' ? 'active' : ''} onClick={() => setTab('wifi')}><Wifi size={15} /> Café Wi-Fi</button>
      </div>
      {tab === 'sms' ? <Smishing complete={complete} /> : <CafeWifi complete={complete} />}
    </div>
  );
}
