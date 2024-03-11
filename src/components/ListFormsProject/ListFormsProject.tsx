import { Button, Flex } from "antd";
import { FormProject } from "../FormProject";
import { useStores } from "@/store/hooks/root-store-context";
import { observer } from "mobx-react-lite";

// TODO should make this component more designable
export const ListFormsProject = observer(() => {
  const {
    projects: { projects, addNewProject },
  } = useStores();

  return (
    <Flex gap="middle" vertical flex-start>
      {projects.map((project) => {
        return <FormProject key={project.id} projectData={project} />;
      })}
      <Button onClick={addNewProject}>Add project</Button>
    </Flex>
  );
});
