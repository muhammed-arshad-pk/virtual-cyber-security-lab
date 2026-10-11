import { PackageSearch } from 'lucide-react';

// Built from unit4/topic.txt and the "Phishing Toolkits and Spy Phishing" mockup. Defensive analysis only.
export default {
  slug: 'phishing-toolkits',
  number: 5,
  title: 'Phishing Toolkits and Spy Phishing',
  icon: PackageSearch,
  color: '#c084fc',
  difficulty: 'Advanced',
  summary: 'Credential-harvesting threats and how defenders detect and dismantle them.',
  tagline: 'Understanding credential-harvesting threats and defensive analysis.',
  keywords: ['phishing kit', 'phishing as a service', 'spy phishing', 'credential harvesting', 'indicators of compromise', 'takedown'],
  intro: [
    'Phishing toolkits are pre-packaged bundles that let criminals set up imitation websites quickly, without technical skill. They are often sold or rented on underground markets as "phishing-as-a-service". This is why fake pages for banks and popular services appear and disappear so fast.',
    'Spy phishing goes a step further. Instead of a single fake page, it combines deception with spyware or information-stealing malware that silently collects data from the victim over time. For defenders, the focus is on recognising imitation sites, detecting compromise, and taking infrastructure down quickly.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Phishing-as-a-Service (PhaaS)', text: 'Criminal services that rent out ready-made phishing infrastructure.' },
      { term: 'Credential harvesting', text: 'Collecting usernames, passwords and other details entered on fake pages.' },
      { term: 'Indicator of Compromise (IoC)', text: 'Evidence, such as a domain, URL or file hash, that signals malicious activity.' },
    ],
  },
  compare: {
    title: 'Classic Phishing vs Spy Phishing',
    left: { title: 'Classic phishing', subtitle: 'One-time deception', points: ['Fake page captures details once', 'Victim may notice quickly', 'Blocked by domain reputation and takedowns'] },
    right: { title: 'Spy phishing', subtitle: 'Ongoing surveillance', points: ['Deception leads to spyware or info-stealer installation', 'Data collected silently over time', 'Detected by endpoint security and behaviour monitoring'] },
  },
  flow: {
    title: 'Toolkit Operations & Where Defenders Intervene',
    steps: [
      { title: 'Kit deployed', text: 'A fake site goes live on a new or compromised domain. Defenders watch new domain registrations and certificates.' },
      { title: 'Imitation website', text: 'The page copies a brand’s look. Browser and email filters flag known-bad URLs.' },
      { title: 'Potential victim', text: 'A user is lured to the page. Awareness and URL checks stop them here.' },
      { title: 'Credential harvesting', text: 'Entered data is collected. MFA, passkeys and quick password resets limit the damage.' },
    ],
  },
  table: {
    title: 'Threat Components & Defences',
    columns: ['Threat component', 'Security risk', 'Observable indicator', 'Mitigation'],
    rows: [
      ['Suspicious domains', 'Mimic legitimate brands', 'Lookalike spelling, very new domain', 'Domain reputation checks, user awareness'],
      ['Imitation login pages', 'Capture credentials', 'Brand inconsistencies, unexpected credential request', 'Passkeys/MFA, password managers that refuse to autofill on wrong domains'],
      ['Unusual redirects', 'Hide the final destination', 'Chains of short links and redirects', 'Email/web filtering, link scanning'],
      ['Info-stealer malware (spy phishing)', 'Ongoing data theft', 'Unknown processes, unusual outbound traffic', 'Endpoint security, least privilege, updates'],
    ],
  },
  cards: {
    title: 'Understanding the Threat',
    items: [
      { title: 'Toolkit Components', text: 'Website templates plus a way to collect submitted data.' },
      { title: 'Fake Website Templates', text: 'Copies of real login pages with small inconsistencies.' },
      { title: 'Credential Harvesting', text: 'Captured details are reused or sold for account takeover.' },
      { title: 'Spy Phishing', text: 'Deception that leads to spyware and long-term data theft.' },
      { title: 'Indicators of Compromise', text: 'Domains, URLs and file hashes shared by defenders to block threats.' },
      { title: 'Defensive Analysis', text: 'Safely investigating reported sites and taking them down.' },
    ],
  },
  checklist: {
    title: 'Defensive Countermeasures & Protection',
    items: [
      'URL / domain inspection before entering credentials',
      'Domain reputation checks in browser and email filters',
      'Browser and email protection turned on',
      'MFA, ideally passkeys, on all important accounts',
      'Endpoint security with behaviour monitoring',
      'A clear incident-reporting process',
    ],
  },
  lists: [
    { title: 'Signs of an Imitation Website', tone: 'warn', items: ['Spoofed URL or insecure domain', 'Improper logo or brand inconsistencies', 'Unexpected credential entry (asks you to log in again)', 'Password manager doesn’t offer autofill', 'Pressure to act immediately'] },
    { title: 'Safe Analysis Practices (for defenders)', tone: 'info', items: ['Never enter real credentials into a suspected site', 'Investigate only inside isolated, approved environments', 'Use URL-scanning and reputation services', 'Share IoCs with CERT-In and the impersonated brand', 'Request takedown from the hosting provider and registrar'] },
    { title: 'If Credentials Were Entered', tone: 'good', items: ['Change the password immediately from a clean device', 'Sign out all sessions and review recovery settings', 'Enable or reset MFA', 'Scan the device for malware', 'Report to 1930 / cybercrime.gov.in if money is involved'] },
  ],
  caseStudy: {
    title: 'Case Study: The Takedown',
    text: 'A bank’s security team noticed several newly registered domains that combined its name with words like "secure" and "verify". Customers also reported a login page that looked slightly off. The team confirmed it was an imitation site using an isolated analysis environment, shared the domains with browser-safety services and CERT-In, and requested takedown from the hosting provider. Within hours browsers began warning users, and the site went offline. Customers who had entered details were contacted to reset passwords.',
  },
  deep: {
    sections: [
      { title: 'Why toolkits changed the threat landscape', points: ['They lowered the skill needed, so many more criminals can run campaigns.', 'Sites are short-lived, often online for only hours, so speed of detection matters.', 'Some modern kits try to capture one-time codes in real time. This is why phishing-resistant MFA (passkeys) is recommended.', 'Researchers track kits by their shared templates and infrastructure.'] },
      { title: 'How defenders find phishing sites early', points: ['Monitoring new domain registrations for brand lookalikes.', 'Certificate Transparency logs reveal new HTTPS certificates issued for suspicious names.', 'User reports from "Report phishing" buttons feed blocklists.', 'Browser safe-browsing services warn millions of users within minutes of a confirmed site.'] },
      { title: 'Spy phishing and information stealers', points: ['Deceptive messages lead victims to install malicious software disguised as documents or apps.', 'Info-stealers collect saved passwords, cookies and files, and send them out silently.', 'Defences: official software sources, endpoint protection, least privilege, browser password managers with a primary password, and MFA.', 'Signs: unknown programs, unexpected outbound traffic, security tools disabled.'] },
    ],
    cases: [
      { year: '2021', title: 'Rise of phishing-as-a-service', text: 'Security researchers reported large PhaaS operations renting ready-made phishing sites to thousands of criminals.' },
      { year: '2022', title: 'Real-time OTP capture', text: 'Campaigns targeting tech companies captured one-time codes in real time, pushing organisations toward phishing-resistant MFA.' },
      { year: '2024', title: 'Coordinated takedowns', text: 'International law-enforcement operations disrupted major phishing-service platforms and arrested operators.' },
    ],
    myths: [
      { myth: 'Fake sites always look obviously fake.', fact: 'Toolkits copy real pages closely. Check the domain, not the design.' },
      { myth: 'HTTPS means the site is genuine.', fact: 'Imitation sites can get certificates too. HTTPS only means the connection is encrypted.' },
      { myth: 'Any 2FA stops credential harvesting.', fact: 'Some kits relay codes in real time. Passkeys/FIDO2 are designed to resist this.' },
    ],
    law: [
      { title: 'IT Act Sec 66C & 66D', text: 'Using harvested credentials (identity theft) and impersonating organisations (cheating by personation).' },
      { title: 'IT Act Sec 43 & 66', text: 'Unauthorised access and data theft using stolen credentials or spyware.' },
      { title: 'Reporting', text: '1930 · cybercrime.gov.in · CERT-In (incident@cert-in.org.in) · the impersonated organisation’s security team.' },
    ],
    examNotes: [
      'Phishing toolkit = pre-packaged kit for imitation websites. PhaaS = rented phishing infrastructure.',
      'Components: website templates plus collection of submitted data.',
      'Spy phishing = phishing that installs spyware/info-stealers for ongoing data theft.',
      'Indicators: lookalike domains, brand inconsistencies, unexpected login prompts, redirects.',
      'Defences: domain/URL inspection, reputation filters, MFA/passkeys, endpoint security, reporting and takedown.',
    ],
    extraQuiz: [
      { q: 'What is an Indicator of Compromise (IoC)?', options: ['A password rule', 'Evidence like a malicious domain or file hash that signals an attack', 'A type of firewall', 'A backup'], answer: 1, explain: 'Defenders share IoCs so others can block the same threat.' },
      { q: 'Which MFA type best resists real-time code capture?', options: ['SMS OTP', 'Email codes', 'Passkeys / FIDO2', 'Security questions'], answer: 2, explain: 'Passkeys are bound to the real domain, so a fake site gets nothing usable.' },
    ],
  },
  quiz: [
    { q: 'What is a phishing toolkit?', options: ['An antivirus program', 'A pre-packaged kit used to set up imitation websites', 'A password manager', 'A firewall rule'], answer: 1, explain: 'Kits make it easy for criminals to launch fake sites quickly.' },
    { q: 'What is spy phishing?', options: ['Phishing combined with spyware that collects data over time', 'A James Bond film', 'A type of encryption', 'An email filter'], answer: 0, explain: 'It focuses on ongoing, silent data collection.' },
    { q: 'What should you check first on a login page you reached from a link?', options: ['The colour scheme', 'The actual domain in the address bar', 'The font', 'The number of images'], answer: 1, explain: 'Imitation sites copy designs, but not the real domain.' },
    { q: 'You entered your password on a suspicious page. What now?', options: ['Do nothing', 'Change it immediately from a clean device and sign out all sessions', 'Wait for an email', 'Use the same password elsewhere'], answer: 1, explain: 'Act fast before the credentials are used.' },
    { q: 'What do defenders do with a confirmed phishing site?', options: ['Ignore it', 'Share indicators and request takedown', 'Advertise it', 'Enter test credentials'], answer: 1, explain: 'Blocklists and takedowns protect everyone else.' },
  ],
};
