"use client";
import { useGetProducts } from "@/hooks/queries/products/useGetProducts";
import { useParams } from "next/navigation";
import { IProductColumn, productColumns } from "./ProductColumns";
import { formatPrice } from "@/utils/string/format-price";
import styles from "../Store.module.scss";
import DataTableLoading from "@/components/ui/tables/DataTableLoading";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/tables/DataTable";

export default function Products() {
  const params = useParams<{ storeId: string }>();

  const { products, isLoading } = useGetProducts();

  const formattedProducts: IProductColumn[] = products
    ? products.map((product) => ({
        id: product.id,
        title: product.title,
        price: formatPrice(product.price),
        category: product.category.title,
        color: product.color.value,
        storeId: params.storeId,
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <div className={styles.header}>
          <Heading
            title={`Products (${formattedProducts.length})`}
            description="Manage your store products"
          />
          <div className={styles.buttons}>
            <Link href={STORE_URL.productCreate(params.storeId)}>
              <Button variant="primary">
                <Plus /> Add Product
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.table}>
        <DataTable
          columns={productColumns}
          data={formattedProducts}
          filterKey="title"
        />
      </div>
    </div>
  );
}
