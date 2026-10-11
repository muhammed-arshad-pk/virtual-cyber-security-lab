export default {
  sections: [
    {
      title: 'The botnet lifecycle in detail',
      points: [
        'Propagation: phishing attachments, drive-by downloads, unpatched services and weak or default IoT passwords.',
        'Rally: the new bot "phones home" to the C2 server and reports details such as OS, IP address and bandwidth.',
        'Persistence: the malware sets itself to survive reboots and hides from the user.',
        'Command execution: bots sit idle until the botmaster issues tasks.',
        'Monetisation: botnets are rented out on underground markets as "botnet-for-hire" or DDoS-for-hire services.',
      ],
    },
    {
      title: 'How C2 communication hides',
      points: [
        'Many botnets use HTTP or HTTPS so their traffic blends in with normal web browsing.',
        'Older botnets used IRC chat channels for commands.',
        'Peer-to-peer botnets pass commands from bot to bot, with no central server.',
        'Domain Generation Algorithms (DGA) create thousands of new domain names every day, so blocking one domain is useless.',
        'Fast-flux DNS rapidly rotates the IP addresses behind a domain.',
        'Some abuse legitimate services such as social media, cloud storage or chat apps as hidden C2 channels.',
      ],
    },
    {
      title: 'Detection: what defenders look for',
      points: [
        'Beaconing: a device contacts the same server at very regular intervals, like a heartbeat.',
        'DNS anomalies: many lookups for random-looking domain names.',
        'Unusual outbound traffic, especially at night or from devices like printers and cameras.',
        'Connections to known-bad IPs or domains listed in threat-intelligence feeds.',
        'Intrusion detection systems (e.g. Snort, Suricata) and endpoint protection (EDR) raise alerts on known patterns.',
      ],
    },
    {
      title: 'How botnets are taken down',
      points: [
        'Sinkholing: C2 domains are redirected to servers run by defenders, which cuts off the botmaster and reveals infected victims.',
        'Law-enforcement seizure of C2 servers through international cooperation.',
        'Reverse-engineering the DGA lets defenders pre-register future C2 domains.',
        'ISPs notify customers whose devices are infected.',
        'In India, CERT-In’s Cyber Swachhta Kendra (csk.gov.in) gives free bot-removal tools and alerts to ISPs and users.',
      ],
    },
  ],
  cases: [
    { year: '2008', title: 'Conficker', text: 'A worm that infected millions of Windows PCs through an unpatched vulnerability. Later versions generated 50,000 possible C2 domains a day, so the industry formed the "Conficker Working Group" to fight it.' },
    { year: '2007', title: 'Zeus', text: 'A banking-trojan botnet that stole online banking credentials worldwide. After its source code leaked in 2011, many copycat botnets appeared.' },
    { year: '2016', title: 'Mirai', text: 'Hijacked IoT cameras and routers that used default passwords, then took down the DNS provider Dyn. Its authors released the source code, spawning many variants.' },
    { year: '2021', title: 'Emotet takedown', text: 'A Europol-coordinated operation seized Emotet’s infrastructure in January 2021, then pushed an update that removed the malware from infected PCs.' },
  ],
  myths: [
    { myth: 'My smart TV or camera is too small to matter.', fact: 'Every device adds bandwidth. Mirai was built almost entirely from cameras and routers.' },
    { myth: 'My computer works fine, so it can’t be a bot.', fact: 'Bots are designed to stay quiet and use resources without you noticing.' },
    { myth: 'Antivirus alone keeps me out of botnets.', fact: 'You also need updates, strong unique passwords, disabled unused services and network monitoring.' },
  ],
  law: [
    { title: 'IT Act Sec 43', text: 'Unauthorised access, introducing viruses or contaminants, disrupting systems or denying access. The owner can claim compensation.' },
    { title: 'IT Act Sec 66', text: 'Doing any Sec 43 act dishonestly or fraudulently: up to 3 years’ imprisonment and/or a fine up to ₹5 lakh.' },
    { title: 'IT Act Sec 66F', text: 'Cyber terrorism, e.g. attacks on critical infrastructure. Punishable with up to life imprisonment.' },
    { title: 'CERT-In reporting', text: 'Since 2022, organisations must report cyber incidents to CERT-In within 6 hours of noticing them.' },
  ],
  examNotes: [
    'Bot or zombie = infected device. Botmaster or bot-herder = controller. C2 = command-and-control server.',
    'Architectures: centralized (client–server) vs peer-to-peer.',
    'Lifecycle: infect → rally to C2 → wait → execute commands.',
    'Uses: DDoS, spam, credential stuffing, cryptojacking, click fraud, data theft.',
    'Detection: beaconing, DNS anomalies, unusual outbound traffic, IDS alerts.',
    'Defence: patching, changing default passwords, firewall, antivirus, monitoring. Example: Mirai (2016).',
  ],
  extraQuiz: [
    {
      q: 'What is sinkholing?',
      options: ['Deleting a hard drive', 'Redirecting a botnet’s C2 domains to a server controlled by defenders', 'Installing more bots', 'A type of phishing'],
      answer: 1,
      explain: 'Sinkholes cut the botmaster off and reveal which devices are infected.',
    },
    {
      q: 'A PC that contacts the same unknown server every 60 seconds may be…',
      options: ['Updating the clock', 'A bot beaconing to its C2 server', 'Perfectly normal browsing', 'Charging the battery'],
      answer: 1,
      explain: 'Regular "heartbeat" connections are a classic sign of bot check-ins.',
    },
    {
      q: 'Which Indian initiative provides free bot-removal tools?',
      options: ['Digital India Store', 'Cyber Swachhta Kendra (CERT-In)', 'UPI', 'Aadhaar'],
      answer: 1,
      explain: 'The Cyber Swachhta Kendra is the Botnet Cleaning and Malware Analysis Centre run by CERT-In.',
    },
  ],
};
