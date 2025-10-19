import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  tagsHistory: string[];
  addTagsHistory: (tags: string | string[]) => void;
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

  const addTagsHistory = (tags: string | string[]) => {
    const tagsArray = Array.isArray(tags) ? tags : [tags];
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...tagsHistory, ...tagsArray])
    );
    setTagsHistory((prev) => {
      const newTags = tagsArray.filter((tag) => !prev.includes(tag));
      return [...prev, ...newTags];
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
