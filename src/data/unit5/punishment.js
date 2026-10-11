import { Gavel } from 'lucide-react';

export default {
  slug: 'cybercrime-punishment',
  number: 5,
  title: 'Cybercrime and Punishment under Indian Law',
  icon: Gavel,
  color: '#f472b6',
  difficulty: 'Intermediate',
  disclaimer: true,
  summary: 'Connecting digital offences to the IT Act and BNS provisions, penalties and legal remedies.',
  tagline: 'Connecting digital offences with legal consequences.',
  keywords: ['punishment', 'penalty', 'section 66', 'section 66c', 'section 66d', 'section 66e', 'section 66f', 'section 67', 'bns', 'bailable', 'cognizable'],
  intro: [
    'Digital offences in India are governed mainly by the Information Technology Act, 2000 (amended 2008), together with general criminal law, now the Bharatiya Nyaya Sanhita (BNS), 2023, for offences like cheating, extortion, stalking and defamation.',
    'The punishments in the law are maximums. The actual outcome depends on the facts, the evidence, intent and court procedure. Remember too: an allegation is not guilt. Everyone is presumed innocent until proven guilty in court.',
  ],
  definitions: {
    title: 'Key Legal Terms',
    items: [
      { term: 'Cognizable offence', text: 'Police can register an FIR and investigate without a magistrate’s order. IT Act offences of 3+ years are cognizable (Sec 77B).' },
      { term: 'Bailable offence', text: 'The accused has a right to bail. IT Act offences punishable with 3 years are bailable.' },
      { term: 'Compoundable offence', text: 'Can be settled between parties with court permission (Sec 77A covers some IT Act offences).' },
    ],
  },
  compare: {
    title: 'Civil Remedy vs Criminal Prosecution',
    left: { title: 'Civil (Sec 43, 43A)', subtitle: 'Victim seeks compensation', points: ['Unauthorised access, damage, data theft, negligent data handling', 'Filed before an Adjudicating Officer (up to ₹5 crore)', 'Outcome: money paid to the victim'] },
    right: { title: 'Criminal (Sec 65–67B, 72, 72A …)', subtitle: 'State prosecutes offender', points: ['Requires dishonest or fraudulent intent (e.g. Sec 66)', 'FIR, investigation, charge-sheet, trial', 'Outcome: imprisonment and/or fine'] },
  },
  flow: {
    title: 'Case Progression Workflow',
    steps: [
      { title: 'Incident & evidence', text: 'The incident happens. The victim preserves screenshots, logs and transaction IDs.' },
      { title: 'Report', text: 'Via 1930, cybercrime.gov.in or a cyber police station. An FIR is registered.' },
      { title: 'Investigation', text: 'Police gather digital evidence, trace accounts and identify the accused.' },
      { title: 'Legal process', text: 'Charge-sheet, trial and judgement: conviction, acquittal or settlement.' },
    ],
  },
  table: {
    title: 'Legal Reference Table (maximum punishments)',
    columns: ['Offence', 'Provision', 'Maximum punishment', 'Important caveat'],
    rows: [
      ['Damage / unauthorised access (civil)', 'IT Act Sec 43', 'Compensation to the affected person', 'Civil liability, no intent needed'],
      ['Computer-related offences', 'Sec 66', 'Up to 3 years and/or fine up to ₹5 lakh', 'Requires dishonest or fraudulent intent'],
      ['Tampering with source code', 'Sec 65', 'Up to 3 years and/or fine up to ₹2 lakh', 'Code required to be kept by law'],
      ['Identity theft', 'Sec 66C', 'Up to 3 years + fine up to ₹1 lakh', 'Often charged with personation'],
      ['Cheating by personation', 'Sec 66D', 'Up to 3 years + fine up to ₹1 lakh', 'Often with BNS cheating sections'],
      ['Violation of privacy', 'Sec 66E', 'Up to 3 years and/or fine up to ₹2 lakh', 'Images of private areas without consent'],
      ['Cyberterrorism', 'Sec 66F', 'Up to life imprisonment', 'Threat to sovereignty, security or critical systems'],
      ['Obscene material', 'Sec 67', '1st: 3 yrs + ₹5 lakh; repeat: 5 yrs + ₹10 lakh', 'Exceptions for genuine art, science and heritage'],
      ['Sexually explicit material', 'Sec 67A', '1st: 5 yrs + ₹10 lakh; repeat: 7 yrs', 'Non-bailable'],
      ['Child sexual abuse material', 'Sec 67B', '1st: 5 yrs + ₹10 lakh; repeat: 7 yrs', 'Also POCSO Act'],
      ['Data disclosure in breach of contract', 'Sec 72A', 'Up to 3 years and/or fine up to ₹5 lakh', 'Without consent, with intent to cause loss'],
    ],
  },
  cards: {
    title: 'Categories of Cyber Offences',
    items: [
      { title: 'Unauthorised Access & Damage', text: 'Sec 43 & 66: access, downloading, viruses, disruption.' },
      { title: 'Identity Theft', text: 'Sec 66C: misuse of passwords, signatures or ID features.' },
      { title: 'Cheating by Personation', text: 'Sec 66D: pretending to be someone else using computers.' },
      { title: 'Privacy Violations', text: 'Sec 66E: capturing or sharing private images without consent.' },
      { title: 'Cyberterrorism', text: 'Sec 66F: threats to national security via cyber means.' },
      { title: 'Obscene & Prohibited Content', text: 'Sec 67, 67A, 67B: obscene, explicit and child-abuse material.' },
    ],
  },
  lists: [
    { title: 'Important Legal Principles', tone: 'info', items: ['Evidence is paramount: preserve and verify digital logs', 'An allegation is not guilt: presumption of innocence', 'Outcomes vary with facts, intent, jurisdiction and procedure', 'Several laws may apply to one act (IT Act + BNS + special laws)', 'Sec 66A was struck down and cannot be applied'] },
    { title: 'Online Financial Fraud: Laws Commonly Applied', tone: 'warn', items: ['IT Act 66C (identity theft), 66D (personation)', 'BNS 318 (cheating), 319 (cheating by personation)', 'BNS 111 (organised crime, including cyber-crimes)', 'BNS 308 (extortion), e.g. sextortion', 'RBI rules for customer liability and refunds'] },
    { title: 'Legal Remedies for Victims', tone: 'good', items: ['Report on 1930 within the "golden hour" to freeze funds', 'File a complaint at cybercrime.gov.in / FIR', 'Claim compensation under Sec 43/43A via an Adjudicating Officer', 'Seek takedown via platform grievance officers (IT Rules 2021)', 'Approach the bank ombudsman for unauthorised transactions'] },
  ],
  caseStudy: {
    title: 'Simulated Scenario: Fraudulent Messaging & Access',
    text: 'Rohan receives messages impersonating his bank and later finds unauthorised transactions and changed account details. Key indicators: deceptive communication, unauthorised login, account manipulation. Provisions that may be examined include IT Act 66C (identity theft) and 66D (personation), along with BNS cheating provisions, but no single law has a predetermined penalty. The facts, evidence and court process determine the outcome. Rohan’s best first step was to preserve evidence and report on 1930 immediately.',
  },
  lab: {
    key: 'u5-punish',
    title: 'Mission: Match the Offence to the Law',
    description: 'Read realistic scenarios and match each to the most relevant IT Act provision. Then explore penalties in detail and test your grasp of key legal principles. Educational simulation, not legal advice.',
    badge: { name: 'Legal Eagle', emoji: '🦅' },
    objectives: [
      { id: 'match', label: 'Match every scenario to the right provision', xp: 45 },
      { id: 'explore', label: 'Explore 6 penalty cards in detail', xp: 20 },
      { id: 'principles', label: 'Answer all legal-principle checks correctly', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Which section punishes identity theft?', options: ['Sec 66C', 'Sec 66F', 'Sec 4', 'Sec 79'], answer: 0, explain: 'Fraudulent use of another’s password, signature or unique ID.' },
    { q: 'Maximum punishment for cyberterrorism (Sec 66F)?', options: ['1 year', '3 years', 'Life imprisonment', 'Only a fine'], answer: 2, explain: 'It is one of the most serious offences under the Act.' },
    { q: 'What is the most critical step for a victim right after a cyber incident?', options: ['Post on social media', 'Delete all related messages', 'Preserve digital evidence and report officially', 'Change only personal passwords and do nothing else'], answer: 2, explain: 'Evidence and quick reporting make legal action possible.' },
    { q: 'An allegation of a cyber offence means…', options: ['The person is guilty', 'The matter must be proven in court; the accused is presumed innocent', 'Automatic jail', 'Nothing at all'], answer: 1, explain: 'Presumption of innocence applies.' },
    { q: 'Sec 43 provides mainly for…', options: ['Imprisonment', 'Compensation (civil liability)', 'Death penalty', 'Blocking websites'], answer: 1, explain: 'Sec 43 is civil. The criminal counterpart (with intent) is Sec 66.' },
  ],
  deep: {
    sections: [
      { title: 'Sec 43 vs Sec 66: the intent test', points: ['Sec 43 lists acts like unauthorised access, downloading data, introducing viruses, damage and denial of access.', 'If done without permission, the person must pay compensation (civil).', 'Sec 66: if any Sec 43 act is done dishonestly or fraudulently, it becomes a crime (up to 3 years and/or ₹5 lakh).', 'This is why the same action can lead to a civil claim, a criminal case, or both.'] },
      { title: 'How the IT Act works with the BNS', points: ['The IT Act covers technology-specific acts. The BNS covers the underlying crime (cheating, extortion, defamation, stalking).', 'BNS 318/319: cheating and cheating by personation. BNS 308: extortion. BNS 78: stalking, including electronic monitoring. BNS 356: defamation.', 'BNS 111: organised crime explicitly includes cyber-crimes by syndicates.', 'Special laws also apply: the POCSO Act for child abuse, and the PMLA for laundering of fraud proceeds.'] },
      { title: 'Procedure snapshot', points: ['Sec 77B: IT Act offences with 3 years’ punishment are bailable, and those with 3 years or more are cognizable.', 'Sec 77A: some offences are compoundable (can be settled) with court permission, except those affecting socio-economic conditions, women or children.', 'Sec 78: investigation by Inspector rank or above.', 'Courts weigh electronic evidence under the Bharatiya Sakshya Adhiniyam, 2023.'] },
    ],
    cases: [
      { year: '2004', title: 'Suhas Katti', text: 'Conviction under Sec 67 for obscene messages using a fake identity, completed within months.' },
      { year: '2005', title: 'Pune Citibank call-centre fraud', text: 'Call-centre employees misused customers’ banking details to steal money, highlighting insider data-misuse risks.' },
      { year: '2013', title: 'Sony Sambandh case', text: 'An early cybercrime conviction for online credit-card fraud on a gifting website, with the accused convicted for cheating.' },
      { year: '2015', title: 'Sec 66A struck down', text: 'Shreya Singhal v. Union of India. Prosecutions under 66A became invalid.' },
    ],
    myths: [
      { myth: 'Every cybercrime gets a fixed punishment.', fact: 'The law sets maximums. Courts decide the actual sentence based on facts and evidence.' },
      { myth: 'Sharing someone’s private photo "as a joke" isn’t a crime.', fact: 'Sec 66E (and others) can apply. Consent matters.' },
      { myth: 'If I’m accused, I’m automatically guilty.', fact: 'Everyone is presumed innocent until proven guilty in court.' },
    ],
    law: [
      { title: 'IT Act Sec 43, 65–67B, 72, 72A', text: 'Core civil and criminal cyber provisions.' },
      { title: 'BNS 2023', text: 'Cheating (318), personation (319), extortion (308), stalking (78), defamation (356), organised crime (111).' },
      { title: 'Report', text: '1930 · cybercrime.gov.in · local cyber police station. Consult a qualified lawyer for advice on specific cases.' },
    ],
    examNotes: [
      'Main laws: IT Act 2000 (amended 2008) plus BNS 2023 and special laws (POCSO, PMLA).',
      'Sec 43 = civil compensation. Sec 66 = criminal (dishonest/fraudulent intent).',
      '66B stolen resource · 66C identity theft · 66D personation · 66E privacy · 66F cyberterrorism (life).',
      '67 obscene · 67A sexually explicit · 67B child abuse material · 72A data disclosure.',
      'Procedure: 77A compounding, 77B bailable/cognizable, 78 Inspector rank.',
      'Principles: evidence matters, presumption of innocence, maximums not fixed sentences.',
    ],
    extraQuiz: [
      { q: 'Which BNS section explicitly includes cyber-crimes within organised crime?', options: ['Sec 111', 'Sec 302', 'Sec 420', 'Sec 66'], answer: 0, explain: 'BNS 111 covers organised crime, including cyber-crimes.' },
      { q: 'Which section covers publishing private images without consent?', options: ['66E', '66F', '43', '4'], answer: 0, explain: 'Violation of privacy.' },
    ],
  },
};
