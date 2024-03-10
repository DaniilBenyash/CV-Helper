import { Projects } from "@/abstraction/store/fields";
import { getCurrentMonth } from "./getCurrentMonth";
import { calculateDateRange } from "./calculateDateRange";

export const normalizeDates = (projects: Projects) => {
  return projects.reduce((acc: Projects, project) => {
    const lastDate = acc.length === 0 ? getCurrentMonth() : acc[acc.length - 1].firstDate;
    const firstDate = project.firstDate > lastDate ? lastDate : project.firstDate;

    acc.push({
      id: project.id,
      firstDate,
      lastDate,
      technologies: project.technologies,
      dateRange: calculateDateRange(firstDate, lastDate),
    });

    return acc;
  }, []);
};
