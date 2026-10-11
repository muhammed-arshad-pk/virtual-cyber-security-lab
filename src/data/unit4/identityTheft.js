import { UserX } from 'lucide-react';

export default {
  slug: 'identity-theft',
  number: 6,
  title: 'Identity Theft: Types and Techniques',
  icon: UserX,
  color: '#facc15',
  difficulty: 'Intermediate',
  summary: 'How personal information is stolen and misused, and how victims detect and recover.',
  tagline: 'Your identity is valuable. Learn how it’s misused, and how to take it back.',
  keywords: ['identity theft', 'financial', 'medical', 'criminal', 'synthetic', 'account takeover', 'recovery'],
  intro: [
    'Identity theft is the fraudulent acquisition and use of someone’s personal information, such as their name, Aadhaar, PAN, bank details or login credentials, usually for financial gain.',
    'Victims often discover it late: a loan they never took, a credit score that suddenly drops, or a call from a recovery agent. Knowing the types and warning signs means you notice early and recover faster.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Identity theft', text: 'Stealing personal information and using it to impersonate the victim.' },
      { term: 'Account takeover (ATO)', text: 'A criminal gains control of an existing online account (email, bank, social media).' },
      { term: 'Synthetic identity', text: 'A fake identity built by mixing real data (e.g. a real ID number) with invented details.' },
    ],
  },
  compare: {
    title: 'New-Account Fraud vs Account Takeover',
    left: { title: 'New-account fraud', subtitle: 'Opening things in your name', points: ['Loans, credit cards, SIMs opened with your documents', 'You may not notice for months', 'Shows up on your credit report'] },
    right: { title: 'Account takeover', subtitle: 'Hijacking what you already have', points: ['Your existing email, bank or social account is taken over', 'Password and contact details changed', 'Shows up as login alerts and lockouts'] },
  },
  flow: {
    title: 'Identity Theft Lifecycle',
    steps: [
      { title: 'Information exposure', text: 'Personal data leaks through breaches, over-sharing, lost documents or deception.' },
      { title: 'Unauthorised use', text: 'Someone uses the data to open accounts or log in as the victim.' },
      { title: 'Detection', text: 'Unfamiliar transactions, alerts or credit-report entries appear.' },
      { title: 'Recovery', text: 'Secure accounts, report, dispute and monitor until resolved.' },
    ],
  },
  table: {
    title: 'Types of Identity Theft',
    columns: ['Type', 'What happens', 'Warning signs', 'Protective measures'],
    rows: [
      ['Financial', 'Loans, cards or purchases in the victim’s name', 'Unknown loans, credit-score drop, recovery calls', 'Credit-report checks, alerts, masked documents'],
      ['Medical', 'Someone uses your identity or insurance for treatment', 'Insurance claims or bills for care you never received', 'Review insurance statements, guard health IDs'],
      ['Criminal', 'An offender gives your identity when caught', 'Summons or records for offences you didn’t commit', 'Report immediately, keep ID-theft complaint copies'],
      ['Synthetic', 'Real data (e.g. an ID number) mixed with fake details', 'Accounts linked to your number but not your name', 'Lock biometrics, monitor ID usage'],
      ['Online / account takeover', 'Existing email, bank or social account hijacked', 'Login alerts, password-reset emails you didn’t request', 'Unique passwords, MFA, session checks'],
    ],
  },
  cards: {
    title: 'How Identities Get Exposed',
    items: [
      { title: 'Data Breaches', text: 'Companies holding your data are breached and records are sold.' },
      { title: 'Deceptive Messages & Calls', text: 'Victims are tricked into sharing details, OTPs or documents.' },
      { title: 'Document Misuse', text: 'Unmarked Aadhaar/PAN photocopies used for SIMs or loans.' },
      { title: 'Lost or Stolen Devices', text: 'Phones and wallets give access to accounts and IDs.' },
      { title: 'Over-sharing Online', text: 'Birthdays, addresses and family names posted publicly.' },
      { title: 'SIM Swap', text: 'Taking over a phone number to receive OTPs.' },
    ],
  },
  lists: [
    { title: 'Warning Signs', tone: 'warn', items: ['Unfamiliar financial transactions', 'Unexpected account or login alerts', 'Unknown account changes (email, phone, address)', 'Unrecognised credit activity or loans', 'Unexpected OTPs'] },
    { title: 'Prevention', tone: 'good', items: ['Use masked Aadhaar and lock biometrics', 'Mark purpose and date on document copies', 'Unique passwords + MFA', 'Check your credit report yearly', 'Shred papers with personal details'] },
    { title: 'If It Happens', tone: 'info', items: ['Secure email first, since it resets everything else', 'Call your bank and block cards / UPI', 'Report: 1930 and cybercrime.gov.in', 'Dispute fraudulent accounts with the lender and credit bureau', 'Keep copies of every complaint'] },
  ],
  caseStudy: {
    title: 'Case Study: The Synthetic Identity Case',
    text: 'A lender noticed several small loans that were repaid on time and then one large loan that defaulted. All were linked to the same PAN, but with a different name, photo and address. The PAN belonged to a retired teacher who had once shared an unmarked copy with a "pension update agent". Investigators traced the synthetic profile and the teacher filed disputes with the credit bureau to clean her report.',
  },
  lab: {
    key: 'u4-idtheft',
    title: 'Mission: Investigate Case File #889',
    description: 'A worried citizen hands you their alerts, bank statement and credit report. Flag every suspicious entry, identify which types of identity theft are happening, then put the recovery plan in the right order.',
    badge: { name: 'Identity Investigator', emoji: '🔎' },
    objectives: [
      { id: 'flags', label: 'Flag every suspicious entry without false alarms', xp: 40 },
      { id: 'types', label: 'Identify the identity-theft types correctly', xp: 30 },
      { id: 'recovery', label: 'Order the recovery plan correctly', xp: 30 },
    ],
  },
  quiz: [
    { q: 'What is identity theft?', options: ['Losing your ID card', 'Fraudulently obtaining and using someone’s personal information', 'Forgetting your password', 'Changing your name legally'], answer: 1, explain: 'It’s about misuse of personal data to impersonate someone.' },
    { q: 'Insurance claims appear for treatment you never received. Which type is this?', options: ['Financial', 'Medical identity theft', 'Criminal', 'None'], answer: 1, explain: 'Someone is using your identity or insurance for healthcare.' },
    { q: 'What is a synthetic identity?', options: ['A robot', 'A fake identity mixing real data (like an ID number) with invented details', 'A nickname', 'A stage name'], answer: 1, explain: 'Synthetic identities are hard to detect because part of the data is real.' },
    { q: 'Which account should you secure first after identity theft?', options: ['Gaming account', 'Your primary email', 'Music app', 'Food delivery app'], answer: 1, explain: 'Email can reset passwords for almost everything else.' },
    { q: 'How can you spot a loan opened in your name?', options: ['Check your credit report', 'Check the weather', 'Restart your phone', 'Change your wallpaper'], answer: 0, explain: 'Credit reports list every loan and card linked to your PAN.' },
  ],
  deep: {
    sections: [
      { title: 'Why identities are valuable to criminals', points: ['They open credit (loans, cards, BNPL) that the victim gets blamed for.', 'They pass KYC to open "mule" bank accounts that move stolen money.', 'They get SIM cards in someone else’s name to hide their own identity.', 'They take over accounts with stored money, rewards or contacts to scam further.'] },
      { title: 'Detection: where the evidence appears', points: ['Bank and card statements: unknown debits, small "test" transactions.', 'Credit report (CIBIL, Experian, Equifax, CRIF High Mark): unknown loans, enquiries or addresses.', 'Email and app alerts: password resets, new-device logins, changed phone numbers.', 'Aadhaar authentication history (on the UIDAI site) shows when and where your Aadhaar was used.', 'TAFCOP on Sanchar Saathi shows every mobile number registered in your name.'] },
      { title: 'Recovery step by step', points: ['Secure: change passwords from a clean device, enable MFA, remove unknown devices.', 'Contain: block cards and UPI, and lock Aadhaar biometrics.', 'Report: 1930 and cybercrime.gov.in, plus a police complaint for an acknowledgement.', 'Dispute: write to lenders and credit bureaus with the complaint copy to remove fraudulent accounts.', 'Disconnect: report unknown SIMs in your name on Sanchar Saathi (TAFCOP).', 'Monitor: check statements and credit reports every month for at least six months.'] },
      { title: 'Children and elderly: special risks', points: ['Children’s identities can be misused for years before anyone checks.', 'Elderly people are targeted with "pension", "KYC" and "insurance" pretexts.', 'Families should agree never to share documents or OTPs over the phone, and to double-check with each other.'] },
    ],
    cases: [
      { year: '2017', title: 'Equifax breach', text: 'Data of about 147 million people was exposed, enabling identity theft for years. It is a reminder that you can be exposed without doing anything wrong.' },
      { year: '2019', title: 'Collection #1 credential dump', text: 'Hundreds of millions of leaked email/password pairs fuelled account takeovers across the web.' },
      { year: '2023', title: 'Sanchar Saathi & TAFCOP', text: 'India made it easy to check and report mobile connections taken in your name, a key defence against SIMs obtained with stolen documents.' },
    ],
    myths: [
      { myth: 'Identity theft only happens to rich people.', fact: 'Anyone with a PAN, Aadhaar or bank account can be targeted, including students and pensioners.' },
      { myth: 'If my bank hasn’t called, I’m fine.', fact: 'New loans in your name may not involve your bank at all. Check your credit report.' },
      { myth: 'Once my identity is stolen I’m liable for the debts.', fact: 'With timely reports and disputes, fraudulent accounts can be removed from your record.' },
    ],
    law: [
      { title: 'IT Act Sec 66C', text: 'Identity theft: fraudulently using another person’s password, electronic signature or unique identification. Up to 3 years and a fine up to ₹1 lakh.' },
      { title: 'IT Act Sec 66D', text: 'Cheating by personation using a computer resource.' },
      { title: 'BNS Sec 319', text: 'Cheating by personation, pretending to be another person.' },
      { title: 'Where to report', text: '1930 · cybercrime.gov.in · your bank · credit bureau dispute · Sanchar Saathi (TAFCOP) for SIMs.' },
    ],
    examNotes: [
      'Identity theft = acquiring and misusing personal data to impersonate someone.',
      'Types: financial, medical, criminal, synthetic, online/account takeover.',
      'Exposure: breaches, deception, document misuse, lost devices, over-sharing, SIM swap.',
      'Lifecycle: exposure → unauthorised use → detection → recovery.',
      'Warning signs: unknown transactions, alerts, account changes, credit activity, OTPs.',
      'Law: IT Act 66C, 66D, and BNS 319.',
    ],
    extraQuiz: [
      { q: 'Which Sanchar Saathi feature shows mobile numbers registered in your name?', options: ['CEIR', 'TAFCOP', 'UPI', 'DigiLocker'], answer: 1, explain: 'TAFCOP lets you see and report connections you didn’t take.' },
      { q: 'Which section of the IT Act deals with identity theft?', options: ['66C', '43A', '67', '80'], answer: 0, explain: 'Sec 66C covers fraudulent use of another person’s identity information.' },
      { q: 'Your email password was changed without your action. What type of identity theft is this?', options: ['Medical', 'Account takeover', 'Criminal', 'Synthetic'], answer: 1, explain: 'Someone has hijacked an existing account.' },
    ],
  },
};
