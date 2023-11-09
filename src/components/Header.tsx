import { Link } from "react-router-dom";
import {
  PiPencilSimpleLineBold,
  PiShoppingCartSimpleFill,
} from "react-icons/pi";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useEffect, useState } from "react";
import { type User as UserType } from "firebase/auth";
import User from "./User";

export default function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
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
        {user && (
          <>
            {admin && (
              <li>
                <Link to="/products/new">
                  <PiPencilSimpleLineBold />
                </Link>
              </li>
            )}
            <li>
              <Link to="/carts">Carts</Link>
            </li>
          </>
        )}
      </ul>
      {user && <User user={user} />}
      {user === null ? (
        <button type="button" className="btn-login" onClick={login}>
          Login
        </button>
      ) : (
        <button type="button" className="btn-login" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
}
