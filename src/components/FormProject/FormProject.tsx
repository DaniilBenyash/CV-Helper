import { useFormik } from "formik";
import { InputDate, dateFormat } from "../InputDate";
import { Flex, Input } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, FC } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { ProjectType } from "../ListFormsProject";

const { TextArea } = Input;

type FormProjectProps = {
  onSubmit: (project: ProjectType) => void;
  projectData: ProjectType;
};
export const FormProject: FC<FormProjectProps> = ({ onSubmit, projectData }) => {
  const formik = useFormik<ProjectType>({
    initialValues: projectData,

    onSubmit: (project: ProjectType) => {
      onSubmit(project);
    },
  });

  const handleDateRangeChange: RangePickerProps["onChange"] = (_date, dateString) => {
    const [firstDate, lastDate] = dateString;
    console.log(dateString);
    const dateRange = dayjs(lastDate).diff(firstDate, "month");
    formik.setFieldValue("firstDate", firstDate);
    formik.setFieldValue("lastDate", lastDate);
    formik.setFieldValue("dateRange", dateRange);
    formik.handleSubmit();
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const technologies = event.target.value;
    formik.setFieldValue("technologies", technologies);
    formik.handleSubmit();
  };

  return (
    <Flex gap="middle" vertical>
      <InputDate
        onChange={handleDateRangeChange}
        value={[dayjs(projectData.firstDate, dateFormat), dayjs(projectData.lastDate, dateFormat)]}
      />
      <TextArea rows={4} onChange={handleTextAreaChange} />
    </Flex>
  );
};
