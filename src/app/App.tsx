import "./styles/global.css";
import { StoreProvider } from "./store";
import { MainPage } from "@/pages/MainPage";
import { ThemeProvider } from "./theme";

function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
