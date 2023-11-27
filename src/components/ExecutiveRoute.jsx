import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function ExecutiveRoute({
  children,}) {
const user=useSelector((state) =>state.user.user)



if(!user){
  return <Navigate to="/login"  />;
}


  return children;
}

