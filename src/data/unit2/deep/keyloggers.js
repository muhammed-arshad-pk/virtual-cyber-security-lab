export default {
  sections: [
    {
      title: 'How software keyloggers work (conceptually)',
      points: [
        'API-level loggers register with the operating system to receive copies of keyboard events.',
        'Kernel-level loggers run as drivers deep in the OS. They are harder to detect and often hidden by rootkits.',
        'Form grabbers live inside the browser and capture form data before HTTPS encrypts it.',
        'Many also record the clipboard, take screenshots and log which window was active.',
        'Captured data is saved in a hidden log and periodically sent out by email, FTP, HTTP or chat bots.',
      ],
    },
    {
      title: 'Hardware and physical loggers',
      points: [
        'Inline USB adapters plugged between the keyboard cable and the PC look like ordinary connectors.',
        'Keyboards can have a logging chip built inside.',
        'Older wireless keyboards without encryption can be sniffed over the air.',
        'ATM skimmers apply the same idea: keypad overlays or tiny cameras record PINs.',
      ],
    },
    {
      title: 'Detect and remove',
      points: [
        'Check Task Manager → Startup apps, your installed programs and browser extensions for unknown items.',
        'Run a full antivirus scan, and use Microsoft Defender Offline for stubborn malware.',
        'Microsoft Sysinternals Autoruns lists every program that starts automatically.',
        'On shared or public computers, look at the back of the PC for unfamiliar USB devices.',
        'After cleaning, change passwords from a different, clean device and enable MFA.',
      ],
    },
    {
      title: 'Anti-keylogging defences',
      points: [
        'MFA and OTPs: a stolen password alone is not enough.',
        'Password-manager autofill avoids typing passwords at all.',
        'Virtual (on-screen) keyboards used by banks help against keyloggers but not screen recorders.',
        'Use a standard (non-admin) account day to day, so malware can’t easily install drivers.',
        'Keep the OS and browser updated, and use endpoint protection with behaviour monitoring.',
      ],
    },
  ],
  cases: [
    { year: '2005', title: 'Sumitomo Mitsui Bank, London', text: 'Attackers used keyloggers to capture bank login details and tried to transfer about £220 million. The transfers were blocked, but it showed how powerful keyloggers are.' },
    { year: '2007', title: 'Zeus', text: 'Combined keylogging and form-grabbing to steal online banking credentials from millions of PCs.' },
    { year: '2014', title: 'Agent Tesla', text: 'A widely sold spyware/keylogger, still common today, usually spread through malicious email attachments.' },
    { year: '2021', title: 'Pegasus Project', text: 'Journalists revealed that NSO Group’s Pegasus spyware was found on phones of journalists and activists, sometimes installed with zero-click exploits.' },
  ],
  myths: [
    { myth: 'Incognito mode protects me from keyloggers.', fact: 'Incognito only skips saving local history. A keylogger runs at system level and sees everything.' },
    { myth: 'iPhones and Macs can’t get spyware.', fact: 'Every platform is a target. Pegasus attacked fully updated iPhones.' },
    { myth: 'HTTPS (the padlock) stops keyloggers.', fact: 'HTTPS protects data in transit. A keylogger captures keys on your device before encryption.' },
  ],
  law: [
    { title: 'IT Act Sec 43 & 66', text: 'Installing spyware or extracting data from someone’s device without permission is unauthorised access and data theft.' },
    { title: 'IT Act Sec 66E & 72', text: 'Violation of privacy (capturing private images) and breach of confidentiality.' },
    { title: 'BNS Sec 78', text: 'Monitoring someone’s electronic communication can amount to stalking, which covers stalkerware.' },
    { title: 'Consent matters', text: 'Installing monitoring software on another adult’s device without their knowledge is illegal, even for a partner or family member.' },
  ],
  examNotes: [
    'Spyware secretly monitors and exfiltrates data. A keylogger is spyware focused on keystrokes.',
    'Software keyloggers: API-based, kernel-based, form grabbers. Hardware: USB inline, built-in, wireless sniffers.',
    'Infection: attachments, Trojan apps, bundled software, physical access.',
    'Signs: slow device, odd permissions, pop-ups, disabled antivirus.',
    'Defences: antivirus, updates, MFA, password manager, permission review, checking USB ports.',
    'Law: IT Act 43, 66, 66E, 72 and BNS 78.',
  ],
  extraQuiz: [
    {
      q: 'A form grabber captures data…',
      options: ['From the keyboard cable', 'Inside the browser before it is encrypted and sent', 'From the Wi-Fi router', 'From printed documents'],
      answer: 1,
      explain: 'Form grabbers read submitted form fields inside the browser, bypassing HTTPS.',
    },
    {
      q: 'Why doesn’t HTTPS stop a keylogger?',
      options: ['HTTPS is broken', 'The keylogger captures keystrokes on the device before encryption happens', 'Keyloggers only work on HTTP sites', 'HTTPS is only for images'],
      answer: 1,
      explain: 'Encryption protects the network path, not your own infected device.',
    },
    {
      q: 'Which tool lists every program set to start automatically on Windows?',
      options: ['Paint', 'Sysinternals Autoruns', 'Notepad', 'Calculator'],
      answer: 1,
      explain: 'Autoruns shows startup entries, services, scheduled tasks and drivers.',
    },
  ],
};
