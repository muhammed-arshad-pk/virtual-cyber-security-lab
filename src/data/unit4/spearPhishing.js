import { Crosshair } from 'lucide-react';

// Built from unit4/topic.txt and the "Phishing Techniques and Spear Phishing" mockup.
export default {
  slug: 'phishing-techniques-spear-phishing',
  number: 3,
  title: 'Phishing Techniques and Spear Phishing',
  icon: Crosshair,
  color: '#a78bfa',
  difficulty: 'Advanced',
  summary: 'Targeted social engineering, whaling and business email compromise, and how organisations defend.',
  tagline: 'Understanding targeted social engineering and attack evolution.',
  keywords: ['spear phishing', 'whaling', 'bec', 'business email compromise', 'social engineering', 'dmarc', 'spf'],
  intro: [
    'Mass phishing casts a wide net with generic messages. Spear phishing is different: the attacker studies a specific person or organisation and writes a message that fits their role, colleagues and current work, so it feels genuine.',
    'Whaling targets top executives, and Business Email Compromise (BEC) uses impersonated or hijacked business email to trick staff into sending money or data. These attacks cause some of the largest financial losses in cybercrime, so organisations rely on verification processes, not just technology.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Social engineering', text: 'Manipulating people through trust, urgency or authority instead of breaking technology.' },
      { term: 'OSINT exposure', text: 'Publicly available information (profiles, posts, company pages) that attackers can use for research.' },
      { term: 'BEC', text: 'Business Email Compromise: fraudulent business emails, often about invoices or payments, from spoofed or hijacked accounts.' },
    ],
  },
  compare: {
    title: 'Mass Phishing vs Spear Phishing',
    left: { title: 'Mass phishing', subtitle: 'Broad blast', points: ['Generic templates', 'Massive target pool', 'Low success rate per message', 'Filtered by spam tools'] },
    right: { title: 'Spear phishing', subtitle: 'Individual targeting', points: ['Customised messages', 'Researched targets', 'High-value outcomes', 'Can bypass filters, so people must verify'] },
  },
  flow: {
    title: 'Targeted Phishing Attack Lifecycle',
    steps: [
      { title: 'Public information exposure', text: 'Details about the target are publicly visible (social profiles, company website).' },
      { title: 'Personalised deceptive message', text: 'A message is crafted to fit the target’s role and context.' },
      { title: 'Victim interaction', text: 'The target replies, clicks, opens a file or approves a payment.' },
      { title: 'Account or payment compromise', text: 'Access is gained or money is diverted.' },
    ],
  },
  table: {
    title: 'Comparison Table',
    columns: ['Target', 'Personalisation', 'Typical risk', 'Defence'],
    rows: [
      ['Bulk audience', 'Low (generic templates)', 'Credential theft', 'Filters & awareness'],
      ['Specific individual (spear phishing)', 'High (targeted research)', 'Access to systems', 'Verification & MFA'],
      ['High-level executive (whaling)', 'Very high (role, business context)', 'Large financial loss', 'Strict approval processes, call-back checks'],
      ['Finance / vendor teams (BEC)', 'High (invoices, vendors)', 'Diverted payments', 'Verify bank-detail changes by phone, dual approval'],
    ],
  },
  cards: {
    title: 'Techniques Attackers Rely On',
    items: [
      { title: 'Social Engineering', text: 'Relying on human trust, urgency or authority.' },
      { title: 'Deceptive Links', text: 'Lookalike URLs and fake login pages.' },
      { title: 'Spear Phishing', text: 'Messages personalised to the target’s role and data.' },
      { title: 'Whaling', text: 'Impersonating or targeting senior leadership.' },
      { title: 'Business Email Compromise', text: 'Fake invoices, changed bank details, urgent transfers.' },
      { title: 'Pretexting', text: 'A believable story ("I’m from IT", "new vendor contact").' },
    ],
  },
  checklist: {
    title: 'Enterprise Defense Strategies',
    items: [
      'Independent verification of payment or bank-detail changes (call a known number)',
      'Phishing-resistant MFA for email and finance systems',
      'Email authentication: SPF, DKIM and DMARC on company domains',
      'Clear reporting procedure ("Report phish" button)',
      'Regular awareness training for finance, HR and executives',
      'Dual approval for high-value transfers',
      'Limit public exposure of org charts and staff details',
    ],
  },
  lists: [
    { title: 'Red Flags in Targeted Emails', tone: 'warn', items: ['Unusual sender domain that looks almost right', 'Urgency plus secrecy ("don’t tell anyone yet")', 'Request to change payment details', 'Request that bypasses normal process', 'Mismatch between display name and actual address'] },
    { title: 'Detection & Prevention', tone: 'good', items: ['Verify through a separate, known channel', 'Check the actual sender address, not just the name', 'Hover over links before clicking', 'Report suspicious messages to IT/security', 'Enable external-sender warning banners'] },
  ],
  caseStudy: {
    title: 'Case Study: The Target CFO',
    text: 'A finance head received an email that appeared to come from the CEO, who was travelling. It asked for an urgent, confidential transfer to close an acquisition. The sender domain differed by one letter from the real one. Because the company required a phone call-back to a known number for any transfer over a set limit, the CFO called the CEO, who knew nothing about it. The transfer was stopped. Process beat persuasion.',
  },
  deep: {
    sections: [
      { title: 'Why targeted attacks work', points: ['They reference real names, projects and vendors, so nothing seems out of place.', 'They exploit authority: people hesitate to question a senior leader.', 'They add urgency and secrecy to stop the victim from checking with others.', 'They often contain no malware at all, just a request, so technical filters may miss them.'] },
      { title: 'Email authentication: SPF, DKIM, DMARC', points: ['SPF lists which servers are allowed to send email for a domain.', 'DKIM adds a cryptographic signature proving the message wasn’t altered and came from the domain.', 'DMARC tells receivers what to do when SPF/DKIM fail (monitor, quarantine or reject) and sends reports.', 'Together they make it much harder to send email that pretends to be from your exact domain, though lookalike domains still need human checks.'] },
      { title: 'Building a verification culture', points: ['Make it normal and safe to double-check any request, even from the CEO.', 'Publish a rule: bank details are never changed by email alone.', 'Use dual approval for payments above a threshold.', 'Celebrate staff who report suspicious messages.'] },
    ],
    cases: [
      { year: '2015', title: 'Ubiquiti Networks', text: 'The company disclosed losing about $46.7 million after employees were deceived by emails impersonating executives and partners.' },
      { year: '2016', title: 'FACC (Austria)', text: 'An aerospace supplier lost about €50 million in a "fake CEO" fraud, and the CEO was later dismissed.' },
      { year: '2019', title: 'Facebook & Google invoice fraud', text: 'A man was sentenced for tricking both companies into paying over $100 million through fake invoices from a lookalike vendor.' },
      { year: '2023', title: 'BEC losses (FBI IC3)', text: 'BEC remained one of the costliest cybercrimes, with reported losses of around $2.9 billion in a single year.' },
    ],
    myths: [
      { myth: 'Only careless people fall for phishing.', fact: 'Well-researched spear phishing fools experienced professionals, which is why process matters.' },
      { myth: 'If it came from our domain, it’s safe.', fact: 'Accounts can be hijacked, and lookalike domains fool the eye. Verify unusual requests.' },
      { myth: 'Spam filters will stop targeted attacks.', fact: 'Targeted messages often contain no malware or links, so filters can miss them.' },
    ],
    law: [
      { title: 'IT Act Sec 66D', text: 'Cheating by personation using a computer resource, which covers impersonating executives or vendors.' },
      { title: 'IT Act Sec 66C', text: 'Identity theft: misusing another person’s credentials or identity information.' },
      { title: 'BNS Sec 318 & 319', text: 'Cheating and cheating by personation.' },
      { title: 'Report', text: '1930 · cybercrime.gov.in · CERT-In (incident@cert-in.org.in) for organisational incidents.' },
    ],
    examNotes: [
      'Mass phishing = generic and broad. Spear phishing = researched and personalised.',
      'Whaling targets executives. BEC targets business payments and vendor details.',
      'Lifecycle: public information exposure → personalised message → victim interaction → compromise.',
      'Defences: verification by a second channel, MFA, SPF/DKIM/DMARC, reporting, training, dual approval.',
      'Law: IT Act 66C, 66D, and BNS 318/319.',
    ],
    extraQuiz: [
      { q: 'What does DMARC do?', options: ['Encrypts files', 'Tells receiving servers how to handle mail that fails SPF/DKIM checks', 'Blocks all email', 'Speeds up email'], answer: 1, explain: 'DMARC sets a policy (none, quarantine or reject) and provides reports.' },
      { q: 'A vendor emails new bank details for the next payment. What should finance do?', options: ['Update and pay', 'Verify by calling the vendor on a known number', 'Reply to the email to confirm', 'Ignore all vendors'], answer: 1, explain: 'Replying may reach the attacker. Use an independent, known contact.' },
    ],
  },
  quiz: [
    { q: 'What makes spear phishing different from mass phishing?', options: ['It uses more emails', 'It is personalised to a specific target using research', 'It never uses email', 'It is always harmless'], answer: 1, explain: 'Personalisation makes it far more convincing.' },
    { q: 'Whaling targets…', options: ['Interns only', 'Senior executives', 'Customers only', 'Printers'], answer: 1, explain: 'Executives have authority over money and sensitive data.' },
    { q: 'What is Business Email Compromise (BEC)?', options: ['A spam filter', 'Fraudulent business emails that trick staff into payments or data transfers', 'A backup method', 'A type of firewall'], answer: 1, explain: 'BEC often uses fake invoices or changed bank details.' },
    { q: 'Which is the strongest defence against a fake CEO payment request?', options: ['Replying to the email', 'A mandatory call-back to a known number and dual approval', 'Paying quickly', 'Forwarding it to everyone'], answer: 1, explain: 'Independent verification breaks the attack.' },
    { q: 'Where does an attacker usually get details for spear phishing?', options: ['Public profiles and company websites', 'The weather report', 'Random guessing only', 'TV adverts'], answer: 0, explain: 'Limiting public exposure reduces what attackers can use.' },
  ],
};
