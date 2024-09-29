import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  return { isAuthenticated };
};
