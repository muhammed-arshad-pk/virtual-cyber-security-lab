import itAct from './itAct';
import challenges from './challenges';
import digitalSignatures from './digitalSignatures';
import amendments from './amendments';
import punishment from './punishment';
import investigation from './investigation';
import compliance from './compliance';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit5Topics = [itAct, challenges, digitalSignatures, amendments, punishment, investigation, compliance].map(withExtras);
