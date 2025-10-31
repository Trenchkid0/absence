import { Route, Routes } from "react-router-dom";

import EmployeeDashboard from "../pages/EmployeeDashboard";

export function EmployeeDashboardRoute() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeDashboard />} />
    </Routes>
  );
}
