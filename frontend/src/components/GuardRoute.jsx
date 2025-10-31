import { jwtDecode } from "jwt-decode";

import { Navigate, Outlet } from "react-router-dom";

function isTokenValid(token) {
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;
    return {
      exp_date: decodedToken.exp > currentTime,
      role_id: decodedToken.role,
    };
  } catch (error) {
    console.log(error);
  }
}

export default function GuardRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  const validate = isTokenValid(token);

  if (!token || !validate.exp_date) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(validate.role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
}
