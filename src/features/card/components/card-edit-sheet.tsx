import Input, { InputSize } from "@/components/input/input";
import Textarea from "@/components/input/textarea";
import Profile from "@/components/profile/profile";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import SheetSectionGroup from "@/components/sheet/sheet-section-group";
import Typography from "@/components/typography";
import Dropdown from "@/features/card/components/dropdown";
import { uploadCardImage } from "@/features/column/apis";
import type { Card, CardAssignee, Column, MemberInfo } from "@/types";
import { ChangeEvent, useState } from "react";
import { CardParams } from "../apis";
import ImageInput from "./image-input";
import TagInput from "./tag-input";

interface Props {
  sheetKey: string;
  dashboardId: number;
  card?: Card;
  columns: Column[];
  members: MemberInfo[];
  onCreate?: (params: CardParams) => void;
  onUpdate?: (params: CardParams) => void;
}

export default function CardEditSheet({
  sheetKey,
  dashboardId,
  card,
  columns,
  members,
  onCreate,
  onUpdate,
}: Props) {
  const [title, setTitle] = useState<string>(card?.title ?? "");
  const [description, setDescription] = useState<string>(
    card?.description ?? ""
  );
  const [column, setColumn] = useState<Column | null>(() => {
    const index = columns.findIndex((column) => column.id === card?.columnId);
    return index !== -1 ? columns[index] : null;
  });
  const [assignee, setAssignee] = useState<CardAssignee | undefined>(
    card?.assignee
  );
  const [tags, setTags] = useState<string[]>(card?.tags ?? []);
  const [image, setImage] = useState<File>();

  const sheetTitle = card ? "할 일 수정" : "할 일 생성";
  const sheetActionType = card
    ? SheetActionType.Update
    : SheetActionType.Create;

  const hasRequiredField =
    title.trim() !== "" &&
    description.trim() !== "" &&
    column !== null &&
    assignee !== undefined &&
    (card ? true : image !== undefined);

  const hasChangedValue =
    title !== card?.title ||
    description !== card?.description ||
    column?.id !== card?.columnId ||
    assignee?.id !== card?.assignee?.id ||
    JSON.stringify(tags) !== JSON.stringify(card?.tags) ||
    image !== null;

  let canSubmit;
  switch (sheetActionType) {
    case SheetActionType.Create:
      canSubmit = hasRequiredField;
      break;
    case SheetActionType.Update:
      canSubmit = hasRequiredField && hasChangedValue;
      break;
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleColumnSelect = (value: string) => {
    const selectedIndex = columns.findIndex((column) => column.title === value);
    setColumn(columns[selectedIndex]);
  };

  const handleAssigneeSelect = (value: string) => {
    const selectedMember = members.find((member) => member.nickname === value);
    if (selectedMember) {
      setAssignee({
        profileImageUrl: selectedMember.profileImageUrl,
        nickname: selectedMember.nickname,
        id: selectedMember.userId,
      });
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  const handleAction = async () => {
    let imageUrl = card?.imageUrl ?? "";
    if (image) {
      imageUrl = await uploadCardImage({
        columnId: column!.id,
        imageFile: image,
      });
    }

    const editValues: CardParams = {
      columnId: column?.id,
      assigneeUserId: assignee?.id,
      title,
      description,
      tags,
      imageUrl,
    };

    switch (sheetActionType) {
      case SheetActionType.Create:
        onCreate?.(editValues);
        break;
      case SheetActionType.Update:
        onUpdate?.(editValues);
        break;
    }
  };

  return (
    <Sheet
      sheetKey={sheetKey}
      title={sheetTitle}
      actionType={sheetActionType}
      onAction={handleAction}
      canSubmit={canSubmit}
    >
      <SheetSection title="제목" required>
        <Input
          value={title}
          placeholder="제목을 입력해주세요"
          $size={InputSize.Auto}
          onChange={handleTitleChange}
        />
      </SheetSection>
      <SheetSection title="설명" required>
        <Textarea
          value={description}
          placeholder="설명을 입력해주세요"
          onChange={handleDescriptionChange}
        />
      </SheetSection>
      <SheetSectionGroup zIndex={2}>
        <SheetSection title="칼럼" required>
          <Dropdown
            value={column && column.title}
            placeholder="칼럼 선택"
            options={columns.map((column) => column.title)}
            onSelect={handleColumnSelect}
          />
        </SheetSection>
        <SheetSection title="담당자" required>
          <Dropdown
            value={
              assignee && (
                <Profile
                  showFullName
                  name={assignee.nickname}
                  fullNameSize={Typography.lgMedium}
                />
              )
            }
            placeholder="담당자 선택"
            options={members.map((member) => ({
              element: (
                <Profile
                  key={`member-${member.id}`}
                  showFullName
                  name={member.nickname}
                  fullNameSize={Typography.lgMedium}
                />
              ),
              value: member.nickname,
            }))}
            onSelect={handleAssigneeSelect}
          />
        </SheetSection>
      </SheetSectionGroup>
      <SheetSection title="태그" zIndex={1}>
        <TagInput
          dashboardId={dashboardId}
          tags={tags}
          onChange={handleTagsChange}
        />
      </SheetSection>
      <SheetSection title="이미지" required>
        <ImageInput imageUrl={card?.imageUrl} onChange={setImage} />
      </SheetSection>
    </Sheet>
  );
}
