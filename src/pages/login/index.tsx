import styles from "./index.module.css";
import Link from "next/link";
import LogoImg from "@/assets/images/taskify-logo.svg";
import LoginImg from "@/assets/images/login-main.png";
import Image from "next/image";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Typography from "@/components/typography";
import { useState, useEffect, ChangeEvent } from "react";
import { validateEmail, validatePassword } from "@/utils/validator";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  const onIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onIdBlur = () => {
    if (!id) {
      setIdErrorMessage("");
      return;
    }

    if (validateEmail(id)) {
      setIdErrorMessage("");
    } else {
      setIdErrorMessage("이메일 형식으로 작성해주세요");
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

  const onIdFocus = () => {
    if (idErrorMessage) setIdErrorMessage("");
  };

  const onPasswordFocus = () => {
    if (passwordErrorMessage) setPasswordErrorMessage("");
  };

  const onSubmit = () => {
    // TODO: 추후에 Api 요청 및 로그인 로직 추가
  };

  useEffect(() => {
    const isFormValid =
      !!id && validateEmail(id) && !!password && validatePassword(password);

    setIsLoginButtonDisabled(!isFormValid);
  }, [id, password]);

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
              $size={InputSize.Auto}
              placeholder="아이디를 입력해주세요"
              onChange={onIdChange}
              onBlur={onIdBlur}
              errorMessage={idErrorMessage}
              value={id}
              onFocus={onIdFocus}
            />
            <p>비밀번호</p>
            <Input
              variant={InputVariant.Password}
              $size={InputSize.Auto}
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
    </main>
  );
}
