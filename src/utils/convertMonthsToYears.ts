export const convertMonthsToYears = (months: number) => {
  if (months < 6) return 1;
  return Math.round(months / 12);
};
