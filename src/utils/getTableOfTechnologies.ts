import { Projects, TechnologiesMap, TechnologiesTableData } from "@/abstraction/store/fields";
import { normalizeString } from "./normalizeString";
import { SECTIONS_SORTING_WEIGHTS } from "@/constants/technologies";

const sortTableOfTechnologies = (obj: TechnologiesTableData): TechnologiesTableData => {
  const resultObjectArray = Object.entries(obj);

  const sortedResultObjectArray = resultObjectArray.sort((a, b) => {
    const normalizedKeyForComparisonA = normalizeString(a[0]);
    const normalizedKeyForComparisonB = normalizeString(b[0]);
    return (
      SECTIONS_SORTING_WEIGHTS[normalizedKeyForComparisonA] -
      SECTIONS_SORTING_WEIGHTS[normalizedKeyForComparisonB]
    );
  });
  const sortedResultObject = Object.fromEntries(sortedResultObjectArray);

  return sortedResultObject;
};

export const getTableOfTechnologies = (
  projects: Projects,
  map: TechnologiesMap,
): TechnologiesTableData => {
  const resultObj: TechnologiesTableData = {};

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      const techName = normalizeString(tech);
      const section = map[techName] || "notFound";

      const sectionInResult = resultObj[section] ?? [];

      const technologyInSection = sectionInResult.find(
        (item) => normalizeString(item.name) === techName,
      );

      if (technologyInSection) {
        technologyInSection.range += project.dateRange;
        return;
      }

      resultObj[section] = [
        ...sectionInResult,
        { name: tech, range: project.dateRange, lastUsed: project.lastDate.slice(0, 4) },
      ];
    });
  });

  return sortTableOfTechnologies(resultObj);
};
