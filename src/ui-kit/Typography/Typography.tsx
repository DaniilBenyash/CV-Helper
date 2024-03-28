import { FC } from "react";
import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

const { Title: TitleAnt } = Typography;

export const Title: FC<TitleProps> = (props) => {
  return <TitleAnt {...props}>{props.children}</TitleAnt>;
};
