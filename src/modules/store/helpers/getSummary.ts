import { normalizeString } from "@/modules/utils/normalizeString";
import { IProject, ITechnologiesMap } from "../../../types/storeTypes";
import { SectionsNames } from "../enums/sectionsNames";

type Map = Partial<Record<SectionsNames, string[]>>;

export const getSummary = (projects: IProject[], technologiesMap: ITechnologiesMap) => {
  const summary: Map = {
    [SectionsNames.ProgrammingLanguages]: [],
    [SectionsNames.Frontend]: [],
    [SectionsNames.BackendTechnologies]: [],
    [SectionsNames.CiCd]: [],
    [SectionsNames.Cloud]: [],
    [SectionsNames.Databases]: [],
  };
  const set = new Set<string>();
  const normalizedSet = new Set<string>();

  projects
    .reduce((acc: string[], item) => acc.concat(item.technologies ?? []), [])
    .forEach((item) => {
      set.add(item);
      normalizedSet.add(normalizeString(item));
    });

  const sortedArrFromSet = [...set].sort((a, b) => {
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

  sortedArrFromSet.forEach((technology) => {
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
