import { Flex } from "./styles";
import { ListProjects } from "@/components/ListProjects/ListProjects";
import { Table } from "@/components/Table/Table";

export const MainPage = () => {
  return (
    <Flex gap={100} justify="start">
      <ListProjects />
      <Table />
    </Flex>
  );
};
