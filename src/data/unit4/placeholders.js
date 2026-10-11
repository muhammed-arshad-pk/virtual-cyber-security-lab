import bufferOverflow from './bufferOverflow';
import methods from './methods';
import spearPhishing from './spearPhishing';
import scamTypes from './scamTypes';
import toolkits from './toolkits';
import identityTheft from './identityTheft';
import countermeasures from './countermeasures';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit4Topics = [bufferOverflow, methods, spearPhishing, scamTypes, toolkits, identityTheft, countermeasures].map(withExtras);
