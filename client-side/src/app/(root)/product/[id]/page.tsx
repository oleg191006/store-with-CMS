import { productService } from "@/services/product.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "./Product";
import { Suspense } from "react";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await productService.getAll();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProducts(id: string) {
  const product = await productService.getById(id).catch(() => null);

  if (!product) return null;

  const similarProducts = await productService.getSimilar(id);

  return { product, similarProducts };
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;

  const data = await getProducts(id);

  if (!data) {
    return {
      title: "Product not found",
    };
  }

  const { product } = data;

  const firstImage = product.images?.[0];
  const images = firstImage
    ? [
        {
          url: firstImage.startsWith("http")
            ? firstImage
            : `${process.env.NEXT_PUBLIC_SITE_URL}${firstImage}`,
          width: 1000,
          height: 1000,
          alt: product.title,
        },
      ]
    : [];

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images,
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const data = await getProducts(id);

  if (!data) {
    notFound();
  }

  const { product, similarProducts } = data;

  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <Product
        initialProduct={product}
        similarProducts={similarProducts}
        id={id}
      />
    </Suspense>
  );
}
