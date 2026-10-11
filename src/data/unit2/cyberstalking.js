import { Eye } from 'lucide-react';

export default {
  slug: 'cyberstalking',
  number: 1,
  title: 'Cyberstalking',
  icon: Eye,
  color: '#22d3ee',
  summary: 'Recognize online harassment and learn how to stay safe.',
  tagline: 'Recognize online harassment. Protect your privacy. Know what to do.',
  keywords: ['harassment', 'stalking', 'privacy', 'social media', 'doxxing', 'impersonation'],
  intro: [
    'Cyberstalking is the repeated, unwanted use of the internet, email, social media or other electronic communication to harass, intimidate or track a person, causing them fear or distress.',
    'A single rude message is not cyberstalking. What makes it stalking is the pattern: the contact keeps coming after the person has said stop, and it often grows into monitoring, impersonation or threats.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Stalker', text: 'The person who repeatedly follows, contacts, monitors or harasses the victim.' },
      { term: 'Doxxing', text: 'Collecting and publishing someone’s private details (address, phone, workplace) without consent.' },
      { term: 'Stalkerware', text: 'Spyware secretly installed on a victim’s device to track location, messages or calls.' },
    ],
  },
  compare: {
    title: 'Types of Stalkers',
    left: {
      title: 'Online Stalkers',
      subtitle: 'Start and stay online',
      points: [
        'Contact the victim directly through the internet',
        'Use email, chat apps and social media',
        'Often hide behind fake or anonymous accounts',
        'May post defamatory content about the victim',
      ],
    },
    right: {
      title: 'Offline Stalkers',
      subtitle: 'Start in the real world',
      points: [
        'Begin with traditional methods: following, watching routines',
        'Usually know the victim personally',
        'Use the internet to collect more information',
        'Online and offline harassment often overlap',
      ],
    },
  },
  flow: {
    title: 'How Cyberstalking Usually Develops',
    steps: [
      { title: 'Information gathering', text: 'The stalker collects personal details from profiles, posts, photos and tagged locations.' },
      { title: 'Unwanted contact', text: 'They start messaging, often posing as a friend or admirer.' },
      { title: 'Repeated harassment', text: 'Messages continue after being told to stop, sometimes from new accounts.' },
      { title: 'Escalation', text: 'Threats, impersonation, doxxing or tracking the victim’s location.' },
    ],
  },
  cards: {
    title: 'Common Forms of Cyberstalking',
    items: [
      { title: 'Repeated Unwanted Messages', text: 'Constant messages, calls or comments after being asked to stop.' },
      { title: 'Online Harassment', text: 'Publicly insulting, shaming, or threatening someone.' },
      { title: 'Impersonation', text: 'Creating fake accounts in the victim’s name to damage their reputation.' },
      { title: 'Location Monitoring', text: 'Tracking someone using shared locations, geotagged photos or stalkerware.' },
      { title: 'Doxxing', text: 'Publishing private information so others can find or target the victim.' },
      { title: 'Block Evasion', text: 'Creating new accounts to keep contacting someone who has blocked them.' },
    ],
  },
  lists: [
    {
      title: 'Warning Signs',
      tone: 'warn',
      items: [
        'Messages keep coming after you asked them to stop',
        'Someone knows where you are without you telling them',
        'New accounts appear right after you block someone',
        'A fake profile is using your name or photos',
        'Threats to leak photos or private information',
      ],
    },
    {
      title: 'How to Stay Safe',
      tone: 'good',
      items: [
        'Set social media accounts to private',
        'Turn off live location sharing and photo geotags',
        'Block and report abusive accounts on the platform',
        'Save screenshots and links as evidence',
        'Use strong, unique passwords with 2FA',
        'Tell a trusted person and seek help early',
      ],
    },
    {
      title: 'Impact on Victims',
      tone: 'info',
      items: ['Fear and anxiety', 'Loss of privacy', 'Damage to reputation', 'Disrupted studies or work', 'Concerns about physical safety'],
    },
  ],
  caseStudy: {
    title: 'Fictional Case Study: The Anonymous Follower',
    text: 'Maya, a college student, starts getting messages from an anonymous account that seems to know her daily routine. She blocks it, and two new accounts appear the next day. Then a profile using her photos begins messaging her friends. Maya saves screenshots of everything, makes her accounts private, turns off location sharing, reports the accounts and tells her family. With the evidence she collected, she files a complaint on the National Cyber Crime Reporting Portal.',
  },
  callout: {
    title: 'Legal help in India',
    text: 'Stalking, including through electronic communication, is an offence under Section 78 of the Bharatiya Nyaya Sanhita (earlier IPC 354D). The IT Act, 2000 also covers related offences such as identity theft (Sec 66C) and privacy violations (Sec 66E). Report at cybercrime.gov.in or call the helpline 1930.',
  },
  lab: {
    key: 'cyberstalking',
    title: 'Mission: Spot the Warning Signs',
    description: 'Messages arrive on Maya’s phone one at a time. Flag the ones that are warning signs of cyberstalking, then build her safety plan.',
    objectives: [
      { id: 'first-flag', label: 'Correctly flag your first warning sign', xp: 20 },
      { id: 'all-correct', label: 'Classify every message correctly in one run', xp: 50 },
      { id: 'safety-plan', label: 'Build a correct safety response plan', xp: 40 },
    ],
  },
  quiz: [
    {
      q: 'Which situation best describes cyberstalking?',
      options: [
        'Someone leaves one rude comment on your post',
        'Repeated unwanted contact, monitoring or threats online that cause fear or distress',
        'A classmate views your public profile',
        'Receiving one friend request from a stranger',
      ],
      answer: 1,
      explain: 'Cyberstalking is a pattern of repeated, unwanted behaviour, not a single incident.',
    },
    {
      q: 'What is the best first step if someone is repeatedly harassing you and tracking your location?',
      options: [
        'Delete all your social media accounts without saving anything',
        'Argue with them until they stop',
        'Save the messages as evidence, block and report them, and check your privacy and location settings',
        'Ignore it and hope it stops',
      ],
      answer: 2,
      explain: 'Evidence is essential for reporting. Blocking and tightening privacy settings limit further contact.',
    },
    {
      q: 'A fake account using your name and photos messages your friends. This is an example of…',
      options: ['Doxxing', 'Impersonation', 'Phishing', 'Spamming'],
      answer: 1,
      explain: 'Pretending to be someone else, often to damage their reputation, is impersonation.',
    },
    {
      q: 'Why should you avoid sharing your live location publicly?',
      options: [
        'It uses too much mobile data',
        'It lets others track your real-time movements and routine',
        'It is illegal in India',
        'It slows down your phone',
      ],
      answer: 1,
      explain: 'Live location reveals where you are and your routine, which a stalker can exploit.',
    },
    {
      q: 'Where can cybercrime be reported online in India?',
      options: ['cybercrime.gov.in or helpline 1930', 'Only at a bank', 'By emailing the stalker', 'Only on social media'],
      answer: 0,
      explain: 'The National Cyber Crime Reporting Portal (cybercrime.gov.in) and helpline 1930 accept complaints.',
    },
  ],
};
