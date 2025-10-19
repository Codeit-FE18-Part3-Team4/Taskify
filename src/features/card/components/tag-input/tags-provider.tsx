import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  tagsHistory: string[];
  addTagsHistory: (tag: string) => void;
}

const TagsContext = createContext<ContextValue>({
  tagsHistory: [],
  addTagsHistory: () => {},
});

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = "tagsHistory";

export default function TagsProvider({ children }: Props) {
  const [tagsHistory, setTagsHistory] = useState<string[]>([]);

  const addTagsHistory = (tag: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tagsHistory, tag]));
    setTagsHistory((prev) => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
  };

  useEffect(() => {
    const storedTagsHistory = localStorage.getItem(STORAGE_KEY);
    if (storedTagsHistory) {
      setTagsHistory(JSON.parse(storedTagsHistory));
    }
  }, []);

  return (
    <TagsContext value={{ tagsHistory, addTagsHistory }}>
      {children}
    </TagsContext>
  );
}

export function useTagsHistory() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTagsHistory must be used within a TagsProvider");
  }

  return {
    tagsHistory: context.tagsHistory,
    addTagsHistory: context.addTagsHistory,
  };
}
