import { useEffect, useMemo, useState } from 'react';
import { KeyRound, Hash, PenTool, ShieldCheck, ShieldX, BadgeCheck, RotateCcw } from 'lucide-react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

/* Real Web Crypto: RSASSA-PKCS1-v1_5 with SHA-256, 2048-bit keys, the same family used by most DSCs. */
const ALG = { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' };
const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const sha256 = async (text) => hex(await crypto.subtle.digest('SHA-256', enc.encode(text)));
const fingerprint = async (key) => hex(await crypto.subtle.digest('SHA-256', await crypto.subtle.exportKey('spki', key))).slice(0, 32);

const DOC = 'PURCHASE ORDER #4521\nSupplier: Shakti Electronics Pvt Ltd\nItem: 500 x Network Switches\nUnit price: ₹1,200\nTotal: ₹6,00,000\nApproved by: Riya Sharma, Procurement Head';

function SignVerify({ complete }) {
  const [doc, setDoc] = useState(DOC);
  const [docHash, setDocHash] = useState('');
  const [riya, setRiya] = useState(null);
  const [mallory, setMallory] = useState(null);
  const [fp, setFp] = useState({});
  const [sig, setSig] = useState(null);
  const [verifier, setVerifier] = useState('riya');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState('');

  useEffect(() => { let alive = true; sha256(doc).then((h) => alive && setDocHash(h)); setResult(null); return () => { alive = false; }; }, [doc]);

  const genKeys = async () => {
    setBusy('Generating 2048-bit RSA key pairs…'); sfx('whoosh');
    const [a, b] = await Promise.all([crypto.subtle.generateKey(ALG, true, ['sign', 'verify']), crypto.subtle.generateKey(ALG, true, ['sign', 'verify'])]);
    setRiya(a); setMallory(b); setSig(null); setResult(null);
    setFp({ riya: await fingerprint(a.publicKey), mallory: await fingerprint(b.publicKey) });
    setBusy(''); sfx('good');
  };

  const sign = async () => {
    const s = await crypto.subtle.sign(ALG.name, riya.privateKey, enc.encode(doc));
    setSig({ value: b64(s), raw: s, hashAtSigning: docHash });
    setResult(null); sfx('coin'); complete('sign');
  };

  const verify = async () => {
    const key = verifier === 'riya' ? riya.publicKey : mallory.publicKey;
    const ok = await crypto.subtle.verify(ALG.name, key, sig.raw, enc.encode(doc));
    const changed = docHash !== sig.hashAtSigning;
    setResult({ ok, changed, wrongKey: verifier !== 'riya' });
    sfx(ok ? 'good' : 'alarm');
    if (ok) complete('verify'); else complete('tamper');
  };

  const step = !riya ? 1 : !sig ? 2 : 3;

  return (
    <div className="sig-lab">
      <div className="sig-pipeline">
        {['Generate keys', 'Hash document', 'Sign (private key)', 'Verify (public key)'].map((s, i) => (
          <span key={s} className={`sig-step ${step > i + 1 || (i === 1 && riya) ? 'done' : ''} ${step === i + 1 ? 'now' : ''}`}><b>{i + 1}</b> {s}</span>
        ))}
      </div>
      <div className="sig-grid">
        <div className="lab-card">
          <h3><KeyRound size={18} /> 1. Key pairs</h3>
          {!riya ? (
            <button className="btn btn-primary btn-sm" onClick={genKeys} disabled={!!busy}>{busy || 'Generate RSA-2048 key pairs'}</button>
          ) : (
            <div className="keys">
              <div className="key good"><strong>Riya (signer)</strong><small>Public key fingerprint (SHA-256)</small><code>{fp.riya}</code><small>🔒 Private key stays in this browser tab, never shown</small></div>
              <div className="key bad"><strong>Mallory (impostor)</strong><small>Public key fingerprint</small><code>{fp.mallory}</code></div>
              <button className="btn btn-ghost btn-sm" onClick={genKeys}><RotateCcw size={14} /> New keys</button>
            </div>
          )}
        </div>

        <div className="lab-card">
          <h3><Hash size={18} /> 2. The document & its SHA-256 hash</h3>
          <textarea className="dark-input sig-doc" rows={7} value={doc} onChange={(e) => setDoc(e.target.value)} spellCheck={false} />
          <code className="hash small">{docHash}</code>
          {sig && docHash !== sig.hashAtSigning && <p className="result bad">⚠ The document changed after signing, so its hash no longer matches.</p>}
          <div className="row-gap">
            <button className="btn btn-primary btn-sm" onClick={sign} disabled={!riya}><PenTool size={14} /> Sign as Riya</button>
            <button className="chip" onClick={() => setDoc(DOC)}>Reset text</button>
            {sig && <button className="chip" onClick={() => { setDoc(doc.replace('₹1,200', '₹1,800').replace('₹6,00,000', '₹9,00,000')); sfx('click'); }}>✏️ Tamper: change the price</button>}
          </div>
        </div>

        <div className="lab-card">
          <h3><ShieldCheck size={18} /> 3. Signature & verification</h3>
          {sig ? <code className="hash small sig-val">{sig.value.slice(0, 120)}…</code> : <p className="hint">Sign the document first.</p>}
          <small className="hint">Verify using whose public key?</small>
          <div className="row-gap">
            <button className={`chip ${verifier === 'riya' ? 'on' : ''}`} onClick={() => { setVerifier('riya'); setResult(null); }}>Riya’s public key</button>
            <button className={`chip ${verifier === 'mallory' ? 'on' : ''}`} onClick={() => { setVerifier('mallory'); setResult(null); }}>Mallory’s public key</button>
          </div>
          <button className="btn btn-primary btn-sm" onClick={verify} disabled={!sig}>Verify signature</button>
          {result && (
            <div className={`verdict ${result.ok ? 'ok' : 'bad'}`}>
              {result.ok ? <ShieldCheck size={30} /> : <ShieldX size={30} />}
              <div>
                <strong>{result.ok ? 'SIGNATURE VALID' : 'SIGNATURE INVALID'}</strong>
                <small>{result.ok ? 'Authentic (signed by Riya’s private key) and unaltered since signing.' : result.wrongKey ? 'This public key doesn’t match the private key that signed, so the signer isn’t who you think.' : 'The document was altered after signing, so integrity is broken.'}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const day = 86400000;
const fmt = (t) => new Date(t).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function Certificates({ complete }) {
  const now = Date.now();
  const CERTS = useMemo(() => [
    { id: 1, subject: 'Riya Sharma', issuer: 'eMudhra Sub-CA', chain: 'Root CA of India → eMudhra CA → Riya Sharma', from: now - 200 * day, to: now + 530 * day, revoked: false, valid: true, why: 'Chains to the Root CA of India, is within validity dates and is not revoked.' },
    { id: 2, subject: 'Arjun Mehta', issuer: '(n)Code Solutions CA', chain: 'Root CA of India → (n)Code CA → Arjun Mehta', from: now - 900 * day, to: now - 35 * day, revoked: false, valid: false, why: 'Expired: the validity period ended. Signatures made now can’t be trusted.' },
    { id: 3, subject: 'Payments Dept', issuer: 'FreeCA Online', chain: 'FreeCA Online (self-signed) → Payments Dept', from: now - 30 * day, to: now + 300 * day, revoked: false, valid: false, why: 'The issuer is not a CA licensed by the CCA and doesn’t chain to the Root CA of India.' },
    { id: 4, subject: 'Vendor Accounts', issuer: 'IDRBT CA', chain: 'Root CA of India → IDRBT CA → Vendor Accounts', from: now - 100 * day, to: now + 600 * day, revoked: true, valid: false, why: 'Listed in the CA’s revocation list (CRL), perhaps because the token was reported lost.' },
  ], [now]);
  const [ans, setAns] = useState({});
  const set = (id, v) => {
    const n = { ...ans, [id]: v }; setAns(n);
    const c = CERTS.find((x) => x.id === id);
    sfx(v === c.valid ? 'good' : 'bad');
    if (CERTS.every((x) => n[x.id] === x.valid)) complete('cert');
  };
  return (
    <div className="cert-grid">
      {CERTS.map((c) => (
        <div key={c.id} className={`cert ${ans[c.id] === undefined ? '' : ans[c.id] === c.valid ? 'right' : 'wrong'}`}>
          <div className="cert-head"><BadgeCheck size={18} /> X.509 Certificate</div>
          <dl>
            <dt>Subject</dt><dd>{c.subject}</dd>
            <dt>Issuer</dt><dd>{c.issuer}</dd>
            <dt>Valid from</dt><dd>{fmt(c.from)}</dd>
            <dt>Valid to</dt><dd>{fmt(c.to)}</dd>
            <dt>CRL status</dt><dd>{c.revoked ? 'Listed (revoked)' : 'Not listed'}</dd>
          </dl>
          <small className="chain">{c.chain}</small>
          <div className="row-gap">
            <button className={`chip ${ans[c.id] === true ? 'on ok' : ''}`} onClick={() => set(c.id, true)}>Trust</button>
            <button className={`chip ${ans[c.id] === false ? 'on bad' : ''}`} onClick={() => set(c.id, false)}>Reject</button>
          </div>
          {ans[c.id] !== undefined && <small className="cert-why">{ans[c.id] === c.valid ? '✔ ' : '✘ '}{c.why}</small>}
        </div>
      ))}
    </div>
  );
}

export default function SignatureLab() {
  const { complete } = useMission('u5-dsig');
  const [tab, setTab] = useState('sign');
  if (!window.crypto?.subtle) return <p className="result bad">This lab needs a secure context: open it via localhost or https.</p>;
  return (
    <div>
      <div className="seg">
        <button className={tab === 'sign' ? 'active' : ''} onClick={() => setTab('sign')}>Sign & verify</button>
        <button className={tab === 'cert' ? 'active' : ''} onClick={() => setTab('cert')}>Certificate inspector</button>
      </div>
      {tab === 'sign' ? <SignVerify complete={complete} /> : <Certificates complete={complete} />}
    </div>
  );
}
