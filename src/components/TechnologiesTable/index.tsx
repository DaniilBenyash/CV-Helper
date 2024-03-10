import { FC } from "react";
import { TechnologiesTableData } from "@/abstraction/store/fields";
import { convertMonthsToYears } from "@/utils/convertMonthsToYears";
import { Flex } from "antd";
import { Typography } from "antd";

const { Text, Title } = Typography;

type Props = {
  tableObj: TechnologiesTableData;
};

// TODO should make the component as AntDesign Table
export const TechnologiesTable: FC<Props> = ({ tableObj }) => {
  const sections = Object.keys(tableObj);

  return (
    <Flex vertical>
      {sections.map((section) => (
        <>
          <Title level={4} key={section}>
            {section.toUpperCase()}
          </Title>
          <Flex vertical>
            {tableObj[section].map((item) => (
              <Text mark style={{ fontSize: 17 }} key={item.name}>
                {item.name} - {convertMonthsToYears(item.range)} - {item.lastUsed}
              </Text>
            ))}
          </Flex>
        </>
      ))}
    </Flex>
  );
};
