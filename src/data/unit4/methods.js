import { MailWarning } from 'lucide-react';

// Content supplied by the course author (Methods of Phishing notes).
export default {
  slug: 'methods-of-phishing',
  number: 2,
  title: 'Methods of Phishing',
  icon: MailWarning,
  color: '#22d3ee',
  difficulty: 'Intermediate',
  summary: 'Email, website/URL, SMS, voice and social-media phishing, plus domain spoofing.',
  tagline: 'Stop, inspect, and verify before you click, reply, call back, or share information.',
  keywords: ['phishing', 'email phishing', 'url', 'smishing', 'vishing', 'social media', 'domain spoofing', 'social engineering'],
  intro: [
    'Phishing is a type of cyberattack in which attackers pretend to be trustworthy individuals, companies, or organizations to trick people into revealing sensitive information such as usernames, passwords, bank details, OTPs and other personal data.',
    'Phishing commonly uses fake emails, text messages, websites, phone calls and social media accounts. It mainly relies on social engineering, which manipulates human emotions such as fear, curiosity, urgency or trust.',
  ],
  definitions: {
    title: 'Objectives of Phishing Attacks',
    items: [
      { term: 'Steal credentials', text: 'Usernames, passwords, and banking or payment information.' },
      { term: 'Gain access & collect PII', text: 'Unauthorized access to accounts and collection of personally identifiable information.' },
      { term: 'Malware & fraud', text: 'Install malware, impersonate victims or organizations, and commit financial fraud.' },
    ],
  },
  compare: {
    title: 'Trust vs Verify',
    left: { title: 'What the message wants', subtitle: 'Emotional triggers', points: ['Fear: "Your account will be blocked."', 'Urgency: "Act within the next ten minutes."', 'Curiosity, greed, trust and authority'] },
    right: { title: 'What you should do', subtitle: 'Stop, inspect, verify', points: ['Check the full sender address or number', 'Inspect the link’s domain', 'Verify through an independent, official channel'] },
  },
  flow: {
    title: 'How a Phishing Attack Works',
    steps: [
      { title: 'Impersonation', text: 'The attacker pretends to be a trusted organization or person.' },
      { title: 'Lure', text: 'A message, call or post contains a link, attachment or request.' },
      { title: 'Pressure', text: 'Fear, urgency or reward pushes the victim to act quickly.' },
      { title: 'Exposure', text: 'Details entered on a fake page or shared with the caller reach the attacker.' },
    ],
  },
  table: {
    title: 'Comparison of Phishing Methods',
    columns: ['Method', 'Communication channel', 'Common trick', 'Main safety measure'],
    rows: [
      ['Email phishing', 'Email', 'Fake account alerts', 'Verify the sender and links'],
      ['Website/URL phishing', 'Websites and links', 'Imitation login pages', 'Check the domain'],
      ['Smishing', 'SMS/text messages', 'Fake delivery or bank alerts', 'Verify through official apps'],
      ['Vishing', 'Phone calls', 'Impersonated support staff', 'Call back using official numbers'],
      ['Social media phishing', 'Social platforms', 'Fake profiles and offers', 'Verify identities'],
      ['Domain spoofing', 'Email or websites', 'Lookalike domains or sender identities', 'Inspect the complete domain'],
    ],
  },
  cards: {
    title: 'Common Methods of Phishing',
    items: [
      { title: 'Email Phishing', text: 'Fraudulent emails that appear to come from banks, online services or government departments.' },
      { title: 'Website & URL Phishing', text: 'Fraudulent websites that imitate legitimate ones to deceive visitors.' },
      { title: 'Smishing', text: 'Phishing through SMS: fake bank, courier or government alerts.' },
      { title: 'Vishing', text: 'Phone calls impersonating banks, support agents or officials.' },
      { title: 'Social Media Phishing', text: 'Fake or impersonated profiles, direct messages and fraudulent posts.' },
      { title: 'Domain Spoofing', text: 'Lookalike domain names or forged sender identities.' },
    ],
  },
  checklist: {
    title: 'Phishing Prevention and Safety Measures',
    items: [
      'Check the sender’s full email address or phone number',
      'Inspect links before opening them',
      'Avoid unexpected attachments and downloads',
      'Never share passwords, PINs or OTPs in response to unsolicited requests',
      'Use unique passwords and a reputable password manager',
      'Enable multifactor authentication wherever possible',
      'Keep operating systems, browsers and security software updated',
      'Verify urgent requests through an independent, trusted channel',
      'Report suspicious messages to the relevant service provider',
      'If you entered credentials on a suspicious site, change the password from a trusted device, secure related accounts and contact your bank or provider',
    ],
  },
  lists: [
    { title: 'Why Are People Tricked?', tone: 'warn', items: ['Fear: "Your account will be blocked."', 'Urgency: "Act within the next ten minutes."', 'Curiosity: "Look at this surprising photo."', 'Greed: "You have won a valuable prize."', 'Trust: appears to come from a friend or familiar organization', 'Authority: the sender pretends to be an official or senior employee'] },
    { title: 'Common Warning Signs', tone: 'info', items: ['Unfamiliar sender address or number', 'Urgent or threatening language', 'Unexpected attachments or links', 'Misspelled or unusual domain names', 'Requests for passwords, OTPs or financial details'] },
    { title: 'Key Safety Habits', tone: 'good', items: ['Type the official website address yourself or use a bookmark', 'Remember HTTPS alone does not prove a site is legitimate', 'Verify claims through official apps or numbers', 'Enable MFA and report impersonation accounts'] },
  ],
  caseStudy: {
    title: 'Real-World Scenario: The Fake Bank Alert',
    text: 'An imaginary student receives a text message claiming their bank account will be blocked unless they update their information immediately. The message links to a website resembling the bank’s official page. The student notices the domain is unfamiliar and decides not to enter any details. Instead, they open the bank’s official app and check their account. Questions to consider: Which phishing method was used? Which warning signs were present? What could have happened if the student had entered their information? What was the safest response? Lesson: urgent messages should always be verified independently before any action is taken.',
  },
  lab: {
    key: 'u4-methods',
    title: 'Mission: Identify the Phishing Method',
    description: 'Fictional messages appear one by one. Identify which phishing method each one uses, and get immediate feedback on the warning signs. Simulated messages only: no real credentials or personal information are ever collected.',
    badge: { name: 'Method Spotter', emoji: '🎣' },
    objectives: [
      { id: 'first', label: 'Identify your first phishing method correctly', xp: 20 },
      { id: 'all', label: 'Identify every challenge correctly in one run', xp: 50 },
      { id: 'scenario', label: 'Answer the Fake Bank Alert scenario questions', xp: 30 },
    ],
  },
  deep: {
    sections: [
      { title: 'Email phishing', points: ['How it works: an email pretends to be a trusted organization and contains a suspicious link or attachment. Clicking leads to a fake website or malware.', 'Example: an email claims an online shopping account is suspended and asks you to verify it through a link.', 'Warning signs: unfamiliar sender, urgent or threatening language, unexpected attachments, suspicious links or spelling mistakes, requests for passwords, OTPs or financial details.', 'Prevention: verify the sender, inspect links carefully, avoid unexpected attachments, and report suspicious emails.'] },
      { title: 'Website and URL phishing', points: ['How it works: a website resembling a trusted service is shared through email, messages, ads or social posts, and information entered there may be exposed.', 'Example: a fake shopping page imitates a genuine retailer and asks for account information.', 'Warning signs: misspelled or unusual domains, unexpected redirects, inconsistent branding or poor design, unusual requests for sensitive information.', 'Prevention: type the official address yourself or use a trusted bookmark, and check the domain. HTTPS alone does not prove legitimacy.'] },
      { title: 'Smishing (SMS phishing)', points: ['How it works: a text pretending to be from a bank, courier or government service claims a delayed delivery or account problem and urges you to click, call or share information.', 'Example: "Your parcel delivery is on hold. Confirm your details using this link."', 'Warning signs: unexpected delivery or account alerts, unfamiliar links or numbers, requests for OTPs, PINs or payment details, threats of immediate suspension.', 'Prevention: verify through the organization’s official app or website, and never share OTPs or PINs through a message link.'] },
      { title: 'Vishing (voice phishing)', points: ['How it works: a caller claims an urgent security or account problem and pressures the victim to reveal information or perform an action.', 'Example: a caller pretending to be from a bank asks for an OTP "to prevent account suspension".', 'Warning signs: pressure to act immediately, requests for OTPs, PINs, passwords or remote device access, threats or rewards, refusal to let you verify.', 'Prevention: end suspicious calls and contact the organization on its official number.'] },
      { title: 'Social media phishing', points: ['How it works: a created or compromised account sends a message or posts a tempting offer, encouraging you to open a link, give details or download a file.', 'Example: a fake profile impersonating a friend says you have won a prize.', 'Warning signs: unexpected money requests, giveaway links, newly created or impersonated profiles, unusual messages for that sender.', 'Prevention: verify unexpected requests through another channel, enable MFA, and report impersonation accounts.'] },
      { title: 'Domain spoofing', points: ['How it works: a domain or sender identity is made to look like a legitimate organization’s, through lookalike names or forged sender details.', 'Example: a message uses a domain that differs from the genuine one by a small spelling change.', 'Warning signs: slightly altered domains, sender names that don’t match the actual address, unexpected sensitive requests, bypassing normal verification.', 'Prevention: check the full sender address and domain, use trusted channels, and apply email authentication and security filtering.'] },
    ],
    myths: [
      { myth: 'A website with HTTPS is always legitimate.', fact: 'HTTPS protects the connection but does not prove the website itself is trustworthy. Fraudulent sites can use HTTPS too.' },
      { myth: 'If the caller knows my name, they must be from my bank.', fact: 'Callers can find names easily. Never disclose OTPs to an unsolicited caller. Call back on the official number.' },
      { myth: 'Clicking a suspicious link to "investigate" is harmless.', fact: 'The safest response is to verify through an independent, official channel instead of clicking.' },
    ],
    law: [
      { title: 'Report suspicious messages', text: 'Report to the relevant service provider (bank, email or social platform), and use "Report phishing" or "Report account" options.' },
      { title: 'If money or credentials were lost', text: 'Change passwords from a trusted device, secure related accounts, contact your bank, and report at cybercrime.gov.in or call 1930.' },
    ],
    examNotes: [
      'Phishing = deception that tricks people into revealing sensitive information or taking unsafe actions, based on social engineering.',
      'Methods: email, website/URL, smishing (SMS), vishing (voice), social media, domain spoofing.',
      'Objectives: steal credentials and payment data, gain access, collect PII, install malware, impersonate, commit fraud.',
      'Emotional triggers: fear, urgency, curiosity, greed, trust, authority.',
      'HTTPS protects the connection, not the identity of the website.',
      'Key takeaway: stop, inspect, and verify before you click, reply, call back or share information.',
    ],
  },
  quiz: [
    { q: 'What is phishing?', options: ['A method of improving internet speed', 'A technique used to deceive people into revealing information', 'A type of data backup', 'A method of encrypting files'], answer: 1, explain: 'Phishing is a deceptive technique used to obtain sensitive information or induce unsafe actions.' },
    { q: 'Phishing conducted through SMS is called:', options: ['Vishing', 'Smishing', 'Spoofing', 'Scanning'], answer: 1, explain: 'SMS + phishing = smishing.' },
    { q: 'What should you do if an unexpected caller asks for your bank OTP?', options: ['Share it immediately', 'Send it through a text message', 'End the call and contact the bank through an official channel', 'Share it if the caller knows your name'], answer: 2, explain: 'Never disclose your OTP to an unsolicited caller.' },
    { q: 'Does HTTPS guarantee that a website is legitimate?', options: ['Yes, always', 'No, a fraudulent website can also use HTTPS', 'Only on mobile phones', 'Only on social media'], answer: 1, explain: 'HTTPS protects the connection but does not establish that the website itself is trustworthy.' },
    { q: 'What is the safest response to a suspicious message?', options: ['Click the link to investigate', 'Forward it to friends', 'Verify it through an independent, official channel', 'Reply with your personal information'], answer: 2, explain: 'Verify the message independently.' },
  ],
};
