import { Navigate, useLocation } from "react-router-dom";


import PropTypes from "prop-types";
import useAdmin from "../../Hook/useAdmin";
import useAuth from "../../Hook/useAuth";

const AdminRoute = ({children}) => {

  const [isAdmin, isAdminLoading] = useAdmin()
  const {user, loading} = useAuth();
 const location = useLocation()

  if(isAdminLoading || loading){
    return <progress className="progress w-56"></progress>
  }
  if (user && isAdmin) {
    return children;
}

return <Navigate to="/" state={{ from: location }} replace></Navigate>


};

AdminRoute.propTypes = {
    children: PropTypes.node
  };


export default AdminRoute;