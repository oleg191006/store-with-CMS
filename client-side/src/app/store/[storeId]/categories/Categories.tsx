"use client";

import { useParams } from "next/navigation";
import { categoryColumns, ICategoryColumn } from "./CategoryColumns";
import styles from "../Store.module.scss";
import DataTableLoading from "@/components/ui/tables/DataTableLoading";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/tables/DataTable";
import { useGetCategories } from "@/hooks/queries/categories/useGetCategories";
import { formatDate } from "@/lib/format-date";

export default function Products() {
  const params = useParams<{ storeId: string }>();

  const { categories, isLoading } = useGetCategories();

  const formattedCategories: ICategoryColumn[] = categories
    ? categories.map((category) => ({
        id: category.id,
        createdAt: formatDate(category.createdAt),
        title: category.title,
        storeId: category.storeId,
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <div className={styles.header}>
          <Heading
            title={`Categories (${formattedCategories.length})`}
            description="Manage your store categories"
          />
          <div className={styles.buttons}>
            <Link href={STORE_URL.categoryCreate(params.storeId)}>
              <Button variant="primary">
                <Plus /> Add Category
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.table}>
        <DataTable
          columns={categoryColumns}
          data={formattedCategories}
          filterKey="title"
        />
      </div>
    </div>
  );
}
