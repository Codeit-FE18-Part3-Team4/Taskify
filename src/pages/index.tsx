import MainImg from "@/assets/images/main-01.png";
import Logo from "@/assets/images/taskify-logo.svg";
import Button, { ButtonVariant } from "@/components/button/button";
import Typography from "@/components/typography/typography";
import styles from "@/styles/main.module.css";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClickLoginPage = () => {
    router.push("/login");
  };

  const handleClickSignupPage = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.mainWrap}>
      <header className={styles.header}>
        <button className={styles.logo}>
          <Image src={Logo} width={186} height={48} alt="로고 이미지" />
        </button>
        <div className={styles.headerButtonBox}>
          <button onClick={handleClickLoginPage} className={Typography.lgMedium}>로그인</button>
          <button onClick={handleClickSignupPage} className={Typography.lgMedium}>회원가입</button>
        </div>
      </header>
      <main>
        <section className={styles.mainSectionTopWrap}>
          <div className={styles.mainSectionTopMain}>
            <h1 className={Typography.lg2Bold}>더 새로워진 일정 관리</h1>
            <span className={Typography.lg2Bold}>TASKIFY</span>
            <div className={styles.buttonBox}>
              <Button onClick={handleClickSignupPage} variant={ButtonVariant.Secondary}>회원가입하기</Button>
              <Button onClick={handleClickLoginPage}>로그인하기</Button>
            </div>
          </div>
          <div className={styles.mainSectionTopImg}>
            <Image
              src={MainImg}
              width={1078}
              height={682}
              alt="메인 페이지 이미지"
            />
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
};

export default Home;
