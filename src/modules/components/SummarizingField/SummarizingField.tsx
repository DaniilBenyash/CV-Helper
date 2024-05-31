import { observer } from "mobx-react-lite";
import { useStore } from "@/modules/hooks";
import { Flex, Typography } from "antd";
import { normalizeString } from "@/modules/utils/normalizeString";

const { Title, Paragraph } = Typography;

export const SummarizingField = observer(() => {
  const {
    projects: { summary, hasCollisions, duplicatedValues },
  } = useStore();

  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "30%" }}>
      <Title level={3}>Summarizing field</Title>
      {
        <div>
          {Object.entries(summary).map(([key, valueArr]) => {
            if (valueArr.length === 0) return;

            return (
              <div key={key}>
                <Title level={3}>{key}</Title>
                <Paragraph>
                  {valueArr.map((value) => {
                    const normalizedDuplicatedValues = duplicatedValues.map((item) =>
                      normalizeString(item),
                    );
                    const isDuplicated = Boolean(
                      normalizedDuplicatedValues.includes(normalizeString(value)),
                    );

                    return (
                      <span
                        key={value + `${isDuplicated}`}
                        style={{ backgroundColor: isDuplicated ? "#FF7373" : "none" }}
                      >
                        {value},{" "}
                      </span>
                    );
                  })}
                </Paragraph>
              </div>
            );
          })}
        </div>
      }
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
