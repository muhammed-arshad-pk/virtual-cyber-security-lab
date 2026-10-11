import { TrendingUp } from 'lucide-react';

export default {
  slug: 'trends-in-mobility',
  number: 2,
  title: 'Trends in Mobility',
  icon: TrendingUp,
  color: '#a78bfa',
  difficulty: 'Intermediate',
  summary: '5G, cloud and edge, BYOD, wearables, mobile payments and AI, and the risks they bring.',
  tagline: 'Faster networks, smarter apps, money in your pocket, and new risks at every step.',
  keywords: ['5g', 'cloud', 'edge', 'byod', 'wearables', 'upi', 'ai', 'mobility'],
  intro: [
    'Mobility keeps changing. Networks have moved from 1G analogue voice to 5G with near-instant response. Apps now live in the cloud and at the network edge, employees bring their own devices to work, and phones have become wallets.',
    'Each trend brings real benefits but also new security and privacy challenges. A good security professional understands both sides.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Latency', text: 'The delay for data to travel and get a response, measured in milliseconds.' },
      { term: 'Edge computing', text: 'Processing data close to where it is produced (towers, local servers) instead of a distant cloud.' },
      { term: 'BYOD', text: 'Bring Your Own Device: employees use personal phones and laptops for work.' },
    ],
  },
  compare: {
    title: 'Cloud vs Edge Computing',
    left: { title: 'Cloud computing', subtitle: 'Centralised data centres', points: ['Huge, elastic computing power', 'Easier to secure in one place', 'Higher latency for far-away users', 'Risk: misconfigured storage leaks data'] },
    right: { title: 'Edge computing', subtitle: 'Distributed near the user', points: ['Very low latency (AR, self-driving, factories)', 'Thousands of small nodes', 'Nodes may be physically exposed', 'Risk: harder to patch and monitor everything'] },
  },
  flow: {
    title: 'How a Trend Becomes a Risk',
    steps: [
      { title: 'New capability', text: 'A technology makes something easier: payments, remote work, smart health.' },
      { title: 'Mass adoption', text: 'Millions of users join quickly, often before security matures.' },
      { title: 'Attackers follow', text: 'Criminals target where the users and money are.' },
      { title: 'Controls catch up', text: 'Regulation, standards and secure design reduce the risk over time.' },
    ],
  },
  table: {
    title: 'Mobile Network Generations',
    columns: ['Generation', 'Around', 'Highlights', 'Security note'],
    rows: [
      ['1G', '1980s', 'Analogue voice calls', 'No encryption: calls could be overheard with a scanner'],
      ['2G (GSM)', '1991', 'Digital voice, SMS', 'Encryption added, but only the phone is authenticated, so fake base stations are possible'],
      ['3G (UMTS)', '2001', 'Mobile internet', 'Mutual authentication: the phone also verifies the network'],
      ['4G (LTE)', '2009', 'All-IP, HD video, VoLTE', 'Stronger keys, but subscriber identity sometimes sent in clear'],
      ['5G', '2019 (India: Oct 2022)', 'Gbps speeds, ms latency, massive IoT', 'SUCI conceals the subscriber’s permanent ID; network slicing'],
    ],
  },
  cards: {
    title: 'Key Mobility Trends',
    items: [
      { title: '5G Networks', text: 'Very high speed, low latency, millions of IoT devices per km².' },
      { title: 'Cloud & Edge', text: 'Apps and data live in the cloud, with processing at the edge.' },
      { title: 'BYOD', text: 'Personal devices access company email, files and apps.' },
      { title: 'Wearables', text: 'Watches and rings collect heart rate, sleep and location.' },
      { title: 'Mobile Payments', text: 'UPI, wallets and tap-to-pay made the phone a wallet.' },
      { title: 'AI-powered Apps', text: 'Assistants, translation, camera AI, plus deepfake and voice-clone scams.' },
    ],
  },
  lists: [
    { title: 'Privacy & Security Challenges', tone: 'warn', items: ['More personal data collected than ever', 'Health data from wearables is very sensitive', 'Payment fraud follows payment growth', 'AI voice cloning enables "family emergency" scams', 'Cloud misconfiguration exposes millions of records'] },
    { title: 'How We Respond', tone: 'good', items: ['Security by design in new apps', 'Strong authentication for payments', 'Data minimisation and consent (DPDP Act)', 'BYOD policies with MDM/MAM', 'User awareness of new scam types'] },
  ],
  lab: {
    key: 'u3-trends',
    title: 'Mission: Time-Travel Through Mobility',
    description: 'Travel from 1G to 5G and see how security changed in each generation. Race 4G against 5G, then match each modern trend to its biggest security risk.',
    badge: { name: 'Trend Spotter', emoji: '🛰️' },
    objectives: [
      { id: 'generations', label: 'Explore every network generation', xp: 25 },
      { id: 'race', label: 'Run the 4G vs 5G latency race', xp: 20 },
      { id: 'match', label: 'Match every trend to its key risk', xp: 45 },
    ],
  },
  quiz: [
    { q: 'What is the main advantage of edge computing?', options: ['Cheaper phones', 'Lower latency, because data is processed near the user', 'No need for security', 'Bigger screens'], answer: 1, explain: 'Edge nodes sit close to users, which is essential for real-time applications.' },
    { q: 'Which security weakness did 2G (GSM) have?', options: ['No SMS', 'The phone did not authenticate the network, allowing fake base stations', 'It used fibre optics', 'It had no voice calls'], answer: 1, explain: 'Without mutual authentication, a phone can be tricked into joining a fake tower.' },
    { q: 'What does BYOD stand for?', options: ['Buy Your Own Data', 'Bring Your Own Device', 'Block Your Online Data', 'Back-up Your Old Disk'], answer: 1, explain: 'Employees use personal devices for work, which mixes personal and corporate data.' },
    { q: 'Which new scam uses AI to imitate a relative’s voice asking for money?', options: ['Voice-clone / deepfake scam', 'Bluejacking', 'Rainbow table', 'Ping flood'], answer: 0, explain: 'A few seconds of audio can be enough to clone a voice. Verify by calling back.' },
    { q: 'How does 5G protect the subscriber’s permanent identity?', options: ['It doesn’t', 'It encrypts it as a SUCI before sending it over the air', 'It removes the SIM card', 'It uses Bluetooth'], answer: 1, explain: 'SUCI conceals the SUPI with public-key encryption, defeating IMSI catchers.' },
  ],
  deep: {
    sections: [
      { title: '5G security improvements and new risks', points: ['SUCI: the permanent subscriber ID (SUPI) is encrypted with the operator’s public key before it is sent.', 'Stronger authentication (5G-AKA / EAP-AKA’) and integrity protection for user data.', 'Network slicing: one physical network is split into virtual networks for different uses. A badly isolated slice is a new risk.', 'Software-defined, virtualised core networks mean software bugs become network bugs.', 'Massive IoT means far more weak devices connected at high speed.'] },
      { title: 'Cloud and edge security', points: ['Shared-responsibility model: the provider secures the cloud, and you secure what you put in it.', 'The most common cloud breach cause is misconfiguration, such as public storage buckets or open databases.', 'Edge nodes may sit in street cabinets or towers and need physical tamper protection.', 'Use identity-based access (Zero Trust) instead of trusting anything just because it is "inside the network".'] },
      { title: 'Mobile payments in India', points: ['UPI (launched 2016 by NPCI) now carries billions of transactions every month.', 'Scams shifted to social engineering: fake "collect requests", QR codes that take money, and screen-sharing apps.', 'Golden rule: you never need to enter your UPI PIN to RECEIVE money.', 'RBI rules limit customer liability if unauthorised transactions are reported quickly (within 3 working days for zero liability in third-party breaches).'] },
      { title: 'AI on mobile: opportunity and threat', points: ['On-device AI can keep data private by processing it locally.', 'AI apps may send your photos, voice or documents to servers, so read the privacy policy.', 'Deepfake videos and voice clones make impersonation scams far more convincing.', 'Defence: verify through a second channel, and agree a family "safe word".'] },
    ],
    cases: [
      { year: '2016', title: 'UPI launch', text: 'NPCI launched UPI, enabling instant bank-to-bank payments from a phone. It grew into one of the world’s largest real-time payment systems.' },
      { year: '2019', title: 'First commercial 5G', text: 'South Korea and the USA launched commercial 5G, followed by much of the world.' },
      { year: '2020', title: 'Remote-work shift', text: 'The pandemic pushed BYOD and remote access overnight, and attacks on VPNs and personal devices surged.' },
      { year: '2023', title: 'AI voice-clone scams', text: 'Authorities worldwide warned about scammers cloning voices from social media clips to fake emergencies.' },
    ],
    myths: [
      { myth: '5G is completely secure.', fact: '5G fixed many old weaknesses, but devices, apps and IoT on top of it can still be insecure.' },
      { myth: 'Data in the cloud is automatically safe.', fact: 'Most cloud leaks come from customers misconfiguring storage, not from the provider being hacked.' },
      { myth: 'To receive money on UPI I need to enter my PIN.', fact: 'Never. A PIN request always means money is LEAVING your account.' },
    ],
    law: [
      { title: 'DPDP Act, 2023', text: 'Requires consent and purpose limitation for personal data, which is very relevant to wearables, AI apps and payment apps.' },
      { title: 'RBI customer-liability rules', text: 'Report unauthorised electronic banking transactions immediately. Zero liability applies if reported within 3 working days in third-party-breach cases.' },
      { title: 'Report fraud', text: 'Financial cyber fraud: call 1930 or file at cybercrime.gov.in. Suspicious calls and SMS: use Chakshu on sancharsaathi.gov.in.' },
    ],
    examNotes: [
      'Trends: 5G, cloud and edge, BYOD, wearables, mobile payments, AI apps.',
      'Generations: 1G (no encryption) → 2G (one-way authentication) → 3G (mutual authentication) → 4G → 5G (SUCI, slicing).',
      'Cloud = central and elastic. Edge = low latency and distributed.',
      'BYOD mixes personal and corporate data and needs policy plus MDM/MAM.',
      'Challenges: privacy, payment fraud, deepfakes, misconfiguration.',
      'Responses: security by design, MFA, data minimisation, awareness.',
    ],
    extraQuiz: [
      { q: 'In the cloud shared-responsibility model, who secures the data you upload?', options: ['Only the provider', 'You (the customer)', 'Nobody', 'The government'], answer: 1, explain: 'The provider secures the infrastructure. You secure your configuration and data.' },
      { q: 'A stranger sends a UPI "collect request" saying you’ll receive ₹5,000 if you enter your PIN. What happens if you enter it?', options: ['You receive ₹5,000', 'You PAY ₹5,000', 'Nothing', 'Your bank is closed'], answer: 1, explain: 'Entering a UPI PIN always authorises money going OUT.' },
      { q: 'What is network slicing in 5G?', options: ['Cutting fibre cables', 'Splitting one physical network into isolated virtual networks for different uses', 'Reducing speed', 'A type of SIM'], answer: 1, explain: 'Slices for IoT, emergency services and consumers must be well isolated.' },
    ],
  },
};
