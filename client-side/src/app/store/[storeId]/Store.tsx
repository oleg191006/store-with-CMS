"use client";

import { Heading } from "@/components/ui/heading";
import styles from "./Store.module.scss";
import { MainStatistics } from "./statistics/main-statitics/MainStatistics";
import { MiddleStatistics } from "./statistics/middle-statistics/MiddleStatistics";

export function Store() {
  return (
    <div className={styles.wrapper}>
      <Heading title="Statistics" />
      <MainStatistics />
      <MiddleStatistics />
    </div>
  );
}
