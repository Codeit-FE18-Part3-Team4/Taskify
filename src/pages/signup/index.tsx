import LogoImg from "@/assets/images/taskify-logo.svg";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Checkbox from "@/components/checkbox";
import Dialog from "@/components/dialog";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Typography from "@/components/typography";
import { DIALOG_MESSAGES } from "@/constants/signup/dialog-messages";
import { signup } from "@/features/user/apis/signup";
import { useDialog } from "@/hooks/use-dialog";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/utils/validator";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
    useState("");
  const [hasAgreedCheckbox, setHasAgreedCheckbox] = useState(false);
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);
  const router = useRouter();
  const [dialogMessage, setDialogMessage] = useState("");
  const DIALOG_KEY = "DIALOG_SIGNUP";
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onPasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  const onHasAgreedCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasAgreedCheckbox(e.target.checked);
  };

  const onEmailBlur = () => {
    if (!email) {
      setEmailErrorMessage("");
      return;
    }

    if (validateEmail(email)) {
      setEmailErrorMessage("");
    } else {
      setEmailErrorMessage("이메일 형식으로 작성해주세요");
    }
  };

  const onNicknameBlur = () => {
    if (!nickname) {
      setNicknameErrorMessage("");
      return;
    }

    if (validateNickname(nickname)) {
      setNicknameErrorMessage("");
    } else {
      setNicknameErrorMessage("열 자 이하로 작성해주세요");
    }
  };

  const onPasswordBlur = () => {
    if (!password) {
      setPasswordErrorMessage("");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordErrorMessage("8자 이상 입력해주세요");
      return;
    }

    if (password !== passwordCheck) {
      setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다");
    } else {
      setPasswordCheckErrorMessage("");
    }
  };

  const onPasswordCheckBlur = () => {
    if (!passwordCheck) {
      setPasswordCheckErrorMessage("");
      return;
    }
    if (password === passwordCheck) {
      setPasswordCheckErrorMessage("");
    } else {
      setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

  const onEmailFocus = () => {
    setEmailErrorMessage("");
  };
  const onNicknameFocus = () => {
    setNicknameErrorMessage("");
  };
  const onPasswordFocus = () => {
    setPasswordErrorMessage("");
  };
  const onPasswordCheckFocus = () => {
    setPasswordCheckErrorMessage("");
  };

  useEffect(() => {
    const isFormValid =
      !!email &&
      validateEmail(email) &&
      !!nickname &&
      validateNickname(nickname) &&
      !!password &&
      validatePassword(password) &&
      password === passwordCheck &&
      hasAgreedCheckbox;

    setIsSignupButtonDisabled(!isFormValid);
  }, [email, nickname, password, passwordCheck, hasAgreedCheckbox]);

  const handleSubmit = async () => {
    try {
      await signup({ email, nickname, password });
      setDialogMessage(DIALOG_MESSAGES.SIGNUP_SUCCESS);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message ?? DIALOG_MESSAGES.SIGNUP_FAIL;
      setDialogMessage(message);
    } finally {
      openDialog(true);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.signupCard}>
        <Link href="/">
          <div className={styles.logoWrapper}>
            <Image src={LogoImg} alt="로고" width={340} height={87} />
          </div>
        </Link>
        <form className={styles.signupForm}>
          <p>이메일</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            placeholder="이메일을 입력해주세요"
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            onFocus={onEmailFocus}
            errorMessage={emailErrorMessage}
            value={email}
            type="email"
          />
          <p>닉네임</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            placeholder="닉네임을 입력해주세요"
            onChange={onNicknameChange}
            onBlur={onNicknameBlur}
            onFocus={onNicknameFocus}
            errorMessage={nicknameErrorMessage}
            value={nickname}
          />
          <p>비밀번호</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            placeholder="8자 이상 입력해주세요"
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            onFocus={onPasswordFocus}
            errorMessage={passwordErrorMessage}
            value={password}
          />
          <p>비밀번호 확인</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={onPasswordCheckChange}
            onBlur={onPasswordCheckBlur}
            onFocus={onPasswordCheckFocus}
            errorMessage={passwordCheckErrorMessage}
            value={passwordCheck}
          />
          <label className={styles.checkboxWrapper}>
            <Checkbox
              checked={hasAgreedCheckbox}
              onChange={onHasAgreedCheckboxChange}
            />
            <span>이용약관에 동의합니다.</span>
          </label>
        </form>
        <div className={styles.signupActions}>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Large}
            isWidthFull
            disabled={isSignupButtonDisabled}
            onClick={handleSubmit}
          >
            가입하기
          </Button>
          <p className={Typography.lgMedium}>
            이미 회원이신가요?{" "}
            <Link href="/login" className={styles.loginLink}>
              로그인하기
            </Link>
          </p>
        </div>
      </div>
      {isShowDialog && (
        <Dialog
          dialogKey={DIALOG_KEY}
          message={dialogMessage}
          onConfirm={() => {
            if (dialogMessage === DIALOG_MESSAGES.SIGNUP_SUCCESS) {
              router.push("/login");
            }
          }}
        />
      )}
    </main>
  );
}
