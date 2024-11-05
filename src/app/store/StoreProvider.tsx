import { projectsStore } from "@/store/projects-store";
import { FC, ReactNode, createContext } from "react";

class RootStore {
  projects = projectsStore;
}

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={new RootStore()}>{children}</StoreContext.Provider>;
};
