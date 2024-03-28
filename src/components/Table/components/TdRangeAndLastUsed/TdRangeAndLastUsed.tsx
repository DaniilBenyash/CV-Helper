import { FC } from "react";
import { Td, P } from "./styles";
import { Technology } from "@/abstraction/store/fields";
import { convertMonthsToYears } from "@/utils/convertMonthsToYears";

type TdRangeAndLastUsedProps = {
  technologies: Technology[];
};

export const TdRangeAndLastUsed: FC<TdRangeAndLastUsedProps> = ({ technologies }) => {
  return (
    <>
      <Td>
        {technologies.map((project, id) => (
          <P key={id}>{convertMonthsToYears(project.range)}</P>
        ))}
      </Td>
      <Td>
        {technologies.map((project, id) => (
          <P key={id}>{project.lastUsed}</P>
        ))}
      </Td>
    </>
  );
};
