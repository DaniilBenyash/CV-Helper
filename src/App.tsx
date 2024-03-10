import "./App.css";
import { ListFormsProject } from "./components/ListFormsProject/ListFormsProject";
import { RootStoreContext } from "./store/hooks/root-store-context";
import { rootStore } from "./store/root-store";

function App() {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ListFormsProject />
    </RootStoreContext.Provider>
  );
}

export default App;
