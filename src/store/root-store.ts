import { projectsStore } from "./projects-store";

export class RootStore {
  projects = projectsStore;
}

export const rootStore = new RootStore();
