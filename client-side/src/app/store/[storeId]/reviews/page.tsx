import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Reviews from "./Reviews";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
  ...NO_INDEX_PAGE,
};

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reviews />;
    </Suspense>
  );
}
