import Logo from "@/assets/images/taskify-logo.svg";
import Typography from "@/components/typography/typography";
import styles from "@/styles/main.module.css";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className={styles.mainWrap}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={Logo} width={186} height={48} alt="로고 이미지" />
        </div>
        <div className={ styles.headerButtonBox}>
          <button className={Typography.lgMedium}>로그인</button>
          <button className={Typography.lgMedium}>회원가입</button>
        </div>
      </header>
      
    </div>
  );
};

export default Home;
