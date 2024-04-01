import { useStore } from "@/modules/hooks";
import { Button } from "antd";
import { observer } from "mobx-react-lite";

export const ReloadPageButton = observer(() => {
  const {
    projects: { clearProjects },
  } = useStore();

  return <Button onClick={clearProjects}>Clear all</Button>;
});
