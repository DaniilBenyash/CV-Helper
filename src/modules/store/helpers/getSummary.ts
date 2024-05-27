import { normalizeString } from "@/modules/utils/normalizeString";
import { IProject, ITechnologiesMap } from "../../../types/storeTypes";
import { SectionsNames } from "../enums/sectionsNames";

type Map = Partial<Record<SectionsNames, string[]>>;

export const getSummary = (projects: IProject[], technologiesMap: ITechnologiesMap) => {
  const summary: Map = {
    [SectionsNames.ProgrammingLanguages]: [],
    [SectionsNames.Frontend]: [],
    [SectionsNames.BackendTechnologies]: [],
    [SectionsNames.Containerization]: [],
    [SectionsNames.CiCd]: [],
    [SectionsNames.Cloud]: [],
    [SectionsNames.Databases]: [],
  };
  const technologies = projects.reduce(
    (acc: string[], item) => acc.concat(item.technologies ?? []),
    [],
  );
  const set = new Set<string>(technologies);
  const normalizedSet = new Set<string>(technologies.map((tech) => normalizeString(tech)));

  const sortedArr = [...set].sort((a, b) => {
    const first = technologiesMap[normalizeString(a)];
    const last = technologiesMap[normalizeString(b)];

    // If Map have both of technologies we make sorting
    if (first && last) {
      return (
        technologiesMap[normalizeString(a)].orderWeight -
        technologiesMap[normalizeString(b)].orderWeight
      );
    }

    // If Map don't have a technologies
    return 0;
  });

  sortedArr.forEach((technology) => {
    const normalizedTech = normalizeString(technology);

    if (!technologiesMap[normalizeString(normalizedTech)]) return;

    const section = technologiesMap[normalizeString(normalizedTech)].name as SectionsNames;

    if (summary[section]) {
      summary[section]!.push(technology);
      return;
    }
    summary[SectionsNames.Frontend]!.push(technology);
  });

  const hasCollisions = [...set].length !== [...normalizedSet].length;
  return { summary, hasCollisions };
};
