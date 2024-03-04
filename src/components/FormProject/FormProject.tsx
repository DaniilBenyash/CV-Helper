import { useFormik } from "formik";
import { InputDate, dateFormat } from "../InputDate";
import { Input } from "antd";
import dayjs from "dayjs";
import { ChangeEvent } from "react";
import { RangePickerProps } from "antd/es/date-picker";
const { TextArea } = Input;

type initialValues = {
  firstDate: string;
  lastDate: string;
  dateRange: number;
  technologies: string;
};

export const FormProject = () => {
  const currentMonth = dayjs().format(dateFormat);
  const formik = useFormik<initialValues>({
    initialValues: {
      firstDate: currentMonth,
      lastDate: currentMonth,
      dateRange: 0,
      technologies: "",
    },
    onSubmit: (values: initialValues) => {
      console.log(values);
    },
  });

  const handleDateRangeChange: RangePickerProps["onChange"] = (_date, dateString) => {
    const [firstDate, lastDate] = dateString;
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
    <>
      <InputDate onChange={handleDateRangeChange} />
      <TextArea rows={4} onChange={handleTextAreaChange} />
    </>
  );
};
