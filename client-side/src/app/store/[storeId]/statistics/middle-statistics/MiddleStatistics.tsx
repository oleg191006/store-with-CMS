import { useGetStatistics } from "@/hooks/queries/statistics/useGetStatistics";
import styles from "./MiddleStatistics.module.scss";
import { Overview } from "./Overview";
import { LastUser } from "./LastUser";

export function MiddleStatistics() {
  const { middle } = useGetStatistics();
  return (
    <div className={styles.middle}>
      {middle?.monthlySales.length || middle?.lastUsers.length ? (
        <>
          <div className={styles.overview}>
            <Overview data={middle.monthlySales} />
          </div>
          <div className={styles.last_users}>
            <LastUser data={middle.lastUsers} />
          </div>
        </>
      ) : (
        <p>No middle statistics available.</p>
      )}
    </div>
  );
}
