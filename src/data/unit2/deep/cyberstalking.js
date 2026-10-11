export default {
  sections: [
    {
      title: 'How stalkers build a profile: your digital footprint',
      points: [
        'Public profile details such as college, workplace, birthday and friends list are the starting point.',
        'Photos leak location through backgrounds, tagged check-ins and EXIF metadata. Many cameras store GPS coordinates inside the image file.',
        'Reusing one username on several platforms lets someone link all your accounts together.',
        'Public stories, fitness apps and "live" posts reveal your daily routine and where you are right now.',
        'Old data breaches and people-search websites can expose phone numbers and addresses.',
      ],
    },
    {
      title: 'Stalkerware: how to check your phone',
      points: [
        'Warning signs: fast battery drain, high data use, the phone running warm when idle, settings changed without you.',
        'Android: check Settings → Accessibility and Settings → Device admin apps for anything you don’t recognise, then run a Google Play Protect scan.',
        'iPhone: check Settings → General → VPN & Device Management for unknown profiles, and review who you share location with in Find My.',
        'Review logged-in sessions for Google, Apple ID, Instagram and WhatsApp (Linked devices), and sign out of unknown ones.',
        'Caution: suddenly removing stalkerware can alert the abuser. If you feel unsafe, make a safety plan with a trusted person or helpline first.',
      ],
    },
    {
      title: 'Collecting evidence the right way',
      points: [
        'Take screenshots that show the date, time, username and URL. Never crop or edit them.',
        'Save profile URLs and user IDs, not just display names. Display names can be changed in seconds.',
        'Export full chats, and keep emails with their headers (they show where a message came from).',
        'Keep an incident log: date, time, platform and what happened. Patterns matter in court.',
        'Back the evidence up in two places, such as cloud storage and a USB drive. Do not reply to or bargain with the stalker.',
      ],
    },
    {
      title: 'Platform safety tools worth knowing',
      points: [
        'Instagram: Restrict, Hidden Words, Limits, and a private account.',
        'WhatsApp: Block & Report, Last seen and Profile photo set to "My contacts", and control over who can add you to groups.',
        'Every major platform has an impersonation report form. Use it for fake profiles.',
        'Google’s "Results about you" tool lets you request removal of your phone number or address from search results.',
      ],
    },
  ],
  cases: [
    { year: '2001', title: 'Ritu Kohli case, Delhi', text: 'Considered India’s first reported cyberstalking case. A man impersonated a woman in an online chat room and shared her phone number, which led to harassing calls. With no specific cyber law then, it was registered under IPC 509, and it highlighted the need for stronger cyber laws.' },
    { year: '2013', title: 'Stalking enters the IPC', text: 'The Criminal Law (Amendment) Act added Section 354D, which explicitly covers monitoring a person’s use of the internet, email or electronic communication.' },
    { year: '2019', title: 'Coalition Against Stalkerware', text: 'Security companies and support organisations joined forces to improve detection of stalkerware and help survivors.' },
    { year: '2024', title: 'Bharatiya Nyaya Sanhita', text: 'The BNS replaced the IPC on 1 July 2024. Stalking, including electronic monitoring, is now Section 78.' },
  ],
  myths: [
    { myth: 'If I ignore it, it will stop.', fact: 'Stalking often escalates. Document it and report early, before it reaches the offline world.' },
    { myth: 'Only celebrities get stalked.', fact: 'Most victims know their stalker: an ex-partner, classmate, colleague or acquaintance.' },
    { myth: 'It’s online, so it’s not a real crime.', fact: 'It is punishable under BNS Section 78 with up to 3 years for a first conviction, and up to 5 for a repeat offence.' },
    { myth: 'A private account makes me 100% safe.', fact: 'Followers can screenshot, friends can tag you, and photo metadata can still leak location.' },
  ],
  law: [
    { title: 'BNS Section 78: Stalking', text: 'Repeatedly following or contacting a person despite clear disinterest, or monitoring their internet, email or electronic communication.' },
    { title: 'BNS Section 351: Criminal intimidation', text: 'Threatening harm to a person or their reputation, e.g. "reply or I leak your photos".' },
    { title: 'IT Act Sec 66C / 66D', text: 'Identity theft (misusing passwords or identity features) and cheating by personation using a computer resource.' },
    { title: 'IT Act Sec 66E, 67, 67A', text: 'Capturing or publishing private images without consent, and publishing obscene or sexually explicit material electronically.' },
    { title: 'Where to get help', text: 'cybercrime.gov.in · Cyber helpline 1930 · Emergency 112 · Women helpline 181.' },
  ],
  examNotes: [
    'Definition keywords: repeated, unwanted, electronic means, causes fear or distress.',
    'Two types of stalkers: online stalkers and offline stalkers.',
    'Stages: information gathering → contact → repeated harassment → escalation.',
    'Forms: unwanted messages, harassment, impersonation, doxxing, location monitoring, stalkerware.',
    'Prevention: privacy settings, no live location, block and report, preserve evidence, 2FA, seek help.',
    'Law: BNS Sec 78 (earlier IPC 354D), IT Act 66C, 66D, 66E, 67.',
  ],
  extraQuiz: [
    {
      q: 'EXIF metadata inside a photo can reveal…',
      options: ['Only the photo’s colour', 'The GPS location where the photo was taken', 'Your password', 'Nothing useful'],
      answer: 1,
      explain: 'Many phones embed GPS coordinates in photos. Strip metadata before sharing.',
    },
    {
      q: 'Why should you save a stalker’s profile URL or user ID, not just their display name?',
      options: ['URLs look more professional', 'Display names can be changed instantly, but the ID identifies the account', 'IDs are shorter', 'It doesn’t matter'],
      answer: 1,
      explain: 'Platforms and police can trace the permanent account ID even after a name change.',
    },
    {
      q: 'Under the Bharatiya Nyaya Sanhita, stalking is covered by…',
      options: ['Section 420', 'Section 78', 'Section 302', 'Section 66F'],
      answer: 1,
      explain: 'BNS Section 78 replaced IPC 354D from July 2024.',
    },
  ],
};
