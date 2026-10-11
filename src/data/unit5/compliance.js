import { ClipboardCheck } from 'lucide-react';

export default {
  slug: 'compliance-legal-awareness',
  number: 7,
  title: 'Cybersecurity Compliance, Responsibilities, and Legal Awareness',
  icon: ClipboardCheck,
  color: '#facc15',
  difficulty: 'Intermediate',
  disclaimer: true,
  summary: 'Policies, data protection, incident reporting, training and regulatory compliance for individuals and organisations.',
  tagline: 'Security is a shared legal responsibility, and compliance is how organisations prove they take it seriously.',
  keywords: ['compliance', 'dpdp', 'cert-in', 'iso 27001', 'policy', 'risk management', 'incident reporting', 'access control', 'training', '43a'],
  intro: [
    'Cybersecurity compliance means following the laws, regulations, standards and internal policies that protect information. In India this includes the IT Act (especially Sec 43A and 72A), the SPDI Rules 2011, CERT-In Directions 2022, the DPDP Act 2023, and sector rules from regulators like RBI, SEBI and IRDAI.',
    'Compliance isn’t paperwork for its own sake. It forces organisations to know their data, control access, prepare for incidents and train their people. Individuals have responsibilities too: protecting credentials, using systems lawfully and reporting incidents.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Data fiduciary', text: 'Under the DPDP Act, the organisation that decides why and how personal data is processed.' },
      { term: 'Risk', text: 'Likelihood × impact of a threat exploiting a vulnerability.' },
      { term: 'ISMS', text: 'Information Security Management System, e.g. ISO/IEC 27001, a recognised "reasonable security practice".' },
    ],
  },
  compare: {
    title: 'Individual vs Organisational Responsibilities',
    left: { title: 'Individuals', subtitle: 'Every user', points: ['Protect passwords and devices', 'Use systems lawfully and ethically', 'Respect others’ privacy and data', 'Report incidents and suspicious activity'] },
    right: { title: 'Organisations', subtitle: 'Legal duties', points: ['Reasonable security practices (Sec 43A)', 'Protect personal data and get consent (DPDP)', 'Report incidents to CERT-In within 6 hours', 'Train staff, manage vendors, keep logs'] },
  },
  flow: {
    title: 'Compliance Lifecycle',
    steps: [
      { title: 'Identify obligations', text: 'Which laws, regulations and standards apply?' },
      { title: 'Assess risk & gaps', text: 'Compare current controls with requirements.' },
      { title: 'Implement controls', text: 'Policies, access control, encryption, logging, training.' },
      { title: 'Monitor, report, improve', text: 'Audits, incident reporting, continuous improvement.' },
    ],
  },
  table: {
    title: 'Key Indian Compliance Obligations',
    columns: ['Source', 'Obligation', 'Practical control'],
    rows: [
      ['IT Act Sec 43A + SPDI Rules 2011', 'Reasonable security for sensitive personal data', 'ISMS (ISO 27001), documented security policy'],
      ['IT Act Sec 72A', 'No disclosure of personal info in breach of contract', 'Confidentiality clauses, access control, DLP'],
      ['CERT-In Directions 2022', 'Report specified incidents within 6 hours, keep logs 180 days, sync clocks', 'Incident-response plan, log management, NTP'],
      ['DPDP Act 2023', 'Consent, purpose limitation, security safeguards, breach notification', 'Consent records, data inventory, breach procedure'],
      ['IT Rules 2021 (intermediaries)', 'Grievance officer, takedown timelines', 'Grievance desk, content-moderation workflow'],
      ['Sector regulators (RBI, SEBI, IRDAI)', 'Sector cyber-security frameworks', 'Board-approved cyber policy, audits'],
    ],
  },
  cards: {
    title: 'Pillars of a Compliance Programme',
    items: [
      { title: 'Policies & Best Practices', text: 'Acceptable use, passwords, BYOD, data classification.' },
      { title: 'Personal Data Protection', text: 'Consent, minimisation, retention limits, data-subject rights.' },
      { title: 'Access Control & Authentication', text: 'Least privilege, MFA, periodic access reviews.' },
      { title: 'Secure Storage & Handling', text: 'Encryption, backups, secure disposal.' },
      { title: 'Incident Reporting & Response', text: 'Detect, contain, report (CERT-In, Data Protection Board), learn.' },
      { title: 'Awareness & Training', text: 'Regular training, phishing awareness, role-specific modules.' },
    ],
  },
  checklist: {
    title: 'Personal Legal-Awareness Checklist',
    items: [
      'I use only systems and data I’m authorised to access',
      'I never share my passwords, OTPs or access cards',
      'I don’t forward others’ private images or data',
      'I know to report incidents on 1930 / cybercrime.gov.in',
      'I follow my college or workplace IT policy',
      'I think before posting, since online speech has legal consequences',
    ],
  },
  lists: [
    { title: 'Common Compliance Failures', tone: 'warn', items: ['No inventory of what personal data is held', 'Shared admin passwords, no MFA', 'Logs not kept, or clocks unsynchronised', 'Incidents reported late or not at all', 'Vendors with access but no contracts or controls'] },
    { title: 'Risk Management Steps', tone: 'info', items: ['Identify assets and data', 'Identify threats and vulnerabilities', 'Rate likelihood and impact', 'Treat: mitigate, transfer (insurance), avoid or accept', 'Monitor and review regularly'] },
    { title: 'Prevention Best Practices', tone: 'good', items: ['Least privilege and MFA everywhere', 'Encrypt sensitive data at rest and in transit', 'Patch promptly', 'Tested backups', 'Regular audits and drills'] },
  ],
  caseStudy: {
    title: 'Case Study: The 6-Hour Clock',
    text: 'A fictional e-commerce company discovered at 10:00 am that customer records were exposed through a misconfigured server. Its incident-response plan kicked in: the server was isolated within 30 minutes, logs preserved, and the incident reported to CERT-In by 2:30 pm, well within 6 hours. Affected users and the Data Protection Board were notified as the DPDP framework requires. Because policies, logs and contacts were prepared in advance, a crisis became a managed process.',
  },
  lab: {
    key: 'u5-comply',
    title: 'Mission: Compliance Officer for a Day',
    description: 'You’re the new compliance officer at Cyber Shield Corp. Run a gap assessment, implement controls and watch risks move on a live heat-map. Then a breach alert arrives: complete the legally required steps before the 6-hour CERT-In deadline.',
    badge: { name: 'Compliance Champion', emoji: '📋' },
    objectives: [
      { id: 'gap', label: 'Reach 100% on the compliance gap assessment', xp: 35 },
      { id: 'risk', label: 'Move every risk out of the red zone', xp: 25 },
      { id: 'drill', label: 'Complete the breach drill within the 6-hour deadline', xp: 40 },
    ],
  },
  quiz: [
    { q: 'Within how many hours must specified cyber incidents be reported to CERT-In?', options: ['6 hours', '72 hours', '30 days', '1 year'], answer: 0, explain: 'CERT-In Directions, April 2022.' },
    { q: 'For how long must ICT system logs be retained under CERT-In directions?', options: ['7 days', '180 days', '10 years', 'Not required'], answer: 1, explain: 'Logs must be kept for 180 days, within India.' },
    { q: 'Which section requires companies to maintain reasonable security practices for sensitive data?', options: ['Sec 43A', 'Sec 66F', 'Sec 67', 'Sec 3'], answer: 0, explain: 'With compensation if negligence causes wrongful loss.' },
    { q: 'What is risk usually measured as?', options: ['Cost × time', 'Likelihood × impact', 'Users × devices', 'Speed × size'], answer: 1, explain: 'This combination helps prioritise controls.' },
    { q: 'Under the DPDP Act, the organisation that decides how personal data is processed is called a…', options: ['Data principal', 'Data fiduciary', 'Data processor only', 'Intermediary'], answer: 1, explain: 'The individual is the data principal.' },
  ],
  deep: {
    sections: [
      { title: 'DPDP Act, 2023 essentials', points: ['Applies to digital personal data processed in India, and abroad if offering goods or services to people in India.', 'Lawful processing needs consent (or certain "legitimate uses"), with clear notice.', 'Duties of fiduciaries: accuracy, security safeguards, breach notification, erasure when the purpose is served.', 'Rights of data principals: access, correction, erasure, grievance redressal, nomination.', 'Penalties up to ₹250 crore per breach for failing to take security safeguards. The Data Protection Board adjudicates.'] },
      { title: 'CERT-In Directions (April 2022)', points: ['Report listed incident types within 6 hours of noticing.', 'Maintain ICT logs for 180 days, within Indian jurisdiction.', 'Synchronise system clocks with NTP servers of NIC or NPL (or traceable to them).', 'Designate a point of contact for CERT-In.', 'VPN, cloud and data-centre providers must keep certain subscriber records.'] },
      { title: 'Standards that demonstrate good practice', points: ['ISO/IEC 27001: information security management system, cited as a reasonable security practice.', 'ISO/IEC 27701: privacy information management.', 'NIST Cybersecurity Framework: Identify, Protect, Detect, Respond, Recover (plus Govern in version 2.0).', 'PCI DSS for card data. Sector frameworks from RBI, SEBI and IRDAI.'] },
      { title: 'Building a security culture', points: ['Leadership support and a board-approved policy.', 'Role-based training: finance (fraud), HR (data), developers (secure coding).', 'Simple reporting channels, and no blame for reporting mistakes quickly.', 'Regular drills and tabletop exercises to practise incident response.'] },
    ],
    cases: [
      { year: '2011', title: 'SPDI Rules', text: 'Defined sensitive personal data and "reasonable security practices" under Sec 43A.' },
      { year: '2017', title: 'Puttaswamy judgment', text: 'Privacy recognised as a fundamental right, laying the groundwork for data-protection law.' },
      { year: '2022', title: 'CERT-In Directions', text: '6-hour incident reporting and 180-day log retention became mandatory.' },
      { year: '2023', title: 'DPDP Act passed', text: 'India’s dedicated personal data-protection law, with significant penalties.' },
    ],
    myths: [
      { myth: 'Compliance means we are secure.', fact: 'Compliance is a minimum baseline. Real security needs continuous risk management.' },
      { myth: 'Only big companies need to comply.', fact: 'Any organisation handling personal data or ICT systems has obligations.' },
      { myth: 'If we quietly fix a breach, there’s no need to report.', fact: 'Reporting to CERT-In (and under DPDP) is a legal obligation, and late or no reporting adds liability.' },
    ],
    law: [
      { title: 'IT Act Sec 43A, 72A & SPDI Rules 2011', text: 'Reasonable security practices and confidentiality duties.' },
      { title: 'CERT-In Directions 2022 (under Sec 70B)', text: 'Incident reporting, log retention, clock synchronisation.' },
      { title: 'DPDP Act 2023', text: 'Consent, safeguards, breach notification, rights. Penalties up to ₹250 crore.' },
    ],
    examNotes: [
      'Compliance = following laws, regulations, standards and policies that protect information.',
      'India: IT Act 43A/72A, SPDI Rules 2011, CERT-In 2022 (6 h, 180 days logs, NTP), DPDP 2023, sector rules.',
      'Responsibilities: individuals (lawful use, protect credentials, report) and organisations (security, privacy, reporting, training).',
      'Controls: policies, access control and MFA, encryption, secure storage, incident response, training.',
      'Risk = likelihood × impact. Treat it by mitigating, transferring, avoiding or accepting.',
      'Standards: ISO 27001/27701, NIST CSF, PCI DSS.',
    ],
    extraQuiz: [
      { q: 'Max DPDP penalty for failing to take reasonable security safeguards?', options: ['₹10,000', '₹250 crore', '₹1 lakh', 'No penalty'], answer: 1, explain: 'Up to ₹250 crore per instance.' },
      { q: 'Which standard is commonly cited as a "reasonable security practice"?', options: ['ISO/IEC 27001', 'ISO 9001 only', 'HTML5', 'USB 3.0'], answer: 0, explain: 'The SPDI Rules reference ISO 27001.' },
    ],
  },
};
