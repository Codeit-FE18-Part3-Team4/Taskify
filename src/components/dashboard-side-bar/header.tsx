import logoImg from "@/assets/images/taskify-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./dashboard-side-bar.module.css";

export default function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button className={`${styles.logo} ${styles.button}`} onClick={handleClick}>
      <Image src={logoImg} width={156} height={40} alt="로고 이미지" />
    </button>
  );
}
