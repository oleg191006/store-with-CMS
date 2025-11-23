"use client";

import styles from "../Store.module.scss";
import DataTableLoading from "@/components/ui/tables/DataTableLoading";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/tables/DataTable";
import { useGetReviews } from "@/hooks/queries/reviews/useGetReviews";
import { formatDate } from "@/lib/format-date";
import { IReviewColumn, reviewColumns } from "./ReviewColumns";

export default function Reviews() {
  const { reviews, isLoading } = useGetReviews();

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map((review) => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating })
          .map(() => "⭐️")
          .join(" "),
        username: review.user.name,
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <div className={styles.header}>
          <Heading
            title={`Reviews (${formattedReviews.length})`}
            description="All reviews in your store"
          />
        </div>
      )}
      <div className={styles.table}>
        <DataTable
          columns={reviewColumns}
          data={formattedReviews}
          filterKey="title"
        />
      </div>
    </div>
  );
}
