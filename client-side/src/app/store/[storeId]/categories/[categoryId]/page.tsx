import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { CategoryEdit } from "./CategoryEdit";

export const metadata: Metadata = {
  title: "Product Details",
  ...NO_INDEX_PAGE,
};

export default function ProductEditPage() {
  return <CategoryEdit />;
}
