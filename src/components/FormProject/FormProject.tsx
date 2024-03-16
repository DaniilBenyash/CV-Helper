import { InputDate } from "../InputDate";
import { Flex, Input } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, FC } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { useStores } from "@/store/hooks/root-store-context";
import { Project } from "@/abstraction/store/fields";
import { calculateDateRange } from "@/utils/calculateDateRange";
import { dateFormat } from "@/abstraction/formats";
import { observer } from "mobx-react-lite";

const { TextArea } = Input;

type FormProjectProps = {
  projectData: Project;
};
export const FormProject: FC<FormProjectProps> = observer(({ projectData }) => {
  const {
    projects: { setDate, setTechnologies },
  } = useStores();

  const handleDateRangeChange: RangePickerProps["onChange"] = (_date, dateString) => {
    const [firstDate, lastDate] = dateString;
    const dateRange = calculateDateRange(firstDate, lastDate);
    setDate(projectData.id, firstDate, dateRange);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const technologies = event.target.value;
    setTechnologies(projectData.id, technologies);
  };

  return (
    <Flex gap="middle" vertical align="start">
      <InputDate
        onChange={handleDateRangeChange}
        value={[dayjs(projectData.firstDate, dateFormat), dayjs(projectData.lastDate, dateFormat)]}
      />
      <TextArea
        rows={4}
        value={projectData.technologies.join(", ")}
        onChange={handleTextAreaChange}
      />
    </Flex>
  );
});
