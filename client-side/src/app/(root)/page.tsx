import { productService } from "@/services/product.service";
import { Home } from "./Home";

export const metadata = {
  title: "Your shopping, your pleasure",
};

export const revalidate = 60;

async function getProducts() {
  const data = (await productService.getMostPopular()).slice(0, 6);
  return data;
}

export default async function HomePage() {
  const data = await getProducts();
  return <Home products={data} />;
}
