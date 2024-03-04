import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type InputDateProps = {
  onChange: RangePickerProps["onChange"];
  lastDate?: Dayjs;
};

export const dateFormat = "MM-YYYY";
const currentMonth = dayjs();

export const InputDate = ({ onChange, lastDate = currentMonth }: InputDateProps) => {
  return (
    <RangePicker
      onChange={onChange}
      picker="month"
      defaultValue={[dayjs(currentMonth), dayjs(lastDate)]}
      disabled={[false, true]}
    />
  );
};
