"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type CategoryContextType = {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

const CatContext = createContext<CategoryContextType>({
  category: "",
  setCategory: () => {},
});

export const CatProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<string>("");

  return (
    <CatContext.Provider value={{ category, setCategory }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
};
