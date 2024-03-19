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
