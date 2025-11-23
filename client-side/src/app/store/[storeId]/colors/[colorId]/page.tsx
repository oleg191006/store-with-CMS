import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { ColorEdit } from "./ColorEdit";

export const metadata: Metadata = {
  title: "Color Details",
  ...NO_INDEX_PAGE,
};

export default function ProductEditPage() {
  return <ColorEdit />;
}
