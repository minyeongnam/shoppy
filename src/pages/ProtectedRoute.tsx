import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin,
}: ProtectedRouteProps) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to={"/"} />;
  }
  return children;
}
