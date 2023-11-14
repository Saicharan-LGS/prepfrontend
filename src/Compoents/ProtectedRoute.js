import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else if (!role || !allowedRoles.includes(role)) {
      // If the role is not defined or not allowed, navigate to the login page.
      navigate("/");
    }
  }, [allowedRoles, navigate]);

  // Check if the route is not found and redirect to "/notfound"
  useEffect(() => {
    const unblock = navigate("/notfound", { replace: true });
    return () => unblock();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
