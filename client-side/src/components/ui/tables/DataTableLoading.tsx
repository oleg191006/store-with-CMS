import { Card, CardContent } from "../card";
import { Loader } from "../loader";
import { Skeleton } from "../skeleton";
import styles from "./DataTable.module.scss";

export default function DataTableLoading() {
  return (
    <div>
      <Skeleton className={styles.heading} />
      <Skeleton className={styles.search} />
      <Card className={styles.table}>
        <CardContent>
          <div className={styles.loader_wrapper}>
            <Loader />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
