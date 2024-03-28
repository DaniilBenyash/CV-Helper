import { FC, ReactNode, createContext } from "react";
import { projectsStore } from "@/modules/store/projects-store";

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
