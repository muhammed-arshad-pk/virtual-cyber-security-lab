import { FileSearch } from 'lucide-react';

export default {
  slug: 'investigation-digital-evidence',
  number: 6,
  title: 'Cybercrime Investigation, Digital Evidence, and Legal Procedure',
  icon: FileSearch,
  color: '#60a5fa',
  difficulty: 'Advanced',
  disclaimer: true,
  summary: 'From incident reporting to evidence preservation, chain of custody, forensics and admissibility.',
  tagline: 'From incident reporting to responsible evidence handling.',
  keywords: ['investigation', 'digital evidence', 'chain of custody', 'hash', 'forensics', 'admissibility', 'section 65b', 'bsa 63', 'order of volatility'],
  intro: [
    'Digital evidence is any information stored or transmitted electronically that can support an investigation: emails, chats, server logs, transaction records, call records, photos and device data. It is powerful, but fragile: it can be altered, deleted or overwritten in seconds.',
    'For evidence to hold up in court it must be collected lawfully, preserved without alteration (proved with hash values), documented through an unbroken chain of custody, and produced with the certificate required by evidence law (formerly Sec 65B of the Indian Evidence Act, now Sec 63 of the Bharatiya Sakshya Adhiniyam, 2023).',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Chain of custody', text: 'A chronological record of everyone who collected, handled, transferred or examined evidence.' },
      { term: 'Hash value', text: 'A digital fingerprint (e.g. SHA-256) proving a file or disk image hasn’t changed.' },
      { term: 'Forensic image', text: 'An exact bit-by-bit copy of a storage device, made through a write-blocker. Analysts work on the copy, never the original.' },
    ],
  },
  compare: {
    title: 'Volatile vs Non-volatile Evidence',
    left: { title: 'Volatile', subtitle: 'Lost when power goes off', points: ['RAM contents, running processes', 'Active network connections', 'Logged-in sessions, encryption keys in memory', 'Must be captured first'] },
    right: { title: 'Non-volatile', subtitle: 'Persists', points: ['Hard disks, SSDs, USB drives', 'Logs on servers, cloud data', 'Emails, backups', 'Still at risk of deletion or log rotation'] },
  },
  flow: {
    title: 'Evidence Handling Lifecycle',
    steps: [
      { title: 'Identify & preserve', text: 'Recognise relevant evidence, isolate devices, request preservation from providers.' },
      { title: 'Collect & hash', text: 'Make forensic copies using write-blockers and record hash values.' },
      { title: 'Chain of custody', text: 'Document every hand-off: who, when, where, why.' },
      { title: 'Examine & report', text: 'Analyse copies with validated tools, then produce findings and certificates for court.' },
    ],
  },
  table: {
    title: 'Evidence Table',
    columns: ['Evidence type', 'Example', 'Safe preservation practice', 'Privacy consideration'],
    rows: [
      ['Server / system logs', 'Access logs, IP logs, authentication records', 'Copy securely, preserve timestamps, compute hash', 'Redact unrelated users’ data'],
      ['Digital communications', 'Suspicious emails, chat messages', 'Export with full headers/metadata, generate checksum', 'Exclude non-relevant personal chats'],
      ['Financial records', 'Online transaction receipts, bank statements', 'Request official records from banks', 'Handle banking/ID data per privacy rules'],
      ['Devices', 'Phones, laptops, USB drives', 'Seize, isolate (airplane mode / Faraday bag), image with write-blocker', 'Examine only what the warrant/purpose allows'],
      ['Screenshots', 'Posts, profiles, payment screens', 'Capture with URL, date and time, and keep originals', 'Avoid sharing publicly'],
    ],
  },
  cards: {
    title: 'Investigation Building Blocks',
    items: [
      { title: 'Reporting an Incident', text: 'File via cybercrime.gov.in or 1930 with incident details and evidence.' },
      { title: 'Preserving Evidence', text: 'Don’t alter or delete. Make exact, hash-verified copies.' },
      { title: 'System & Transaction Logs', text: 'Timestamped records reconstruct the timeline of events.' },
      { title: 'Chain of Custody', text: 'An auditable trail of every person who handled the evidence.' },
      { title: 'Forensic Examination', text: 'Validated tools on write-blocked copies, never the original.' },
      { title: 'Legal Admissibility', text: 'Electronic records need a proper certificate (BSA Sec 63).' },
    ],
  },
  checklist: {
    title: 'Investigator Checklist',
    items: [
      'Do not alter the original device or files',
      'Photograph and document the scene and device state',
      'Isolate devices from networks to prevent remote wiping',
      'Use a write-blocker and create a forensic image',
      'Compute and record hash values (SHA-256)',
      'Record every transfer in the chain-of-custody form',
      'Request preservation from service providers quickly',
      'Prepare the electronic-evidence certificate for court',
    ],
  },
  lists: [
    { title: 'What Victims Should Preserve', tone: 'good', items: ['Screenshots with date, time and URL', 'Full emails with headers', 'Transaction IDs, UTR numbers, bank SMS', 'Phone numbers, profile links, usernames', 'Don’t delete chats or reset the phone'] },
    { title: 'Common Mistakes That Ruin Evidence', tone: 'warn', items: ['Browsing or "checking" the suspect device directly', 'Forwarding screenshots without originals', 'Gaps in chain-of-custody records', 'No hash values recorded', 'Missing electronic-evidence certificate'] },
    { title: 'Agencies & Units', tone: 'info', items: ['State cyber police stations and cyber cells', 'I4C and its National Cyber Forensic Laboratory', 'CERT-In for technical incident analysis', 'Examiners of Electronic Evidence (IT Act Sec 79A)', 'State and central forensic science laboratories'] },
  ],
  caseStudy: {
    title: 'Case Study: Payment Fraud and the Broken Chain',
    text: 'In a fictional payment-fraud case, the victim forwarded cropped screenshots, and an officer examined the suspect’s phone directly without imaging it, changing file timestamps. The defence argued the evidence could have been altered. A second case was handled correctly: the original files were preserved, hashes recorded, the phone imaged with a write-blocker, and every transfer logged. That evidence was accepted. The difference wasn’t the crime but the evidence handling.',
  },
  lab: {
    key: 'u5-evidence',
    title: 'Mission: Digital Evidence Locker',
    description: 'A real evidence-handling lab. Hash files with SHA-256 (your own files or built-in demo evidence), maintain a chain-of-custody log, re-verify integrity to catch tampering, and export a custody report. Then put evidence in the correct order of volatility.',
    badge: { name: 'Evidence Custodian', emoji: '🗄️' },
    objectives: [
      { id: 'hash', label: 'Hash and register a piece of evidence', xp: 20 },
      { id: 'custody', label: 'Record 3 chain-of-custody transfers', xp: 25 },
      { id: 'integrity', label: 'Detect tampering through hash re-verification', xp: 30 },
      { id: 'volatility', label: 'Order evidence by volatility correctly', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Why is the chain of custody critical?', options: ['To identify hardware cost', 'To guarantee the investigator wins', 'To document every hand that touched the evidence, preventing claims of tampering', 'To reduce file size'], answer: 2, explain: 'An unbroken, documented chain supports integrity and admissibility.' },
    { q: 'What proves a forensic copy is identical to the original?', options: ['File name', 'Matching hash values', 'File size only', 'Colour of the icon'], answer: 1, explain: 'Identical hashes mean identical content.' },
    { q: 'Which provision now governs electronic-evidence certificates?', options: ['IPC 420', 'Bharatiya Sakshya Adhiniyam Sec 63 (formerly Evidence Act 65B)', 'IT Act Sec 66F', 'BNS 111'], answer: 1, explain: 'The BSA replaced the Indian Evidence Act from 1 July 2024.' },
    { q: 'Which evidence should be captured first?', options: ['Archived backups', 'RAM and running processes', 'Printed documents', 'Old CDs'], answer: 1, explain: 'Volatile data is lost when a device powers down.' },
    { q: 'Why do analysts work on a forensic image instead of the original?', options: ['It’s faster', 'To avoid altering original evidence', 'It’s cheaper', 'The original is illegal'], answer: 1, explain: 'The original stays pristine and verifiable.' },
  ],
  deep: {
    sections: [
      { title: 'Admissibility of electronic evidence', points: ['Electronic records are admissible if conditions are met, including a certificate identifying the record and the device that produced it.', 'Anvar P.V. v. P.K. Basheer (2014): the Supreme Court held the Sec 65B certificate mandatory for secondary electronic evidence.', 'Arjun Panditrao Khotkar (2020) reaffirmed this requirement.', 'From 1 July 2024, BSA Sec 63 continues this framework with a prescribed certificate format.'] },
      { title: 'Order of volatility (RFC 3227)', points: ['1. CPU registers and cache.', '2. Memory (RAM), routing tables, ARP cache, process table.', '3. Temporary file systems.', '4. Disk storage.', '5. Remote logging and monitoring data.', '6. Physical configuration and network topology.', '7. Archival media and backups.'] },
      { title: 'Digital forensics process', points: ['Identification → Preservation → Collection → Examination → Analysis → Presentation.', 'Validated tools are used and their versions documented.', 'All steps are recorded so another expert can reproduce the findings.', 'Mobile forensics, cloud forensics and network forensics each have specialised tools and challenges.'] },
      { title: 'Reporting and procedure in India', points: ['Citizens report via cybercrime.gov.in or 1930. An FIR is registered for cognizable offences.', 'BNSS 2023 enables e-FIRs, electronic summons and video recording of searches and seizures.', 'Police may request data from intermediaries, which must preserve information when lawfully required (IT Act Sec 67C, IT Rules 2021).', 'Courts may take expert opinions from notified Examiners of Electronic Evidence (Sec 79A).'] },
    ],
    cases: [
      { year: '2001', title: 'Parliament attack case', text: 'Electronic evidence from laptops and call records played a major role. The Supreme Court’s handling of it shaped later admissibility debates.' },
      { year: '2014', title: 'Anvar P.V. v. P.K. Basheer', text: 'The Supreme Court made the 65B certificate mandatory for electronic records.' },
      { year: '2020', title: 'Arjun Panditrao Khotkar', text: 'A three-judge bench reaffirmed the certificate requirement.' },
      { year: '2024', title: 'BSA in force', text: 'The Bharatiya Sakshya Adhiniyam replaced the Evidence Act, and Sec 63 now governs electronic evidence.' },
    ],
    myths: [
      { myth: 'A screenshot alone is always enough proof.', fact: 'Courts may need originals, metadata and a proper certificate. Screenshots can be easily altered.' },
      { myth: 'Looking through a suspect’s phone is harmless.', fact: 'It can change data and timestamps. Professionals image first and analyse the copy.' },
      { myth: 'Deleted data is gone forever.', fact: 'Forensics can often recover deleted files, but only if the device isn’t overwritten by continued use.' },
    ],
    law: [
      { title: 'Bharatiya Sakshya Adhiniyam, 2023 Sec 63', text: 'Admissibility of electronic records with a certificate (formerly Evidence Act 65B).' },
      { title: 'BNSS, 2023', text: 'Electronic FIRs, summons, and audio-video recording of search and seizure.' },
      { title: 'IT Act Sec 67C & 79A', text: 'Preservation of information by intermediaries, and notified examiners of electronic evidence.' },
    ],
    examNotes: [
      'Digital evidence: logs, emails, chats, transactions, device data. Fragile and volatile.',
      'Handling: identify → preserve → collect (write-blocker, image) → hash → chain of custody → examine copy → report.',
      'Chain of custody = documented record of every handler and transfer.',
      'Hash (SHA-256) proves integrity. Matching hash means identical content.',
      'Admissibility: certificate under BSA Sec 63 (formerly 65B). Anvar P.V. (2014).',
      'Order of volatility: registers/cache → RAM → temp files → disk → remote logs → archives.',
    ],
    extraQuiz: [
      { q: 'What device prevents writing to a drive while copying it?', options: ['Router', 'Write-blocker', 'Firewall', 'Modem'], answer: 1, explain: 'A write-blocker allows read-only access during imaging.' },
      { q: 'Which case made the electronic-evidence certificate mandatory?', options: ['Shreya Singhal', 'Anvar P.V. v. P.K. Basheer', 'Suhas Katti', 'Puttaswamy'], answer: 1, explain: 'Supreme Court, 2014.' },
    ],
  },
};
