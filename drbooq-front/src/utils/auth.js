// src/utils/auth.js
export function getCurrentUser() {
  const keys = ["drbooq_current_user", "drbooq_user", "currentUser", "user"];
  for (const k of keys) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return { id: raw, name: raw };
    }
  }
  return null;
}

export function setCurrentUser(user) {
  if (!user) return;
  // primary canonical key
  try {
    localStorage.setItem("drbooq_current_user", JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function clearCurrentUser() {
  localStorage.removeItem("drbooq_current_user");
  localStorage.removeItem("drbooq_user");
  localStorage.removeItem("drbooq_token");
}
