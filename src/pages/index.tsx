import MainImg from "@/assets/images/main-01.png";
import FirstCardImg from "@/assets/images/main-02.png";
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
          <button
            onClick={handleClickLoginPage}
            className={Typography.lgMedium}
          >
            로그인
          </button>
          <button
            onClick={handleClickSignupPage}
            className={Typography.lgMedium}
          >
            회원가입
          </button>
        </div>
      </header>
      <main>
        <section className={styles.mainSectionTopWrap}>
          <div className={styles.mainSectionTopMain}>
            <h1 className={Typography.lg2Bold}>더 새로워진 일정 관리</h1>
            <span className={Typography.lg2Bold}>TASKIFY</span>
            <div className={styles.buttonBox}>
              <Button
                onClick={handleClickSignupPage}
                variant={ButtonVariant.Secondary}
              >
                회원가입하기
              </Button>
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
        <section className={styles.mainSection}>
          <div className={styles.mainSectionCard}>
            <div className={ styles.flexBox }>
              <Image src={FirstCardImg} width={736} height={613} alt="메인 페이지 카드 이미지" />
              <div className={styles.textBox}>
                <span className={Typography.lg2Bold}>
                  Point 1
                </span>
                <h3 className={Typography.lg2Bold}>
                  내가 등록한 사진으로<br />
                  기억에 남는 할 일 리스트
                </h3>
                <p className={Typography.lg2Medium}>
                  카드 내 추가한 이미지를 상단 썸네일로 노출하여<br />작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
                </p>
              </div>
            </div>
          </div>
          <div className={styles.mainSectionCard}>
            <div className={ styles.flexBox }>
              <Image src={FirstCardImg} width={736} height={613} alt="메인 페이지 카드 이미지" />
              <div className={styles.textBox}>
                <span className={Typography.lg2Bold}>
                  Point 1
                </span>
                <h3 className={Typography.lg2Bold}>
                  내가 등록한 사진으로<br />
                  기억에 남는 할 일 리스트
                </h3>
                <p className={Typography.lg2Medium}>
                  카드 내 추가한 이미지를 상단 썸네일로 노출하여<br />작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
                </p>
              </div>
            </div>
          </div>
          <div className={styles.mainSectionCard}></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
