import { useLocation } from "react-router-dom";
import { formatComma } from "../util/util";
import { ChangeEvent, useState } from "react";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const {
    state: { url, name, price, category, description, options },
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);
  const handleCart = () => {};
  return (
    <section className="products__detail">
      <div className="item__image">
        <img src={url} alt={`${name} 썸네일 이미지`} />
      </div>
      <div className="item__info">
        <div className="info__cate">{category}</div>
        <h2 className="info__title">{name}</h2>
        <p>{description}</p>
        <div className="selectbox">
          <label htmlFor="optionSelect">옵션</label>
          <select
            id="optionSelect"
            className="select"
            onChange={handleSelect}
            value={selected}
          >
            {options.map((option: string) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="info__price">{formatComma(Number(price))}원</span>
        <div className="btnset">
          <Button
            type="button"
            className="btn btn--primary btn--cart"
            onClick={handleCart}
          >
            장바구니 추가
          </Button>
        </div>
      </div>
    </section>
  );
}
