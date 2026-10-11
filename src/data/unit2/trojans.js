import { Gift } from 'lucide-react';

export default {
  slug: 'trojans-backdoors',
  number: 7,
  title: 'Trojan Horses & Backdoors',
  icon: Gift,
  color: '#facc15',
  summary: 'Discover deceptive software and unauthorized access.',
  tagline: 'Understand deceptive software and how unauthorized access can occur.',
  keywords: ['trojan', 'backdoor', 'rat', 'malware', 'download', 'fake software'],
  intro: [
    'A Trojan horse is malware disguised as something harmless or useful, like a free game, a "cracked" app or a fake update. It tricks you into installing it yourself, and then it runs its hidden payload.',
    'A backdoor is a hidden way into a system that bypasses normal login. Trojans often install backdoors so the attacker can come back whenever they like.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Payload', text: 'The hidden harmful action the Trojan performs once installed.' },
      { term: 'RAT', text: 'Remote Access Trojan: gives an attacker remote control of the victim’s device.' },
      { term: 'Code signing', text: 'A digital signature showing who published software and that it was not modified.' },
    ],
  },
  compare: {
    title: 'Trojan vs Backdoor',
    left: { title: 'Trojan Horse', subtitle: 'The delivery method', points: ['Focuses on deception', 'Pretends to be useful software', 'Needs the user to install it', 'Does not self-replicate (unlike worms and viruses)'] },
    right: { title: 'Backdoor', subtitle: 'The access method', points: ['Focuses on persistence', 'A hidden entry point that bypasses login', 'Lets the attacker return any time', 'Often installed by a Trojan'] },
  },
  flow: {
    title: 'How They Work Together',
    steps: [
      { title: 'Deceptive app', text: 'A "free" or "cracked" program is offered on an untrusted site.' },
      { title: 'Installation', text: 'The user installs it and grants it permissions.' },
      { title: 'Hidden access', text: 'A backdoor is quietly set up to run at startup.' },
      { title: 'Detection', text: 'Antivirus alerts or odd behaviour reveal the infection.' },
    ],
  },
  cards: {
    title: 'Common Trojan Types',
    items: [
      { title: 'Remote Access Trojan', text: 'Full remote control of the device.' },
      { title: 'Banking Trojan', text: 'Steals online banking credentials.' },
      { title: 'Downloader', text: 'Fetches and installs more malware later.' },
      { title: 'Fake Antivirus', text: 'Scares users with fake infections to sell "cleaners".' },
      { title: 'Spy Trojan', text: 'Logs keystrokes and takes screenshots.' },
      { title: 'Ransomware Dropper', text: 'Delivers ransomware that encrypts files.' },
    ],
  },
  lists: [
    { title: 'Warning Signs', tone: 'warn', items: ['Software you did not install appears', 'Unknown programs set to "run on startup"', 'Antivirus suddenly disabled', 'Mouse moves or files change by themselves'] },
    { title: 'Prevention & Response', tone: 'good', items: ['Download only from official stores and vendor sites', 'Never install "cracked" software', 'Keep OS and antivirus updated', 'If infected: disconnect from the network, scan, and change passwords from a clean device'] },
  ],
  lab: {
    key: 'trojan',
    title: 'Mission: Download Detective',
    description: 'You need some software. Every round offers three downloads, and some are Trojans in disguise. Inspect publisher, source and permissions, and pick the safe one. Pick wrong and you will watch your PC get compromised.',
    objectives: [
      { id: 'first', label: 'Pick a safe download', xp: 20 },
      { id: 'infection', label: 'Witness what a Trojan does after install', xp: 20 },
      { id: 'perfect', label: 'Win every round without being infected', xp: 60 },
      { id: 'checksum', label: 'Verify a file with the SHA-256 checksum tool', xp: 30 },
    ],
  },
  quiz: [
    { q: 'What is the main difference between a Trojan and a backdoor?', options: ['Trojans only affect phones', 'A Trojan disguises itself as legitimate software, while a backdoor is hidden access that bypasses login', 'Backdoors are always legal', 'There is no difference'], answer: 1, explain: 'A Trojan is how attackers get in. A backdoor is how they stay in.' },
    { q: 'Unlike viruses and worms, Trojans…', options: ['Spread automatically across networks', 'Do not self-replicate and rely on users installing them', 'Cannot steal data', 'Only infect servers'], answer: 1, explain: 'Trojans depend on deception, so you install them yourself.' },
    { q: 'What does a RAT allow an attacker to do?', options: ['Clean your computer', 'Remotely control your device', 'Speed up the internet', 'Nothing'], answer: 1, explain: 'RAT stands for Remote Access Trojan.' },
    { q: 'Which download source is safest?', options: ['A "free crack" site', 'An unknown email attachment', 'The official vendor site or app store with a verified publisher', 'A pop-up saying your PC is infected'], answer: 2, explain: 'Verified publishers and official stores greatly reduce the risk.' },
    { q: 'Your antivirus reports a Trojan. What should you do first?', options: ['Ignore it', 'Disconnect from the network, run a full scan, then change passwords from a clean device', 'Turn off the antivirus', 'Email the file to friends'], answer: 1, explain: 'Isolating the device stops the attacker’s remote connection and any spread.' },
  ],
};
