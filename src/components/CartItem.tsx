import {
  AiOutlineDelete,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { CartItemType } from "../type/product";
import { formatComma } from "../util/util";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

interface CartItemProps {
  product: CartItemType;
}

export default function CartItem({
  product,
  product: { url, name, price, option, quantity, productId },
}: CartItemProps) {
  const { uid } = useAuthContext();
  const handlePlus = () => {
    if (!uid) {
      return alert("로그인이 필요합니다.");
    }
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };
  const handleMinus = () => {
    if (!uid) {
      return alert("로그인이 필요합니다.");
    }
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handleDelete = () => {
    if (!uid) {
      return alert("로그인이 필요합니다.");
    }
    removeFromCart(uid, productId);
  };
  return (
    <li className="cart__item">
      <div className="item__image">
        <img src={url} alt={`${name} 썸네일 이미지`} />
      </div>
      <div className="item__info">
        <span className="info__title">{name}</span>
        <span className="info__option">{option}</span>
        <div className="info__quantity">
          <button type="button" onClick={handleMinus}>
            <AiOutlineMinusSquare />
          </button>
          {quantity}
          <button type="button" onClick={handlePlus}>
            <AiOutlinePlusSquare />
          </button>
          <button type="button" onClick={handleDelete}>
            <AiOutlineDelete />
          </button>
        </div>
        <span className="info__price">{formatComma(Number(price))}원</span>
      </div>
    </li>
  );
}
