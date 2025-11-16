import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ILastUsers } from "@/shared/types/statistics.interface";
import styles from "./MiddleStatistics.module.scss";
import Image from "next/image";
import { formatPrice } from "@/utils/string/format-price";

interface LastUserProps {
  data: ILastUsers[];
}

export function LastUser({ data }: LastUserProps) {
  return (
    <Card>
      <CardHeader className={styles.header}>
        <CardTitle>Buyers</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          data.map((user) => (
            <div key={user.id} className={styles.user}>
              <Image
                src={user.picture.trimEnd() || "/images/default-avatar.jpg"}
                alt={user.name}
                width={40}
                height={40}
              />
              <div className={styles.info}>
                <p className={styles.name}>{user.name}</p>
                <p>{user.email}</p>
              </div>
              <div className={styles.total}>
                <p>+{formatPrice(user.total)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>In this store there are no users yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
