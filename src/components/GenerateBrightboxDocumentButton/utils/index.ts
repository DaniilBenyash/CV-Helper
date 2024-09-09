import { ISummaryField, ITechnologiesTableData, ITechnology } from "@/types/storeTypes";
import { capitalize } from "@/modules/utils/capitalize";
import { SectionsNames } from "@/enums/sectionsNames";

type DataForGenerating = { sections: { section: string; technologies: ITechnology[] }[] };

export const getDataForDocumentGenerating = (table: ITechnologiesTableData) => {
  return Object.entries(table).reduce(
    (acc: DataForGenerating, item) => {
      const section = capitalize(item[0]);
      acc.sections.push({
        section,
        technologies: item[1],
      });
      return acc;
    },
    { sections: [] },
  );
};

export const generateStringWithLinebreaks = <T>(
  arr: T[],
  fieldName: keyof T,
  conversionCallback?: (str: T[keyof T]) => number,
): string =>
  arr.reduce((acc, item, index, array) => {
    const value = conversionCallback ? conversionCallback(item[fieldName]) : item[fieldName];

    if (index === array.length - 1) {
      return acc + value;
    }
    return acc + value + "\n";
  }, "");

const summaryWeights: Partial<Record<SectionsNames, number>> = {
  [SectionsNames.ProgrammingLanguages]: 0,
  [SectionsNames.Frontend]: 1,
  [SectionsNames.BackendTechnologies]: 2,
  [SectionsNames.Containerization]: 3,
  [SectionsNames.CiCd]: 4,
  [SectionsNames.Cloud]: 5,
  [SectionsNames.Databases]: 6,
};

// Summary data must be converted from
// {
//   ProgarammingLanguages: ['JavaScript', 'Typescript'],
//   Frontend: ['React', 'Redux']
// }
// to
// [
//   {
//     name: 'ProgarammingLanguages',
//     data: 'JavaScript, Typescript'
//   },
//   {
//     name: 'Frontend',
//     data: 'React, Redux'
//   }
// ]

export const prepareSummaryData = (summary: ISummaryField) => {
  return Object.entries(summary)
    .map(([summaryName, arr]) => ({
      summaryName,
      summaryData: arr.join(", "),
    }))
    .sort((a, b) => {
      const first = summaryWeights[a.summaryName as keyof Partial<Record<SectionsNames, number>>];
      const second = summaryWeights[b.summaryName as keyof Partial<Record<SectionsNames, number>>];

      if (!first || !second) return 1;

      return first - second;
    })
    .filter((item) => item.summaryData);
};
