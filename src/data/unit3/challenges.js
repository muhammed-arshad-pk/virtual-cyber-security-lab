import { ShieldAlert } from 'lucide-react';

export default {
  slug: 'security-challenges',
  number: 3,
  title: 'Security Challenges Posed by Mobile Devices',
  icon: ShieldAlert,
  color: '#f472b6',
  difficulty: 'Intermediate',
  summary: 'Malicious apps, data leakage, lost devices, outdated OS and insecure Wi-Fi.',
  tagline: 'Your phone is a vault, a key ring and a tracking beacon. Secure it like one.',
  keywords: ['mobile security', 'encryption', 'lost phone', 'patch', 'public wifi', 'data leakage', 'defense in depth'],
  intro: [
    'Mobile devices face challenges desktops rarely did. They are easily lost, constantly on untrusted networks, full of third-party apps, and often run outdated software because users postpone updates.',
    'Securing them takes layers: a strong screen lock, encryption, timely patches, careful app choices, safe network use, and a plan for when the device goes missing. This is called defense in depth.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Data leakage', text: 'Sensitive data escaping to unauthorised places: insecure storage, backups, clipboard, apps.' },
      { term: 'Full-disk / file-based encryption', text: 'Data on the phone is unreadable without the passcode-derived key.' },
      { term: 'Defense in depth', text: 'Several independent layers of security, so one failure doesn’t mean total compromise.' },
    ],
  },
  compare: {
    title: 'Managed vs Unmanaged Phone',
    left: { title: 'Unmanaged (risky)', subtitle: 'Typical neglected phone', points: ['No or 4-digit lock', 'Updates postponed for months', 'Apps from unknown sources', 'Auto-joins any open Wi-Fi'] },
    right: { title: 'Hardened', subtitle: 'Defense in depth', points: ['Strong passcode + biometric', 'Auto-updates on, encryption active', 'Official store only, permissions reviewed', 'Find My Device, backup, VPN on public Wi-Fi'] },
  },
  flow: {
    title: 'Layers of Mobile Defense',
    steps: [
      { title: 'Device', text: 'Screen lock, encryption, verified boot, latest OS.' },
      { title: 'Apps', text: 'Official stores, minimal permissions, app vetting.' },
      { title: 'Network', text: 'Secure Wi-Fi, HTTPS, VPN on public hotspots.' },
      { title: 'Data & recovery', text: 'Backups, remote lock/wipe, MFA on accounts.' },
    ],
  },
  table: {
    title: 'Mobile Threats & Controls',
    columns: ['Challenge', 'Example', 'Control'],
    rows: [
      ['Malicious apps', 'Fake app steals SMS OTPs', 'Official store only, permission review, Play Protect'],
      ['Insecure storage / leakage', 'App saves passwords in plain text', 'Encryption, secure coding, MAM containers'],
      ['Unauthorised access', 'Someone unlocks with a 1234 PIN', 'Strong passcode + biometric, auto-lock'],
      ['Lost / stolen device', 'Phone left in a cab', 'Find My Device, remote lock/wipe, IMEI block (CEIR)'],
      ['Outdated OS', 'Unpatched flaw exploited', 'Auto-updates, retire unsupported devices'],
      ['Public Wi-Fi', 'Evil-twin hotspot at an airport', 'Avoid open Wi-Fi, use HTTPS + VPN'],
    ],
  },
  cards: {
    title: 'Major Challenges',
    items: [
      { title: 'Malicious Apps', text: 'Trojans disguised as games, utilities or loan apps.' },
      { title: 'Data Leakage', text: 'Backups, screenshots, clipboard and chatty apps leak data.' },
      { title: 'Unauthorised Access', text: 'Weak locks and shoulder-surfed PINs.' },
      { title: 'Loss & Theft', text: 'A missing phone exposes email, OTPs and payment apps.' },
      { title: 'Outdated Software', text: 'Many phones stop receiving patches after a few years.' },
      { title: 'Wireless Threats', text: 'Rogue hotspots, Bluetooth flaws, insecure networks.' },
    ],
  },
  lists: [
    { title: 'Red Flags', tone: 'warn', items: ['“Update postponed” for weeks', 'Apps installed from links or APK files', 'Phone with no screen lock', 'Rooted or jailbroken device', 'Auto-connect to open Wi-Fi'] },
    { title: 'Secure Configuration Checklist', tone: 'good', items: ['6+ digit passcode or strong password with biometric', 'Auto-update OS and apps', 'Find My Device on', 'Encrypted backups', 'Hide sensitive notifications on the lock screen', 'Developer options / USB debugging off'] },
  ],
  lab: {
    key: 'u3-harden',
    title: 'Mission: Harden This Phone',
    description: 'You’re handed a badly configured phone. Open its settings, fix every risky option and push its security score to 100. Then live through a lost-phone emergency and respond correctly, minute by minute.',
    badge: { name: 'Device Hardener', emoji: '🔧' },
    objectives: [
      { id: 'patch', label: 'Install the pending security update', xp: 20 },
      { id: 'harden', label: 'Reach a security score of 100', xp: 50 },
      { id: 'lost', label: 'Handle the lost-phone emergency perfectly', xp: 40 },
    ],
  },
  quiz: [
    { q: 'Why does a strong screen lock matter for encryption on modern phones?', options: ['It doesn’t', 'The encryption key is protected by the passcode, so no lock means weak protection', 'It makes the phone faster', 'It saves battery'], answer: 1, explain: 'On Android and iOS the passcode protects the keys that unlock your data.' },
    { q: 'Your phone is stolen. Which Indian portal can block its IMEI so it can’t be used on any network?', options: ['IRCTC', 'Sanchar Saathi (CEIR)', 'DigiLocker', 'UMANG'], answer: 1, explain: 'The CEIR system on sancharsaathi.gov.in blocks lost or stolen phones across operators.' },
    { q: 'What is the main risk of an outdated mobile OS?', options: ['Smaller icons', 'Known security vulnerabilities stay unpatched', 'Better battery life', 'Fewer ads'], answer: 1, explain: 'Attackers target publicly known flaws that old versions never fixed.' },
    { q: 'What does "defense in depth" mean?', options: ['One very strong password', 'Several independent layers of security', 'Hiding the phone', 'Deep-sea data centres'], answer: 1, explain: 'If one layer fails, the others still protect you.' },
    { q: 'Which setting should be OFF on a normal user’s phone?', options: ['Find My Device', 'Automatic updates', 'Install apps from unknown sources', 'Screen lock'], answer: 2, explain: 'Sideloading bypasses app store vetting and is the main route for mobile malware.' },
  ],
  deep: {
    sections: [
      { title: 'How mobile encryption really works', points: ['Modern Android uses file-based encryption, and iOS uses Data Protection classes.', 'Keys are derived from your passcode together with a hardware key inside the TEE or Secure Enclave.', 'Hardware limits wrong guesses (delays and wipes), so even a 6-digit PIN can’t be brute-forced quickly.', 'Without a passcode, the phone’s data is effectively unprotected once it is powered on.'] },
      { title: 'Data leakage channels', points: ['Unencrypted cloud backups and sync.', 'Clipboard: other apps may read copied passwords or OTPs.', 'Screenshots and screen recordings of sensitive screens.', 'Logs and cache files written by badly coded apps.', 'Lock-screen notifications showing OTPs to anyone holding the phone.'] },
      { title: 'Patch management', points: ['Android receives monthly security bulletins, and iOS ships security updates regularly.', 'Phone makers support devices for a limited number of years, so check before buying.', 'Organisations enforce a minimum OS version through MDM.', 'Unsupported devices should be retired from accessing sensitive data.'] },
      { title: 'Rooting & jailbreaking', points: ['Removes the OS’s built-in restrictions and sandbox protections.', 'Lets malware gain full control and disables security updates.', 'Banking apps and MDM detect and block rooted devices.', 'Avoid it on any phone that holds personal or work data.'] },
    ],
    cases: [
      { year: '2015', title: 'Stagefright (Android)', text: 'A media-library flaw let attackers compromise phones with a crafted MMS. It pushed Google to begin monthly Android security updates.' },
      { year: '2019', title: 'WhatsApp call exploit', text: 'A flaw in WhatsApp calling was used to install Pegasus spyware just by placing a call. Updating the app fixed it.' },
      { year: '2023', title: 'Sanchar Saathi / CEIR', text: 'India rolled out the CEIR portal nationwide to block and trace lost or stolen phones by IMEI.' },
    ],
    myths: [
      { myth: 'Face unlock alone is enough security.', fact: 'Biometrics are convenient, but the passcode behind them is what protects your encryption keys. Make it strong.' },
      { myth: 'Updates just change emojis.', fact: 'Most updates fix security vulnerabilities that attackers already know about.' },
      { myth: 'If I lose my phone, a factory reset by the thief protects my data.', fact: 'You should remotely wipe it yourself. A thief may try to read data before any reset.' },
    ],
    law: [
      { title: 'CEIR (Sanchar Saathi)', text: 'Block a lost or stolen phone’s IMEI after filing a police report. The phone becomes unusable on Indian networks.' },
      { title: 'IT Act Sec 43 & 66', text: 'Accessing or extracting data from someone else’s phone without permission is an offence.' },
      { title: 'DPDP Act, 2023', text: 'Organisations must protect personal data on mobile devices with reasonable security safeguards.' },
    ],
    examNotes: [
      'Challenges: malicious apps, data leakage, unauthorised access, loss and theft, outdated OS, public Wi-Fi.',
      'Controls: strong lock, encryption, updates, official apps, VPN, remote lock and wipe.',
      'Encryption depends on the passcode and hardware keys (TEE / Secure Enclave).',
      'Defense in depth: device → apps → network → data and recovery.',
      'Lost phone: locate → lock → block SIM → change passwords → report and block IMEI → wipe.',
      'Rooting and jailbreaking remove protections and should be avoided.',
    ],
    extraQuiz: [
      { q: 'Why should you hide OTP contents on the lock screen?', options: ['To save battery', 'Anyone holding your locked phone could read your OTPs', 'It looks better', 'Banks require it'], answer: 1, explain: 'Lock-screen previews can hand an attacker your second factor.' },
      { q: 'What does rooting or jailbreaking a phone do?', options: ['Improves security', 'Removes built-in security restrictions and sandboxing', 'Adds encryption', 'Blocks malware'], answer: 1, explain: 'It gives full system access, to you and to any malware.' },
      { q: 'What should you do first when your phone goes missing?', options: ['Buy a new phone', 'Try to locate it and remotely lock it', 'Post about it online', 'Wait a week'], answer: 1, explain: 'Locate and lock first, then block the SIM and secure your accounts.' },
    ],
  },
};
