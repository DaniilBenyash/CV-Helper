import { Projects, TechnologiesMap, TechnologiesTableData } from "./fields";
import { AddEmptyProject, AddProject, SetDate, SetTechnologies } from "./methods";

export interface AbstractProjectsStore {
  nextId: number;
  technologiesMap: TechnologiesMap;
  projects: Projects;
  table: TechnologiesTableData;

  clearProjects: () => void;
  addEmptyProject: AddEmptyProject;
  addProject: AddProject;
  setDate: SetDate;
  setTechnologies: SetTechnologies;
}
