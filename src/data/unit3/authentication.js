import { Fingerprint } from 'lucide-react';

export default {
  slug: 'authentication-security',
  number: 4,
  title: 'Authentication Service Security',
  icon: Fingerprint,
  color: '#34d399',
  difficulty: 'Advanced',
  summary: 'Passwords, biometrics, OTPs, MFA, passkeys and secure sessions.',
  tagline: 'Proving who you are, without handing attackers the keys.',
  keywords: ['authentication', 'mfa', 'otp', 'totp', 'biometric', 'passkey', 'fido2', 'session', 'jwt', 'oauth'],
  intro: [
    'Authentication is how a system verifies that you are who you claim to be. On mobile, it protects banking apps, email, UPI and corporate access. It is also the most attacked layer, through phishing, credential stuffing and SIM swapping.',
    'Strong authentication combines factors (something you know, have and are), resists phishing, and keeps the session secure after login. Modern passkeys go further and remove passwords altogether.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Identification → Authentication → Authorization', text: 'Claiming an identity → proving it → deciding what you may access.' },
      { term: 'Authentication factors', text: 'Knowledge (password/PIN), possession (phone/key), inherence (fingerprint/face).' },
      { term: 'Session', text: 'The logged-in state after authentication, usually kept with a token or cookie.' },
    ],
  },
  compare: {
    title: 'OTP via SMS vs Authenticator App',
    left: { title: 'SMS OTP', subtitle: 'Sent by the network', points: ['Easy, works on any phone', 'Can be stolen through SIM swap', 'Readable from lock-screen previews', 'Can be phished in real time'] },
    right: { title: 'Authenticator app (TOTP)', subtitle: 'Generated on your device', points: ['Codes computed offline from a shared secret', 'Immune to SIM swap', 'Changes every 30 seconds', 'Still phishable, so passkeys are stronger'] },
  },
  flow: {
    title: 'Authentication Workflow',
    steps: [
      { title: 'Identify', text: 'User enters a username or chooses an account on the device.' },
      { title: 'Challenge', text: 'Server asks for proof: password, OTP, biometric or passkey signature.' },
      { title: 'Verify', text: 'An identity provider checks the proof and the risk signals.' },
      { title: 'Session', text: 'A short-lived token is issued and access is granted per role.' },
    ],
  },
  table: {
    title: 'Authentication Methods Compared',
    columns: ['Method', 'Security benefit', 'Limitation', 'Phishing resistance'],
    rows: [
      ['Password / PIN', 'Simple, universal', 'Reused, guessed, phished', 'None'],
      ['SMS OTP', 'Adds a possession factor', 'SIM swap, interception', 'Low'],
      ['Authenticator app (TOTP)', 'Offline codes, no SIM risk', 'Codes can be relayed by phishing sites', 'Low–Medium'],
      ['Push + number matching', 'Stops accidental approvals', 'Push fatigue if no matching', 'Medium'],
      ['Biometrics (on device)', 'Convenient, hard to share', 'Unlocks local keys only, can’t be changed if leaked', 'High (when unlocking a passkey)'],
      ['Passkeys / FIDO2', 'Public-key cryptography, bound to the real domain', 'Device/ecosystem dependency', 'Excellent'],
    ],
  },
  cards: {
    title: 'Authentication Building Blocks',
    items: [
      { title: 'Passwords & PINs', text: 'Knowledge factor: weakest alone, but still common.' },
      { title: 'Biometrics', text: 'Fingerprint and face, matched locally in secure hardware.' },
      { title: 'OTP (HOTP/TOTP)', text: 'One-time codes from SMS or authenticator apps.' },
      { title: 'MFA', text: 'Two or more different factor types combined.' },
      { title: 'Passkeys', text: 'Passwordless login with a device-held private key.' },
      { title: 'Sessions & Tokens', text: 'Cookies, JWTs and OAuth tokens that keep you logged in.' },
    ],
  },
  lists: [
    { title: 'Threats to Authentication', tone: 'warn', items: ['Phishing pages capturing passwords and OTPs', 'Credential stuffing with leaked passwords', 'SIM swapping to receive SMS OTPs', 'MFA fatigue (spamming push prompts)', 'Session / token theft'] },
    { title: 'Secure Authentication Design', tone: 'good', items: ['Prefer passkeys, or authenticator apps over SMS', 'Rate limiting and lockouts', 'Short session lifetimes, re-auth for sensitive actions', 'HttpOnly + Secure + SameSite cookies', 'Secure account recovery (no guessable security questions)'] },
  ],
  lab: {
    key: 'u3-auth',
    title: 'Mission: Authentication Lab',
    description: 'A real security lab. Generate a TOTP secret and pair it with Google or Microsoft Authenticator on your phone. Design a login that survives five real-world attacks, then forge a JWT and watch the signature check catch you.',
    badge: { name: 'Identity Guardian', emoji: '🔑' },
    objectives: [
      { id: 'totp', label: 'Verify a live TOTP code', xp: 40 },
      { id: 'phish-sms', label: 'See a phishing attack beat password + SMS OTP', xp: 20 },
      { id: 'all-blocked', label: 'Design a login that blocks all five attacks', xp: 40 },
      { id: 'jwt', label: 'Tamper with a JWT and get caught by signature verification', xp: 30 },
    ],
  },
  quiz: [
    { q: 'Which three categories do authentication factors fall into?', options: ['Fast, slow, medium', 'Something you know, have and are', 'Email, SMS, call', 'Admin, user, guest'], answer: 1, explain: 'Knowledge, possession and inherence. MFA combines different categories.' },
    { q: 'Why are passkeys phishing-resistant?', options: ['They are long passwords', 'The private key only signs for the real website’s domain and never leaves the device', 'They use SMS', 'They change every day'], answer: 1, explain: 'A fake domain can’t get a valid signature, even if the user is fooled.' },
    { q: 'What is the main weakness of SMS OTP?', options: ['It is too slow', 'It can be intercepted, e.g. through SIM swapping', 'It needs internet', 'It is too long'], answer: 1, explain: 'Whoever controls your number receives your OTPs.' },
    { q: 'What is the difference between authentication and authorization?', options: ['They are the same', 'Authentication proves identity, while authorization decides what you can access', 'Authorization comes first', 'Authentication is only for admins'], answer: 1, explain: 'First "who are you", then "what are you allowed to do".' },
    { q: 'Which cookie flag stops JavaScript from reading a session cookie?', options: ['Secure', 'HttpOnly', 'Expires', 'Path'], answer: 1, explain: 'HttpOnly protects session cookies from theft through injected scripts.' },
  ],
  deep: {
    sections: [
      { title: 'How TOTP works (RFC 6238)', points: ['You and the server share a secret key, usually scanned as a QR code.', 'Both sides compute: counter = floor(current Unix time ÷ 30).', 'HMAC-SHA1(secret, counter) produces a 20-byte value.', 'Dynamic truncation picks 4 bytes, which are reduced mod 10⁶ to give a 6-digit code.', 'Because both sides know the time and the secret, codes match without any network message. Try it in the lab.'] },
      { title: 'Biometrics: how they’re protected', points: ['Fingerprint and face templates are stored as mathematical data in the TEE or Secure Enclave, not as images.', 'Matching happens on the device. The server never receives your fingerprint.', 'FAR (false accept rate) vs FRR (false reject rate): a security vs convenience trade-off. Apple quotes about 1 in 50,000 for Touch ID and 1 in 1,000,000 for Face ID.', 'Biometrics can’t be changed if leaked, which is why they unlock local keys rather than acting as passwords.'] },
      { title: 'Passkeys and FIDO2 / WebAuthn', points: ['At registration the device creates a key pair. The public key goes to the website and the private key stays on the device.', 'At login the website sends a challenge, and the device signs it after a biometric or PIN check.', 'The signature is bound to the website’s origin, so a phishing domain gets nothing usable.', 'Supported by Apple, Google and Microsoft since 2022, and syncable through their password managers.'] },
      { title: 'Sessions, tokens and OAuth', points: ['After login, a session ID cookie or token (often a JWT) proves you are logged in.', 'JWT = header.payload.signature. The signature (e.g. HMAC-SHA256) detects tampering.', 'OAuth 2.0 delegates access ("Sign in with Google"), and OpenID Connect adds identity on top.', 'Good practice: short expiry, refresh-token rotation, revocation on logout or password change, and binding sessions to the device.'] },
    ],
    cases: [
      { year: '2012', title: 'Twitter / big-tech MFA push', text: 'After high-profile account hijacks, major platforms rolled out two-step verification widely.' },
      { year: '2019', title: 'SIM-swap of a tech CEO', text: 'A social-media CEO’s account was hijacked after attackers ported his phone number, which drove the move away from SMS-based 2FA.' },
      { year: '2022', title: 'MFA-fatigue breaches', text: 'Attackers spammed push prompts until employees approved one, which led to number matching in authenticator apps.' },
      { year: '2022', title: 'Passkeys launched', text: 'Apple, Google and Microsoft committed to FIDO passkeys, beginning the move to passwordless login.' },
    ],
    myths: [
      { myth: 'Any 2FA makes my account unhackable.', fact: 'SMS and TOTP codes can still be phished in real time. Passkeys and security keys resist this.' },
      { myth: 'My fingerprint is sent to the bank when I log in.', fact: 'Matching happens on the device. Only a yes/no or a cryptographic signature leaves it.' },
      { myth: 'Logging out isn’t important on mobile apps.', fact: 'Long-lived sessions on lost devices are a common account-takeover path.' },
    ],
    law: [
      { title: 'IT Act Sec 66C', text: 'Fraudulent use of another person’s password, OTP or electronic signature is identity theft: up to 3 years and a fine.' },
      { title: 'IT Act Sec 66D', text: 'Cheating by personation using a computer resource, e.g. posing as a bank to collect OTPs.' },
      { title: 'RBI Additional Factor of Authentication', text: 'Indian card and digital payments require an additional factor (OTP/PIN/biometric) for most transactions.' },
    ],
    examNotes: [
      'Identification → Authentication → Authorization → Session.',
      'Factors: know (password/PIN), have (phone/token), are (biometric).',
      'OTP: HOTP (counter-based), TOTP (time-based, 30 s). SMS OTP is weak to SIM swap.',
      'MFA combines different factor types. Passkeys (FIDO2) are phishing-resistant.',
      'Session security: short expiry, HttpOnly/Secure/SameSite cookies, revocation.',
      'Threats: phishing, credential stuffing, SIM swap, MFA fatigue, session hijack.',
    ],
    extraQuiz: [
      { q: 'How often does a standard TOTP code change?', options: ['Every second', 'Every 30 seconds', 'Every day', 'Never'], answer: 1, explain: 'RFC 6238 commonly uses a 30-second time step.' },
      { q: 'What does a JWT signature protect against?', options: ['Slow networks', 'Tampering with the token’s contents', 'Phishing emails', 'Lost phones'], answer: 1, explain: 'Changing the payload invalidates the signature unless you know the secret key.' },
      { q: 'What is "MFA fatigue"?', options: ['Users forgetting passwords', 'Attackers spamming push prompts until the user approves one', 'Slow biometric scanners', 'Too many passkeys'], answer: 1, explain: 'Number matching and rate limits defeat it.' },
    ],
  },
};
