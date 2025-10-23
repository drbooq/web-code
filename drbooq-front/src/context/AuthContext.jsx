// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, setCurrentUser, clearCurrentUser } from "../utils/auth";

const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(false);

  // sync with other tabs: runs once
  useEffect(() => {
    function onStorage(e) {
      const keysOfInterest = ["drbooq_current_user", "drbooq_user", "docelle_user", "drbooq_token"];
      // If the key is any of these (or null when clear called), resync
      if (!e.key || keysOfInterest.includes(e.key)) {
        setUserState(getCurrentUser());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function login(userObj) {
    setLoading(true);
    try {
      setCurrentUser(userObj);
      setUserState(getCurrentUser());
      return getCurrentUser();
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearCurrentUser();
    setUserState(null);
  }

  function updateUser(nextUser) {
    setCurrentUser(nextUser);
    setUserState(getCurrentUser());
  }

  const value = useMemo(() => ({ user, loading, login, logout, updateUser }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
