import { Route, Routes } from "react-router-dom";

import RequestDetailDashboard from "../pages/RequestDetailPage";

export function RequestDetailDashboardRoute() {
  return (
    <Routes>
      <Route path="/:id" element={<RequestDetailDashboard />} />
    </Routes>
  );
}
