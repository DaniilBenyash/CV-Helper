import { TechnologiesTableData, Technology } from "@/abstraction/store/fields";
import { capitalize } from "@/utils/capitalize";

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

// TODO must be used in docxtemplater doc.render
export const generateStringWithLinebreaks = (
  arr: Technology[],
  fieldName: keyof Technology,
  customConversionCallback?: (str: string | number) => string,
): string => {
  return arr.reduce((acc, item, index, array) => {
    const value = customConversionCallback
      ? customConversionCallback(item[fieldName])
      : item[fieldName];

    if (index === array.length - 1) {
      return acc + value;
    }
    return acc + value + "\n";
  }, "");
};
