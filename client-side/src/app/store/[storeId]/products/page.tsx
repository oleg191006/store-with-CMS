import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Products from "./Products";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
  ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />;
    </Suspense>
  );
}
