import { Projects, TechnologiesMap, TechnologiesTableData } from "./fields";
import { AddEmptyProject, AddProject, SetDate, SetTechnologies } from "./methods";

export abstract class AbstractProjectsStore {
  abstract nextId: number;
  abstract technologiesMap: TechnologiesMap;
  abstract projects: Projects;
  abstract table: TechnologiesTableData;

  abstract clearProjects: () => void;
  abstract addEmptyProject: AddEmptyProject;
  abstract addProject: AddProject;
  abstract setDate: SetDate;
  abstract setTechnologies: SetTechnologies;
}
