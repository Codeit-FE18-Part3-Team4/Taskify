import { LogoImg } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard-side-bar.module.css";

export default function Header() {
  return (
    <Link href={"/"} className={`${styles.logo} ${styles.button}`}>
      <Image src={LogoImg} width={156} height={40} alt="로고 이미지" />
    </Link>
  );
}
