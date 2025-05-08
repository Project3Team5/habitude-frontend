import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  // Return helper values
  return {
    user,
    userId: user?.id,
    isAuthenticated: !!user,
    logout: () => {
      localStorage.removeItem("user");
      setUser(null);
      router.dismissAll();
      router.replace("/");
    },
  };
};