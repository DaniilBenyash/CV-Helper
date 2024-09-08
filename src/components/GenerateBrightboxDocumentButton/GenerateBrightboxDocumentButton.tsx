import Docxtemplater from "docxtemplater";
import PizZip, { LoadData } from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressionParser from "docxtemplater/expressions";
import { Button } from "antd";
import { useStore } from "@/modules/hooks";
import { observer } from "mobx-react-lite";
function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const GenerateBrightboxDocumentButton = observer(() => {
  const {
    projects: { name, roles, education, selfIntro },
  } = useStore();

  const generateDocument = () => {
    loadFile("/brightBoxTemplate.docx", function (error: Error, content: LoadData) {
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
        name,
        roles,
        education,
        selfIntro,
      });
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }); //Output the document using Data-URI
      saveAs(out, `${name}.docx`);
    });
  };
  return <Button onClick={generateDocument}>Generate Brightbox</Button>;
});
