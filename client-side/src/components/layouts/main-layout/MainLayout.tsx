import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import styles from "./MainLayout.module.scss";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
