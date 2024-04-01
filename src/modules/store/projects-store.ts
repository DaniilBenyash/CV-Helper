import { makeAutoObservable } from "mobx";
import {
  IProjectsStore,
  ITechnologiesTableData,
  IProject,
  ITechnologiesMap,
} from "@/modules/store/types/store";
import { getTechnologiesMap } from "@/modules/store/helpers/getTechnologiesMap";
import { allTechnologies } from "./constants";
import { getCurrentMonth } from "@/modules/utils/getCurrentMonth";
import { normalizeDates } from "@/modules/utils/normalizeDates";
import { getTableOfTechnologies } from "@/modules/store/helpers/getTableOfTechnologies";

const currentMonth = getCurrentMonth();

export class ProjectsStore implements IProjectsStore {
  nextId: number;
  technologiesMap: ITechnologiesMap;
  projects: IProject[];
  table: ITechnologiesTableData;

  constructor() {
    makeAutoObservable(this);
    this.nextId = 1;
    this.projects = [
      { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: [] },
    ];
    this.technologiesMap = getTechnologiesMap(allTechnologies);
    this.table = {};
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

  addProject = (project: IProject) => {
    this.projects.push({
      ...project,
      id: this.nextId,
    });

    this.nextId = this.nextId + 1;
    this.projects = normalizeDates(this.projects);
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };

  setDate = (id: number, firstDate: string, range: number) => {
    const targetProject = this.projects.find((obj) => obj.id === id);

    if (targetProject) {
      targetProject.firstDate = firstDate;
      targetProject.dateRange = range;
    }
    this.projects = normalizeDates(this.projects);
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };

  setTechnologies = (id: number, technologies: string) => {
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
