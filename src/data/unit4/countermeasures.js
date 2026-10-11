import { ShieldCheck } from 'lucide-react';

export default {
  slug: 'countermeasures-pii',
  number: 7,
  title: 'Phishing and Identity Theft Countermeasures and PII',
  icon: ShieldCheck,
  color: '#34d399',
  difficulty: 'Intermediate',
  summary: 'Protecting personal information and securing digital identity.',
  tagline: 'Protect personal information. Secure your digital identity.',
  keywords: ['pii', 'personal data', 'privacy', 'dpdp', 'mfa', 'encryption', 'redaction', 'countermeasures', 'reporting'],
  intro: [
    'Personally Identifiable Information (PII) is any information that can identify a specific person, either on its own (Aadhaar number, passport number, biometrics) or when combined with other data (date of birth + PIN code + name).',
    'Protecting PII is the core of preventing identity theft. Countermeasures work at three levels: people (awareness, careful sharing), process (collect less, store safely, report quickly) and technology (MFA, encryption, filters, access control).',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Direct identifier', text: 'Identifies a person by itself, e.g. Aadhaar, PAN, passport number, fingerprint.' },
      { term: 'Indirect (quasi) identifier', text: 'Identifies a person only when combined, e.g. date of birth, PIN code, job title.' },
      { term: 'Data minimisation', text: 'Collecting only the personal data that is truly needed, for a stated purpose.' },
    ],
  },
  compare: {
    title: 'Sensitive vs Non-sensitive PII',
    left: { title: 'Sensitive PII', subtitle: 'Serious harm if leaked', points: ['Aadhaar, PAN, passport numbers', 'Bank account and card details', 'Passwords, biometrics', 'Health and medical records'] },
    right: { title: 'Non-sensitive PII', subtitle: 'Often public, but still personal', points: ['Name', 'Work email or phone', 'City, gender', 'Can become sensitive when combined with other data'] },
  },
  flow: {
    title: 'PII Lifecycle: Protect It at Every Stage',
    steps: [
      { title: 'Collect only what is needed', text: 'Ask for the minimum data with clear consent and purpose.' },
      { title: 'Store securely', text: 'Encrypt, restrict access, and mask what isn’t needed in full.' },
      { title: 'Retain appropriately', text: 'Keep data only as long as the purpose requires.' },
      { title: 'Dispose securely', text: 'Wipe or shred so it can’t be recovered.' },
    ],
  },
  table: {
    title: 'Defensive Action Comparison',
    columns: ['Risk', 'Preventive control', 'Detection', 'Response'],
    rows: [
      ['Suspicious messages', 'Email filtering, awareness training', 'User reports, filter alerts', 'Report and delete; never click or reply'],
      ['Credential theft', 'Unique passwords + MFA, password manager', 'New-login alerts', 'Change password, sign out all sessions'],
      ['Unauthorised account access', 'Access control, least privilege', 'Unusual-activity alerts', 'Lock account, contact provider'],
      ['Personal data exposure', 'Data minimisation, masking, encryption', 'Breach notifications, credit report checks', 'Freeze cards / credit, report, monitor'],
      ['Fraudulent transactions', 'Transaction limits, alerts', 'SMS / app alerts', 'Block card, call 1930, file at cybercrime.gov.in'],
    ],
  },
  cards: {
    title: 'Countermeasure Toolkit',
    items: [
      { title: 'Strong Passwords & Managers', text: 'Long, unique passwords for every account, stored in a password manager.' },
      { title: 'Multi-Factor Authentication', text: 'A second factor stops most account takeovers, and passkeys are best.' },
      { title: 'Email Filters & Secure Browsing', text: 'Spam filters, browser safe-browsing warnings and HTTPS-only mode.' },
      { title: 'Encryption & Access Control', text: 'Encrypt devices and files, and give access only to those who need it.' },
      { title: 'Privacy Awareness', text: 'Think before sharing documents, location or personal details online.' },
      { title: 'Incident Reporting', text: 'Report quickly: the first hour matters for freezing stolen money.' },
    ],
  },
  checklist: {
    title: 'Personal Security Checklist',
    items: [
      'Verify the sender before acting on any request',
      'Avoid unexpected attachments and links',
      'Use a unique password for every account',
      'Enable MFA on email, banking and social media',
      'Keep devices and apps updated',
      'Share personal information only when necessary',
      'Use masked Aadhaar where possible and lock biometrics',
      'Check bank statements and credit report regularly',
      'Report suspicious messages',
    ],
  },
  lists: [
    { title: 'Identity Theft Prevention', tone: 'good', items: ['Share Aadhaar/PAN copies only with a written purpose ("For KYC at XYZ only")', 'Download masked Aadhaar, and lock biometrics on mAadhaar / UIDAI', 'Check your credit report (free once a year from each bureau)', 'Shred documents with personal details', 'Use separate email for banking'] },
    { title: 'Warning Signs of Exposure', tone: 'warn', items: ['OTPs you didn’t request', 'Login alerts from unknown devices', 'Loans or cards you never applied for', 'Bank or credit-report entries you don’t recognise', 'Friends receiving messages "from you"'] },
    { title: 'Incident Response Steps', tone: 'info', items: ['Recognise the threat', 'Secure affected accounts (passwords, MFA, sessions)', 'Contact the bank / service provider', 'Report: 1930 and cybercrime.gov.in', 'Monitor for further misuse'] },
  ],
  caseStudy: {
    title: 'Case Study: The Over-Shared Photocopy',
    text: 'Neha gave an unmarked photocopy of her Aadhaar and PAN to a stranger for a "free SIM offer". Weeks later a loan app showed a ₹40,000 loan in her name. She found it while checking her credit report, reported it at cybercrime.gov.in, raised a dispute with the lender and credit bureau, and locked her Aadhaar biometrics. Writing a purpose and date across the copy, or using masked Aadhaar, would have made it far harder to misuse.',
  },
  lab: {
    key: 'u4-pii',
    title: 'Mission: PII Protection Challenge',
    description: 'Classify personal data like a privacy officer, then use a working redaction tool that automatically finds and masks Aadhaar, PAN, phone numbers, emails and card numbers in any text, entirely in your browser. Finish with a personal security audit.',
    badge: { name: 'Privacy Guardian', emoji: '🛡️' },
    objectives: [
      { id: 'classify', label: 'Classify every data item correctly', xp: 40 },
      { id: 'redact', label: 'Redact at least 4 different kinds of PII', xp: 40 },
      { id: 'audit', label: 'Score 100% on the personal security audit', xp: 30 },
    ],
  },
  quiz: [
    { q: 'Which of these is a direct identifier?', options: ['City of residence', 'Aadhaar number', 'Favourite colour', 'Gender'], answer: 1, explain: 'An Aadhaar number identifies one person by itself.' },
    { q: 'What does data minimisation mean?', options: ['Compressing files', 'Collecting only the personal data that is really needed', 'Deleting all data every day', 'Using smaller fonts'], answer: 1, explain: 'Less data collected means less data to leak. It is a key principle of the DPDP Act.' },
    { q: 'Why can non-sensitive PII still be risky?', options: ['It never is', 'Combined with other data it can identify and target a person', 'It is always illegal to share', 'It contains passwords'], answer: 1, explain: 'Name + date of birth + PIN code together can identify someone.' },
    { q: 'Someone made a fraudulent transaction from your account. What is the fastest reporting step in India?', options: ['Wait for the bank statement', 'Call 1930 / file at cybercrime.gov.in immediately', 'Post on social media', 'Change your phone wallpaper'], answer: 1, explain: 'Quick reports let banks freeze the money before it moves further.' },
    { q: 'Which control best protects an account even if its password is stolen?', options: ['A longer username', 'Multi-factor authentication', 'A new profile photo', 'Clearing cookies'], answer: 1, explain: 'The attacker also needs the second factor.' },
  ],
  deep: {
    sections: [
      { title: 'What counts as personal data in India', points: ['The DPDP Act, 2023 defines personal data as any data about an individual who is identifiable by or in relation to such data.', 'The older SPDI Rules, 2011 (under IT Act Sec 43A) list sensitive personal data: passwords, financial information, health and medical records, biometrics and sexual orientation.', 'Organisations ("data fiduciaries") must get consent, use data only for the stated purpose, protect it and report breaches.', 'Individuals ("data principals") have rights to access, correct and erase their data and to file grievances.'] },
      { title: 'Masking, tokenization and encryption', points: ['Masking hides part of the data (XXXX XXXX 1234). Masked Aadhaar shows only the last 4 digits.', 'Tokenization replaces data with a meaningless substitute (used for cards since 2022).', 'Encryption makes data unreadable without a key, both at rest (on disk) and in transit (HTTPS).', 'Use the weakest form that still works: if you only need the last 4 digits, don’t store the full number.'] },
      { title: 'Technical countermeasures for organisations', points: ['Email authentication (SPF, DKIM, DMARC) helps receiving servers reject spoofed mail from your domain.', 'Secure email gateways and browser protections block known malicious links and attachments.', 'Least-privilege access control and logging show who accessed PII and when.', 'Data Loss Prevention (DLP) tools stop PII leaving through email, uploads or USB drives.', 'Regular awareness training, with safe simulated exercises, reduces click rates over time.'] },
      { title: 'Identity theft recovery plan', points: ['Secure: change passwords from a clean device, enable MFA, sign out all sessions.', 'Freeze: block cards and UPI, and contact banks and lenders.', 'Report: 1930, cybercrime.gov.in, and a police complaint for documentation.', 'Dispute: raise disputes with the lender and the credit bureau for fraudulent accounts.', 'Monitor: check statements and credit reports for several months.'] },
    ],
    cases: [
      { year: '2017', title: 'Equifax breach', text: 'Personal data of about 147 million people, including social security numbers, was exposed through an unpatched web application, a lesson in patching and data minimisation.' },
      { year: '2018', title: 'GDPR comes into force', text: 'Europe’s data protection law set a global benchmark for consent, breach notification and heavy fines.' },
      { year: '2023', title: 'DPDP Act, India', text: 'India passed the Digital Personal Data Protection Act, with penalties of up to ₹250 crore for failing to protect personal data.' },
    ],
    myths: [
      { myth: 'My name and phone number aren’t worth protecting.', fact: 'Combined with other leaked data they enable targeted scams and SIM-swap fraud.' },
      { myth: 'Sharing an Aadhaar photocopy is harmless.', fact: 'Unmarked copies are misused for fake SIMs and loans. Mark the purpose and date, or use masked Aadhaar.' },
      { myth: 'Once data leaks, nothing can be done.', fact: 'Quick action (freezing, MFA, monitoring, reporting) greatly limits the damage.' },
    ],
    law: [
      { title: 'DPDP Act, 2023', text: 'Consent, purpose limitation, security safeguards and breach notification for personal data. Penalties up to ₹250 crore.' },
      { title: 'IT Act Sec 43A & 72A', text: 'Compensation for failing to protect sensitive data, and punishment for disclosing personal information in breach of contract.' },
      { title: 'IT Act Sec 66C', text: 'Identity theft: fraudulent use of another person’s password, electronic signature or unique identification.' },
      { title: 'Where to report', text: '1930 · cybercrime.gov.in · your bank · Chakshu (sancharsaathi.gov.in) for fraud calls/SMS · CERT-In for organisational incidents.' },
    ],
    examNotes: [
      'PII = information that identifies a person directly or in combination.',
      'Sensitive PII: Aadhaar, PAN, bank, passwords, biometrics, health. Non-sensitive: name, city, work email.',
      'PII lifecycle: collect minimum → store securely → retain appropriately → dispose securely.',
      'Countermeasures: passwords + MFA, filters, secure browsing, encryption, access control, awareness.',
      'Response: recognise → secure accounts → contact provider → report (1930) → monitor.',
      'Laws: DPDP Act 2023, IT Act 43A, 66C, 72A.',
    ],
    extraQuiz: [
      { q: 'What does masked Aadhaar show?', options: ['The full number', 'Only the last 4 digits', 'Only the photo', 'Nothing'], answer: 1, explain: 'Masking hides the first 8 digits to reduce misuse.' },
      { q: 'Which law sets India’s rules for personal data protection?', options: ['Motor Vehicles Act', 'Digital Personal Data Protection Act, 2023', 'Copyright Act', 'Companies Act'], answer: 1, explain: 'The DPDP Act governs how personal data is collected and protected.' },
      { q: 'What is the first step in the PII lifecycle?', options: ['Dispose', 'Collect only what is needed', 'Publish', 'Sell'], answer: 1, explain: 'Data you never collect can never leak.' },
    ],
  },
};
