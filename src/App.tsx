import { Flex } from "antd";
import "./App.css";
import { ListFormsProject } from "./components/ListFormsProject/ListFormsProject";
import { Table } from "./components/Table";
import { RootStoreContext } from "./store/hooks/root-store-context";
import { rootStore } from "./store/root-store";

function App() {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <Flex gap={100} justify="center">
        <ListFormsProject />
        <Table />
      </Flex>
    </RootStoreContext.Provider>
  );
}

export default App;
