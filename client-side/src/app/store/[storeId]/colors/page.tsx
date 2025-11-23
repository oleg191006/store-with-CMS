import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Products from "./Colors";

export const metadata: Metadata = {
  title: "Colors",
  ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
  return <Products />;
}
