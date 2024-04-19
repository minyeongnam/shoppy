import { ResponseProduct } from "../type/product";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProcuts";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data },
  } = useProducts();

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
