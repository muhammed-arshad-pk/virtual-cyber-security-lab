export default {
  sections: [
    {
      title: 'Hashing explained',
      points: [
        'A hash function turns any input into a fixed-length fingerprint. SHA-256 always gives 64 hexadecimal characters.',
        'It is one-way: you cannot turn a hash back into the password.',
        'The same input always gives the same hash, which is how a website checks your login without storing the password.',
        'Avalanche effect: changing a single character produces a completely different hash. Try it in the Hash Playground.',
      ],
    },
    {
      title: 'Why salt and slow hashes matter',
      points: [
        'Without salt, two users with the same password get the same hash, so cracking one cracks both.',
        'Rainbow tables (precomputed hash → password lookups) only work on unsalted hashes.',
        'A salt is a random value stored next to each user’s hash, which makes every hash unique.',
        'Fast hashes like MD5 and SHA-1 let GPUs try billions of guesses per second. Slow algorithms (bcrypt, scrypt, Argon2) make each guess costly.',
        'Argon2 won the Password Hashing Competition in 2015 and is the modern recommendation.',
        'A "pepper" is an extra secret key stored outside the database, adding another layer.',
      ],
    },
    {
      title: 'Modern password guidance (NIST SP 800-63B)',
      points: [
        'Length beats complexity: encourage long passphrases (15+ characters is ideal).',
        'Don’t force periodic password changes. Change only when there is evidence of compromise.',
        'Check new passwords against lists of breached and common passwords.',
        'Allow pasting and password managers. Don’t use password hints or security questions.',
        'Limit failed login attempts (rate limiting) to stop online guessing.',
      ],
    },
    {
      title: 'The MFA strength ladder',
      points: [
        'SMS OTP: much better than nothing, but vulnerable to SIM-swap fraud and phishing.',
        'Authenticator apps (TOTP): codes generated on your phone, not sent over the network.',
        'Push notifications with number matching: stop people approving prompts by accident.',
        'Hardware security keys and passkeys (FIDO2): phishing-resistant, and the strongest option.',
      ],
    },
  ],
  cases: [
    { year: '2009', title: 'RockYou breach', text: 'About 32 million passwords stored in plain text were leaked. The list became the famous "rockyou.txt" wordlist, still used in password-cracking training today.' },
    { year: '2012', title: 'LinkedIn', text: 'About 6.5 million unsalted SHA-1 password hashes were posted online and quickly cracked. In 2016 the full set of around 117 million appeared.' },
    { year: '2013', title: 'Adobe', text: 'About 150 million records leaked. Passwords were encrypted with one key instead of being hashed, and plaintext hints were included, so people solved them like a crossword.' },
    { year: '2019', title: 'Collection #1', text: 'A compilation of about 773 million email addresses and 21 million unique passwords from older breaches, which powered credential-stuffing attacks.' },
  ],
  myths: [
    { myth: '"P@ssw0rd!" is strong because it has symbols.', fact: 'Common substitutions are built into every cracking rule set, so it falls in seconds.' },
    { myth: 'Changing my password every month keeps me safe.', fact: 'Forced changes lead to patterns like Summer2024! → Autumn2024!. Change it only when compromised.' },
    { myth: 'Hashing and encryption are the same.', fact: 'Encryption can be reversed with a key. Hashing is one-way and cannot be reversed.' },
  ],
  law: [
    { title: 'IT Act Sec 66C: Identity theft', text: 'Fraudulently using another person’s password or other unique identification: up to 3 years and a fine up to ₹1 lakh.' },
    { title: 'IT Act Sec 43 & 66', text: 'Unauthorised access to a computer or account, with compensation (43) or imprisonment when done dishonestly (66).' },
    { title: 'DPDP Act, 2023', text: 'Organisations must protect personal data with reasonable security safeguards. Penalties can reach ₹250 crore.' },
  ],
  examNotes: [
    'Password cracking means recovering passwords from stored or transmitted data.',
    'Methods: guessing, dictionary, brute force, hybrid, credential stuffing, rainbow tables.',
    'Online attacks are slowed by lockouts. Offline attacks on stolen hashes are not.',
    'Hash = one-way fingerprint. Salt = random per-user value. Use slow hashes: bcrypt, scrypt, Argon2.',
    'User defences: long unique passphrases, a password manager, MFA.',
    'Law: IT Act 66C (identity theft) and the DPDP Act 2023.',
  ],
  extraQuiz: [
    {
      q: 'What is the "avalanche effect" in hashing?',
      options: ['Hashes get longer over time', 'A tiny change in input gives a completely different hash', 'Hashes can be reversed', 'Passwords are deleted automatically'],
      answer: 1,
      explain: 'Changing "password" to "Password" changes the whole SHA-256 output.',
    },
    {
      q: 'What is the main purpose of a salt?',
      options: ['To make passwords shorter', 'To make identical passwords produce different hashes and defeat rainbow tables', 'To encrypt the database', 'To speed up logins'],
      answer: 1,
      explain: 'A unique random salt per user makes precomputed tables useless.',
    },
    {
      q: 'Which MFA method is the most resistant to phishing?',
      options: ['SMS OTP', 'Email codes', 'Hardware security keys / passkeys (FIDO2)', 'Security questions'],
      answer: 2,
      explain: 'FIDO2 keys check the website’s real domain, so fake sites can’t use them.',
    },
  ],
};
