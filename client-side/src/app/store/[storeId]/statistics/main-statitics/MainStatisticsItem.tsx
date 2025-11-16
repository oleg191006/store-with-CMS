import { IMainStatistics } from "@/shared/types/statistics.interface";
import { getIcon } from "./statistics.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./MainStatistics.module.scss";
import CountUp from "react-countup";
import { formatPrice } from "@/utils/string/format-price";
import { StatisticIcon } from "./StatisticIcon";
interface MainStatisticsItemProps {
  item: IMainStatistics;
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle>{item.name}</CardTitle>
        <StatisticIcon id={item.id} />
      </CardHeader>
      <CardContent className={styles.content}>
        <h2>
          {Number(item.id) === 1 ? (
            <CountUp end={item.value} formattingFn={formatPrice} />
          ) : (
            <CountUp end={item.value} />
          )}
        </h2>
      </CardContent>
    </Card>
  );
}
