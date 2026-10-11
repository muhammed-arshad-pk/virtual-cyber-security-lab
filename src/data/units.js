import { unit2Topics } from './unit2';
import { unit3Topics } from './unit3';
import { unit4Topics } from './unit4/placeholders';
import { unit5Topics } from './unit5';

// Add each unit's topics here as you build them. A unit with an empty
// `topics` array shows as "Coming soon" across the site.
export const units = [
  {
    id: 2,
    roman: 'II',
    title: 'Tools and Methods Used in Cybercrime',
    summary: 'Understand digital threats, explore how attacks work, and discover how to defend against them.',
    topics: unit2Topics,
  },
  {
    id: 3,
    roman: 'III',
    title: 'Cybercrime: Mobile and Wireless Devices',
    summary: 'Mobile proliferation and trends, device security challenges, authentication, mobile attacks, card fraud and organisational controls.',
    topics: unit3Topics,
  },
  {
    id: 4,
    roman: 'IV',
    title: 'Phishing and Identity Theft',
    summary: 'How phishing works, identity theft techniques and countermeasures.',
    topics: unit4Topics,
  },
  {
    id: 5,
    roman: 'V',
    title: 'Cybercrime and Cyber Security: Legal Perspectives',
    summary: 'The IT Act, its amendments, digital signatures, punishments, investigation and digital evidence, and compliance.',
    topics: unit5Topics,
  },
];

export const topicKey = (unitId, slug) => `${unitId}/${slug}`;

export const getUnit = (id) => units.find((u) => String(u.id) === String(id));

export const getTopic = (unitId, slug) => getUnit(unitId)?.topics.find((t) => t.slug === slug);

export const allTopics = () =>
  units.flatMap((u) =>
    u.topics.map((t) => ({ ...t, unitId: u.id, unitRoman: u.roman, key: topicKey(u.id, t.slug) })),
  );

export const findTopicByLab = (labKey) => allTopics().find((t) => t.lab?.key === labKey);
