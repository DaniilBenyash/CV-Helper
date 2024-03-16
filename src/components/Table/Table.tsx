import { observer } from "mobx-react-lite";
import { TechnologiesTable } from "../TechnologiesTable/TechnologiesTable";
import { useStores } from "@/store/hooks/root-store-context";
import { Flex, Typography } from "antd";

const { Title } = Typography;
// TODO should replace this component to related folder with smart components
export const Table = observer(() => {
  const {
    projects: { table },
  } = useStores();
  return (
    <Flex vertical gap="small" align="stretch" style={{ width: "70%" }}>
      <Title level={3}>Professional skills</Title>
      <TechnologiesTable tableObj={table} />
    </Flex>
  );
});
