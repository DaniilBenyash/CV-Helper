import "./App.css";
import { RootStoreContext } from "./store/hooks/root-store-context";
import { rootStore } from "./store/root-store";

function App() {
  return <RootStoreContext.Provider value={rootStore}>Hello World!</RootStoreContext.Provider>;
}

export default App;
