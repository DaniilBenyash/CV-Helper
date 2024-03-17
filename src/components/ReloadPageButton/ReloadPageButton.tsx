import { useStores } from "@/store/hooks/root-store-context";
import { Button } from "antd";
import { observer } from "mobx-react-lite";

export const ReloadPageButton = observer(() => {
  const {
    projects: { clearProjects },
  } = useStores();

  return <Button onClick={clearProjects}>Clear all</Button>;
});
