import { Project } from "../fields";

export type AddProject = (project: Project) => void;
export type AddEmptyProject = () => void;
export type SetDate = (id: number, dates: string, range: number) => void;
export type SetTechnologies = (id: number, technologies: string) => void;
