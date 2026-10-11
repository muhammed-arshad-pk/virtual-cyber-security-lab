import { Layers } from 'lucide-react';

// Built from unit4/topic.txt and the "Types of Phishing Scams" mockup.
export default {
  slug: 'types-of-phishing-scams',
  number: 4,
  title: 'Types of Phishing Scams',
  icon: Layers,
  color: '#fb923c',
  difficulty: 'Intermediate',
  summary: 'Identify common scams across digital communication channels.',
  tagline: 'Identify common scams across digital communication channels.',
  keywords: ['phishing scams', 'clone phishing', 'whaling', 'smishing', 'vishing', 'qr code', 'quishing', 'reporting'],
  intro: [
    'Phishing scams reach people through many touchpoints: email, SMS, phone calls, search results, social media and even printed QR codes. The channel changes, but the goal is the same: get the victim to click, pay or disclose something they shouldn’t.',
    'Recognising the type of scam, and the warning signs they share, is the most reliable defence. Reporting scams quickly also protects others.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Clone phishing', text: 'A copy of a genuine message the victim received before, re-sent with a harmful link or attachment swapped in.' },
      { term: 'Whaling', text: 'Phishing aimed at senior executives ("big fish") with high authority.' },
      { term: 'Quishing', text: 'QR-code phishing: a QR code that leads to a fake page instead of the real one.' },
    ],
  },
  compare: {
    title: 'Bulk Scams vs Targeted Scams',
    left: { title: 'Bulk scams', subtitle: 'Sent to many people', points: ['Generic templates and greetings', 'Rely on volume', 'Usually caught by filters and awareness'] },
    right: { title: 'Targeted scams', subtitle: 'Spear phishing, whaling', points: ['Personalised to the person or role', 'Researched in advance', 'Need verification processes, not just filters'] },
  },
  flow: {
    title: 'From Contact to Compromise',
    steps: [
      { title: 'Deceptive contact', text: 'A message, call, post or QR code reaches the victim.' },
      { title: 'Persuasion tactics', text: 'Urgency, fear, reward or authority push for quick action.' },
      { title: 'Click / action', text: 'The victim clicks, scans, calls back or pays.' },
      { title: 'Fraudulent disclosure', text: 'Credentials, OTPs, card details or money are handed over.' },
    ],
  },
  table: {
    title: 'Phishing Scam Comparison',
    columns: ['Scam type', 'Channel', 'Warning signs', 'Prevention'],
    rows: [
      ['Email phishing', 'Email to many people', 'Generic greeting, urgency, mismatched sender', 'Filters, awareness, verify sender'],
      ['Clone phishing', 'Copy of a real email', '"Resent" or "updated link" for a message you already had', 'Compare with the original, confirm with the sender'],
      ['Spear phishing', 'Personalised email/message', 'Uses your name, role or recent activity to seem genuine', 'Verification by a second channel, MFA'],
      ['Whaling', 'Executive-targeted message', 'Urgent high-value request from "leadership"', 'Strict approval processes, call-back checks'],
      ['Smishing / vishing', 'SMS / phone call', 'Short links, OTP requests, threats', 'Never share OTP; call official numbers'],
      ['Search & social media', 'Ads, fake pages, posts', 'Fake "customer care" numbers, giveaways', 'Use official websites and apps only'],
      ['QR-code phishing', 'Printed or digital QR', 'Sticker over a real QR, payment request on scan', 'Check the URL preview; never scan to receive money'],
    ],
  },
  cards: {
    title: 'Scam Types at a Glance',
    items: [
      { title: 'Email Phishing', text: 'Mass emails pretending to be banks, services or offices.' },
      { title: 'Clone Phishing', text: 'A copy of a genuine email with a swapped link.' },
      { title: 'Spear Phishing', text: 'Tailored to a specific person or role.' },
      { title: 'Whaling', text: 'Targets executives with authority over money or data.' },
      { title: 'Smishing & Vishing', text: 'Scam SMS and phone calls.' },
      { title: 'Search, Social & QR', text: 'Fake ads, fake pages, giveaways and tampered QR codes.' },
    ],
  },
  checklist: {
    title: 'Before You Act on Any Message',
    items: [
      'Did I expect this message?',
      'Is the sender address or number exactly right?',
      'Does it create urgency or fear?',
      'Does the link’s real domain belong to the organisation?',
      'Is it asking for an OTP, PIN, password or payment?',
      'Can I verify it through the official app or number instead?',
    ],
  },
  lists: [
    { title: 'Warning Signs', tone: 'warn', items: ['Urgency and threats', 'Impersonation of known brands or people', 'Insecure or mismatched destination', 'Unexpected payment requests', 'Requests for confidential information'] },
    { title: 'How to Report (India)', tone: 'info', items: ['Financial fraud: call 1930 immediately', 'File a complaint at cybercrime.gov.in', 'Fraud calls / SMS: Chakshu on sancharsaathi.gov.in', 'Use "Report phishing" in your email app', 'Inform the organisation being impersonated'] },
    { title: 'Prevention', tone: 'good', items: ['Use official apps and bookmarked sites', 'Enable MFA everywhere', 'Keep filters and browser protection on', 'Pause and verify before acting', 'Share scam examples with family'] },
  ],
  caseStudy: {
    title: 'Case Study: The QR-Code Trap',
    text: 'At a parking lot, a sticker with a new QR code was placed over the official payment QR. Drivers who scanned it saw a payment page that looked official and paid there, so the money went to the scammer instead. The warning sign was the URL preview shown before opening: it didn’t match the parking operator’s domain. Operators now use tamper-evident signs and in-app payments.',
  },
  quiz: [
    { q: 'A re-sent copy of an email you received last week, with an "updated link", is most likely…', options: ['Whaling', 'Clone phishing', 'Vishing', 'Spam filter'], answer: 1, explain: 'Clone phishing copies a genuine message and swaps the link or attachment.' },
    { q: 'Whaling targets…', options: ['Random users', 'Senior executives', 'Only children', 'Printers'], answer: 1, explain: '"Big fish": people with authority over payments or data.' },
    { q: 'What is quishing?', options: ['Phishing using QR codes', 'A Wi-Fi standard', 'A password manager', 'A type of firewall'], answer: 0, explain: 'QR + phishing. Always check the URL preview after scanning.' },
    { q: 'Which is the best first step if you lost money to a scam in India?', options: ['Wait a week', 'Call 1930 immediately', 'Delete the messages', 'Reply to the scammer'], answer: 1, explain: 'Quick reporting helps banks freeze the money.' },
    { q: 'Which of these is a common warning sign across all scam types?', options: ['A message you expected', 'Urgency or threats', 'An official app notification you triggered', 'A bill on its usual date'], answer: 1, explain: 'Pressure to act fast is the most common tactic.' },
    { q: 'You searched for "bank customer care" and called a number from an ad. The caller asks for your OTP. This is…', options: ['Normal support', 'A search-engine / vishing scam', 'A software update', 'Clone phishing'], answer: 1, explain: 'Fake helpline numbers in search results are a common scam. Use the number on the official site or card.' },
  ],
};
