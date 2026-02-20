import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useAuthContext();

  if (!context) {
    // Return a safe default when no AuthProvider is present (tests may render components
    // without wrapping them). This preserves runtime behavior while avoiding throws
    // during unit tests.
    return {
      user: null,
      login: () => {},
      logout: () => {},
      isAuthenticated: false,
    };
  }

  return context;
}
