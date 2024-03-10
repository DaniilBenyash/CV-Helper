import { makeAutoObservable } from "mobx";
import { getTechnologiesMap } from "@/utils/getTechnologiesMap";
import { TECHNOLOGIES } from "@/constants/technologies";
import { Projects } from "@/abstraction/store/fields";
import { SetDate, SetTechnologies } from "@/abstraction/store/methods";

export class ProjectsStore {
  technologiesMap = getTechnologiesMap(TECHNOLOGIES);
  projects: Projects = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDate: SetDate = (id, dates, range) => {
    const targetProject = this.projects.find((obj) => obj.id === id);

    if (targetProject) {
      targetProject.firstDate = dates[0];
      targetProject.lastDate = dates[0];
      targetProject.rangeDate = range;
    }
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
