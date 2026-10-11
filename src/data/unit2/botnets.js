import { Network } from 'lucide-react';

export default {
  slug: 'botnets',
  number: 2,
  title: 'Botnets',
  icon: Network,
  color: '#a78bfa',
  summary: 'Discover how infected devices form a controlled network.',
  tagline: 'Understand how compromised devices can become a network controlled by an attacker.',
  keywords: ['bot', 'zombie', 'c2', 'command and control', 'mirai', 'iot'],
  intro: [
    'A botnet ("robot network") is a group of internet-connected devices (computers, phones, cameras, routers) that have been infected with malware and are remotely controlled by an attacker, usually without their owners knowing.',
    'One infected device can do little damage. Thousands of them acting together can take down websites, send millions of spam emails or test stolen passwords at huge scale.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Bot / Zombie', text: 'An infected device that secretly follows the attacker’s commands.' },
      { term: 'Bot-herder / Botmaster', text: 'The attacker who controls the botnet.' },
      { term: 'C2 Server', text: 'Command-and-Control server used to send instructions to all the bots.' },
    ],
  },
  compare: {
    title: 'Botnet Architectures',
    left: {
      title: 'Centralized (Client–Server)',
      subtitle: 'One command centre',
      points: ['All bots connect to a single C2 server', 'Easy for the attacker to manage', 'Taking down the C2 server disables the botnet'],
    },
    right: {
      title: 'Peer-to-Peer (P2P)',
      subtitle: 'No single centre',
      points: ['Bots pass commands to each other', 'No single point of failure', 'Much harder for defenders to dismantle'],
    },
  },
  flow: {
    title: 'How a Botnet Works',
    steps: [
      { title: 'Device compromise', text: 'Malware infects devices through phishing, unpatched flaws or default passwords.' },
      { title: 'Connect to C2', text: 'The infected device quietly contacts the command-and-control server.' },
      { title: 'Wait for commands', text: 'Bots stay hidden until the botmaster sends instructions.' },
      { title: 'Coordinated attack', text: 'All bots act at once: DDoS, spam, credential stuffing and more.' },
    ],
  },
  cards: {
    title: 'Common Uses of Botnets',
    items: [
      { title: 'DDoS Attacks', text: 'Flooding websites with traffic to take them offline.' },
      { title: 'Spam & Phishing', text: 'Sending massive volumes of unwanted or malicious emails.' },
      { title: 'Credential Stuffing', text: 'Testing leaked usernames and passwords on many websites.' },
      { title: 'Cryptojacking', text: 'Using victims’ CPUs to mine cryptocurrency.' },
      { title: 'Click Fraud', text: 'Faking ad clicks to steal advertising money.' },
      { title: 'Data Theft', text: 'Stealing files, passwords and banking details from bots.' },
    ],
  },
  lists: [
    {
      title: 'Signs a Device May Be a Bot',
      tone: 'warn',
      items: [
        'Slow performance and fans running when idle',
        'Unusually high internet usage',
        'Unknown programs or processes running',
        'Friends receive spam sent from your accounts',
        'Browser redirects or new toolbars',
      ],
    },
    {
      title: 'Prevention',
      tone: 'good',
      items: [
        'Change default passwords on routers, cameras and IoT devices',
        'Keep OS, apps and firmware updated',
        'Use antivirus and a firewall',
        'Do not open unknown links and attachments',
        'Disable unused services such as Telnet',
        'Monitor network traffic for unusual spikes',
      ],
    },
  ],
  callout: {
    title: 'Real world: Mirai (2016)',
    text: 'The Mirai botnet infected hundreds of thousands of IoT devices, mostly cameras and routers that still used factory-default passwords. It launched a massive DDoS attack on the DNS provider Dyn, making sites like Twitter, Netflix and GitHub unreachable for many users.',
  },
  lab: {
    key: 'botnets',
    title: 'Mission: Botnet Takeover — Attack & Defend',
    description: 'First play the attacker and watch the botnet form. Then switch to defender: you have 5 security fixes to stop the infection. Choose wisely.',
    objectives: [
      { id: 'infect', label: 'Run an infection wave and watch the botnet form', xp: 20 },
      { id: 'command', label: 'Send a command from the C2 server', xp: 20 },
      { id: 'defend', label: 'As defender, stop the infection completely (0 bots)', xp: 60 },
    ],
  },
  quiz: [
    {
      q: 'What is a botnet?',
      options: [
        'A network of robots in a factory',
        'A network of compromised devices remotely controlled by an attacker',
        'An antivirus tool that scans networks',
        'A secure VPN service',
      ],
      answer: 1,
      explain: 'Bots are infected devices, and the botmaster controls all of them together.',
    },
    {
      q: 'What is the role of a Command-and-Control (C2) server?',
      options: [
        'To protect infected devices from viruses',
        'To send instructions to the bots and coordinate them',
        'To alert users that their device is infected',
        'To update the operating system',
      ],
      answer: 1,
      explain: 'The C2 server is how the botmaster tells every bot what to do.',
    },
    {
      q: 'Why are IoT devices like cameras and routers common botnet targets?',
      options: [
        'They are too expensive to hack',
        'They often keep default passwords and are rarely updated',
        'They have no internet connection',
        'They always run antivirus',
      ],
      answer: 1,
      explain: 'Default credentials and outdated firmware make IoT devices easy to compromise. Mirai used exactly this.',
    },
    {
      q: 'Which of these could mean your computer is part of a botnet?',
      options: [
        'Heavy network activity and slowness even when you are not using it',
        'Your wallpaper changes when you set a new one',
        'Your battery charges normally',
        'Your apps update from the official store',
      ],
      answer: 0,
      explain: 'Bots use your bandwidth and CPU in the background, so the device slows down and network usage rises.',
    },
    {
      q: 'Why is a peer-to-peer botnet harder to shut down than a centralized one?',
      options: [
        'It uses stronger passwords',
        'It has no single C2 server whose takedown would stop it',
        'It only infects servers',
        'It is legal',
      ],
      answer: 1,
      explain: 'In P2P botnets commands spread between bots, so there is no single point of failure.',
    },
  ],
};
