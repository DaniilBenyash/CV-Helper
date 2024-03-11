import { observer } from "mobx-react-lite";
import { TechnologiesTable } from "../TechnologiesTable";
import { useStores } from "@/store/hooks/root-store-context";

// TODO should replace this component to related folder with smart components
export const Table = observer(() => {
  const {
    projects: { table },
  } = useStores();

  return <TechnologiesTable tableObj={table} />;
});
