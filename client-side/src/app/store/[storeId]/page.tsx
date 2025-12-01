import { Suspense } from "react";
import { Store } from "./Store";

export default function StorePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading store...</div>}>
        <Store />
      </Suspense>
    </div>
  );
}
