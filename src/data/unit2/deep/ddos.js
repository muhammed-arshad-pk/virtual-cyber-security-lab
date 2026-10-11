export default {
  sections: [
    {
      title: 'Measuring an outage',
      points: [
        'Bandwidth: bits per second (Gbps or Tbps), the size of the "pipe" being filled.',
        'Packets per second: how many individual packets network equipment must process.',
        'Requests per second: how many web requests the application must answer.',
        'Defenders first work out which resource is exhausted: the network link, connection tables, or application CPU and database.',
      ],
    },
    {
      title: 'Defence in depth',
      points: [
        'Anycast CDNs spread incoming traffic across many data centres worldwide.',
        'Scrubbing centres filter out bad traffic and forward only clean traffic to you.',
        'A Web Application Firewall (WAF) blocks abusive request patterns.',
        'Load balancers and autoscaling add capacity when demand grows.',
        'Rate limiting and challenge pages (CAPTCHA) slow down abusive clients.',
        'Remote-Triggered Black Hole (RTBH): as a last resort, the ISP drops all traffic to one target to protect the rest of the network.',
      ],
    },
    {
      title: 'Incident-response playbook',
      points: [
        'Prepare: know your normal traffic baseline, keep ISP and CDN contacts ready, and write a runbook.',
        'Detect: automatic alerts on traffic spikes and error rates.',
        'Analyse: which service, which resource, and is it an attack or a flash crowd?',
        'Mitigate: enable protections, filter, scale up, and involve the provider.',
        'Communicate: update a status page so users and management know what is happening.',
        'Review: hold a post-incident meeting to learn and improve.',
      ],
    },
    {
      title: 'Why attackers do it',
      points: [
        'Extortion: "pay or we keep your site down" (ransom DDoS).',
        'Hacktivism: protesting against an organisation or government.',
        'Competition or revenge, including in online gaming.',
        'Distraction: keeping the security team busy while data is stolen elsewhere.',
      ],
    },
  ],
  cases: [
    { year: '2007', title: 'Estonia', text: 'Weeks of attacks disrupted government, banking and media websites, one of the first nation-scale events. NATO later set up its cyber-defence centre (CCDCOE) in Tallinn.' },
    { year: '2016', title: 'Dyn DNS', text: 'The Mirai IoT botnet overwhelmed Dyn, making major sites unreachable for many users.' },
    { year: '2018', title: 'GitHub', text: 'Hit by a 1.35 Tbps attack, then a record. It was mitigated within about 10 minutes by routing traffic through a DDoS-protection provider.' },
    { year: '2023', title: 'Record request floods', text: 'Google reported mitigating an attack peaking at about 398 million requests per second, showing why upstream protection is essential.' },
  ],
  myths: [
    { myth: 'DDoS attacks steal data.', fact: 'They target availability, not data, though they are sometimes used to distract from a breach.' },
    { myth: 'Buying more bandwidth solves it.', fact: 'Large attacks can exceed any single organisation’s capacity, so you need layered and upstream protection.' },
    { myth: '"Stress-testing" a friend’s website is harmless fun.', fact: 'Without the owner’s permission it is an offence under IT Act Sections 43 and 66.' },
  ],
  law: [
    { title: 'IT Act Sec 43(e), 43(f)', text: 'Disrupting a computer system or denying access to authorised users: compensation to the victim.' },
    { title: 'IT Act Sec 66', text: 'Doing so dishonestly or fraudulently: up to 3 years’ imprisonment and/or a fine.' },
    { title: 'IT Act Sec 66F', text: 'Denial of access to critical infrastructure can be prosecuted as cyber terrorism.' },
    { title: 'CERT-In', text: 'Organisations must report significant incidents, including DoS/DDoS, to CERT-In within 6 hours.' },
  ],
  examNotes: [
    'DoS: a single source makes a service unavailable. DDoS: many distributed sources, usually a botnet.',
    'It targets Availability in the CIA triad.',
    'Categories: volume-based, protocol-based, application-layer.',
    'Stages: normal → overload → resources exhausted → disruption.',
    'Defences: rate limiting, filtering, CDN/scrubbing, monitoring, load balancing, a response plan.',
    'Examples: Estonia 2007, Dyn 2016, GitHub 2018.',
  ],
  extraQuiz: [
    {
      q: 'What does an Anycast CDN do during an attack?',
      options: ['Deletes the website', 'Spreads traffic across many data centres worldwide', 'Encrypts passwords', 'Sends spam'],
      answer: 1,
      explain: 'Spreading the load means no single location is overwhelmed.',
    },
    {
      q: 'A sudden spike of real users (e.g. on exam results day) is called a…',
      options: ['Botnet', 'Flash crowd', 'Rainbow table', 'Backdoor'],
      answer: 1,
      explain: 'Flash crowds look like attacks but need extra capacity, not blocking.',
    },
    {
      q: 'What is the most important DDoS preparation step?',
      options: ['Hoping it never happens', 'Knowing your normal traffic baseline and having a response plan with your ISP or provider', 'Turning off monitoring', 'Using a shorter domain name'],
      answer: 1,
      explain: 'You cannot spot an abnormal spike without knowing what normal looks like.',
    },
  ],
};
