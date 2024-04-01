import { observer } from "mobx-react-lite";
import { useStore } from "@/modules/hooks";
import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { ITechnology } from "@/modules/store/types";

const { Title } = Typography;

const initialState: { [key: string]: ITechnology[] } = {
  "programming languages": [],
  frontend: [],
  cloud: [],
  backend: [],
  databases: [],
  "ci cd": [],
};

export const SummarizingField = observer(() => {
  const [list, setList] = useState(initialState);
  const {
    projects: { table },
  } = useStore();
  useEffect(() => {
    const section = Object.keys(table);
    section.forEach((section) => {
      if (list[section]) {
        setList((list) => {
          list[section] = table[section];
          return list;
        });
      }
    });
  }, [list, table]);

  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "30%" }}>
      <Title level={3}>Summarizing field</Title>
    </Flex>
  );
});
