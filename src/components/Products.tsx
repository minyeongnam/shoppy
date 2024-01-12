import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import { ResponseProduct } from "../type/product";
import ProductItem from "./ProductItem";

export default function Products() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return (
    <div className="products">
      {isLoading && <p>isLoading</p>}
      {error && <p>error</p>}
      <ul className="products__list">
        {data &&
          data.map((product: ResponseProduct) => (
            <ProductItem key={product.productId} product={product} />
          ))}
      </ul>
    </div>
  );
}
