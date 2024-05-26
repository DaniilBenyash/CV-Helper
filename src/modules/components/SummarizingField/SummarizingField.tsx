import { observer } from "mobx-react-lite";
import { useStore } from "@/modules/hooks";
import { Flex, Typography } from "antd";
import { ISummaryField } from "@/types/storeTypes";

const { Title, Paragraph } = Typography;

const displaySummary = (data: ISummaryField) => (
  <div>
    {Object.entries(data).map(([key, valueArr]) => {
      if (valueArr.length === 0) return;
      return (
        <div key={key}>
          <Title level={3}>{key}</Title>
          <Paragraph>{valueArr.join(", ")}</Paragraph>
        </div>
      );
    })}
  </div>
);

export const SummarizingField = observer(() => {
  const {
    projects: { summary, hasCollisions },
  } = useStore();

  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "30%" }}>
      <Title level={3}>Summarizing field</Title>
      {displaySummary(summary)}
      {hasCollisions && (
        <Paragraph style={{ backgroundColor: "#FF7373" }}>
          Fields has duplicated technologies names above
        </Paragraph>
      )}
    </Flex>
  );
});
