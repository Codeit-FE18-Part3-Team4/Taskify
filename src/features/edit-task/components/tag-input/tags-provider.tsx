import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ContextValue {
  tagsHistory: string[];
  setTagsHistory: Dispatch<SetStateAction<string[]>>;
}

export const TagsContext = createContext<ContextValue>({
  tagsHistory: [],
  setTagsHistory: () => {},
});

interface Props {
  children: ReactNode;
}

export default function TagsProvider({ children }: Props) {
  const [tagsHistory, setTagsHistory] = useState<string[]>([
    "프로젝트",
    "디자인",
    "상",
  ]);

  return (
    <TagsContext value={{ tagsHistory, setTagsHistory }}>
      {children}
    </TagsContext>
  );
}
