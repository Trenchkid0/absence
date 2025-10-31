import { Route, Routes } from "react-router-dom";

import HeadDashboard from "../pages/HeadDashboard";

export function HeadDashboardRoute() {
  return (
    <Routes>
      <Route path="/" element={<HeadDashboard />} />
    </Routes>
  );
}
