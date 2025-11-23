"use client";

import { useParams } from "next/navigation";
import styles from "../Store.module.scss";
import DataTableLoading from "@/components/ui/tables/DataTableLoading";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/tables/DataTable";
import { useGetColors } from "@/hooks/queries/colors/useGetColors";
import { IColor } from "@/shared/types/color.interface";
import { formatDate } from "@/lib/format-date";
import { ColorColumns } from "./ColorColumns";

export default function Colors() {
  const params = useParams<{ storeId: string }>();

  const { colors, isLoading } = useGetColors();

  const formattedColors: IColor[] = colors
    ? colors.map((color) => ({
        id: color.id,
        createdAt: formatDate(color.createdAt),
        name: color.name,
        value: color.value,
        storeId: color.storeId,
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <div className={styles.header}>
          <Heading
            title={`Colors (${formattedColors.length})`}
            description="Manage your store colors"
          />
          <div className={styles.buttons}>
            <Link href={STORE_URL.colorCreate(params.storeId)}>
              <Button variant="primary">
                <Plus /> Add Color
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.table}>
        <DataTable
          columns={ColorColumns}
          data={formattedColors}
          filterKey="name"
        />
      </div>
    </div>
  );
}
