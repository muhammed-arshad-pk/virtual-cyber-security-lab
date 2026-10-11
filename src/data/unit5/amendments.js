import { FileDiff } from 'lucide-react';

export default {
  slug: 'it-act-amendments',
  number: 4,
  title: 'Amendments to the Indian IT Act',
  icon: FileDiff,
  color: '#fb923c',
  difficulty: 'Intermediate',
  disclaimer: true,
  summary: 'The IT (Amendment) Act, 2008 and later developments that reshaped Indian cyber law.',
  tagline: 'How Indian cyber law evolved to keep up with new crimes and new technology.',
  keywords: ['amendment 2008', 'section 66a', 'section 43a', 'section 79', 'intermediary', 'cyberterrorism', 'electronic signature', 'shreya singhal'],
  intro: [
    'The original IT Act, 2000 focused mainly on e-commerce. Within a few years it was clear that it missed many new crimes: identity theft, phishing, child sexual abuse material online, cyberterrorism and data leaks by companies. It was also unclear how far platforms were liable for user content.',
    'The Information Technology (Amendment) Act, 2008, in force from 27 October 2009, was a major overhaul. It made signatures technology-neutral, added new offences (66A–66F, 67A, 67B), introduced data-protection duties (43A, 72A), safe harbour for intermediaries (79), and strengthened institutions like CERT-In.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Technology neutrality', text: 'Law that recognises any reliable method, not just one technology (e.g. "electronic signature").' },
      { term: 'Safe harbour', text: 'Protection for intermediaries from liability for user content if they follow due diligence.' },
      { term: 'Due diligence', text: 'The reasonable steps intermediaries must take, as set out in rules (e.g. IT Rules 2021).' },
    ],
  },
  compare: {
    title: 'IT Act 2000 vs After the 2008 Amendment',
    left: { title: 'Original (2000)', subtitle: 'E-commerce focus', points: ['Only "digital signatures" (one technology)', 'Sec 66 called "hacking" with a narrow definition', 'No identity-theft or cyberterrorism offences', 'Unclear intermediary liability', 'Investigation by DSP rank'] },
    right: { title: 'Amended (2008)', subtitle: 'Cybercrime & data focus', points: ['Electronic signatures (Sec 3A), technology neutral', 'Sec 66 broadened to "computer related offences"', 'New Sec 66B–66F, 67A, 67B', 'Sec 79 safe harbour with due diligence', 'Investigation by Inspector rank'] },
  },
  flow: {
    title: 'Evolution of Indian Cyber Law',
    steps: [
      { title: '2000: Foundation', text: 'E-records, digital signatures, basic offences.' },
      { title: '2008: Overhaul', text: 'New offences, data protection, intermediary rules, CERT-In.' },
      { title: '2011–2022: Rules & rulings', text: 'SPDI Rules, Shreya Singhal (66A struck), IT Rules 2021, CERT-In directions.' },
      { title: '2023–24: New laws', text: 'DPDP Act, BNS, BNSS and BSA work alongside the IT Act.' },
    ],
  },
  table: {
    title: 'Major Changes Introduced in 2008',
    columns: ['Area', 'Provision', 'What changed'],
    rows: [
      ['Signatures', 'Sec 3A, Second Schedule', 'Electronic signatures recognised (later Aadhaar eSign)'],
      ['E-contracts', 'Sec 10A', 'Explicit validity of contracts formed electronically'],
      ['Data protection', 'Sec 43A, 72A', 'Compensation for negligent data handling, and punishment for disclosure in breach of contract'],
      ['Offences', 'Sec 66, 66B–66E', 'Computer offences, stolen resources, identity theft, personation, privacy violation'],
      ['Cyberterrorism', 'Sec 66F', 'Up to life imprisonment for threatening sovereignty and security'],
      ['Obscenity', 'Sec 67A, 67B', 'Sexually explicit material, and child sexual abuse material'],
      ['Intermediaries', 'Sec 79, 67C', 'Safe harbour if due diligence is followed; data-retention duty'],
      ['Institutions & powers', 'Sec 69A, 69B, 70A, 70B', 'Blocking, traffic monitoring, NCIIPC, CERT-In'],
      ['Procedure', 'Sec 77B, 78', 'Bailable/cognizable rules, Inspector-rank investigation'],
    ],
  },
  cards: {
    title: 'Why Amendments Were Needed',
    items: [
      { title: 'New Crimes', text: 'Phishing, identity theft and online abuse weren’t clearly covered.' },
      { title: 'Technology Change', text: 'Signature methods beyond PKI were emerging.' },
      { title: 'Corporate Data Leaks', text: 'BPO data-theft scandals showed a gap in data protection.' },
      { title: 'Platform Liability', text: 'The Bazee.com case showed platforms needed clear rules.' },
      { title: 'National Security', text: 'The need to address cyberterrorism and protect critical infrastructure.' },
      { title: 'Enforcement', text: 'Too few officers at DSP rank to investigate.' },
    ],
  },
  lists: [
    { title: 'Impact & Significance', tone: 'good', items: ['Clear offences for identity theft and personation', 'Corporate accountability for data (43A, 72A)', 'Predictable rules for platforms (Sec 79)', 'Stronger institutional set-up (CERT-In, NCIIPC)', 'Faster investigation with more eligible officers'] },
    { title: 'Criticism', tone: 'warn', items: ['Sec 66A was vague and misused, then struck down in 2015', 'Many offences made bailable, which weakened deterrence', 'Wide surveillance and blocking powers (69, 69A)', 'Data protection was still weak until the DPDP Act, 2023'] },
  ],
  caseStudy: {
    title: 'Case Study: Shreya Singhal v. Union of India (2015)',
    text: 'Two young women were arrested in 2012 over a Facebook post questioning a city shutdown, under Sec 66A (sending "offensive" messages). Law student Shreya Singhal challenged the section. In 2015 the Supreme Court struck down Sec 66A entirely, holding that terms like "grossly offensive" and "annoying" were too vague and chilled free speech under Article 19(1)(a). The Court also read down Sec 79: intermediaries must take down content only on a court order or government notification.',
  },
  lab: {
    key: 'u5-amend',
    title: 'Mission: Then vs Now',
    description: 'Flip between the 2000 and 2008 versions of the Act to see what changed in each area. Then decide which version of the law covers each real-world scenario, and explore the timeline of later developments.',
    badge: { name: 'Law Historian', emoji: '📜' },
    objectives: [
      { id: 'compare', label: 'Compare every area before and after 2008', xp: 25 },
      { id: 'which', label: 'Classify every scenario correctly', xp: 40 },
      { id: 'timeline', label: 'Explore every milestone on the timeline', xp: 20 },
    ],
  },
  quiz: [
    { q: 'When did the IT (Amendment) Act, 2008 come into force?', options: ['17 October 2000', '27 October 2009', '1 July 2024', '15 August 2015'], answer: 1, explain: 'It was passed in late 2008 and notified in October 2009.' },
    { q: 'Which section was struck down by the Supreme Court in 2015?', options: ['Sec 43', 'Sec 66A', 'Sec 66C', 'Sec 79'], answer: 1, explain: 'Shreya Singhal v. Union of India.' },
    { q: 'Which section makes companies pay compensation for failing to protect sensitive personal data?', options: ['Sec 43A', 'Sec 66F', 'Sec 67', 'Sec 3'], answer: 0, explain: 'Sec 43A was added in 2008.' },
    { q: 'What does Sec 79 provide?', options: ['Cyberterrorism punishment', 'Safe harbour for intermediaries following due diligence', 'Digital signature validity', 'Blocking powers'], answer: 1, explain: 'Platforms aren’t liable for user content if they follow the rules.' },
    { q: 'Which amendment-era section punishes identity theft?', options: ['Sec 66C', 'Sec 65', 'Sec 4', 'Sec 81'], answer: 0, explain: 'Up to 3 years and a fine up to ₹1 lakh.' },
  ],
  deep: {
    sections: [
      { title: 'Privacy and data-related provisions', points: ['Sec 43A: a body corporate that is negligent in protecting sensitive personal data must pay compensation.', 'Sec 72A: punishes disclosure of personal information obtained under a contract without consent (up to 3 years / ₹5 lakh).', 'Sec 66E: punishes capturing or publishing images of private areas without consent.', 'The SPDI Rules, 2011 defined sensitive data and "reasonable security practices" (e.g. ISO 27001).'] },
      { title: 'Intermediary liability journey', points: ['2000: Sec 79 gave limited protection to network service providers.', '2008: broad safe harbour if the intermediary doesn’t initiate, select or modify content and follows due diligence.', '2011: first Intermediary Guidelines Rules.', '2015: Shreya Singhal read down takedown duties to court or government orders.', '2021: IT Rules 2021 added grievance officers, 36-hour takedown on orders, 24-hour removal of non-consensual intimate images, and extra duties for significant social-media intermediaries.'] },
      { title: 'Cyberterrorism and critical infrastructure', points: ['Sec 66F: acts that threaten unity, integrity, security or sovereignty, through denial of access, unauthorised access or introducing contaminants, are punishable with imprisonment up to life.', 'Sec 70: government can declare "protected systems", with unauthorised access punishable by up to 10 years.', 'Sec 70A: NCIIPC protects critical information infrastructure.', 'Sec 70B: CERT-In as the national incident-response agency.'] },
      { title: 'After 2008: the newer legal landscape', points: ['2017: Puttaswamy judgment declared privacy a fundamental right.', '2022: CERT-In directions require incident reporting within 6 hours.', '2023: the DPDP Act gave India a dedicated data-protection law.', '2023–24: the BNS, BNSS and BSA replaced the IPC, CrPC and Evidence Act. For example, BSA Sec 63 now governs electronic evidence certificates.'] },
    ],
    cases: [
      { year: '2008', title: 'Amendment passed', text: 'Parliament passed the IT (Amendment) Bill in December 2008, in the wake of growing cybercrime and security concerns.' },
      { year: '2009', title: 'In force', text: 'The amendment came into force on 27 October 2009.' },
      { year: '2015', title: 'Sec 66A struck down', text: 'Shreya Singhal v. Union of India protected online free speech.' },
      { year: '2021', title: 'IT Rules 2021', text: 'New due-diligence obligations for intermediaries and digital media.' },
      { year: '2023', title: 'DPDP Act', text: 'A dedicated personal-data-protection law, complementing Sec 43A.' },
    ],
    myths: [
      { myth: 'The IT Act has stayed unchanged since 2000.', fact: 'It was overhauled in 2008, shaped by court rulings, and complemented by many rules and new laws.' },
      { myth: 'Platforms are never responsible for content.', fact: 'Safe harbour applies only if they follow due diligence and act on lawful orders.' },
      { myth: 'Sec 66A can still be used for "offensive" posts.', fact: 'It is unconstitutional and void since 2015.' },
    ],
    law: [
      { title: 'IT (Amendment) Act, 2008', text: 'Major overhaul. In force from 27 October 2009.' },
      { title: 'IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021', text: 'Current due-diligence obligations for intermediaries.' },
      { title: 'DPDP Act, 2023', text: 'Dedicated personal data protection law.' },
    ],
    examNotes: [
      'Need: new crimes, technology neutrality, data protection, platform liability, security, enforcement.',
      'IT (Amendment) Act 2008, in force from 27 Oct 2009.',
      'Added: 3A, 10A, 43A, 66 (broadened), 66A–66F, 67A, 67B, 67C, 69A, 69B, 70A, 70B, 72A, 77B; Sec 78 changed to Inspector rank.',
      'Sec 79: safe harbour plus due diligence. Shreya Singhal (2015) struck down 66A and read down 79.',
      'Later: IT Rules 2021, CERT-In 2022, DPDP 2023, BNS/BNSS/BSA 2023.',
    ],
    extraQuiz: [
      { q: 'Which agency was given statutory status by Sec 70B?', options: ['NCIIPC', 'CERT-In', 'TRAI', 'UIDAI'], answer: 1, explain: 'CERT-In is the national incident-response agency.' },
      { q: 'Under IT Rules 2021, non-consensual intimate images must be removed within…', options: ['24 hours of a complaint', '30 days', '1 year', 'Never'], answer: 0, explain: 'A fast timeline protects victims.' },
    ],
  },
};
