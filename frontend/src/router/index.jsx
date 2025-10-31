import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import HeadDashboard from "../pages/HeadDashboard";
import RequestDetailPage from "../pages/RequestDetailPage";
import LoginPage from "../pages/LoginPage";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import GuardRoute from "../components/GuardRoute";
import NotificationPage from "../pages/NotificationPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { NotificationRoute } from "./NotificationRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* Guest Only */}
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/"
        element={
          <GuardRoute>
            <>
              <Navbar />
              <Outlet />
            </>
          </GuardRoute>
        }
      >
        <Route
          path="dashboard/*"
          element={
            <GuardRoute allowedRoles={[1]}>
              <EmployeeDashboard />
            </GuardRoute>
          }
        />

        <Route
          path="head/*"
          element={
            <GuardRoute allowedRoles={[2, 3]}>
              <HeadDashboard />
            </GuardRoute>
          }
        />

        <Route path="notification/*" element={<NotificationRoute />} />

        <Route
          path="request/*"
          element={
            <GuardRoute allowedRoles={[1, 2, 3]}>
              <RequestDetailPage />
            </GuardRoute>
          }
        />

        {/* Default redirect */}
        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
}
