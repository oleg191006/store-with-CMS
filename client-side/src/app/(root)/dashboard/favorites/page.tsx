import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { Favorites } from "./Favorites";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Favorites",
  ...NO_INDEX_PAGE,
};

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Favorites />;
    </Suspense>
  );
}
