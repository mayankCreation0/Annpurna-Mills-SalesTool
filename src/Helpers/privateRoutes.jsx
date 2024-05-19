import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


const PrivateRoutes = ({children}) => {
  if (Cookies.get('token')) return children
  return <Navigate to="/login" />
}

export default PrivateRoutes
