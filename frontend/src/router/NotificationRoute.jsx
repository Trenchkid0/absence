import { Route, Routes } from "react-router-dom";
import GuardRoute from "../components/GuardRoute";
import NotificationPage from "../pages/NotificationPage";

export function NotificationRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardRoute allowedRoles={[2, 3]}>
            <NotificationPage />
          </GuardRoute>
        }
      />

      <Route
        path=":id"
        element={
          <GuardRoute allowedRoles={[1]}>
            <NotificationPage />
          </GuardRoute>
        }
      />
    </Routes>
  );
}
