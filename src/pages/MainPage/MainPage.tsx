import { Flex } from "./styles";
import { ListProjects } from "@/modules/components/ListProjects";
import { TableSection } from "@/modules/components/TableSection";
import { ReloadPageButton } from "@/components/ReloadPageButton";
import { GenerateDocumentButton } from "@/components/GenerateDocumentButton";
import { SummarizingField } from "@/modules/components/SummarizingField";
import { useStore } from "@/modules/hooks";
import { observer } from "mobx-react-lite";
import { Spinner } from "@/ui-kit/Spinner";
import { TableLink } from "@/components/TableLink";
import { RefetchDataButton } from "@/components/RefetchDataButton";
import { DocumentInput } from "@/modules/components/DocumentInput";
import { GenerateBrightboxDocumentButton } from "@/components/GenerateBrightboxDocumentButton";

const isEmpty = <T extends object>(obj: T) => Object.keys(obj).length === 0;

export const MainPage = observer(() => {
  const {
    projects: { technologiesMap },
  } = useStore();

  if (isEmpty(technologiesMap))
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );

  return (
    <>
      <Flex gap={10} align="center">
        <ReloadPageButton />
        <DocumentInput />
        <GenerateDocumentButton />
        <GenerateBrightboxDocumentButton />
        <RefetchDataButton />
        <TableLink />
      </Flex>
      <Flex gap={100} justify="start">
        <ListProjects />
        <TableSection />
        <SummarizingField />
      </Flex>
    </>
  );
});
