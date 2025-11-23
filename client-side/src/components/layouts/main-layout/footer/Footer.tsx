import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.footer}>
        vendens.com &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
