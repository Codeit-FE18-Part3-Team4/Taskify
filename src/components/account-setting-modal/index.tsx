import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Dialog from "@/components/dialog";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Sheet, { SheetActionType } from "@/components/sheet";
import { useAuthEffect } from "@/features/auth/components/auth-provider";
import { changeUserdata } from "@/features/user/apis/change-userdata";
import { getMe, GetMeResponse } from "@/features/user/apis/get-me";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./account-setting-modal.module.css";
import PasswordChangeModal from "./password-change-modal";

interface AccountSettingModalProps {
  modalKey: string;
}

export default function AccountSettingModal({
  modalKey,
}: AccountSettingModalProps) {
  const PASSWORD_CHANGE_MODAL_KEY = "PASSWORD_CHANGE_MODAL";
  const {
    isShowModal: isShowPasswordChangeModal,
    openModal: openPasswordChangeModal,
  } = useModal({ key: PASSWORD_CHANGE_MODAL_KEY });
  const [userData, setUserData] = useState<GetMeResponse | null>(null);
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const DIALOG_KEY = "DIALOG_CHAGNE_USERDATA";
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });
  const [dialogMessage, setDialogMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useAuthEffect(() => {
    async function loadUserData() {
      try {
        setUserData(await getMe());
      } catch (error: unknown) {
        console.error("Load User Data Failed:", error);
      }
    }
    loadUserData();
  });

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setProfileImage(userData.profileImageUrl);
    }
  }, [userData]);

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
    setSelectedFile(file);
  };

  const handleDeleteProfileImage = () => {
    setProfileImage("");
  };

  const handleSubmit = async () => {
    try {
      await changeUserdata(nickname, profileImage);
      setDialogMessage("프로필이 성공적으로 변경되었습니다.");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message;
      setDialogMessage(message || "프로필 변경에 실패했습니다.");
    } finally {
      openDialog(true);
    }
  };

  return (
    <Sheet
      sheetKey={modalKey}
      title="프로필 변경"
      actionType={SheetActionType.Update}
      onAction={handleSubmit}
    >
      <div className={styles.body}>
        <section className={styles.profileImageSection}>
          <div className={styles.profileImage}>
            <Profile
              profileImageUrl={profileImage as string}
              name={userData?.nickname}
              size={ProfileSize.XLarge}
            />
          </div>
          <div className={styles.profileImageButtons}>
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Small}
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              사진 변경
            </Button>
            <Button
              variant={ButtonVariant.Delete}
              size={ButtonSize.Small}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteProfileImage();
              }}
            >
              사진 삭제
            </Button>
            <input
              className={styles.invisibleFileInput}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </section>
        <section className={styles.emailSection}>
          <p>이메일</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            disabled={true}
            placeholder={userData?.email || ""}
            type="email"
          />
        </section>
        <section className={styles.nicknameSection}>
          <p>닉네임</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            value={nickname}
            onChange={onNicknameChange}
            placeholder={userData?.nickname || ""}
          />
        </section>
        <section className={styles.passwordSection}>
          <p>비밀번호</p>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Small}
            onClick={(e) => {
              e.preventDefault();
              openPasswordChangeModal(true);
            }}
          >
            비밀번호 변경
          </Button>
        </section>
      </div>
      {isShowPasswordChangeModal && (
        <PasswordChangeModal modalKey={PASSWORD_CHANGE_MODAL_KEY} />
      )}

      {isShowDialog && (
        <Dialog dialogKey={DIALOG_KEY} message={dialogMessage} />
      )}
    </Sheet>
  );
}
