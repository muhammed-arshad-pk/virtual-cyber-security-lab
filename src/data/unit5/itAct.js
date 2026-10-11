import { Scale } from 'lucide-react';

export default {
  slug: 'indian-it-act-2000',
  number: 1,
  title: 'The Indian IT Act, 2000',
  icon: Scale,
  color: '#22d3ee',
  difficulty: 'Intermediate',
  disclaimer: true,
  summary: 'India’s primary cyber law: electronic records, signatures, e-governance and cybercrime provisions.',
  tagline: 'The legal foundation for trust, commerce and justice in India’s digital world.',
  keywords: ['it act', 'information technology act', 'cyber law', 'electronic records', 'section 43', 'section 66', 'first schedule', 'controller of certifying authorities'],
  intro: [
    'The Information Technology Act, 2000 is India’s primary law for electronic commerce and cybercrime. It was passed in 2000 and came into force on 17 October 2000. It is based on the UNCITRAL Model Law on Electronic Commerce (1996).',
    'It does three big jobs: it gives legal recognition to electronic records and signatures, enables e-governance and e-contracts, and defines cyber offences with penalties. It was substantially amended in 2008 and is supported by rules such as the IT Rules 2011 and 2021.',
  ],
  definitions: {
    title: 'Important Definitions (Sec 2)',
    items: [
      { term: 'Computer resource', text: 'A computer, computer system, network, data, database or software.' },
      { term: 'Electronic record', text: 'Data, a record or data generated, image or sound stored, received or sent in electronic form.' },
      { term: 'Intermediary', text: 'Anyone who receives, stores or transmits electronic records for others: telecoms, ISPs, search engines, social media, marketplaces, cyber cafés.' },
    ],
  },
  compare: {
    title: 'Civil Penalties vs Criminal Offences',
    left: { title: 'Civil (Chapter IX)', subtitle: 'Compensation', points: ['Sec 43: unauthorised access, damage, data theft', 'Sec 43A: failure to protect sensitive data', 'Decided by Adjudicating Officers (claims up to ₹5 crore)', 'Victim receives compensation'] },
    right: { title: 'Criminal (Chapter XI)', subtitle: 'Imprisonment / fine', points: ['Sec 65–67B, 66C–66F, 72, 72A …', 'Investigated by police (Inspector rank and above)', 'Tried in criminal courts', 'Punishment for the offender'] },
  },
  flow: {
    title: 'How the IT Act Works in Practice',
    steps: [
      { title: 'Recognition', text: 'Electronic records and signatures are legally valid (Sec 4, 5, 10A).' },
      { title: 'Trust infrastructure', text: 'Controller of Certifying Authorities licenses CAs that issue signature certificates.' },
      { title: 'Protection', text: 'Offences and penalties deter misuse of computer resources.' },
      { title: 'Enforcement', text: 'Police, adjudicating officers, CERT-In and courts apply the law.' },
    ],
  },
  table: {
    title: 'Key Sections at a Glance',
    columns: ['Section', 'Subject', 'Type'],
    rows: [
      ['Sec 4 & 5', 'Legal recognition of electronic records and signatures', 'Recognition'],
      ['Sec 10A', 'Validity of contracts formed electronically', 'E-commerce'],
      ['Sec 43 / 43A', 'Damage to computer systems / failure to protect data', 'Civil compensation'],
      ['Sec 65', 'Tampering with computer source documents', 'Offence'],
      ['Sec 66, 66B–66F', 'Computer offences, identity theft, personation, privacy, cyberterrorism', 'Offence'],
      ['Sec 67, 67A, 67B', 'Obscene, sexually explicit and child-abuse material', 'Offence'],
      ['Sec 69, 69A', 'Interception / blocking powers of government', 'Powers'],
      ['Sec 70B', 'CERT-In as national incident-response agency', 'Institution'],
      ['Sec 75', 'Applies to offences outside India involving Indian computers', 'Jurisdiction'],
      ['Sec 79', 'Safe harbour for intermediaries that follow due diligence', 'Intermediary liability'],
    ],
  },
  cards: {
    title: 'Objectives of the IT Act',
    items: [
      { title: 'Legal Recognition', text: 'Electronic records and signatures have the same validity as paper.' },
      { title: 'E-Commerce', text: 'Contracts formed online are enforceable.' },
      { title: 'E-Governance', text: 'Government filings and records can be electronic.' },
      { title: 'Trust Framework', text: 'Certifying Authorities and digital signature certificates.' },
      { title: 'Cybercrime Deterrence', text: 'Clear offences and penalties for misuse.' },
      { title: 'Data Protection', text: 'Duties on companies handling sensitive personal data (Sec 43A).' },
    ],
  },
  lists: [
    { title: 'Roles under the Act', tone: 'info', items: ['Individuals: use resources lawfully, report offences', 'Organisations: reasonable security practices, data protection', 'Intermediaries: due diligence, grievance redressal', 'Controller of Certifying Authorities (CCA): licenses and regulates CAs', 'CERT-In: national incident response', 'Adjudicating officers & courts: decide disputes and offences'] },
    { title: 'Limitations', tone: 'warn', items: ['Not designed for fast-moving tech (AI, crypto assets, deepfakes)', 'Cross-border enforcement depends on other countries', 'Many offences carry relatively low punishment', 'Low awareness among citizens and some officials', 'Privacy and data protection now largely moved to the DPDP Act, 2023'] },
    { title: 'Excluded Documents (First Schedule)', tone: 'good', items: ['Negotiable instruments (other than a cheque)', 'Power of attorney', 'Trust deeds', 'Wills and testamentary dispositions', 'Contracts for sale or conveyance of immovable property'] },
  ],
  caseStudy: {
    title: 'Case Study: State of Tamil Nadu v. Suhas Katti (2004)',
    text: 'The accused posted obscene, defamatory messages about a woman in Yahoo groups, using a fake email account in her name. The Chennai Cyber Crime Cell traced him, and in 2004 a court convicted him under Sec 67 of the IT Act along with IPC provisions. It is widely cited as one of the first convictions under the IT Act, and it showed that electronic evidence could secure a conviction quickly.',
  },
  lab: {
    key: 'u5-itact',
    title: 'Mission: IT Act Navigator',
    description: 'Explore a searchable index of key IT Act sections, decide whether the Act applies in tricky scenarios, and sort documents that can or cannot be executed electronically under the First Schedule.',
    badge: { name: 'Cyber Law Scholar', emoji: '⚖️' },
    objectives: [
      { id: 'explore', label: 'Open 8 different sections in the navigator', xp: 25 },
      { id: 'scope', label: 'Decide IT Act applicability correctly in every scenario', xp: 35 },
      { id: 'schedule', label: 'Sort every document under the First Schedule correctly', xp: 30 },
    ],
  },
  quiz: [
    { q: 'When did the IT Act, 2000 come into force?', options: ['15 August 1947', '17 October 2000', '1 January 2010', '26 January 2000'], answer: 1, explain: 'Notified and in force from 17 October 2000.' },
    { q: 'The IT Act was based on which international model?', options: ['GDPR', 'UNCITRAL Model Law on Electronic Commerce', 'Budapest Convention', 'HIPAA'], answer: 1, explain: 'The UNCITRAL Model Law (1996) inspired the Act.' },
    { q: 'Which document still cannot be executed electronically under the First Schedule?', options: ['An online shopping contract', 'A will', 'An email', 'An e-ticket'], answer: 1, explain: 'Wills, trusts, powers of attorney, negotiable instruments (except cheques) and immovable-property sale contracts are excluded.' },
    { q: 'Which section gives legal recognition to electronic records?', options: ['Sec 4', 'Sec 66F', 'Sec 79', 'Sec 67'], answer: 0, explain: 'Sec 4: information in electronic form satisfies legal requirements for writing.' },
    { q: 'Sec 75 says the Act applies to offences committed outside India if…', options: ['Never', 'The act involves a computer, system or network located in India', 'The offender is Indian only', 'Only for banks'], answer: 1, explain: 'This gives the Act extra-territorial reach.' },
  ],
  deep: {
    sections: [
      { title: 'Structure of the Act', points: ['13 chapters, 94 sections and schedules (as amended).', 'Chapters II–IV: digital and electronic signatures, electronic governance, attribution and acknowledgement of records.', 'Chapters VI–VIII: Controller and Certifying Authorities, signature certificates and subscriber duties.', 'Chapter IX: penalties and adjudication (Sec 43–47). Chapter XI: offences (Sec 65–78).', 'Chapter XII: intermediary liability (Sec 79). Chapter XIIA: examiner of electronic evidence (Sec 79A).'] },
      { title: 'Electronic governance & e-contracts', points: ['Sec 6: government filings, licences and payments may be electronic.', 'Sec 7: retention of records in electronic form is valid if accessible and unaltered.', 'Sec 10A (added 2008): a contract is not invalid just because it was formed electronically.', 'Sec 11–13: attribution, acknowledgement, and time and place of dispatch and receipt of electronic records.'] },
      { title: 'Procedure & institutions', points: ['Sec 46: Adjudicating Officers (usually state IT Secretaries) handle Sec 43 claims up to ₹5 crore. Higher claims go to civil courts.', 'Appeals go to the Appellate Tribunal (TDSAT since 2017).', 'Sec 78: offences investigated by police not below Inspector rank.', 'Sec 77B: offences punishable with 3 years are bailable, and those with 3 years or more are cognizable.', 'Sec 81: the Act has overriding effect over inconsistent laws.'] },
      { title: 'Rules made under the Act', points: ['SPDI Rules 2011 (Sec 43A): reasonable security practices for sensitive personal data.', 'Intermediary Guidelines & Digital Media Ethics Code Rules 2021: grievance officers, takedown timelines.', 'CERT-In Directions 2022: incident reporting within 6 hours, 180-day log retention.', 'Blocking Rules 2009 (Sec 69A) and Interception Rules 2009 (Sec 69).'] },
    ],
    cases: [
      { year: '2000', title: 'IT Act enacted', text: 'India became one of the early countries with a dedicated cyber law, enabling e-commerce and e-governance.' },
      { year: '2004', title: 'Suhas Katti conviction', text: 'An early conviction under Sec 67 for obscene messages posted using a fake identity.' },
      { year: '2008', title: 'Avnish Bajaj (Bazee.com)', text: 'A marketplace CEO was prosecuted over a listing by a user. The debate shaped the 2008 safe-harbour provision (Sec 79).' },
      { year: '2015', title: 'Shreya Singhal v. Union of India', text: 'The Supreme Court struck down Sec 66A (offensive messages) as unconstitutional for violating free speech.' },
    ],
    myths: [
      { myth: 'The IT Act only deals with hacking.', fact: 'It is equally about recognising e-records, e-signatures, e-contracts and e-governance.' },
      { myth: 'Sec 66A is still used to arrest people for posts.', fact: 'It was struck down in 2015. Any FIR under it is invalid.' },
      { myth: 'Any document can now be signed online.', fact: 'The First Schedule still excludes wills, trusts, powers of attorney, and others.' },
    ],
    law: [
      { title: 'IT Act, 2000 (amended 2008)', text: 'The core cyber law. Read the official text on the India Code portal (indiacode.nic.in).' },
      { title: 'Bharatiya Nyaya Sanhita, 2023', text: 'The new penal code (replacing the IPC from 1 July 2024), used alongside the IT Act for cheating, stalking, organised crime and more.' },
      { title: 'DPDP Act, 2023', text: 'The dedicated law for personal data protection.' },
    ],
    examNotes: [
      'IT Act 2000: in force from 17 Oct 2000, based on the UNCITRAL Model Law, amended in 2008.',
      'Objectives: legal recognition, e-commerce, e-governance, trust framework, cybercrime deterrence.',
      'Key sections: 4, 5 (recognition), 10A (e-contracts), 43/43A (civil), 65–67B (offences), 69/69A, 70B, 75, 79.',
      'First Schedule exclusions: negotiable instruments (except cheques), POA, trust, will, immovable-property sale.',
      'Authorities: CCA, CAs, CERT-In, adjudicating officers, police (Inspector+), TDSAT.',
      'Limitations: new technologies, cross-border enforcement, awareness.',
    ],
    extraQuiz: [
      { q: 'Who licenses Certifying Authorities in India?', options: ['RBI', 'Controller of Certifying Authorities (CCA)', 'SEBI', 'TRAI'], answer: 1, explain: 'The CCA operates the Root CA of India and licenses CAs.' },
      { q: 'Minimum police rank to investigate IT Act offences (Sec 78)?', options: ['Constable', 'Inspector', 'DGP', 'Head Constable'], answer: 1, explain: 'The 2008 amendment lowered it from DSP to Inspector.' },
      { q: 'Which case struck down Sec 66A?', options: ['Suhas Katti', 'Shreya Singhal v. Union of India', 'Anvar P.V.', 'Puttaswamy'], answer: 1, explain: 'Decided by the Supreme Court in 2015.' },
    ],
  },
};
