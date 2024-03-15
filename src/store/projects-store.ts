import { makeAutoObservable } from "mobx";
import { getTechnologiesMap } from "@/utils/getTechnologiesMap";
import { TECHNOLOGIES } from "@/constants/technologies";
import { Projects, TechnologiesTableData } from "@/abstraction/store/fields";
import { AddNewProject, SetDate, SetTechnologies } from "@/abstraction/store/methods";
import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { normalizeDates } from "@/utils/normalizeDates";
import { getTableOfTechnologies } from "@/utils/getTableOfTechnologies";

const nextId = 1;

const currentMonth = getCurrentMonth();

const intitialState: Projects = [
  { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: [] },
];

export class ProjectsStore {
  nextId = nextId;
  technologiesMap = getTechnologiesMap(TECHNOLOGIES);
  projects: Projects = intitialState;
  table: TechnologiesTableData = {};

  constructor() {
    makeAutoObservable(this);
  }

  addNewProject: AddNewProject = () => {
    this.projects.push({
      id: this.nextId,
      firstDate: this.projects[this.nextId - 1].firstDate,
      lastDate: this.projects[this.nextId - 1].firstDate,
      dateRange: 0,
      technologies: [],
    });

    this.nextId = this.nextId + 1;
  };

  setDate: SetDate = (id, dates, range) => {
    const targetProject = this.projects.find((obj) => obj.id === id);

    if (targetProject) {
      // TODO should check MobX methods for optimizing rerenders
      targetProject.firstDate = dates[0];
      targetProject.lastDate = dates[0];
      targetProject.dateRange = range;
    }
    this.projects = normalizeDates(this.projects);
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };

  setTechnologies: SetTechnologies = (id, technologies) => {
    const targetProject = this.projects.find((obj) => obj.id === id);
    const splitRegex = /,\s*/;
    const technologiesArr = technologies.split(splitRegex);

    if (targetProject) {
      targetProject.technologies = technologiesArr ?? [];
    }
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };
}

export const projectsStore = new ProjectsStore();
