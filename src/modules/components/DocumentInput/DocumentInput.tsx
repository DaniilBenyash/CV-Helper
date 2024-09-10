import { useStore } from "@/modules/hooks";
import { calculateDateRange } from "@/modules/utils/calculateDateRange";
import mammoth from "mammoth";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import { findProjectsData, findSelfInfo } from "./utils";

export const DocumentInput = observer(() => {
  const {
    projects: { clearStore, addProject, addSelfInfo },
  } = useStore();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0] || null;

    async function convertDocxToHtml(arrayBuffer: ArrayBuffer) {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      return result.value;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await convertDocxToHtml(arrayBuffer);
        const projects = findProjectsData(result);
        const selfInfo = findSelfInfo(result);

        clearStore();
        addSelfInfo(selfInfo);
        projects.forEach((item) => {
          addProject({
            id: 0,
            firstDate: item.dates[0],
            lastDate: item.dates[1],
            dateRange: calculateDateRange(item.dates[0], item.dates[1]),
            technologies: item.technologies,
            name: item.name,
            responsibilities: item.responsibilities,
            description: item.description,
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
});
