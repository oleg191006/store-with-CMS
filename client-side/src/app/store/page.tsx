import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Page",
  ...NO_INDEX_PAGE,
};

export default function StorePage() {
  return <h1>Store Page</h1>;
}
