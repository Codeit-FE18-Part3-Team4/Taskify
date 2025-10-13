import Profile from "@/components/profile/profile";
import styles from "./card.module.css";
import Badge from "@/components/chips/badge/badge";
import { Card as CardData } from "@/types/card";
import typographyStyles from "@/components/typography/typography.module.css";
import Image from "next/image";

interface CardProps {
  card: CardData;
  onClick?: () => void;
}

export default function Card({ card, onClick }: CardProps) {
  const date = new Date(card.dueDate);
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(date);

  return (
    <article
      className={`${styles.cardContainer} ${typographyStyles["lg2SemiBold"]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (onClick && e.key === "Enter") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {card.imageUrl && (
        <div className={styles.cardImage}>
          <Image
            src={card.imageUrl}
            alt={card.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
      <h3 className={styles.title}>{card.title}</h3>
      <div className={styles.badge}>
        {card.tags.length > 0 && card.tags.map((tag) => <Badge title={tag} key={tag} />)}
      </div>
      <time className={typographyStyles["mdMedium"]}>{formattedDate}</time>
      <div className={styles.assignee}>
        <Profile name={card.assignee.nickname} />
        <span className={typographyStyles["mdMedium"]}>{card.assignee.nickname}</span>
      </div>
    </article>
  );
}
