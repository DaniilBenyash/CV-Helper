import { TechnologiesNames } from "@/abstraction/constants/technologies";
import { TechnologiesMap } from "@/abstraction/store/fields";
import { normalizeString } from "./normalizeString";

/**
 * Function for transformation Technologies object to TechnologiesMap object where key is technology name and value is name of technologie section
 * @param technologies
 * @returns
 */

export const getTechnologiesMap = (technologies: TechnologiesNames): TechnologiesMap => {
  const result: TechnologiesMap = {};

  for (const key in technologies) {
    technologies[key].forEach((technology) => {
      // TODO schould be created a function for making standard string without spaces, commas and dashes
      const normalizedTechnologyName = normalizeString(technology);
      result[normalizedTechnologyName] = key.split("_").join(" ").toLocaleLowerCase();
    });
  }

  return result;
};
