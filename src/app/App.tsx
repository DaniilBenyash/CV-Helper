import "./styles/global.css";
import { StoreProvider } from "./store";
import { MainPage } from "@/pages/MainPage";

function App() {
  return (
    <StoreProvider>
      <MainPage />
    </StoreProvider>
  );
}

export default App;
