// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {
    // not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = user.role || user.userType || "patient";

  // if doctor and pending, force to pending page
  if (role === "doctor" && user.status === "pending") {
    if (location.pathname !== "/doctor/pending") {
      return <Navigate to="/doctor/pending" replace />;
    }
    return children;
  }

  // enforce role list (if provided)
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
