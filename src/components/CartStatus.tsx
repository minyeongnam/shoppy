import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid ?? ""),
  });
  return (
    <div className="cart-status">
      <AiOutlineShoppingCart />
      <span className="cart-status__badge">{products?.length}</span>
    </div>
  );
}
