import { makeAutoObservable } from "mobx";
import { getTechnologiesMap } from "@/utils/getTechnologiesMap";
import { TECHNOLOGIES } from "@/constants/technologies";
import { Projects } from "@/abstraction/store/fields";
import { AddProject, SetDate, SetTechnologies } from "@/abstraction/store/methods";
import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { normalizeDates } from "@/utils/normalizeDates";
import { getTableOfTechnologies } from "@/utils/getTableOfTechnologies";
import { AbstractProjectsStore } from "@/abstraction/store";

const nextId = 1;

const currentMonth = getCurrentMonth();

const intitialState: Projects = [
  { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: [] },
];

export class ProjectsStore extends AbstractProjectsStore {
  nextId = nextId;
  technologiesMap = getTechnologiesMap(TECHNOLOGIES);
  projects = intitialState;
  table = {};

  constructor() {
    super();
    makeAutoObservable(this);
  }

  clearProjects = () => {
    this.projects = [];
    this.table = {};
    this.nextId = 0;
  };

  addEmptyProject = () => {
    const firstDate = this.projects[this.nextId - 1]?.firstDate ?? getCurrentMonth();
    const lastDate = this.projects[this.nextId - 1]?.firstDate ?? getCurrentMonth();

    this.projects.push({
      id: this.nextId,
      firstDate,
      lastDate,
      dateRange: 0,
      technologies: [],
    });

    this.nextId = this.nextId + 1;
  };

  addProject: AddProject = (project) => {
    this.projects.push({
      ...project,
      id: this.nextId,
    });

    this.nextId = this.nextId + 1;
    this.projects = normalizeDates(this.projects);
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };

  setDate: SetDate = (id, firstDate, range) => {
    const targetProject = this.projects.find((obj) => obj.id === id);

    if (targetProject) {
      targetProject.firstDate = firstDate;
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
