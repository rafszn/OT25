import { useGetProducts } from "../_services/product.service";
import ProductCard from "../components/ProductCard";
import type { Product } from "./ProductSection";

const Shop = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="product_list grid gap-4 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 grid-cols-2">
        {products && products?.length > 0 && (
          <>
            {products.map((product: Product, id: number) => {
              return <ProductCard key={id} product={product} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default Shop;
