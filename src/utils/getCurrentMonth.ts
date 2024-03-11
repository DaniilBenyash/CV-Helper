import dayjs from "dayjs";
import { dateFormat } from "@/abstraction/formats";

export const getCurrentMonth = () => {
  return dayjs().format(dateFormat);
};
