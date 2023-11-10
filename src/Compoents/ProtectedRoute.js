import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  console.log("pro called")

  if (!role || !allowedRoles.includes(role)) {
    // If the role is not defined or not allowed, navigate to the login page.
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
