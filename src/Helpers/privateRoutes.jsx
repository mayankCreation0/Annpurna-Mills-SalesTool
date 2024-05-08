import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const auth = useSelector(state => state.auth);
  if(auth) return children
  return <Navigate to="/login" />
}

export default PrivateRoutes
