import { IAllTechnologies, ITechnologiesMap } from "../types";
import { normalizeString } from "../../utils/normalizeString";

/**
 * Function for transformation Technologies object to TechnologiesMap object where key is technology name and value is name of technologie section
 * @param technologies
 * @returns
 */

export const getTechnologiesMap = (technologies: IAllTechnologies): ITechnologiesMap => {
  const result: ITechnologiesMap = {};

  for (const key in technologies) {
    technologies[key].forEach((technology) => {
      // TODO schould be created a function for making standard string without spaces, commas and dashes
      const normalizedTechnologyName = normalizeString(technology);
      result[normalizedTechnologyName] = key.split("_").join(" ").toLowerCase();
    });
  }

  return result;
};
