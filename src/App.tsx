import "./App.css";
import { RootStoreContext } from "./store/hooks/root-store-context";
import { rootStore } from "./store/root-store";
import { MainPage } from "./modules/MainPage";

function App() {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <MainPage />
    </RootStoreContext.Provider>
  );
}

export default App;
