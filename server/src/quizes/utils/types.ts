export type OptionType = {
  a: string;
  b: string;
  c: string;
  d: string;
};

export enum QuizType {
  'MULTIPLE_CHOICE',
  'ESSAY',
}

//TO RESEARCH: make the options column nullable if the quiz type is MULTIPLE_CHOICE
