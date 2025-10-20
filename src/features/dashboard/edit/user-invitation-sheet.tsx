import Input, { InputSize } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import { useSheet } from "@/hooks/use-sheet";
import { MemberInfo } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Invitee } from "./user-list-title";

interface Props {
  sheetKey: string;
  members?: MemberInfo[];
  invitees?: Invitee[];
  onSubmit: (email: string) => void;
}

export default function UserInvitationSheet({
  sheetKey,
  members,
  invitees,
  onSubmit,
}: Props) {
  const { openSheet, isOpenSheet } = useSheet({ key: sheetKey });
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const sheetTitle = "초대";
  const canSubmit = email && email !== "" ? true : false;

  useEffect(() => {
    if (!isOpenSheet) {
      setEmail("");
      setErrorMessage(undefined);
    }
  }, [isOpenSheet]);

  const enterEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const cleanedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(cleanedEmail);

    if (!isValid) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const memberChk = members
      ? members?.filter((member) => member.email === cleanedEmail).length
      : 0;
    const inviteeChk = invitees
      ? invitees?.filter((invitee) => invitee.email === cleanedEmail).length
      : 0;

    if (memberChk > 0) {
      setErrorMessage("이미 멤버로 등록된 사용자입니다.");
      return;
    } else if (inviteeChk > 0) {
      setErrorMessage("이미 초대요청을 보낸 사용자입니다.");
      return;
    }

    try {
      onSubmit(email);
      openSheet(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <Sheet
      sheetKey={sheetKey}
      title={sheetTitle}
      actionType={SheetActionType.Share}
      canSubmit={canSubmit}
      onAction={handleSubmit}
    >
      <SheetSection title="이메일">
        <Input
          value={email}
          placeholder=""
          $size={InputSize.Auto}
          errorMessage={errorMessage}
          onChange={enterEmail}
        />
      </SheetSection>
    </Sheet>
  );
}
