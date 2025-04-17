import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import PropTypes from "prop-types";

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a spinner if loading is true
  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  // Only return children if user exists
  if (user) {
    return children;
  }

  // Redirect to login if not authenticated
  return <Navigate to="/login" state={{ from: location }} replace />;
};

Private.propTypes = {
    children: PropTypes.node
  };


export default Private;
