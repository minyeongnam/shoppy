import { Link } from "react-router-dom";
import {
  PiPencilSimpleLineBold,
  PiShoppingCartSimpleFill,
} from "react-icons/pi";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = () => {
    login()
      .then((user) => setUser(user))
      .catch(() => setUser(null)); //TODO: 토스트 연결해보기
  };

  const handleLogout = () => {
    logout().then(() => setUser(null));
  };

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
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
      {user?.displayName && <p>{user.displayName}</p>}
      {user === null ? (
        <button type="button" className="btn-login" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <button type="button" className="btn-login" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
