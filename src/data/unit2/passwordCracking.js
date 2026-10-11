import { KeyRound } from 'lucide-react';

export default {
  slug: 'password-cracking',
  number: 3,
  title: 'Password Cracking',
  icon: KeyRound,
  color: '#34d399',
  summary: 'Understand password attacks and stronger authentication.',
  tagline: 'Understand common password attacks and learn how to create stronger defences.',
  keywords: ['brute force', 'dictionary', 'hash', 'credential stuffing', 'mfa', 'passphrase'],
  intro: [
    'Password cracking is the process of recovering passwords from data stored in, or sent by, a computer system. Attackers either guess against a live login page (online attack) or steal a database of password hashes and test billions of guesses on their own hardware (offline attack).',
    'Websites should never store your actual password. They store a hash, a one-way fingerprint of it. Cracking means finding a guess whose hash matches.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Hash', text: 'A one-way fingerprint of data. The same input always gives the same hash, but you cannot reverse it.' },
      { term: 'Salt', text: 'Random data added to each password before hashing so identical passwords get different hashes.' },
      { term: 'Entropy', text: 'A measure (in bits) of how unpredictable a password is. More bits means more guesses needed.' },
    ],
  },
  compare: {
    title: 'Online vs Offline Attacks',
    left: {
      title: 'Online Attack',
      subtitle: 'Guessing at the login page',
      points: ['Each guess is sent to the real server', 'Slowed down by lockouts, CAPTCHAs and rate limits', 'Only a few guesses per second'],
    },
    right: {
      title: 'Offline Attack',
      subtitle: 'Cracking a stolen hash database',
      points: ['Attacker has a copy of the hashes', 'No lockouts or rate limits', 'GPUs can test billions of guesses per second against fast hashes'],
    },
  },
  flow: {
    title: 'How an Offline Crack Works',
    steps: [
      { title: 'Steal hashes', text: 'A data breach leaks a database of password hashes.' },
      { title: 'Prepare guesses', text: 'The attacker loads wordlists of common passwords and mutation rules.' },
      { title: 'Hash each guess', text: 'Each guess is hashed with the same algorithm the site used.' },
      { title: 'Find a match', text: 'When a guess’s hash matches the stolen hash, the password is cracked.' },
    ],
  },
  cards: {
    title: 'Common Cracking Methods',
    items: [
      { title: 'Password Guessing', text: 'Trying personal info like birthdays, pet names or "password123".' },
      { title: 'Dictionary Attack', text: 'Trying every word in a list of common passwords and words.' },
      { title: 'Brute Force', text: 'Trying every possible combination of characters until one works.' },
      { title: 'Hybrid Attack', text: 'Dictionary words plus mutations: Sunshine → Sunsh1ne@123.' },
      { title: 'Credential Stuffing', text: 'Testing username–password pairs leaked from one site on other sites.' },
      { title: 'Rainbow Tables', text: 'Precomputed hash lookups. Defeated by salting.' },
    ],
  },
  lists: [
    {
      title: 'Weak Password Habits',
      tone: 'warn',
      items: ['Short passwords (under 12 characters)', 'Dictionary words with simple substitutions (p@ssw0rd)', 'Names, birthdays, phone numbers', 'Reusing one password on many sites'],
    },
    {
      title: 'Strong Defences (Users)',
      tone: 'good',
      items: ['Long passphrases: Forest-Rains-Tornado-3', 'A password manager for unique passwords', 'Multi-factor authentication (MFA)', 'Never reuse passwords'],
    },
    {
      title: 'Strong Defences (Developers)',
      tone: 'info',
      items: ['Hash with slow algorithms: bcrypt, scrypt, Argon2', 'Unique salt per password', 'Account lockout and rate limiting', 'Check new passwords against breach lists'],
    },
  ],
  lab: {
    key: 'password',
    title: 'Mission: Crack It & Defend It',
    description: 'Brute-force a PIN, throw a guessing attack at a test password, and build one that survives. Then explore hashing and salting live. Everything runs locally and nothing is stored or sent.',
    objectives: [
      { id: 'pin', label: 'Brute-force a 4-digit PIN', xp: 20 },
      { id: 'crack', label: 'Crack a weak password with the dictionary attack', xp: 30 },
      { id: 'survive', label: 'Create a password that survives the dictionary attack', xp: 30 },
      { id: 'strong', label: 'Reach "Super Strong" in the strength analyzer', xp: 30 },
      { id: 'salt', label: 'See how a salt changes identical hashes', xp: 20 },
    ],
  },
  quiz: [
    {
      q: 'What is a dictionary attack?',
      options: [
        'Looking up the meaning of a password',
        'Trying words from a list of common passwords and words',
        'Trying every possible character combination',
        'Asking the user for their password',
      ],
      answer: 1,
      explain: 'Dictionary attacks use wordlists, which is why common words make bad passwords.',
    },
    {
      q: 'What is credential stuffing?',
      options: [
        'Creating very long passwords',
        'Using username–password pairs leaked from one site to log in on other sites',
        'Storing passwords in a file',
        'Encrypting passwords with a salt',
      ],
      answer: 1,
      explain: 'It works because people reuse passwords, so unique passwords defeat it.',
    },
    {
      q: 'Which is the most secure practice?',
      options: [
        'Changing your password every day',
        'Using the same complex password everywhere',
        'Using unique long passphrases with MFA enabled',
        'Writing your password on a sticky note',
      ],
      answer: 2,
      explain: 'Length beats complexity, uniqueness stops credential stuffing and MFA protects you even if a password leaks.',
    },
    {
      q: 'Why are offline attacks much faster than online attacks?',
      options: [
        'Offline computers are faster',
        'The attacker has stolen hashes and is not limited by lockouts or rate limits',
        'Online passwords are longer',
        'Offline attacks do not use hashes',
      ],
      answer: 1,
      explain: 'With a stolen hash file the attacker can guess as fast as their hardware allows.',
    },
    {
      q: 'How should a website store user passwords?',
      options: ['In plain text', 'Encrypted with one shared key', 'As salted hashes using a slow algorithm like bcrypt or Argon2', 'In a spreadsheet'],
      answer: 2,
      explain: 'Salts defeat rainbow tables, and slow hashing makes every guess expensive.',
    },
  ],
};
