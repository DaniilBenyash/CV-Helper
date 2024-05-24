import { ISectionsOrder, ITechnologiesMap } from "../types";
import { normalizeString } from "../../utils/normalizeString";

/**
 * Function for transformation Technologies object to TechnologiesMap object where key is technology name and value is name of technologie section
 * @param technologies
 * @returns
 */

export const getTechnologiesMap = (technologies: ISectionsOrder): ITechnologiesMap => {
  const result: ITechnologiesMap = {};

  for (const key in technologies) {
    technologies[key].forEach((technology) => {
      const normalizedTechnologyName = normalizeString(technology);
      result[normalizedTechnologyName] = key;
    });
  }

  return result;
};
