import proliferation from './proliferation';
import trends from './trends';
import challenges from './challenges';
import authentication from './authentication';
import mobileAttacks from './mobileAttacks';
import cardFraud from './cardFraud';
import orgMeasures from './orgMeasures';

// Unit III topic files keep their deep-dive content inline; merge its extra quiz questions.
const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit3Topics = [proliferation, trends, challenges, authentication, mobileAttacks, cardFraud, orgMeasures].map(withExtras);
