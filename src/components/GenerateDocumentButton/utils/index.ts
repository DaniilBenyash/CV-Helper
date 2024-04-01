import { TechnologiesTableData, Technology } from "@/abstraction/store/fields";
import { capitalize } from "@/modules/utils/capitalize";

type DataForGenerating = { sections: { section: string; technologies: Technology[] }[] };

export const getDataForDocumentGenerating = (table: TechnologiesTableData) => {
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
