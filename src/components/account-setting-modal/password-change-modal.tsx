import Dialog from "@/components/dialog";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import { changePassword } from "@/features/user/apis/change-password";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { validatePassword } from "@/utils/validator";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styles from "./password-change-modal.module.css";

interface PasswordChangeModalProps {
  modalKey: string;
}

export default function PasswordChangeModal({
  modalKey,
}: PasswordChangeModalProps) {
  const { openModal } = useModal({ key: modalKey });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordCheckErrorMessage, setNewPasswordCheckErrorMessage] =
    useState("");
  const onClose = () => openModal(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [dialogMessage, setDialogMessage] = useState("");
  const DIALOG_KEY = "DIALOG_CHAGNE_PASSWORD";
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });

  const onNewPasswordBlur = () => {
    if (!newPassword) {
      setNewPasswordErrorMessage("");
      return;
    }

    if (!validatePassword(newPassword)) {
      setNewPasswordErrorMessage("8자 이상 입력해주세요");
      return;
    }

    if (newPassword !== newPasswordCheck) {
      setNewPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다");
    } else {
      setNewPasswordCheckErrorMessage("");
    }
  };

  const onNewPasswordCheckBlur = () => {
    if (!newPasswordCheck) {
      setNewPasswordCheckErrorMessage("");
      return;
    }
    if (newPassword === newPasswordCheck) {
      setNewPasswordCheckErrorMessage("");
    } else {
      setNewPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

  const onNewPasswordFocus = () => {
    setNewPasswordErrorMessage("");
  };
  const onNewPasswordCheckFocus = () => {
    setNewPasswordCheckErrorMessage("");
  };

  useEffect(() => {
    const isFormValid =
      !!password &&
      !!newPassword &&
      validatePassword(newPassword) &&
      !!newPasswordCheck &&
      validatePassword(newPasswordCheck) &&
      newPassword === newPasswordCheck;

    setIsSubmitButtonDisabled(!isFormValid);
  }, [password, newPassword, newPasswordCheck]);

  const handleSubmit = async () => {
    try {
      const response = await changePassword({ password, newPassword });
      setDialogMessage("비밀번호가 성공적으로 변경되었습니다.");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message;
      setDialogMessage(message || "비밀번호 변경에 실패했습니다.");
    } finally {
      openDialog(true);
    }
  };

  return (
    <Sheet
      sheetKey={modalKey}
      title="비밀번호 변경"
      actionType={SheetActionType.Update}
      canSubmit={!isSubmitButtonDisabled}
      onAction={handleSubmit}
    >
      <div className={styles.body}>
        <section className={styles.inputSection}>
          <p>현재 비밀번호</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호"
          />
        </section>
        <section className={styles.inputSection}>
          <p>새 비밀번호</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
            onBlur={onNewPasswordBlur}
            errorMessage={newPasswordErrorMessage}
            onFocus={onNewPasswordFocus}
          />
        </section>
        <section className={styles.inputSection}>
          <p>새 비밀번호 확인</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            type="password"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            placeholder="새 비밀번호 확인"
            onBlur={onNewPasswordCheckBlur}
            errorMessage={newPasswordCheckErrorMessage}
            onFocus={onNewPasswordCheckFocus}
          />
        </section>
      </div>
      {isShowDialog && (
        <Dialog dialogKey={DIALOG_KEY} message={dialogMessage} />
      )}
    </Sheet>
  );
}
