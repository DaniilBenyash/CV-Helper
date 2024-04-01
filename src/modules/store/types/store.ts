export interface IProject {
  id: number;
  firstDate: string;
  lastDate: string;
  technologies: string[] | null;
  dateRange: number;
}

export interface ITechnologiesMap {
  [index: string]: string;
}

export interface ITechnology {
  name: string;
  range: number;
  lastUsed: string;
}

export interface ITechnologiesTableData {
  [index: string]: ITechnology[];
}

export interface IProjectsStore {
  nextId: number;
  technologiesMap: ITechnologiesMap;
  projects: IProject[];
  table: ITechnologiesTableData;
  clearProjects: () => void;
  addEmptyProject: () => void;
  addProject: (project: IProject) => void;
  setDate: (id: number, dates: string, range: number) => void;
  setTechnologies: (id: number, technologies: string) => void;
}
