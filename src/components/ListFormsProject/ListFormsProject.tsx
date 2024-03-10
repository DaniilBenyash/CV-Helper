import { Button, Flex } from "antd";
import { FormProject } from "../FormProject";
import { useStores } from "@/store/hooks/root-store-context";
import { observer } from "mobx-react-lite";

export const ListFormsProject = observer(() => {
  const {
    projects: { projects, addNewProject },
  } = useStores();

  const handleAddProject = () => {
    addNewProject();
  };

  return (
    <Flex gap="middle" vertical flex-start>
      {projects.map((project) => {
        return <FormProject key={project.id} projectData={project} />;
      })}
      <Button onClick={handleAddProject}>Add project</Button>
    </Flex>
  );
});
