import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function AuthenticatedRoute({
  children,}) {
const user=useSelector((state) =>state.user.user)
const isAuthenticated =user.role?(user.role==="admin"?true:false):false;
if(!user){
  return <Navigate to="/login"  />;
}

  if (!isAuthenticated) {
    return <Navigate to="/SamplesExecutive"  />;
  }

  return children;
}

