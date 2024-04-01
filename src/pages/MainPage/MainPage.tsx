import { DocumentInput } from "@/components/DocumentInput";
import { Flex } from "./styles";
import { ListProjects } from "@/modules/components/ListProjects";
import { TableSection } from "@/modules/components/TableSection";
import { ReloadPageButton } from "@/components/ReloadPageButton";
import { GenerateDocumentButton } from "@/components/GenerateDocumentButton";
import { SummarizingField } from "@/modules/components/SummarizingField";

export const MainPage = () => {
  return (
    <>
      <Flex gap={10} align="center">
        <ReloadPageButton />
        <DocumentInput />
        <GenerateDocumentButton />
      </Flex>
      <Flex gap={100} justify="start">
        <ListProjects />
        <TableSection />
        <SummarizingField />
      </Flex>
    </>
  );
};
