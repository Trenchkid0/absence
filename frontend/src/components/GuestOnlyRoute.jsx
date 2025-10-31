import { jwtDecode } from "jwt-decode";

import { Navigate, Outlet } from "react-router-dom";

function isTokenValid(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const role_id = decodedToken.role_id;
    return { exp_date: decodedToken.exp > currentTime, role_id: role_id };
  } catch (error) {
    console.log(error);
  }
}

export default function GuestOnlyRoute({ children }) {
  const token = localStorage.getItem("token");
  const validate = isTokenValid(token);

  if (token && validate.exp_date) {
    if (validate.role_id === 1) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/head" replace />;
  }

  return children || <Outlet />;
}
