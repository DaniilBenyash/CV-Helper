import Docxtemplater from "docxtemplater";
import PizZip, { LoadData } from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressionParser from "docxtemplater/expressions";
import { Button } from "antd";
import { useStore } from "@/app/store";
import { Technology } from "@/abstraction/store/fields";
import { observer } from "mobx-react-lite";
import { generateStringWithLinebreaks, getDataForDocumentGenerating } from "./utils";
import { convertMonthsToYears } from "@/utils/convertMonthsToYears";

function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const GenerateDocumentButton = observer(() => {
  const {
    projects: { table },
  } = useStore();

  const generateDocument = () => {
    const dataForGenerating = getDataForDocumentGenerating(table);

    loadFile("/gen.docx", function (error: Error, content: LoadData) {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        parser: expressionParser,
      });
      doc.render({
        getNames: (scope: { technologies: Technology[] }) =>
          generateStringWithLinebreaks<Technology>(scope.technologies, "name"),
        getRanges: (scope: { technologies: Technology[] }) =>
          generateStringWithLinebreaks<Technology>(
            scope.technologies,
            "range",
            convertMonthsToYears,
          ),
        getLastUsed: (scope: { technologies: Technology[] }) =>
          generateStringWithLinebreaks<Technology>(scope.technologies, "lastUsed"),
        ...dataForGenerating,
      });
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }); //Output the document using Data-URI
      saveAs(out, "cv-table.docx");
    });
  };
  return <Button onClick={generateDocument}>Generate</Button>;
});
