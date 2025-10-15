import LoginImg from "@/assets/images/login-main.png";
import LogoImg from "@/assets/images/taskify-logo.svg";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Dialog from "@/components/dialog";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Typography from "@/components/typography";
import { login } from "@/features/auth/apis/login";
import { useDialog } from "@/hooks/use-dialog";
import { validateEmail, validatePassword } from "@/utils/validator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const router = useRouter();
  const [dialogMessage, setDialogMessage] = useState("");
  const DIALOG_KEY = "DIALOG_SAMPLE";
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordBlur = () => {
    if (!password) {
      setPasswordErrorMessage("");
      return;
    }

    if (validatePassword(password)) {
      setPasswordErrorMessage("");
    } else {
      setPasswordErrorMessage("8자 이상 입력해주세요");
    }
  };

  const onEmailFocus = () => {
    setEmailErrorMessage("");
  };

  const onPasswordFocus = () => {
    setPasswordErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      await login({ email, password });
      router.push("/my-dashboard");
    } catch (err: any) {
      const message: string =
        err?.response?.data?.message ?? "로그인에 실패했습니다.";

      setDialogMessage(message);
      openDialog(true);
    }
  };

  useEffect(() => {
    const isFormValid =
      !!email &&
      validateEmail(email) &&
      !!password &&
      validatePassword(password);

    setIsLoginButtonDisabled(!isFormValid);
  }, [email, password]);

  return (
    <main className={styles.main}>
      <section className={styles.leftSection}>
        <div className={styles.loginCard}>
          <Link href="/">
            <div className={styles.logoWrapper}>
              <Image src={LogoImg} alt="로고" width={340} height={87} />
            </div>
          </Link>
          <form className={styles.loginForm}>
            <p>아이디</p>
            <Input
              variant={InputVariant.Default}
              size={InputSize.Auto}
              placeholder="아이디를 입력해주세요"
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              errorMessage={emailErrorMessage}
              value={email}
              onFocus={onEmailFocus}
            />
            <p>비밀번호</p>
            <Input
              variant={InputVariant.Password}
              size={InputSize.Auto}
              placeholder="8자 이상 입력해주세요"
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              errorMessage={passwordErrorMessage}
              value={password}
              onFocus={onPasswordFocus}
            />
          </form>
          <div className={styles.loginActions}>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Large}
              isWidthFull
              disabled={isLoginButtonDisabled}
              onClick={handleSubmit}
            >
              로그인
            </Button>
            <p className={Typography.lgMedium}>
              회원이 아니신가요?{" "}
              <Link href="/signup" className={styles.signupLink}>
                회원가입하기
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.rightSection}>
        <Image src={LoginImg} alt="로그인 메인" width={900} height={920} />
      </section>
      {isShowDialog && (
        <Dialog
          dialogKey={DIALOG_KEY}
          message={dialogMessage}
          onConfirm={() => openDialog(false)}
        />
      )}
    </main>
  );
}
