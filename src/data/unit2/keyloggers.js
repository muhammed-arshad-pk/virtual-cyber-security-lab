import { Keyboard } from 'lucide-react';

export default {
  slug: 'keyloggers-spyware',
  number: 4,
  title: 'Keyloggers & Spyware',
  icon: Keyboard,
  color: '#f472b6',
  summary: 'Explore privacy threats and malicious monitoring.',
  tagline: 'Discover how malicious monitoring threatens privacy and personal information.',
  keywords: ['keylogger', 'spyware', 'stalkerware', 'monitoring', 'permissions', 'infostealer'],
  intro: [
    'Spyware is malicious software that secretly monitors your activity, gathers personal data and sends it to a third party without your consent.',
    'A keylogger is a specific kind of spyware (or hardware device) that records every key you type. That includes passwords, card numbers and private messages.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Software keylogger', text: 'A program that hooks into the OS or browser to capture keystrokes.' },
      { term: 'Hardware keylogger', text: 'A small physical device plugged between the keyboard and the computer.' },
      { term: 'Exfiltration', text: 'Secretly sending the stolen data out to the attacker.' },
    ],
  },
  compare: {
    title: 'Spyware vs Keyloggers',
    left: {
      title: 'Spyware',
      subtitle: 'Wide-ranging spying',
      points: ['Monitors browsing habits and harvests files', 'Takes screenshots, accesses camera and mic', 'Tracks location and reads messages'],
    },
    right: {
      title: 'Keyloggers',
      subtitle: 'Focused on what you type',
      points: ['Captures exact keyboard input', 'Targets passwords, card numbers and messages', 'Can be software or a hardware device'],
    },
  },
  flow: {
    title: 'How a Keylogger Captures Data',
    steps: [
      { title: 'User types', text: 'The victim types a username and password.' },
      { title: 'Keylogger intercepts', text: 'Hidden software records each key code as it is pressed.' },
      { title: 'Local storage', text: 'Keystrokes are saved in a hidden log file.' },
      { title: 'Transmission', text: 'The log is uploaded to the attacker over the network.' },
    ],
  },
  cards: {
    title: 'Types of Spyware',
    items: [
      { title: 'Keyloggers', text: 'Record keystrokes to steal credentials.' },
      { title: 'Infostealers', text: 'Grab saved browser passwords, cookies and crypto wallets.' },
      { title: 'Stalkerware', text: 'Installed on a partner’s or family member’s phone to track them.' },
      { title: 'Adware', text: 'Tracks browsing to show unwanted ads.' },
      { title: 'Screen Recorders', text: 'Capture screenshots or video of your activity.' },
      { title: 'Hardware Loggers', text: 'USB devices on public or shared computers.' },
    ],
  },
  lists: [
    {
      title: 'How Infection Occurs',
      tone: 'info',
      items: ['Malicious email attachments', 'Trojan apps disguised as useful tools', 'Bundled software from untrusted download sites', 'Physical access to an unlocked device'],
    },
    {
      title: 'Warning Signs',
      tone: 'warn',
      items: ['Slow device performance', 'Apps asking for accessibility or keyboard access for no reason', 'Unusual pop-ups and battery drain', 'Security software disabled without your action'],
    },
    {
      title: 'Protection',
      tone: 'good',
      items: ['Keep antivirus / anti-spyware updated', 'Install apps only from official stores', 'Review app permissions regularly', 'Enable MFA so a stolen password is not enough', 'Use a password manager’s autofill', 'Check USB ports on public computers'],
    },
  ],
  lab: {
    key: 'keylogger',
    title: 'Mission: Inside a Keylogger',
    description: 'Type into the fake login and watch a simulated keylogger stream your keystrokes to an attacker’s screen. Then beat it, and spot spyware hiding in app permission requests.',
    objectives: [
      { id: 'capture', label: 'Type a login and watch the keylogger capture it', xp: 20 },
      { id: 'autofill', label: 'Defeat keystroke capture using password-manager autofill', xp: 30 },
      { id: 'spot-risk', label: 'Correctly judge every app’s permission request', xp: 50 },
    ],
  },
  quiz: [
    {
      q: 'Why is a keylogger especially dangerous?',
      options: [
        'It deletes your files',
        'It secretly records everything you type, including passwords and messages',
        'It only shows pop-up ads',
        'It makes your keyboard stop working',
      ],
      answer: 1,
      explain: 'Capturing keystrokes gives attackers your credentials directly.',
    },
    {
      q: 'Which of these is a hardware keylogger?',
      options: [
        'A browser extension',
        'A small device plugged between the keyboard cable and the USB port',
        'An email attachment',
        'A Wi-Fi router',
      ],
      answer: 1,
      explain: 'Hardware keyloggers sit physically in the keyboard path. Check public computers for them.',
    },
    {
      q: 'A flashlight app asks for these permissions. Which one is the biggest red flag?',
      options: ['Camera (to use the flash)', 'Accessibility service that can read your screen and keystrokes', 'None of them', 'Vibration'],
      answer: 1,
      explain: 'Accessibility access lets an app read everything on screen. A flashlight has no reason to need it.',
    },
    {
      q: 'If a keylogger steals your password, what still protects your account?',
      options: ['A longer username', 'Multi-factor authentication (MFA)', 'Clearing browser history', 'Restarting the computer'],
      answer: 1,
      explain: 'With MFA, the attacker also needs your second factor (an OTP or authenticator app).',
    },
    {
      q: 'How are spyware and keyloggers related?',
      options: [
        'They are completely unrelated',
        'A keylogger is a specific type of spyware focused on keystrokes',
        'Spyware is a type of keylogger',
        'Both are antivirus tools',
      ],
      answer: 1,
      explain: 'Spyware is the broad category, and keyloggers specialise in recording typed input.',
    },
  ],
};
