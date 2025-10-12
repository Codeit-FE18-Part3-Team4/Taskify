import EmailIcon from "@/assets/images/email.svg";
import FacebookIcon from "@/assets/images/facebook.svg";
import InstaIcon from "@/assets/images/instagram.svg";
import MainTabletImg from "@/assets/images/main-01-tablet.png";
import MainImg from "@/assets/images/main-01.png";
import FirstCardImg from "@/assets/images/main-02.png";
import SecondCardMobileImg from "@/assets/images/main-03-mobile.png";
import SecondCardTabletImg from "@/assets/images/main-03-tablet.png";
import SecondCardImg from "@/assets/images/main-03.png";
import CardInFirstImg from "@/assets/images/main-04.png";
import CardInSeconImg from "@/assets/images/main-05.png";
import CardInThirdImg from "@/assets/images/main-06.png";
import Logo from "@/assets/images/taskify-logo.svg";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Typography from "@/components/typography";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import styles from "@/styles/main.module.css";
import { classnames } from "@/utils/classnames";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClickLoginPage = () => {
    router.push("/login");
  };

  const handleClickSignupPage = () => {
    router.push("/signup");
  };

  const { isMobile } = useSsrResponsive();

  const responsiveMainImg = useResponsiveValue({
    desktop: MainImg,
    tablet: MainTabletImg,
    mobile: MainTabletImg,
  })

  const responsiveButton = useResponsiveValue({
    desktop: ButtonSize.Large,
    tablet: ButtonSize.Large,
    mobile: ButtonSize.Medium,
  });

  const responsiveSecondImg = useResponsiveValue({
    desktop: SecondCardImg,
    tablet: SecondCardTabletImg,
    mobile: SecondCardMobileImg,
  });

  const mainSectionTab = useResponsiveValue({
    desktop: Typography.xl2Bold,
    tablet: Typography.xlBold,
    mobile: Typography.lgBold,
  });
  const mainSectionText = useResponsiveValue({
    desktop: Typography.lg2Medium,
    tablet: Typography.lgMedium,
    mobile: Typography.mdMedium,
  });
  const point3CardTitle = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.lgBold,
  });
  const point3CardText = useResponsiveValue({
    desktop: Typography.lgMedium,
    tablet: Typography.mdMedium,
    mobile: Typography.mdMedium,
  });

  return (
    <div className={styles.mainWrap}>
      <header className={styles.header}>
        <button role="link" className={styles.logo}>
          <Image src={Logo} width={186} height={48} alt="로고" />
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
                size={responsiveButton}
              >
                회원가입하기
              </Button>
              <Button onClick={handleClickLoginPage} size={responsiveButton}>
                로그인하기
              </Button>
            </div>
          </div>
          {!isMobile && (
            <div className={styles.mainSectionTopImg}>
              <Image
                src={responsiveMainImg}
                width={1078}
                height={682}
                alt="메인 페이지 이미지"
              />
            </div>
          )}
        </section>
        <section className={styles.mainSection}>
          <div className={styles.mainSectionCardBg}>
            <div className={styles.mainSectionCard}>
              <div className={styles.flexBox}>
                <Image
                  src={FirstCardImg}
                  width={736}
                  height={613}
                  alt="메인 페이지 카드 이미지"
                />
                <div className={styles.textBox}>
                  <span className={mainSectionTab}>Point 1</span>
                  <h3 className={Typography.lg2Bold}>
                    내가 등록한 사진으로
                    <br />
                    기억에 남는 할 일 리스트
                  </h3>
                  <p className={mainSectionText}>
                    카드 내 추가한 이미지를 상단 썸네일로 노출하여
                    <br />
                    작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainSectionCardBg}>
            <div className={styles.mainSectionCard}>
              <div className={styles.flexBox}>
                <Image
                  src={responsiveSecondImg}
                  width={736}
                  height={613}
                  alt="메인 페이지 카드 이미지"
                />
                <div className={styles.textBox}>
                  <span className={mainSectionTab}>Point 2</span>
                  <h3 className={Typography.lg2Bold}>
                    자세한 정보는 명확하게,
                    <br />팀 논의는 빠르게 확인하세요
                  </h3>
                  <p className={mainSectionText}>
                    작업에 필요한 세부 내용을 손쉽게 정리하고,
                    <br />
                    댓글을 통해 팀원들과 빠르게 소통해보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainSectionCardBg}>
            <div className={styles.mainSectionCard}>
              <div className={styles.textBox}>
                <span className={mainSectionTab}>Point 3</span>
                <h3 className={Typography.lg2Bold}>
                  나에게 맞게, 더 효율적으로
                  <br />
                  생산성을 높이는 다양한 설정
                </h3>
                <p className={mainSectionText}>
                  작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요
                  <br />
                  환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
                </p>
              </div>
              <div className={styles.flexBox}>
                <div className={styles.box}>
                  <div className={styles.imgBox}>
                    <Image
                      src={CardInFirstImg}
                      width={368}
                      height={192}
                      alt="사용 예시 이미지"
                    />
                  </div>
                  <p className={classnames(point3CardTitle, styles.title)}>
                    대시보드 설정
                  </p>
                  <p className={classnames(point3CardText, styles.text)}>
                    대시보드 사진과 이름을 변경할 수 있습니다.
                  </p>
                </div>
                <div className={styles.box}>
                  <div className={styles.imgBox}>
                    <Image
                      src={CardInSeconImg}
                      width={368}
                      height={192}
                      alt="사용 예시 이미지"
                    />
                  </div>
                  <p className={classnames(point3CardTitle, styles.title)}>
                    초대
                  </p>
                  <p className={classnames(point3CardText, styles.text)}>
                    새로운 팀원을 초대할 수 있습니다.
                  </p>
                </div>
                <div className={styles.box}>
                  <div className={styles.imgBox}>
                    <Image
                      src={CardInThirdImg}
                      width={368}
                      height={192}
                      alt="사용 예시 이미지"
                    />
                  </div>
                  <p className={classnames(point3CardTitle, styles.title)}>
                    구성원
                  </p>
                  <p className={classnames(point3CardText, styles.text)}>
                    구성원을 초대하고 내보낼 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <button>
            <Image src={Logo} width={186} height={48} alt="로고" />
          </button>
        </div>
        <div className={styles.faqBox}>
          <button className={point3CardText}>Privacy Policy</button>
          <button className={point3CardText}>FAQ</button>
        </div>
        <div className={styles.snsBox}>
          {[EmailIcon, FacebookIcon, InstaIcon].map((icon, index) => (
            <button key={index}>
              <Image src={icon} width={20} height={20} alt="SNS" />
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
