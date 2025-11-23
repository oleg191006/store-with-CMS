"use client";

import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CategoryForm } from "../CategoryForm";

export function CategoryEdit() {
  const params = useParams<{ categoryId: string }>();

  const { data } = useQuery({
    queryKey: ["get category"],
    queryFn: () => categoryService.getById(params.categoryId),
  });

  return <CategoryForm category={data} />;
}
