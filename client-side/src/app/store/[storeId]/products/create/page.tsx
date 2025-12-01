import { Metadata } from "next";
import { CreateProduct } from "./CreateProduct";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Product",
  ...NO_INDEX_PAGE,
};

export default function CreateProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateProduct />;
    </Suspense>
  );
}
