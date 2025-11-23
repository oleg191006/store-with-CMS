import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Categories from "./Categories";

export const metadata: Metadata = {
  title: "Categories",
  ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
  return <Categories />;
}
