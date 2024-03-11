import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { FC } from "react";

const { RangePicker } = DatePicker;

type InputDateProps = {
  onChange: RangePickerProps["onChange"];
  value: [Dayjs, Dayjs];
};

export const InputDate: FC<InputDateProps> = ({ onChange, value }) => {
  return <RangePicker onChange={onChange} picker="month" value={value} disabled={[false, true]} />;
};
