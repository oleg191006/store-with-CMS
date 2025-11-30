import { productService } from "@/services/product.service";
import { Metadata } from "next";
import { Explorer } from "./Explorer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Explorer",
};

export const revalidate = 60;

async function getProducts() {
  const data = await productService.getAll();
  return data;
}

export default async function ExplorerPage() {
  const data = await getProducts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Explorer products={data} />
    </Suspense>
  );
}
