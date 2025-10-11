import Profile from "@/components/profile/profile";
import styles from "./card.module.css";

interface CardProps {
  title?: string;
  tags?: string[];
}

export default function Card() {
  return (
    <section className={styles.cardContainer}>
      <span className={styles.title}>test</span>
      <div className="badge">배지들어갈부분</div>
      <span className="date">2025년 12월 25일</span>
      <div className="writer">
        <Profile />
        <span className="userName">김아무개</span>
      </div>
    </section>
  );
}
