import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextValue {
  tagsHistory: { [dashboardId: number]: string[] };
  addTagsHistory: (dashboardId: number, tags: string | string[]) => void;
}

const TagsContext = createContext<ContextValue>({
  tagsHistory: {},
  addTagsHistory: () => {},
});

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = "tagsHistory";

export default function TagsProvider({ children }: Props) {
  const [tagsHistory, setTagsHistory] = useState<{
    [dashboardId: number]: string[];
  }>({});

  const addTagsHistory = (dashboardId: number, tags: string | string[]) => {
    const tagsArray = Array.isArray(tags) ? tags : [tags];

    setTagsHistory((prev) => {
      const dashboardTags = prev[dashboardId] || [];
      const newTags = tagsArray.filter((tag) => !dashboardTags.includes(tag));
      const newTagsHistory = {
        ...prev,
        [dashboardId]: [...dashboardTags, ...newTags],
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTagsHistory));

      return newTagsHistory;
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
