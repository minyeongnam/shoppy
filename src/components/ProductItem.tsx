import { Link } from "react-router-dom";
import { ResponseProduct } from "../type/product";
import { formatComma } from "../util/util";

interface ProductItemProps {
  product: ResponseProduct;
}

export default function ProductItem({
  product,
  product: { url, name, price, category, productId },
}: ProductItemProps) {
  return (
    <li className="products__item">
      <Link to={`/products/${productId}`} state={product}>
        <div className="item__image">
          <img src={url} alt={`${name} 썸네일 이미지`} />
        </div>
        <div className="item__info">
          <span className="info__title">{name}</span>
          <span className="info__cate">{category}</span>
          <span className="info__price">{formatComma(Number(price))}원</span>
        </div>
      </Link>
    </li>
  );
}
