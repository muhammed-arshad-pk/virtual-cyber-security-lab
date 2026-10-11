import { Siren } from 'lucide-react';

export default {
  slug: 'attacks-on-mobiles',
  number: 5,
  title: 'Attacks on Mobiles and Cellphones',
  icon: Siren,
  color: '#fb923c',
  difficulty: 'Advanced',
  summary: 'Smishing, malicious apps, SIM swap, Bluetooth and Wi-Fi threats, and mobile malware.',
  tagline: 'Recognize the attack before it reaches your bank account.',
  keywords: ['smishing', 'sim swap', 'bluetooth', 'bluejacking', 'bluesnarfing', 'mitm', 'evil twin', 'mobile malware', 'ransomware'],
  intro: [
    'Attackers target phones because that’s where money, identity and OTPs live. Most mobile attacks begin with social engineering, such as a convincing SMS or a fake app, rather than advanced hacking.',
    'Knowing the warning signs of each attack type (smishing, malicious apps, SIM swap, Bluetooth abuse, rogue Wi-Fi and mobile malware) is the most effective defense.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Smishing', text: 'SMS phishing: text messages that trick you into clicking links, calling numbers or sharing OTPs.' },
      { term: 'SIM swap', text: 'A fraudster convinces the operator to move your number to their SIM, so they get your calls and OTPs.' },
      { term: 'Man-in-the-middle (MITM)', text: 'An attacker secretly positions themselves between you and the website to read or alter traffic.' },
    ],
  },
  compare: {
    title: 'Bluetooth Attack Types (Classic)',
    left: { title: 'Bluejacking', subtitle: 'Nuisance', points: ['Sending unsolicited messages to nearby discoverable phones', 'Doesn’t steal data by itself', 'Often used to lure victims into pairing'] },
    right: { title: 'Bluesnarfing / Bluebugging', subtitle: 'Serious', points: ['Snarfing: unauthorised access to contacts, messages, files', 'Bugging: taking control to make calls or send SMS', 'Exploits old or unpatched Bluetooth stacks'] },
  },
  flow: {
    title: 'How Mobile Attacks Reach Their Targets',
    steps: [
      { title: 'Attack vector', text: 'A rogue link, fake app, Wi-Fi hotspot or phone call.' },
      { title: 'Security weakness', text: 'Unpatched OS, sideloading, curious or rushed user.' },
      { title: 'Compromise', text: 'Credentials, OTPs or device control are captured.' },
      { title: 'Impact', text: 'Account takeover, money theft, spying or ransom.' },
    ],
  },
  table: {
    title: 'Technical Comparison',
    columns: ['Attack', 'Common weakness', 'Possible impact', 'Mitigation'],
    rows: [
      ['Smishing', 'Urgency, fake links, small screens', 'Credential and OTP theft', 'Check sender & domain, never click, use official apps'],
      ['Malicious apps / spyware', 'Sideloading unverified APKs', 'Espionage, SMS/OTP theft', 'Official stores, permission review, Play Protect'],
      ['SIM swap', 'Weak operator identity checks', 'Account takeover, 2FA bypass', 'Non-SMS MFA, operator PIN, act on sudden "No service"'],
      ['Public Wi-Fi MITM / evil twin', 'Open networks, ignored warnings', 'Intercepted or modified traffic', 'Avoid open Wi-Fi, HTTPS only, VPN'],
      ['Bluetooth attacks', 'Discoverable mode, unpatched stack', 'Data theft, device control', 'Bluetooth off when unused, non-discoverable, update'],
      ['Mobile ransomware', 'Malicious app with admin rights', 'Locked device or files', 'Backups, official apps, no device-admin to unknown apps'],
    ],
  },
  cards: {
    title: 'Mobile Attack Vectors',
    items: [
      { title: 'Smishing & Vishing', text: 'Fake bank, courier, electricity-bill and KYC messages or calls.' },
      { title: 'Malicious Apps', text: 'Fake loan apps, "mod" games, screen-sharing tools abused by scammers.' },
      { title: 'SIM Swap / Cloning', text: 'Hijacking your number to receive OTPs.' },
      { title: 'Wireless Threats', text: 'Evil-twin Wi-Fi, rogue hotspots, Bluetooth abuse.' },
      { title: 'OS Exploits', text: 'Flaws in unpatched OS components, sometimes zero-click.' },
      { title: 'Mobile Malware', text: 'Banking trojans, spyware and ransomware for phones.' },
    ],
  },
  lists: [
    { title: 'Warning Signs', tone: 'warn', items: ['SMS with urgency + link ("account blocked today")', 'Sudden "No service" on your SIM', 'OTPs you didn’t request', 'Apps asking for Accessibility or SMS access', 'Battery and data drain, unknown device-admin apps'] },
    { title: 'Prevention', tone: 'good', items: ['Never share OTP / PIN, since banks never ask', 'Install apps only from official stores', 'Use app-based MFA or passkeys', 'Turn off Bluetooth and auto-join Wi-Fi when not needed', 'Keep OS and apps updated'] },
    { title: 'Response', tone: 'info', items: ['Call 1930 / cybercrime.gov.in immediately for money fraud', 'Contact your bank to freeze cards and UPI', 'Contact your operator if your SIM stops working', 'Report fraud SMS/calls on Chakshu (Sanchar Saathi)', 'Scan and remove suspicious apps, reset if needed'] },
  ],
  caseStudy: {
    title: 'Case Study: The Parcel That Never Was',
    text: 'Arjun receives an SMS: "Your parcel is held due to an incomplete address. Update within 12 hrs." The link opens a page that looks like India Post and asks for a ₹25 "redelivery fee" by card. It then asks for the OTP "to confirm". Minutes later, ₹48,000 is debited. The domain was "indiapost-redelivery.top", not the official indiapost.gov.in. Arjun calls 1930 within the hour, which improves the chance of the amount being frozen.',
  },
  lab: {
    key: 'u3-attacks',
    title: 'Mission: Mobile Threat Analyst',
    description: 'Inspect a real-looking SMS inbox: check sender headers and dissect every link’s true domain before you judge it. Then sit in a café, pick a Wi-Fi network and see exactly what an eavesdropper can read.',
    badge: { name: 'Smish Spotter', emoji: '📵' },
    objectives: [
      { id: 'inspect', label: 'Dissect a link with the domain inspector', xp: 15 },
      { id: 'smish', label: 'Classify every SMS correctly', xp: 45 },
      { id: 'see-plain', label: 'See what an eavesdropper reads on an insecure connection', xp: 20 },
      { id: 'safe-wifi', label: 'Join the real network and protect your traffic', xp: 30 },
    ],
  },
  quiz: [
    { q: 'What is smishing?', options: ['Phishing through SMS / text messages', 'A Bluetooth attack', 'A type of SIM card', 'A firewall'], answer: 0, explain: 'SMS + phishing = smishing.' },
    { q: 'Your phone suddenly shows "No service" for hours and you get unexpected OTP emails. What may be happening?', options: ['Normal network maintenance only', 'A possible SIM swap. Contact your operator and bank immediately', 'Your battery is low', 'An app update'], answer: 1, explain: 'Losing service unexpectedly is a key SIM-swap warning sign.' },
    { q: 'Which domain is the real India Post site?', options: ['indiapost-redelivery.top', 'indiapost.gov.in', 'india-post.help', 'indiapost.in.net'], answer: 1, explain: 'Look at the registrable domain. Government sites in India end in .gov.in.' },
    { q: 'What is bluesnarfing?', options: ['Sending funny messages over Bluetooth', 'Unauthorised access to data on a device via Bluetooth', 'Charging a phone wirelessly', 'A Wi-Fi standard'], answer: 1, explain: 'Snarfing steals contacts, messages or files over Bluetooth.' },
    { q: 'What best protects your traffic on public Wi-Fi?', options: ['Turning up the brightness', 'HTTPS everywhere plus a trusted VPN', 'Using an older browser', 'Disabling the screen lock'], answer: 1, explain: 'Encryption keeps your data unreadable to anyone on the same network.' },
  ],
  deep: {
    sections: [
      { title: 'Anatomy of a smishing message', points: ['Sender: legitimate Indian business SMS use registered headers (e.g. AX-XXXXXX). Scams often come from ordinary 10-digit numbers.', 'Urgency and fear: "blocked today", "disconnected at 9:30 pm", "parcel returned".', 'A link whose real domain doesn’t belong to the brand (look at the part just before the first single slash).', 'A request to call a personal mobile number, install an app, or share an OTP or PIN.', 'Rewards that are too good to be true: lottery, refund, cashback.'] },
      { title: 'SIM swap: warning signs and defences', points: ['The attacker gathers your personal data (phishing, leaks), then requests a replacement SIM from the operator.', 'Warning signs: sudden loss of network, "SIM changed" messages, unknown OTP or login alerts.', 'In India, SMS services are blocked for 24 hours after a SIM replacement, a safeguard against OTP theft.', 'Defence: app-based MFA or passkeys for banking and email, don’t publish your number, and act immediately on "No service".'] },
      { title: 'Rogue Wi-Fi and man-in-the-middle', points: ['Evil twin: a fake hotspot copies a real network name, often with a stronger signal.', 'On open networks, unencrypted (HTTP) traffic can be read by others on the same network.', 'HTTPS encrypts content. The network still sees which site you visit, but not what you send.', 'A VPN creates an encrypted tunnel, so the local network sees only that you use a VPN.', 'Never ignore certificate warnings. They often signal interception.'] },
      { title: 'Mobile malware families', points: ['Banking trojans overlay fake login screens on real banking apps and steal SMS OTPs (e.g. SOVA, Anatsa).', 'Spyware records calls, location and messages (from stalkerware to Pegasus).', 'Ransomware locks the screen or encrypts files and demands payment.', 'Most need you to sideload an app and grant Accessibility or SMS permissions. Deny these.', 'CERT-In issues advisories on active Android malware, such as SOVA (2022) and Daam (2023).'] },
    ],
    cases: [
      { year: '2017', title: 'BlueBorne', text: 'A set of Bluetooth flaws let attackers take over unpatched devices without pairing. Patches and switching Bluetooth off were the fixes.' },
      { year: '2021', title: 'FluBot', text: 'Android banking malware spread across Europe through fake "missed delivery" SMS. Police dismantled its infrastructure in 2022.' },
      { year: '2022', title: 'SOVA advisory (India)', text: 'CERT-In warned about the SOVA Android banking trojan targeting Indian bank customers through fake apps spread by SMS.' },
      { year: '2023', title: 'Chakshu launched', text: 'DoT launched Chakshu on Sanchar Saathi for citizens to report suspected fraud calls, SMS and WhatsApp messages.' },
    ],
    myths: [
      { myth: 'A message from a bank-looking header is always genuine.', fact: 'Treat links with suspicion anyway, and open your bank’s app directly instead.' },
      { myth: 'Android malware only comes from shady websites.', fact: 'Malicious apps have repeatedly slipped into official stores, so check developer, reviews and permissions.' },
      { myth: 'HTTPS means the website is safe.', fact: 'HTTPS means the connection is encrypted. Phishing sites can have HTTPS too, so check the domain.' },
    ],
    law: [
      { title: 'IT Act Sec 66C / 66D', text: 'Identity theft (using someone’s OTP or credentials) and cheating by personation (posing as a bank or courier).' },
      { title: 'IT Act Sec 43 & 66', text: 'Installing malware, gaining unauthorised access or stealing data from a phone.' },
      { title: 'Telecommunications Act, 2023', text: 'Makes obtaining a SIM by fraud or impersonation an offence, and strengthens subscriber verification.' },
      { title: 'Report', text: '1930 (financial fraud) · cybercrime.gov.in · Chakshu on sancharsaathi.gov.in for fraud SMS and calls.' },
    ],
    examNotes: [
      'Mobile attack vectors: smishing/vishing, malicious apps, SIM swap/cloning, Bluetooth, Wi-Fi MITM, OS exploits, malware.',
      'Bluetooth: bluejacking (messages), bluesnarfing (data theft), bluebugging (control).',
      'SIM swap signs: sudden no service, unknown OTPs. Defence: non-SMS MFA.',
      'Public Wi-Fi: evil twin and MITM. Defence: HTTPS, VPN, no auto-join.',
      'Malware: banking trojans, spyware, ransomware. Usually sideloaded.',
      'Response: 1930, bank freeze, operator, Chakshu, remove apps / reset.',
    ],
    extraQuiz: [
      { q: 'In "https://sbi-kyc-update.in.net/login", what is the real registered domain?', options: ['sbi', 'sbi-kyc-update.in.net', 'login', 'https'], answer: 1, explain: 'The brand name appearing in a subdomain or prefix means nothing. Read the domain carefully.' },
      { q: 'What is an evil-twin hotspot?', options: ['Two routers from the same company', 'A fake Wi-Fi network copying a legitimate network name', 'A 5G tower', 'A VPN server'], answer: 1, explain: 'Victims join it thinking it is the real network.' },
      { q: 'Which permission request should make you most suspicious of a utility app?', options: ['Storage', 'Accessibility service + read SMS', 'Vibration', 'Internet'], answer: 1, explain: 'Banking trojans need these to read screens and steal OTPs.' },
    ],
  },
};
