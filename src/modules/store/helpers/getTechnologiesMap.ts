import { ISectionsOrder, ITechnologiesMap } from "../../../types/storeTypes";
import { normalizeString } from "../../utils/normalizeString";

/**
 * Function for transformation Technologies object to TechnologiesMap object where key is technology name and value is name of technology section
 * @param sections
 * @returns
 */

export const getTechnologiesMap = (technologies: ISectionsOrder): ITechnologiesMap => {
  const result: ITechnologiesMap = {};

  for (const key in technologies) {
    technologies[key].forEach((technology) => {
      const normalizedTechnologyName = normalizeString(technology);
      result[normalizedTechnologyName] = {
        name: key,
        orderWeight: Object.keys(technologies).indexOf(key),
      };
    });
  }

  return result;
};
