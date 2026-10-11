import { Globe2 } from 'lucide-react';

export default {
  slug: 'challenges-cybercrime-scenario',
  number: 2,
  title: 'Challenges to Indian Law and the Cybercrime Scenario in India',
  icon: Globe2,
  color: '#a78bfa',
  difficulty: 'Intermediate',
  disclaimer: true,
  summary: 'Jurisdiction, anonymity, evidence and underreporting: why cybercrime is hard to prosecute.',
  tagline: 'Crimes that cross borders in milliseconds meet laws that stop at the border.',
  keywords: ['jurisdiction', 'cross-border', 'mlat', 'anonymity', 'underreporting', 'ncrb', 'i4c', 'law enforcement'],
  intro: [
    'Cybercrime in India has grown rapidly with digital payments and smartphone adoption. NCRB recorded about 66,000 cybercrime cases in 2022, more than double the 2018 figure, and the true number is far higher because many victims never report.',
    'Applying law to cybercrime is hard. The offender may be in another state or country, hidden behind VPNs and fake identities. Evidence sits on foreign servers and can disappear in minutes, and investigators need specialised skills and tools.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Jurisdiction', text: 'The authority of a court or police to deal with a case, usually tied to territory.' },
      { term: 'MLAT', text: 'Mutual Legal Assistance Treaty: formal country-to-country requests for evidence in criminal matters.' },
      { term: 'Underreporting', text: 'Crimes that happen but are never reported to authorities.' },
    ],
  },
  compare: {
    title: 'Traditional Crime vs Cybercrime',
    left: { title: 'Traditional crime', subtitle: 'Physical', points: ['Offender is physically present at the scene', 'Local police have clear jurisdiction', 'Physical evidence and eyewitnesses', 'One victim, one place'] },
    right: { title: 'Cybercrime', subtitle: 'Digital, borderless', points: ['Offender may be thousands of km away', 'Multiple jurisdictions involved', 'Volatile digital evidence on foreign servers', 'Thousands of victims at once'] },
  },
  flow: {
    title: 'Why Cyber Cases Stall',
    steps: [
      { title: 'Delayed report', text: 'Victims report late, or not at all, and logs expire.' },
      { title: 'Hidden identity', text: 'VPNs, fake SIMs and mule accounts hide the offender.' },
      { title: 'Foreign data', text: 'Evidence held abroad needs MLAT or provider cooperation.' },
      { title: 'Slow resolution', text: 'Low conviction rates erode deterrence.' },
    ],
  },
  table: {
    title: 'Challenges & Responses',
    columns: ['Challenge', 'Why it’s hard', 'Legal / practical response'],
    rows: [
      ['Jurisdiction', 'Victim, offender and servers in different places', 'IT Act Sec 1(2) & 75; e-FIR / zero FIR under BNSS'],
      ['Cross-border crime', 'Foreign evidence and suspects', 'MLATs via MHA, Interpol notices, provider law-enforcement portals'],
      ['Anonymity', 'VPNs, Tor, fake SIMs, mule accounts', 'KYC rules, logs from ISPs and platforms, financial trail analysis'],
      ['Volatile evidence', 'Logs overwritten, accounts deleted', 'Preservation requests, CERT-In 180-day log retention'],
      ['Skills & capacity', 'Few trained cyber investigators', 'I4C, CyTrain training portal, state cyber cells and labs'],
      ['Underreporting', 'Shame, low awareness, distrust', '1930 helpline, cybercrime.gov.in, awareness campaigns'],
    ],
  },
  cards: {
    title: 'India’s Cybercrime Scenario',
    items: [
      { title: 'Financial Fraud', text: 'UPI, card and investment scams form the largest share of complaints.' },
      { title: 'Sextortion & Harassment', text: 'Targets students and young adults, often unreported.' },
      { title: '"Digital Arrest" Scams', text: 'Fake police or customs officers on video calls extort money.' },
      { title: 'Organised Fraud Hubs', text: 'Gangs running call centres and mule networks, sometimes abroad.' },
      { title: 'Data Breaches', text: 'Leaks of personal data enable targeted scams.' },
      { title: 'Ransomware', text: 'Attacks on hospitals, companies and public services.' },
    ],
  },
  lists: [
    { title: 'Why Victims Don’t Report', tone: 'warn', items: ['Embarrassment or fear (especially sextortion)', 'Belief that nothing will be done', 'Not knowing where to report', 'Small amounts lost', 'Fear of police procedures'] },
    { title: 'Law-Enforcement Ecosystem', tone: 'info', items: ['I4C (Indian Cyber Crime Coordination Centre), MHA', 'National Cyber Crime Reporting Portal: cybercrime.gov.in', 'Helpline 1930 and the Citizen Financial Cyber Fraud Reporting System', 'State cyber police stations and cyber cells', 'CERT-In for technical incidents', 'NCIIPC for critical infrastructure'] },
    { title: 'Emerging Trends & Legal Gaps', tone: 'good', items: ['AI deepfakes and voice cloning', 'Crypto-asset fraud', 'Cross-border scam compounds', 'IoT and critical-infrastructure attacks', 'Dark-web markets'] },
  ],
  caseStudy: {
    title: 'Case Study: The Three-Country Trail',
    text: 'A Pune resident lost ₹3 lakh in an "investment app" scam. The app was hosted abroad, the phone numbers used were obtained with forged documents, and the money moved through several mule accounts before being converted to crypto on a foreign exchange. Quick reporting on 1930 froze part of the money in the first mule account. Tracing the rest needed requests to the app store, the foreign hosting provider and the exchange, which shows how a "simple" fraud becomes an international investigation.',
  },
  lab: {
    key: 'u5-challenges',
    title: 'Mission: Follow the Cross-Border Trail',
    description: 'You’re the investigating officer in a scam case that crosses states and countries. At each hop of the trail, choose the right legal or practical tool to get the evidence. Then match each legal challenge to its best response.',
    badge: { name: 'Trail Tracker', emoji: '🌐' },
    objectives: [
      { id: 'trail', label: 'Choose the right tool at every hop of the trail', xp: 45 },
      { id: 'match', label: 'Match every challenge to its response', xp: 35 },
    ],
  },
  quiz: [
    { q: 'What is an MLAT?', options: ['A malware type', 'A treaty for formal evidence requests between countries', 'A police rank', 'A type of VPN'], answer: 1, explain: 'Mutual Legal Assistance Treaties are used to get evidence held abroad.' },
    { q: 'Which is India’s national portal for reporting cybercrime?', options: ['cybercrime.gov.in', 'mygov.in', 'incometax.gov.in', 'uidai.gov.in'], answer: 0, explain: 'The National Cyber Crime Reporting Portal under I4C.' },
    { q: 'Why is digital evidence called "volatile"?', options: ['It explodes', 'It can be overwritten or deleted quickly', 'It is always encrypted', 'It is stored on paper'], answer: 1, explain: 'Logs rotate and accounts get deleted, so speed and preservation requests matter.' },
    { q: 'Which is a major reason for underreporting?', options: ['Too many police stations', 'Embarrassment and belief that nothing will happen', 'Fast internet', 'High literacy'], answer: 1, explain: 'Awareness and victim-friendly reporting help.' },
    { q: 'Which agency coordinates cybercrime efforts nationally under the MHA?', options: ['ISRO', 'I4C', 'SEBI', 'NITI Aayog'], answer: 1, explain: 'The Indian Cyber Crime Coordination Centre.' },
  ],
  deep: {
    sections: [
      { title: 'Jurisdiction in cyberspace', points: ['Traditional rule: the place where the offence occurred. Online, this could be the victim’s location, the offender’s, or the server’s.', 'IT Act Sec 1(2) and Sec 75 extend jurisdiction to offences involving computers located in India, even if committed abroad.', 'BNSS (2023) allows e-FIRs and zero FIRs, so a complaint can be registered anywhere and transferred.', 'Enforcing Indian orders on foreign companies still depends on cooperation or treaties.'] },
      { title: 'Cross-border cooperation tools', points: ['MLATs: India has treaties with many countries, routed through the Ministry of Home Affairs.', 'Letters rogatory: court-to-court requests for evidence abroad.', 'Interpol notices (e.g. Red Notice) to locate wanted persons.', 'Direct emergency or preservation requests to global platforms through their law-enforcement portals.', 'India is not a party to the Budapest Convention on Cybercrime, the main international cybercrime treaty.'] },
      { title: 'Anonymity and identity concealment', points: ['VPNs and Tor hide IP addresses. Public Wi-Fi and fake SIMs break the link to a real person.', 'Mule bank accounts, often rented from students or the poor, move stolen money.', 'Crypto conversion and cross-border transfers make tracing slower.', 'Investigators combine IP logs, device IDs, KYC data, CCTV and financial trails to unmask suspects.'] },
      { title: 'Building capacity', points: ['I4C runs CyTrain, an online training portal for police, prosecutors and judges.', 'States set up cyber police stations and forensic labs.', 'The Citizen Financial Cyber Fraud Reporting and Management System links police and banks to freeze money fast.', 'Public awareness (e.g. "Cyber Dost" on social media) encourages reporting.'] },
    ],
    cases: [
      { year: '2018', title: 'Cybercrime ~27,000 cases', text: 'NCRB recorded about 27,000 cybercrime cases nationally.' },
      { year: '2020', title: 'I4C inaugurated', text: 'The Indian Cyber Crime Coordination Centre began operations under the MHA to coordinate the national response to cybercrime.' },
      { year: '2021', title: 'Financial-fraud helpline', text: 'Helpline 155260 was launched to report financial cyber fraud quickly. It was later renumbered 1930.' },
      { year: '2022', title: 'Cybercrime ~66,000 cases', text: 'NCRB recorded about 66,000 cybercrime cases, with fraud the most common motive.' },
      { year: '2024', title: '"Digital arrest" warnings', text: 'The government and the Prime Minister publicly warned citizens that no agency conducts "digital arrests" over video calls.' },
    ],
    myths: [
      { myth: 'If the scammer is abroad, Indian police can do nothing.', fact: 'Sec 75 gives jurisdiction, and money can still be frozen in Indian accounts if reported quickly.' },
      { myth: 'I must report at the police station where the crime happened.', fact: 'Report online at cybercrime.gov.in or call 1930. Zero FIRs can be filed anywhere.' },
      { myth: 'Small losses aren’t worth reporting.', fact: 'Reports help link cases, and many small victims often reveal one large gang.' },
    ],
    law: [
      { title: 'IT Act Sec 1(2) & 75', text: 'Extra-territorial application to offences involving Indian computer resources.' },
      { title: 'BNSS, 2023', text: 'Zero FIR and electronic FIR provisions, plus electronic summons and evidence procedures.' },
      { title: 'BNS Sec 111', text: 'Organised crime, which explicitly includes cyber-crimes by syndicates.' },
      { title: 'Report', text: '1930 · cybercrime.gov.in · nearest cyber police station.' },
    ],
    examNotes: [
      'Scenario: rapid growth (NCRB ~66,000 cases in 2022), fraud the top motive, heavy underreporting.',
      'Challenges: jurisdiction, cross-border evidence, anonymity, volatile evidence, skills, underreporting.',
      'Tools: Sec 75, MLAT, letters rogatory, Interpol, preservation requests, zero/e-FIR.',
      'Ecosystem: I4C, cybercrime.gov.in, 1930, state cyber cells, CERT-In, NCIIPC.',
      'Emerging: deepfakes, crypto fraud, digital-arrest scams, cross-border scam hubs.',
    ],
    extraQuiz: [
      { q: 'Is India a party to the Budapest Convention on Cybercrime?', options: ['Yes', 'No'], answer: 1, explain: 'India has not acceded and relies on bilateral MLATs and other channels.' },
      { q: 'What does a "zero FIR" allow?', options: ['No FIR at all', 'Registering an FIR at any police station regardless of jurisdiction', 'An FIR with zero evidence', 'An FIR only online'], answer: 1, explain: 'It is later transferred to the right police station.' },
    ],
  },
};
