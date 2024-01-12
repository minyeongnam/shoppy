import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { CartItemType } from "../type/product";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button";

const SHIPPING = 3000;

export default function MyCart() {
  const { uid } = useAuthContext();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["cartlist"],
    queryFn: () => getCart(uid),
  });
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    (products &&
      products.reduce((prev: number, current: CartItemType) => {
        return prev + parseInt(current.price) * current.quantity;
      }, 0)) ??
    0;
  return (
    <>
      <h2 className="page-title">Carts</h2>
      <div className="page-contents">
        {!hasProducts && <div>장바구니에 상품이 없습니다.</div>}
        <ul className="cart__list">
          {products &&
            products.map((product) => (
              <CartItem product={product} key={product.productId} />
            ))}
        </ul>
        <div className="cart__price">
          <PriceCard text="상품 총액" price={totalPrice} />
          <BsFillPlusCircleFill />
          <PriceCard text="배송비" price={SHIPPING} />
          <FaEquals />
          <PriceCard text="총 금액" price={totalPrice + SHIPPING} />
        </div>
        <div className="btnset">
          <Button type="button" className="btn btn--primary cart__sumbit">
            주문하기
          </Button>
        </div>
      </div>
    </>
  );
}
