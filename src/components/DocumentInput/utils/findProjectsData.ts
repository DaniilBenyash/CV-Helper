import { getCurrentMonth } from "@/modules/utils/getCurrentMonth";
import { normalizeString } from "@/modules/utils/normalizeString";
import { splitStringByCommaWithoutCommasInBraces } from "./splitStringByCommaWithoutCommasInBraces";
import { removeBraces } from "./removeBraces";
import { removeLastDot } from "./removeLastDot";

type ProjectData = {
  dates: string[];
  technologies: string[];
  name: string;
  description: string;
};

const convertDate = (str: string) => {
  return `${str.slice(3)}-${str.slice(0, 2)}`;
};

const prepareTechnologiesArr = (technologies: string) => {
  const technologiesArr = splitStringByCommaWithoutCommasInBraces(technologies);
  const technologiesArrWithoutBraces = removeBraces(technologiesArr);
  const technologiesArrWithoutLastDotInLastElement = removeLastDot(technologiesArrWithoutBraces);
  return technologiesArrWithoutLastDotInLastElement;
};

export const findProjectsData = (htmlStr: string) => {
  const regExp = /<[^>]*>/gm;
  const arrWithStrings = htmlStr.split(regExp).filter((item) => item !== "");

  const projectData = arrWithStrings.reduce(
    (
      acc: {
        dates: string[][];
        technologies: string[];
        projectsNames: string[];
        projectsDescriptions: string[];
      },
      item,
      index,
      array,
    ) => {
      const nextItemIndex = 1;
      const previousTwoItemsIndex = -2;
      const previousOneItemsIndex = -1;

      const periodName = normalizeString(item);
      if (periodName === "period") {
        const dateString = array[index + nextItemIndex];
        const firstDate = convertDate(dateString.slice(0, 7));
        const lastDate =
          normalizeString(dateString.slice(10)) === "tillnow"
            ? getCurrentMonth()
            : convertDate(dateString.slice(10));
        acc.dates.push([firstDate, lastDate]);
      }

      const technologiesName = normalizeString(item);
      if (technologiesName === "environment" || technologiesName === "технологии") {
        acc.technologies.push(array[index + nextItemIndex]);
      }

      const projectRolesName = normalizeString(item);
      if (projectRolesName === "projectroles") {
        acc.projectsNames.push(array[index + previousTwoItemsIndex]);
        acc.projectsDescriptions.push(array[index + previousOneItemsIndex]);
      }

      return acc;
    },
    { dates: [], technologies: [], projectsNames: [], projectsDescriptions: [] },
  );

  const result: ProjectData[] = [];

  if (projectData.dates.length === projectData.technologies.length) {
    for (let key = 0; key < projectData.dates.length; key++) {
      const preparedObject: ProjectData = {
        dates: projectData.dates[key],
        technologies: prepareTechnologiesArr(projectData.technologies[key]),
        name: projectData.projectsNames[key],
        description: projectData.projectsDescriptions[key],
      };

      result.push(preparedObject);
    }
  }

  return result;
};
