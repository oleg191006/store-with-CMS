import { Catalog } from "@/components/ui/catalog/Catalog";
import { categoryService } from "@/services/category.service";
import { productService } from "@/services/product.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getProducts(id: string) {
  const products = await productService.getByCategory(id);
  const category = await categoryService.getById(id);

  if (!category) return null;

  return { products, category };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getProducts(id);

  if (!data) return { title: "Category not found" };

  const { category, products } = data;

  const ogImage = products?.[0]?.images?.[0] ?? "/default-og.jpg";

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: ogImage,
          width: 1000,
          height: 1000,
          alt: category.title,
        },
      ],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProducts(id);

  if (!data) notFound();

  const { category, products } = data;

  return (
    <div>
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  );
}
