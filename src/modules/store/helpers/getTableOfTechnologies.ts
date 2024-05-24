import {
  IProject,
  ITechnologiesMap,
  ITechnologiesTableData,
  ISectionsSortingWeights,
} from "../types";
import { normalizeString } from "../../utils/normalizeString";
import { sectionsOrder } from "../constants/sectionsOrder";

// Here calculate the weights of the technology objects, where weight is the index of the key array
const getTechnologiesWeightsMap = (orderArr: string[]) =>
  orderArr.reduce((acc: ISectionsSortingWeights, item, index) => {
    const normalizedKey = normalizeString(item);
    acc[normalizedKey] = index;
    return acc;
  }, {});

// Here we are sorting the tableOfTechnologies by weights of technologies
const sortTableOfTechnologies = (obj: ITechnologiesTableData): ITechnologiesTableData => {
  const resultObjectArray = Object.entries(obj);
  const wightsMap = getTechnologiesWeightsMap(sectionsOrder);

  const sortedResultObjectArray = resultObjectArray.sort((a, b) => {
    const normalizedKeyA = normalizeString(a[0]);
    const normalizedKeyB = normalizeString(b[0]);
    return wightsMap[normalizedKeyA] - wightsMap[normalizedKeyB];
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
    project.technologies?.forEach((techName) => {
      const normalizedTechName = normalizeString(techName);
      const section = map[normalizedTechName] || "notFound";
      const sectionInResult = resultObj[section] ?? [];

      const technologyInSection = sectionInResult.find(
        (item) => normalizeString(item.name) === normalizedTechName,
      );

      if (technologyInSection) {
        technologyInSection.range += project.dateRange;
        return;
      }

      resultObj[section] = [
        ...sectionInResult,
        { name: techName, range: project.dateRange, lastUsed: project.lastDate.slice(0, 4) },
      ];
    });
  });
  return sortTableOfTechnologies(resultObj);
};
