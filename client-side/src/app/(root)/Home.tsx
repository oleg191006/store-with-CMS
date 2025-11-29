import { IProduct } from "@/shared/types/product.interface";
import { Hero } from "./hero/Hero";
import { Catalog } from "@/components/ui/catalog/Catalog";
import { PUBLIC_URL } from "@/config/url.config";

interface HomeProps {
  products: IProduct[];
}

export function Home({ products }: HomeProps) {
  return (
    <>
      <Hero />
      <Catalog
        title="Hits sale"
        description="Most popular products in our store"
        linkTitle="See more"
        link={PUBLIC_URL.explorer()}
        products={products}
      />
    </>
  );
}
