import { Button, Flex, Typography } from "antd";
import { FormProject } from "../FormProject";
import { useStores } from "@/store/hooks/root-store-context";
import { observer } from "mobx-react-lite";

const { Title } = Typography;

// TODO should make this component more designable
export const ListProjects = observer(() => {
  const {
    projects: { projects, addNewProject },
  } = useStores();

  return (
    <Flex gap="middle" vertical>
      <Title level={3}>Projects</Title>
      {projects.map((project) => {
        return <FormProject key={project.id} projectData={project} />;
      })}
      <Button onClick={addNewProject}>Add project</Button>
    </Flex>
  );
});
