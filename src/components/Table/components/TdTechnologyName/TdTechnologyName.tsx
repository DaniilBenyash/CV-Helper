import { FC } from "react";
import { Td, P } from "./styles";
import { Technology } from "@/abstraction/store/fields";

type TdTechnologyNameProps = {
  technologies: Technology[];
};

export const TdTechnologyName: FC<TdTechnologyNameProps> = (props) => {
  return (
    <Td>
      {props.technologies.map((technology) => (
        <P key={technology.name}>{technology.name}</P>
      ))}
    </Td>
  );
};
