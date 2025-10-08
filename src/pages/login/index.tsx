import styles from "./index.module.css";
import Link from "next/link";
import LogoImg from "@/assets/images/taskify-logo.svg";
import LoginImg from "@/assets/images/login-main.png";
import Image from "next/image";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Typography from "@/components/typography/typography";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.leftSection}>
        <div className={styles.loginCard}>
          <Image src={LogoImg} alt="로고" width={340} height={87} />
          <form className={styles.loginForm}>
            <p>아이디</p>
            <Input
              variant={InputVariant.Default}
              size={InputSize.Auto}
              placeholder="아이디를 입력해주세요"
            />
            <p>비밀번호</p>
            <Input
              variant={InputVariant.Password}
              size={InputSize.Auto}
              placeholder="8자 이상 입력해주세요"
            />
          </form>
          <div className={styles.loginActions}>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Large}
              isWidthFull
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
