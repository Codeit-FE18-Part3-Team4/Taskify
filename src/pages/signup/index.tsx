import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/assets/images/taskify-logo.svg";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Typography from "@/components/typography/index";
import Checkbox from "@/components/checkbox";

export default function SignupPage() {
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
          />
          <p>닉네임</p>
          <Input
            variant={InputVariant.Default}
            $size={InputSize.Auto}
            placeholder="닉네임을 입력해주세요"
          />
          <p>비밀번호</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            placeholder="8자 이상 입력해주세요"
          />
          <p>비밀번호 확인</p>
          <Input
            variant={InputVariant.Password}
            $size={InputSize.Auto}
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
          <label className={styles.checkboxWrapper}>
            <Checkbox />
            <span>이용약관에 동의합니다.</span>
          </label>
        </form>
        <div className={styles.signupActions}>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Large}
            isWidthFull
          >
            로그인
          </Button>
          <p className={Typography.lgMedium}>
            이미 회원이신가요?{" "}
            <Link href="/login" className={styles.loginLink}>
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
