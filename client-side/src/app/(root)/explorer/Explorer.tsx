"use client";

import { Catalog } from "@/components/ui/catalog/Catalog";
import { productService } from "@/services/product.service";
import { IProduct } from "@/shared/types/product.interface";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ExplorerProps {
  products: IProduct[];
}

export function Explorer({ products }: ExplorerProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  const { data } = useQuery({
    queryKey: ["explorer products", searchTerm],
    queryFn: () => productService.getAll(searchTerm),
    initialData: products,
  });
  return (
    <div className="my-6">
      <Catalog
        title={
          searchTerm ? `Search results for "${searchTerm}"` : "Product catalog"
        }
        products={data}
      />
    </div>
  );
}
