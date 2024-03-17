import { DocumentInput } from "@/components/DocumentInput";
import { Flex } from "./styles";
import { ListProjects } from "@/components/ListProjects/ListProjects";
import { Table } from "@/components/Table/Table";
import { ReloadPageButton } from "@/components/ReloadPageButton";

export const MainPage = () => {
  return (
    <>
      <Flex gap={10} align="center">
        <ReloadPageButton />
        <DocumentInput />
      </Flex>
      <Flex gap={100} justify="start">
        <ListProjects />
        <Table />
      </Flex>
    </>
  );
};
