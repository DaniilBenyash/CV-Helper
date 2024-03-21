import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { normalizeString } from "@/utils/normalizeString";

const convertDate = (str: string) => {
  return `${str.slice(3)}-${str.slice(0, 2)}`;
};

export const findDatesAndTechnologies = (htmlStr: string) => {
  // regexp for <tr> or </tr> separator
  const regTr = /(?:<tr>|<\/tr>)/gm;
  // split string by <tr> or </tr> separator
  const arr = htmlStr.split(regTr);

  // take only items with 'Environment' appearance
  const arrTech = arr.filter((str) => str.includes("Environment"));
  // take string with technologies
  const arrWithTechnologies = arrTech.map((item) => {
    // separate each item by <p> or </p>
    const regP = /<\/?[^>]+>/gm;
    const splitted = item.split(regP);
    const threeCommasRegExp = /(?:.*,){3}/gm;
    // return an array item with technologies string
    return splitted.findLast(
      (item) =>
        normalizeString(item).includes("javascript") ||
        normalizeString(item).includes("typescript") ||
        normalizeString(item).includes("html") ||
        threeCommasRegExp.test(item),
    ) as string;
  });

  // take only items with 'Project roles' appearance
  const arrDates = arr.filter((str) => str.includes("Project roles"));
  // make array witch subarrays. Subarray has two values [firstDate, lastDate]
  const arrWithDates = arrDates.map((item) => {
    // separate each item by <p> or </p>
    const regP = /<\/?[^>]+>/gm;
    const splitted = item.split(regP);
    // search needed string by unique date appearance marker 20
    const dates = splitted.filter((str) => str.includes(".20"));

    return dates.map((item) => {
      const firstDate = convertDate(item.slice(0, 7));
      const lastDate =
        normalizeString(item.slice(10)) === "tillnow"
          ? getCurrentMonth()
          : convertDate(item.slice(10));
      return [firstDate, lastDate];
    });
  });

  const result = [];
  // make result array with objects contains dates and technologies arrays
  for (let key = 0; key < arrWithDates.length; key++) {
    const splitRegex = /,\s*/;
    const technologiesArr = arrWithTechnologies[key].split(splitRegex);
    result.push({ dates: arrWithDates[key][0], technologies: technologiesArr });
  }

  return result;
};
