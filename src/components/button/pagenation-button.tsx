import styles from "./pagenation-button.module.css";

type PagenationButton = {
  prevClick?: React.MouseEventHandler<HTMLButtonElement>;
  nextClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function PagenationButton({
  prevClick,
  nextClick,
}: PagenationButton) {
  return (
    <div className={styles.pagenation_button}>
      <button onClick={prevClick}>{"<"}</button>
      <button onClick={nextClick}>{">"}</button>
    </div>
  );
}
