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
  const [tagsHistory, setTagsHistory] = useState<string[]>([]);

  return (
    <TagsContext value={{ tagsHistory, setTagsHistory }}>
      {children}
    </TagsContext>
  );
}
