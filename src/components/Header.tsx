import { Link } from "react-router-dom";
import {
  PiPencilSimpleLineBold,
  PiShoppingCartSimpleFill,
} from "react-icons/pi";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <PiShoppingCartSimpleFill size={36} />
        <h1>Shoppy</h1>
      </Link>
      <ul className="gnb">
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/products/new">
            <PiPencilSimpleLineBold />
          </Link>
        </li>
        <li>
          <Link to="/carts">Carts</Link>
        </li>
      </ul>
      <button type="button" className="btn-login">
        Login
      </button>
    </header>
  );
}
