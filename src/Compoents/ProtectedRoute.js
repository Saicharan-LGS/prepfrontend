import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  if (!role || !allowedRoles.includes(role) || !token) {
    // If the role is not defined, not allowed, or no token, navigate to the login page.
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
