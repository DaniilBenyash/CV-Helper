import {
  IProject,
  ITechnologiesMap,
  ITechnologiesTableData,
  ISectionsSortingWeights,
} from "../types";
import { normalizeString } from "../../utils/normalizeString";
import { allTechnologies } from "../constants";

// Here calculate the weights of the technology objects, where weight is the index of the key array
const getTechnologiesWeightsMap = () =>
  Object.keys(allTechnologies).reduce((acc: ISectionsSortingWeights, item, index) => {
    const normalizedKey = normalizeString(item);
    acc[normalizedKey] = index;
    return acc;
  }, {});

// Here we are sorting the tableOfTechnologies by weights of technologies
const sortTableOfTechnologies = (obj: ITechnologiesTableData): ITechnologiesTableData => {
  const resultObjectArray = Object.entries(obj);
  const wightsMap = getTechnologiesWeightsMap();

  const sortedResultObjectArray = resultObjectArray.sort((a, b) => {
    const normalizedKeyForComparisonA = normalizeString(a[0]);
    const normalizedKeyForComparisonB = normalizeString(b[0]);
    return wightsMap[normalizedKeyForComparisonA] - wightsMap[normalizedKeyForComparisonB];
  });
  const sortedResultObject = Object.fromEntries(sortedResultObjectArray);

  return sortedResultObject;
};

/**
 * Function for calculation TableOfTechnologies where key is a technology name and value is a section name
 * @param {Projects} projects
 * @param {TechnologiesMap} map
 * @returns {TechnologiesTableData}
 */
export const getTableOfTechnologies = (
  projects: IProject[],
  map: ITechnologiesMap,
): ITechnologiesTableData => {
  const resultObj: ITechnologiesTableData = {};
  projects.forEach((project) => {
    project.technologies?.forEach((tech) => {
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
