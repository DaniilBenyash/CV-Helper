import { Projects, TechnologiesMap, TechnologiesTableData } from "@/abstraction/store/fields";
import { normalizeString } from "./normalizeString";

// TODO should rewrite this function for making it more undestandable
export const getTableOfTechnologies = (
  projects: Projects,
  map: TechnologiesMap,
): TechnologiesTableData => {
  const resultObj: TechnologiesTableData = { notFound: [] };

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      // TODO schould be created a function for making standard string without spaces, commas and dashes
      const techName = normalizeString(tech);
      const section = map[techName];

      if (!section) {
        const technology = resultObj.notFound.find(
          (item) => normalizeString(item.name) === techName,
        );
        if (technology) {
          technology.range += project.dateRange;
        } else {
          resultObj.notFound.push({
            name: tech,
            range: project.dateRange,
            lastUsed: project.lastDate.slice(0, 4),
          });
        }
      }

      const sectionInResult = resultObj[section];

      if (sectionInResult) {
        const technologyInSection = sectionInResult.find(
          (item) => normalizeString(item.name) === techName,
        );

        if (technologyInSection) {
          technologyInSection.range += project.dateRange;
        }
        if (!technologyInSection) {
          sectionInResult.push({
            name: tech,
            range: project.dateRange,
            lastUsed: project.lastDate.slice(0, 4),
          });
        }
      }

      if (!sectionInResult) {
        resultObj[section] = [
          { name: techName, range: project.dateRange, lastUsed: project.lastDate.slice(0, 4) },
        ];
      }
    });
  });

  return resultObj;
};
