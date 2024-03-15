import { Projects, TechnologiesMap, TechnologiesTableData } from "@/abstraction/store/fields";
import { normalizeString } from "./normalizeString";

// TODO should rewrite this function for making it more undestandable
export const getTableOfTechnologies = (
  projects: Projects,
  map: TechnologiesMap,
): TechnologiesTableData => {
  const resultObj: TechnologiesTableData = {};

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      // TODO schould be created a function for making standard string without spaces, commas and dashes
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

  return resultObj;
};
