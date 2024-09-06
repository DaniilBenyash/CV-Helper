import { useStore } from "@/modules/hooks";
import { Button } from "antd";
import { observer } from "mobx-react-lite";

export const ReloadPageButton = observer(() => {
  const {
    projects: { clearStore: clearStore },
  } = useStore();

  return <Button onClick={clearStore}>Clear all</Button>;
});
