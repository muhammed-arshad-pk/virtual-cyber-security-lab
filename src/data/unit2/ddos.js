import { ServerCrash } from 'lucide-react';

export default {
  slug: 'dos-ddos',
  number: 5,
  title: 'DoS & DDoS Attacks',
  icon: ServerCrash,
  color: '#fb923c',
  summary: 'Understand how excessive traffic disrupts services.',
  tagline: 'Discover why services go offline under overload and how defenders keep them available.',
  keywords: ['denial of service', 'availability', 'rate limiting', 'cdn', 'cia triad'],
  intro: [
    'A Denial of Service (DoS) attack tries to make a website or online service unavailable to its real users by overwhelming it. It targets availability, one of the three pillars of the CIA triad (Confidentiality, Integrity, Availability).',
    'In a Distributed Denial of Service (DDoS) attack the overload comes from many machines at once, often a botnet. Because it arrives from everywhere, defenders cannot simply block one address.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Availability', text: 'The guarantee that a service is reachable when legitimate users need it.' },
      { term: 'Rate limiting', text: 'Capping how many requests each user or address may make in a time window.' },
      { term: 'CDN / Scrubbing', text: 'A large provider that absorbs and filters traffic before it reaches your server.' },
    ],
  },
  compare: {
    title: 'DoS vs DDoS',
    left: {
      title: 'DoS',
      subtitle: 'Single source',
      points: ['Comes from one machine or address', 'Smaller in scale', 'Easier to detect and block'],
    },
    right: {
      title: 'DDoS',
      subtitle: 'Many sources',
      points: ['Comes from thousands of devices (often a botnet)', 'Much larger in scale', 'Hard to separate from real users'],
    },
  },
  flow: {
    title: 'How an Outage Unfolds',
    steps: [
      { title: 'Normal service', text: 'Real users reach the server without problems.' },
      { title: 'Overload', text: 'Far more traffic arrives than the server was built for.' },
      { title: 'Resources exhausted', text: 'CPU, memory, bandwidth or connections run out.' },
      { title: 'Service disruption', text: 'Real users see timeouts and errors. The service is "down".' },
    ],
  },
  cards: {
    title: 'Categories (Conceptual)',
    items: [
      { title: 'Volume-based', text: 'Saturates the network bandwidth leading to the target.' },
      { title: 'Protocol-based', text: 'Exhausts connection tables in servers, firewalls or load balancers.' },
      { title: 'Application-layer', text: 'Exhausts the web application itself with costly requests.' },
    ],
  },
  lists: [
    {
      title: 'Real-World Impact',
      tone: 'warn',
      items: ['Website downtime and lost sales', 'Interrupted essential services (banking, exams, healthcare)', 'Reputation damage', 'Sometimes used as a distraction for other attacks'],
    },
    {
      title: 'Defences',
      tone: 'good',
      items: [
        'Rate limiting per user or IP',
        'Traffic filtering and firewalls',
        'CDN / DDoS protection services',
        'Monitoring and alerting on traffic spikes',
        'Extra capacity and load balancing',
        'An incident-response plan agreed with the ISP',
      ],
    },
  ],
  callout: {
    title: 'Legal note',
    text: 'Launching DoS attacks, or paying "booter / stresser" services to do it, is a crime in India under Sections 43 and 66 of the IT Act, 2000 and in most countries. Only test systems you own, with permission.',
  },
  lab: {
    key: 'ddos',
    title: 'Mission: Availability Defender',
    description: 'Sort facts into DoS or DDoS, then act as the on-call security engineer and choose the right defence for each incident.',
    objectives: [
      { id: 'sort', label: 'Sort every fact into DoS or DDoS correctly', xp: 40 },
      { id: 'defend', label: 'Pick the right defence for every incident', xp: 60 },
    ],
  },
  quiz: [
    {
      q: 'What makes a DDoS attack harder to stop than a DoS attack?',
      options: ['It uses better malware', 'Its traffic comes from many distributed sources', 'It destroys hardware', 'It only happens at night'],
      answer: 1,
      explain: 'With thousands of sources you cannot just block one address.',
    },
    {
      q: 'Which part of the CIA triad do DoS attacks target?',
      options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
      answer: 2,
      explain: 'The goal is to make the service unavailable to legitimate users.',
    },
    {
      q: 'What does rate limiting do?',
      options: ['Encrypts traffic', 'Caps how many requests a user or address can make in a time window', 'Speeds up the server', 'Blocks all users'],
      answer: 1,
      explain: 'It stops any single source from consuming too many resources.',
    },
    {
      q: 'How does a CDN / DDoS protection service help?',
      options: ['It deletes the website', 'It absorbs and filters huge traffic volumes before they reach your server', 'It writes your code', 'It changes your domain name'],
      answer: 1,
      explain: 'These providers have enormous capacity spread around the world.',
    },
    {
      q: 'Which of these is NOT a DoS defence?',
      options: ['Traffic monitoring and alerts', 'Load balancing', 'Sharing the admin password with more people', 'Rate limiting'],
      answer: 2,
      explain: 'Sharing passwords weakens security and does nothing for availability.',
    },
  ],
};
