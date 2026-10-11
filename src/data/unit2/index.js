import cyberstalking from './cyberstalking';
import botnets from './botnets';
import passwordCracking from './passwordCracking';
import keyloggers from './keyloggers';
import ddos from './ddos';
import sqlInjection from './sqlInjection';
import trojans from './trojans';

import deepCyberstalking from './deep/cyberstalking';
import deepBotnets from './deep/botnets';
import deepPassword from './deep/passwordCracking';
import deepKeyloggers from './deep/keyloggers';
import deepDdos from './deep/ddos';
import deepTrojans from './deep/trojans';

// Attach the "Deep Dive" content and its extra quiz questions to each topic.
const withDeep = (topic, deep) => ({
  ...topic,
  deep,
  quiz: [...topic.quiz, ...(deep.extraQuiz ?? [])],
});

export const unit2Topics = [
  withDeep(cyberstalking, deepCyberstalking),
  withDeep(botnets, deepBotnets),
  withDeep(passwordCracking, deepPassword),
  withDeep(keyloggers, deepKeyloggers),
  withDeep(ddos, deepDdos),
  sqlInjection,
  withDeep(trojans, deepTrojans),
];
