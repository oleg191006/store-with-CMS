import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import styles from "./StoreLayout.module.scss";

export function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.header}>
          <Header />
        </div>
        <main> {children}</main>
      </div>
    </div>
  );
}
