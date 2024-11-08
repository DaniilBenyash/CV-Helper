import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks";
import { Flex, Typography } from "antd";
import { normalizeString } from "@/modules/utils/normalizeString";
import { FC, useCallback, useMemo } from "react";
import { ISummaryField } from "@/types/storeTypes";

const { Title, Paragraph } = Typography;

type SummaryContentProps = {
  summary: ISummaryField;
  isDuplicated: (value: string) => boolean;
};

const SummaryContent: FC<SummaryContentProps> = ({ summary, isDuplicated }) => {
  return (
    <div>
      {Object.entries(summary).map(([key, valueArr]) => {
        if (valueArr.length === 0) return;

        return (
          <div key={key}>
            <Title level={3}>{key}</Title>
            <Paragraph>
              {valueArr.map((value) => {
                return (
                  <span key={value + `${isDuplicated(value)}`}>
                    <span style={{ backgroundColor: isDuplicated(value) ? "#FF7373" : "none" }}>
                      {value}
                    </span>
                    ,{" "}
                  </span>
                );
              })}
            </Paragraph>
          </div>
        );
      })}
    </div>
  );
};

export const SummarizingField = observer(() => {
  const {
    projects: { summary, hasCollisions, duplicatedValues },
  } = useStore();

  const normalizedDuplicatedValues = useMemo(
    () => duplicatedValues.map((item) => normalizeString(item)),
    [duplicatedValues],
  );

  const isDuplicated = useCallback(
    (value: string) => {
      return normalizedDuplicatedValues.includes(normalizeString(value));
    },
    [normalizedDuplicatedValues],
  );

  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "30%" }}>
      <Title level={3}>Summarizing field</Title>
      <SummaryContent summary={summary} isDuplicated={isDuplicated} />
      {hasCollisions && (
        <Paragraph style={{ backgroundColor: "#FF7373" }}>
          Fields has duplicated technologies names above or table has not founded technologies
          <br />
          {duplicatedValues.join(", ")}
        </Paragraph>
      )}
    </Flex>
  );
});
