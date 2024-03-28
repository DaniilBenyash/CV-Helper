import { FC } from "react";
import { TechnologiesTableData } from "@/abstraction/store/fields";
import { capitalize } from "@/utils/capitalize";
import { TdSection } from "./components/TdSection";
import { TdTechnologyName } from "./components/TdTechnologyName";
import { TdRangeAndLastUsed } from "./components/TdRangeAndLastUsed";

type Props = {
  technologies: TechnologiesTableData;
};

export const Table: FC<Props> = ({ technologies }) => {
  const sections = Object.keys(technologies);
  return (
    <table>
      <tbody>
        {sections.map((section) => (
          <tr key={section}>
            <TdSection name={capitalize(section)} />
            <TdTechnologyName technologies={technologies[section]} />
            <TdRangeAndLastUsed technologies={technologies[section]} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
