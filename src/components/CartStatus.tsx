import { AiOutlineShoppingCart } from "react-icons/ai";
import useCarts from "../hooks/useCarts";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCarts();
  return (
    <div className="cart-status">
      <AiOutlineShoppingCart />
      <span className="cart-status__badge">{products?.length}</span>
    </div>
  );
}
