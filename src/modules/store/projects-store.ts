import { makeAutoObservable, runInAction } from "mobx";
import {
  IProjectsStore,
  ITechnologiesTableData,
  IProject,
  ITechnologiesMap,
} from "@/modules/store/types/store";
import { getTechnologiesMap } from "@/modules/store/helpers/getTechnologiesMap";
import { getCurrentMonth } from "@/modules/utils/getCurrentMonth";
import { normalizeDates } from "@/modules/utils/normalizeDates";
import { getTableOfTechnologies } from "@/modules/store/helpers/getTableOfTechnologies";

const currentMonth = getCurrentMonth();

export class ProjectsStore implements IProjectsStore {
  nextId: number = 1;
  technologiesMap: ITechnologiesMap = {};
  projects: IProject[] = [
    { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: [] },
  ];
  table: ITechnologiesTableData = {};

  constructor() {
    makeAutoObservable(this);
  }

  private updateProjectsAndTable = () => {
    this.projects = normalizeDates(this.projects);
    this.updateTable();
  };

  private updateTable = () => {
    this.table = getTableOfTechnologies(this.projects, this.technologiesMap);
  };

  clearProjects = () => {
    runInAction(() => {
      this.projects = [];
      this.table = {};
      this.nextId = 0;
    });
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
    runInAction(() => {
      this.projects.push({
        ...project,
        id: this.nextId,
      });

      this.nextId = this.nextId + 1;
      this.updateProjectsAndTable();
    });
  };

  setDate = (id: number, firstDate: string, range: number) => {
    runInAction(() => {
      const targetProject = this.projects.find((obj) => obj.id === id);

      if (targetProject) {
        targetProject.firstDate = firstDate;
        targetProject.dateRange = range;
      }
      this.updateProjectsAndTable();
    });
  };

  setTechnologies = (id: number, technologies: string) => {
    runInAction(() => {
      const targetProject = this.projects.find((obj) => obj.id === id);
      const splitRegex = /,\s*/;
      const technologiesArr = technologies.split(splitRegex);

      if (targetProject) {
        targetProject.technologies = technologiesArr ?? [];
      }
      this.updateTable();
    });
  };

  fetchTableData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();

      // Обновляем состояние внутри runInAction для MobX
      runInAction(() => {
        this.technologiesMap = getTechnologiesMap(data);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch table data:", error);
    }
  };
}

export const projectsStore = new ProjectsStore();
projectsStore.fetchTableData(
  "https://script.google.com/macros/s/AKfycbyPOWWTt0fev30xY5on7nJnRlT16p1-e42dgM5w-fH6tmAqzMP4SIrTz5TG0J28fSisrg/exec",
);
