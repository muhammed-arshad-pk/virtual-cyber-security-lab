import { Building2 } from 'lucide-react';

export default {
  slug: 'organizational-measures',
  number: 7,
  title: 'Organizational Measures for Handling Mobile Devices',
  icon: Building2,
  color: '#60a5fa',
  difficulty: 'Advanced',
  summary: 'BYOD policy, MDM, MAM, UEM, compliance, remote wipe and incident response.',
  tagline: 'Governance, technology and people, working together to secure every device.',
  keywords: ['byod', 'mdm', 'mam', 'uem', 'cope', 'compliance', 'remote wipe', 'policy', 'incident response'],
  intro: [
    'Organisations can’t secure mobile devices one user at a time. They need policies that say what is allowed, technology that enforces those policies (MDM, MAM, UEM), and processes for when things go wrong.',
    'The challenge is balance: protect company data without spying on employees’ personal lives, especially on personally-owned (BYOD) devices.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'MDM', text: 'Mobile Device Management: controls the whole device (passcode, encryption, updates, remote wipe).' },
      { term: 'MAM', text: 'Mobile Application Management: protects company apps and data only (containers, copy/paste rules).' },
      { term: 'UEM', text: 'Unified Endpoint Management: one console for phones, laptops, desktops and IoT.' },
    ],
  },
  compare: {
    title: 'MDM vs MAM',
    left: { title: 'MDM (device level)', subtitle: 'Best for corporate-owned', points: ['Enforce passcode, encryption, OS version', 'Install/remove apps, configure Wi-Fi & VPN', 'Full remote lock and wipe', 'More visibility, so less privacy for users'] },
    right: { title: 'MAM (app level)', subtitle: 'Best for BYOD', points: ['Protects only work apps and data', 'Blocks copy/paste and saves to personal apps', 'Selective wipe of work data only', 'Personal photos and apps stay private'] },
  },
  flow: {
    title: 'Mobile Device Lifecycle Management',
    steps: [
      { title: 'Procure & enroll', text: 'Device bought or approved, then enrolled in MDM/UEM.' },
      { title: 'Configure & comply', text: 'Policies pushed: passcode, encryption, apps, VPN.' },
      { title: 'Monitor & respond', text: 'Compliance checks, updates, incident response.' },
      { title: 'Retire', text: 'Offboarding: wipe corporate data, unenroll, recycle.' },
    ],
  },
  table: {
    title: 'Ownership Models Compared',
    columns: ['Model', 'Ownership', 'Management', 'User privacy'],
    rows: [
      ['BYOD', 'Employee buys & owns', 'MAM / work profile only', 'High: personal data isolated'],
      ['CYOD', 'Company buys from an approved list', 'MDM', 'Medium'],
      ['COPE', 'Company owns, personal use allowed', 'MDM + work profile', 'Medium'],
      ['COBO', 'Company owns, business use only', 'Full MDM lockdown', 'Low: everything visible to IT'],
    ],
  },
  cards: {
    title: 'Essential Organizational Controls',
    items: [
      { title: 'BYOD Policy', text: 'Who can enroll, what data is allowed, and what IT can and cannot see.' },
      { title: 'Encryption & Passcodes', text: 'Mandatory device encryption and strong screen locks.' },
      { title: 'Patch Compliance', text: 'Minimum OS versions, and blocking out-of-date devices.' },
      { title: 'Conditional Access', text: 'Only compliant devices can reach email and apps.' },
      { title: 'Remote Lock / Wipe', text: 'Lock lost devices, and selectively wipe work data.' },
      { title: 'Acceptable-Use Policy', text: 'Rules employees sign: approved apps, reporting losses.' },
    ],
  },
  lists: [
    { title: 'A Good BYOD Policy Covers', tone: 'info', items: ['Eligible devices & minimum OS', 'Required security settings', 'What IT can / cannot access', 'Selective-wipe consent', 'Lost-device reporting deadline', 'Offboarding procedure'] },
    { title: 'Common Failures', tone: 'warn', items: ['Devices never enrolled ("shadow IT")', 'Former employees keep access to email', 'Full wipe of a personal phone (privacy breach)', 'No minimum OS, so outdated devices connect', 'No process for reporting lost phones'] },
    { title: 'Best Practices', tone: 'good', items: ['Zero Trust: verify device health on every access', 'Work profiles / containers for BYOD', 'Automate compliance and quarantine', 'Train employees, as reporting quickly is key', 'Regular audits and incident drills'] },
  ],
  caseStudy: {
    title: 'Case Study: The Offboarded Device Breach',
    text: 'A sales manager left a company, but nobody removed her phone from the system. Months later her old phone, sold second-hand, still synced the corporate email and CRM app. The buyer found client contracts and pricing. A proper offboarding process with a selective wipe and account revocation on the last day would have prevented it.',
  },
  lab: {
    key: 'u3-mdm',
    title: 'Mission: MDM Admin Console',
    description: 'You’re the new mobile security admin at Cyber Shield Corp. Turn on the right policies, bring every device into compliance (or quarantine the ones that can’t comply), and handle real incidents without violating employee privacy.',
    badge: { name: 'Fleet Commander', emoji: '🏢' },
    objectives: [
      { id: 'policies', label: 'Enable all baseline security policies', xp: 20 },
      { id: 'fleet', label: 'Make every device compliant or quarantined', xp: 50 },
      { id: 'incidents', label: 'Resolve every incident correctly (respecting privacy)', xp: 40 },
    ],
  },
  quiz: [
    { q: 'Which tool protects only company apps and data, leaving personal data untouched?', options: ['MDM', 'MAM', 'BIOS', 'DNS'], answer: 1, explain: 'MAM works at the app/container level, which is ideal for BYOD.' },
    { q: 'An employee with a personal (BYOD) phone resigns. What should IT do?', options: ['Full factory wipe of the phone', 'Selective wipe of corporate data and revoke access', 'Nothing', 'Ask them to hand over the phone'], answer: 1, explain: 'A full wipe would destroy personal data and violate privacy.' },
    { q: 'What does UEM add over MDM?', options: ['Nothing', 'Manages all endpoint types (phones, laptops, desktops, IoT) in one console', 'Only manages printers', 'Removes encryption'], answer: 1, explain: 'UEM unifies management across device types.' },
    { q: 'What is conditional access?', options: ['Free Wi-Fi', 'Only devices meeting security conditions can access corporate resources', 'A type of SIM', 'Guest login'], answer: 1, explain: 'Non-compliant devices are blocked until fixed.' },
    { q: 'In COBO, what does the acronym mean?', options: ['Corporate-Owned, Business-Only', 'Choose One, Buy One', 'Cloud-Operated Backup', 'Company Owns Both Offices'], answer: 0, explain: 'COBO devices are fully company-controlled and for work only.' },
  ],
  deep: {
    sections: [
      { title: 'Corporate mobile-security architecture', points: ['Employee devices (BYOD or corporate) enroll in an MDM/UEM platform.', 'The UEM reports device health (OS version, encryption, root status) to the identity provider (IdP).', 'Conditional-access policies in the IdP grant or deny access to email, apps and files.', 'Work data lives in managed apps or work profiles, with copy/paste controls and encryption.', 'Remember: enterprise management is one layer of defense, not a standalone solution.'] },
      { title: 'Android Enterprise & Apple management', points: ['Android work profile: a separate, badge-marked set of work apps. IT manages only that profile on BYOD.', 'Fully managed Android: the whole device is controlled (COBO/COPE).', 'Apple User Enrollment (BYOD) keeps personal and work data separate. Automated Device Enrollment suits company-owned devices.', 'Popular platforms include Microsoft Intune, Jamf, Google Endpoint Management, VMware/Omnissa Workspace ONE and IBM MaaS360.'] },
      { title: 'Privacy boundaries on BYOD', points: ['IT should NOT see: personal photos, messages, browsing history, personal app data, precise location (unless disclosed and justified).', 'IT CAN see: device model, OS version, compliance status, work apps and work data.', 'Policies must be transparent and accepted by the employee at enrollment.', 'Under India’s DPDP Act, employee personal data also needs a lawful purpose and safeguards.'] },
      { title: 'Mobile incident response', points: ['Report: employees must report lost devices immediately, within hours.', 'Contain: remote lock, revoke tokens and sessions, block access through conditional access.', 'Eradicate: selective wipe (BYOD) or full wipe (corporate) if the device can’t be recovered.', 'Recover: issue a replacement, restore from backup, reset credentials.', 'Learn: document the incident, and update policy and training.'] },
    ],
    cases: [
      { year: '2009', title: 'BYOD goes mainstream', text: 'Employees began bringing iPhones to work, and companies scrambled to support email on personal devices, the birth of modern MDM.' },
      { year: '2014', title: 'Lost-laptop / phone breaches', text: 'Repeated healthcare and government breaches came from unencrypted lost devices, making encryption mandatory in policies.' },
      { year: '2020', title: 'Remote-work surge', text: 'Organisations moved to UEM and Zero Trust as millions worked from personal devices at home.' },
    ],
    myths: [
      { myth: 'MDM lets my employer read my WhatsApp chats.', fact: 'Properly configured BYOD management (work profile/MAM) can’t see personal apps or messages.' },
      { myth: 'Having an MDM tool means we’re secure.', fact: 'Without good policy, enforcement, training and incident response, the tool alone doesn’t protect data.' },
      { myth: 'Remote wipe always erases the whole phone.', fact: 'Selective wipe removes only corporate apps and data, the right choice for BYOD.' },
    ],
    law: [
      { title: 'DPDP Act, 2023', text: 'Employers processing employees’ personal data must have a lawful basis, give notice and apply safeguards, which is relevant to MDM monitoring.' },
      { title: 'IT Act Sec 43A', text: 'Bodies corporate handling sensitive personal data must maintain reasonable security practices (e.g. ISO/IEC 27001).' },
      { title: 'CERT-In Directions (2022)', text: 'Organisations must report cyber incidents, including mobile breaches, within 6 hours and keep logs for 180 days.' },
    ],
    examNotes: [
      'Policies: BYOD, acceptable use, lost-device reporting, offboarding.',
      'Technology: MDM (device), MAM (app), UEM (all endpoints).',
      'Ownership models: BYOD, CYOD, COPE, COBO.',
      'Controls: encryption, passcode, min OS, conditional access, remote lock and wipe.',
      'Privacy: selective wipe for BYOD, transparency, DPDP Act.',
      'Incident response: report → contain → eradicate → recover → learn.',
    ],
    extraQuiz: [
      { q: 'What should IT NOT be able to see on a BYOD device with a work profile?', options: ['OS version', 'Personal photos and messages', 'Compliance status', 'Work apps'], answer: 1, explain: 'Personal content is outside the work profile and off-limits.' },
      { q: 'Under CERT-In’s 2022 directions, cyber incidents must be reported within…', options: ['6 hours', '30 days', '1 year', 'Never'], answer: 0, explain: 'Organisations must report to CERT-In within 6 hours of noticing.' },
      { q: 'Which ownership model gives IT the most control?', options: ['BYOD', 'COPE', 'COBO', 'CYOD'], answer: 2, explain: 'Corporate-Owned, Business-Only devices are fully locked down.' },
    ],
  },
};
