import { Smartphone } from 'lucide-react';

export default {
  slug: 'proliferation',
  number: 1,
  title: 'Proliferation of Mobile & Wireless Devices',
  icon: Smartphone,
  color: '#22d3ee',
  difficulty: 'Beginner',
  summary: 'How the explosion of mobile and wireless devices expanded the attack surface.',
  tagline: 'Billions of always-connected devices: more convenience, and many more doors for attackers.',
  keywords: ['mobile', 'wireless', 'iot', 'attack surface', 'bluetooth', 'nfc', 'wifi', 'architecture'],
  intro: [
    'Mobile and wireless devices (smartphones, tablets, laptops, wearables and IoT gadgets) are now the main way people reach the internet. More than five billion people use a mobile phone, India alone has over a billion mobile connections, and well over 15 billion IoT devices are online worldwide.',
    'Every new device, and every radio inside it (Wi-Fi, Bluetooth, NFC, cellular, GPS), is another entry point. Security people call the sum of all these entry points the attack surface. The more devices and interfaces we use, the larger it gets.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Mobile computing', text: 'Using computing devices while on the move, connected through wireless networks.' },
      { term: 'Attack surface', text: 'All the points where an attacker could try to enter or extract data from a system.' },
      { term: 'IoT', text: 'Internet of Things: everyday objects (cameras, bulbs, cars, medical devices) connected to the internet.' },
    ],
  },
  compare: {
    title: 'Then vs Now',
    left: { title: 'Desktop era', subtitle: 'Fixed, wired computing', points: ['A few devices inside an office network', 'Protected by a perimeter firewall', 'IT controlled every machine', 'Data stayed in the building'] },
    right: { title: 'Mobile era', subtitle: 'Anywhere, any device', points: ['Many devices per person, always online', 'No clear perimeter: home, café, airport', 'Personal devices hold work data', 'Data synced to the cloud everywhere'] },
  },
  flow: {
    title: 'Mobile Computing Architecture',
    steps: [
      { title: 'Mobile device', text: 'Hardware, OS (Android/iOS), sandboxed apps and a secure hardware chip (TEE / Secure Enclave).' },
      { title: 'Wireless access', text: 'A Wi-Fi access point or cellular base station connects the device over radio.' },
      { title: 'Core network & internet', text: 'The operator’s core network or ISP routes traffic onto the internet.' },
      { title: 'Cloud services', text: 'App back-ends, sync, email and storage run on cloud servers.' },
    ],
  },
  table: {
    title: 'Wireless Technologies Compared',
    columns: ['Technology', 'Typical range', 'Common use', 'Key security risk'],
    rows: [
      ['NFC', '~4 cm', 'Tap-to-pay, access cards', 'Relay attacks, if a reader gets very close'],
      ['Bluetooth', '~10 m', 'Earbuds, watches, car kits', 'Bluesnarfing, bluebugging, unpatched stacks (BlueBorne)'],
      ['Wi-Fi', '~30–50 m indoors', 'Internet access', 'Rogue / evil-twin hotspots, open networks'],
      ['Cellular (4G/5G)', 'Kilometres', 'Calls, mobile data', 'Fake base stations on legacy 2G, SIM swap'],
      ['GPS (receive-only)', 'Global', 'Navigation, location', 'Location tracking & privacy leaks, spoofing'],
    ],
  },
  cards: {
    title: 'Types of Mobile & Wireless Devices',
    items: [
      { title: 'Smartphones', text: 'Personal computers in your pocket: banking, email, OTPs, photos.' },
      { title: 'Tablets & Laptops', text: 'Portable work machines that hold corporate data outside the office.' },
      { title: 'Wearables', text: 'Smartwatches and fitness bands that collect health and location data.' },
      { title: 'IoT Devices', text: 'Cameras, smart speakers, TVs and bulbs, often with weak default security.' },
      { title: 'Connected Cars', text: 'Infotainment, telematics and keyless entry over wireless links.' },
      { title: 'POS & Handhelds', text: 'Mobile card readers and delivery scanners used in business.' },
    ],
  },
  lists: [
    { title: 'Why the Attack Surface Grew', tone: 'warn', items: ['More devices per person', 'Many radios per device', 'Apps from many developers', 'Devices used on untrusted networks', 'Personal and work data mixed together'] },
    { title: 'Security Implications', tone: 'info', items: ['Loss or theft is common', 'Users skip updates', 'Small screens hide phishing clues', 'Always-on location and sensors leak privacy', 'IoT devices rarely get patches'] },
    { title: 'Good Habits', tone: 'good', items: ['Turn off radios you are not using', 'Keep every device updated', 'Change IoT default passwords', 'Use a screen lock everywhere', 'Review app permissions'] },
  ],
  lab: {
    key: 'u3-surface',
    title: 'Mission: Shrink the Attack Surface',
    description: 'A smart home and a commuter full of wireless devices. Inspect each device and switch off every radio it doesn’t need, without breaking what it’s for. Then explore how far each wireless technology reaches.',
    badge: { name: 'Surface Shrinker', emoji: '📡' },
    objectives: [
      { id: 'inspect', label: 'Inspect every device', xp: 20 },
      { id: 'minimal', label: 'Reach the minimal attack surface without breaking any device', xp: 50 },
      { id: 'range', label: 'Compare the range of all wireless technologies', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What does "attack surface" mean?', options: ['The screen of a phone', 'All the points where an attacker could try to get into a system', 'The size of a hard disk', 'A type of antivirus'], answer: 1, explain: 'Every device, interface, app and account adds to the attack surface.' },
    { q: 'Which wireless technology has the shortest range?', options: ['Wi-Fi', 'Bluetooth', 'NFC', 'Cellular'], answer: 2, explain: 'NFC works only within a few centimetres, which is why it is used for tap-to-pay.' },
    { q: 'Why are IoT devices a big security concern?', options: ['They are expensive', 'They often ship with default passwords and rarely receive updates', 'They don’t use electricity', 'They can’t connect to the internet'], answer: 1, explain: 'Weak defaults and missing patches made IoT the backbone of botnets like Mirai.' },
    { q: 'What is a simple way to reduce a phone’s attack surface?', options: ['Install more apps', 'Turn off Bluetooth, NFC and Wi-Fi when not needed', 'Disable the screen lock', 'Never update'], answer: 1, explain: 'An unused radio is an entry point you gain nothing from.' },
    { q: 'In mobile architecture, what connects the device to the operator’s network?', options: ['A printer', 'A cellular base station (cell tower)', 'A USB cable', 'The GPS satellite'], answer: 1, explain: 'Base stations carry radio traffic into the operator’s core network.' },
  ],
  deep: {
    sections: [
      { title: 'Inside a mobile operating system', points: ['Layers: hardware → kernel (Linux / XNU) → drivers → system libraries & runtime → app framework → apps.', 'Sandboxing: each app runs in its own isolated space and cannot read other apps’ data.', 'Permission model: apps must ask before using the camera, microphone, contacts, location and other sensitive resources.', 'Hardware security: a Trusted Execution Environment (TEE) or Secure Enclave stores keys, fingerprints and payment credentials away from the main OS.', 'Verified boot checks that the OS hasn’t been tampered with before it starts.'] },
      { title: 'Why wireless is harder to secure than wired', points: ['Radio signals travel through walls, so anyone nearby can receive them.', 'Attackers don’t need physical access to a cable, only to be in range.', 'Devices automatically search for and join known networks, which attackers can imitate.', 'Encryption (WPA2/WPA3, Bluetooth pairing keys, cellular ciphers) is the main protection.'] },
      { title: 'IoT: the weakest link', points: ['Cheap hardware with limited processing power for security.', 'Default credentials (admin/admin) and no forced password change.', 'No update mechanism, or vendors stop supporting devices quickly.', 'Often placed on the same network as laptops and phones. Put them on a separate guest network instead.'] },
      { title: 'Location & sensor privacy', points: ['GPS, Wi-Fi scanning and cell towers can each locate a phone.', 'Accelerometers, microphones and cameras can reveal activities.', 'Apps may share location with advertisers. Use "only while using the app" and "approximate location".'] },
    ],
    cases: [
      { year: '2007', title: 'Smartphone revolution', text: 'The iPhone (2007) and the first Android phone (2008) turned phones into general-purpose computers with app stores, and created a huge new target for attackers.' },
      { year: '2016', title: 'Mirai IoT botnet', text: 'Hundreds of thousands of cameras and routers with default passwords were hijacked to take down major websites.' },
      { year: '2017', title: 'BlueBorne', text: 'Researchers disclosed Bluetooth flaws affecting billions of devices that could allow takeover without pairing, a reminder to patch and switch off unused radios.' },
      { year: '2022', title: '5G arrives in India', text: '5G services launched in October 2022, connecting even more devices and IoT systems at high speed.' },
    ],
    myths: [
      { myth: 'Phones are safer than computers, so they don’t need security.', fact: 'Phones hold banking apps, OTPs, email and photos, making them the most valuable device you own.' },
      { myth: 'Bluetooth only works a few feet away, so it’s harmless.', fact: 'Directional antennas extend range, and many Bluetooth flaws need no pairing at all.' },
      { myth: 'My smart bulb has nothing worth stealing.', fact: 'A compromised IoT device can be a foothold into your home network or join a botnet.' },
    ],
    law: [
      { title: 'IT Act Sec 43 & 66', text: 'Unauthorised access to any computer resource, including phones and IoT devices, is an offence.' },
      { title: 'DPDP Act, 2023', text: 'Apps and companies collecting personal data (like location) need consent and must protect it.' },
      { title: 'CERT-In', text: 'India’s national agency issues advisories on mobile and IoT vulnerabilities. Follow cert-in.org.in.' },
    ],
    examNotes: [
      'Mobile computing = computing on the move over wireless networks.',
      'Device types: smartphones, tablets, laptops, wearables, IoT, connected cars.',
      'Architecture: device → wireless access → core network → internet → cloud.',
      'Wireless technologies: NFC, Bluetooth, Wi-Fi, cellular, GPS, with different ranges and risks.',
      'Attack surface grows with devices, radios, apps and untrusted networks.',
      'Controls: disable unused radios, update, change defaults, screen lock, permissions.',
    ],
    extraQuiz: [
      { q: 'What does app sandboxing do?', options: ['Speeds up apps', 'Isolates each app so it can’t read other apps’ data', 'Deletes old apps', 'Blocks Wi-Fi'], answer: 1, explain: 'Sandboxing contains damage if one app is malicious.' },
      { q: 'Where are fingerprint templates and payment keys stored on modern phones?', options: ['In the photo gallery', 'In a Trusted Execution Environment / Secure Enclave', 'On the SIM card only', 'In the cloud'], answer: 1, explain: 'The TEE is isolated hardware that the normal OS cannot read.' },
      { q: 'Why should IoT devices be put on a separate (guest) network?', options: ['They are faster there', 'If compromised, they can’t easily reach your laptops and phones', 'It saves electricity', 'It is required by law'], answer: 1, explain: 'Network segmentation limits how far an attacker can move.' },
    ],
  },
};
