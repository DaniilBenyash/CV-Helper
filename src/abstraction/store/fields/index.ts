export type Technology = {
  id: number;
  firstDate: string;
  lastDate: string;
  technologies: string[];
  rangeDate: number;
};

export type Technologies = Technology[];

export type TechnologiesMap = {
  [index: string]: string;
};
