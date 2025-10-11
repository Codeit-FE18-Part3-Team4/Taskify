import Profile from "@/components/profile/profile";
import styles from "./card.module.css";
import Badge from "@/components/chips/badge/badge";
import { CardData } from "@/type/card-data";
import typographyStyles from "@/components/typography/typography.module.css";
import Image from "next/image";

interface CardProps {
  cardData: CardData;
}

export default function Card({ cardData }: CardProps) {
  const date = new Date(cardData.dueDate);
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(date);

  return (
    <section
      className={`${styles.cardContainer} ${typographyStyles["lg2SemiBold"]}`}
    >
      {cardData.imageUrl && (
        <div className={styles.cardImage}>
          <Image
            src={cardData.imageUrl}
            alt={cardData.title}
            style={{
              objectFit: "contain",
              maxHeight: "178.45px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
      <h3 className={styles.title}>{cardData.title}</h3>
      <div className={styles.badge}>
        {cardData.tags.length > 0 &&
          cardData.tags.map((tag, tagIndex) => (
            <Badge title={tag} key={tag} colorIndex={tagIndex} />
          ))}
      </div>
      <time className={`${typographyStyles["mdMedium"]}`}>{formattedDate}</time>
      <div className={styles.assignee}>
        <Profile name={cardData.assignee.nickname} />
        <span className={`${typographyStyles["mdMedium"]}`}>
          {cardData.assignee.nickname}
        </span>
      </div>
    </section>
  );
}
