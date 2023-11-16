import { Link } from "react-router-dom";
import {
  PiPencilSimpleLineBold,
  PiShoppingCartSimpleFill,
} from "react-icons/pi";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <PiShoppingCartSimpleFill size={36} />
        <h1>SHOPPY</h1>
      </Link>
      <ul className="gnb">
        <li>
          <Link to="/products">Products</Link>
        </li>
        {user && user.isAdmin && (
          <li>
            <Link to="/products/new">
              <PiPencilSimpleLineBold />
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/carts">Carts</Link>
          </li>
        )}
      </ul>
      {user && <User user={user} />}
      {user === null ? (
        <Button className="btn btn--primary" onClick={login}>
          Login
        </Button>
      ) : (
        <Button className="btn btn--primary" onClick={logout}>
          Logout
        </Button>
      )}
    </header>
  );
}
