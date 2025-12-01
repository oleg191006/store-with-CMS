import { Metadata } from "next";
import { Auth } from "./Auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Auth />;
    </Suspense>
  );
}
