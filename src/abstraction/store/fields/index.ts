export type Project = {
  id: number;
  firstDate: string;
  lastDate: string;
  technologies: string[];
  dateRange: number;
};

export type Projects = Project[];

export type TechnologiesMap = {
  [index: string]: string;
};

type Technology = {
  name: string;
  range: number;
  lastUsed: string;
};

export type TechnologiesTableData = {
  [index: string]: Technology[];
};
