import { InputDate, TextArea, Flex } from "@/ui-kit";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { useStore } from "@/app/store";
import { Project } from "@/abstraction/store/fields";
import { calculateDateRange } from "@/utils/calculateDateRange";
import { dateFormat } from "@/abstraction/formats";
import { observer } from "mobx-react-lite";

type FormProjectProps = {
  projectData: Project;
};

export const FormProject: FC<FormProjectProps> = observer(({ projectData }) => {
  const {
    projects: { setDate, setTechnologies },
  } = useStore();

  const inputDateValues: [Dayjs, Dayjs] = [
    dayjs(projectData.firstDate, dateFormat),
    dayjs(projectData.lastDate, dateFormat),
  ];

  const textAreaValue = projectData.technologies.join(", ");

  const handleInputDateChange = (firstDate: string, lastDate: string) => {
    const dateRange = calculateDateRange(firstDate, lastDate);
    setDate(projectData.id, firstDate, dateRange);
  };

  const handleTextAreaChange = (value: string) => {
    setTechnologies(projectData.id, value);
  };

  return (
    <Flex gap="middle" vertical align="start">
      <InputDate onChange={handleInputDateChange} value={inputDateValues} />
      <TextArea rows={4} value={textAreaValue} onChange={handleTextAreaChange} />
    </Flex>
  );
});
