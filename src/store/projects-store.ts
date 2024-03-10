import { makeAutoObservable } from "mobx";
import { getTechnologiesMap } from "@/utils/getTechnologiesMap";
import { TECHNOLOGIES } from "@/constants/technologies";
import { Projects } from "@/abstraction/store/fields";
import { AddNewProject, SetDate, SetTechnologies } from "@/abstraction/store/methods";
import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { normalizeDates } from "@/utils/normalizeDates";

const nextId = 1;

const currentMonth = getCurrentMonth();

const intitialState: Projects = [
  { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: [] },
];

export class ProjectsStore {
  nextId = nextId;
  technologiesMap = getTechnologiesMap(TECHNOLOGIES);
  projects: Projects = intitialState;

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
      targetProject.firstDate = dates[0];
      targetProject.lastDate = dates[0];
      targetProject.dateRange = range;
    }
    console.log(normalizeDates(this.projects));
    this.projects = normalizeDates(this.projects);
    console.log(this.projects);
  };

  setTechnologies: SetTechnologies = (id, technologies) => {
    const targetProject = this.projects.find((obj) => obj.id === id);
    const splitRegex = /,?\s+/;
    const technologiesArr = technologies.match(splitRegex);

    if (targetProject) {
      targetProject.technologies = technologiesArr ?? [];
    }
  };
}

export const projectsStore = new ProjectsStore();
