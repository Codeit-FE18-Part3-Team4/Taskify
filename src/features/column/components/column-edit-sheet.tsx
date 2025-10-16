import Input, { InputSize } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import { useSheet } from "@/hooks/use-sheet";
import { Column } from "@/types/column";
import { ChangeEvent, useState } from "react";

interface Props {
  sheetKey: string;
  column?: Column;
  usedTitles?: string[];
  onSubmit: (title: string) => void;
}

export default function ColumnEditSheet({
  sheetKey,
  column,
  usedTitles = [],
  onSubmit,
}: Props) {
  const { openSheet } = useSheet({ key: sheetKey });
  const [title, setTitle] = useState<string>(column?.title ?? "");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const sheetTitle = column ? "칼럼 관리" : "새 칼럼 생성";
  const actionType = column ? SheetActionType.Modify : SheetActionType.Create;
  const canSubmit = title.length > 0 && column?.title !== title;

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    if (usedTitles.includes(title)) {
      setErrorMessage("중복된 칼럼명입니다.");
      return;
    }

    try {
      onSubmit(title);
      openSheet(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <Sheet
      sheetKey={sheetKey}
      title={sheetTitle}
      actionType={actionType}
      canSubmit={canSubmit}
      onAction={handleSubmit}
    >
      <SheetSection title="이름">
        <Input
          value={title}
          placeholder="칼럼 이름"
          size={InputSize.Auto}
          errorMessage={errorMessage}
          onChange={handleTitleChange}
        />
      </SheetSection>
    </Sheet>
  );
}
