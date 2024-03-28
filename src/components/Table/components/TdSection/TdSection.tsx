import { FC } from "react";
import { Td } from "./styles";

type TdSectionProps = {
  name: string;
};

export const TdSection: FC<TdSectionProps> = ({ name }) => {
  return <Td>{name}</Td>;
};
