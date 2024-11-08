import { observer } from "mobx-react-lite";
import { Table } from "@/components/Table";
import { useStore } from "@/hooks";
import { Flex, Title } from "@/ui-kit";

export const TableSection = observer(() => {
  const {
    projects: { table },
  } = useStore();
  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "40%" }}>
      <Title level={3}>Professional skills</Title>
      <Table technologies={table} />
    </Flex>
  );
});
