import { createContext, ReactNode, useRef } from "react";

interface ContextValue {
  tagsHistory: string[];
  setTagsHistory: (tags: string[]) => void;
}

export const TagsContext = createContext<ContextValue>({
  tagsHistory: [],
  setTagsHistory: () => {},
});

interface Props {
  children: ReactNode;
}

export default function TagsProvider({ children }: Props) {
  const tagsRef = useRef<string[]>(["프로젝트", "디자인", "상"]);
  const setTagsHistory = (tags: string[]) => {
    tagsRef.current = tags;
  };

  return (
    <TagsContext value={{ tagsHistory: tagsRef.current, setTagsHistory }}>
      {children}
    </TagsContext>
  );
}
