import { Project } from "../fields";

export type AddProject = (project: Project) => void;
export type AddNewProject = () => void;
export type SetDate = (id: number, dates: [string, string], range: number) => void;
export type SetTechnologies = (id: number, technologies: string) => void;
