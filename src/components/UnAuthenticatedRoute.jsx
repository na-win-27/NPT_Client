import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UnAuthenticatedRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  let isAuthenticated = false;
  if (user != null) {
    isAuthenticated = user.role === "admin" ? true : false;
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return children;
}
