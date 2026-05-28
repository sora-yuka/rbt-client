import { createContext, useContext, useState, useEffect, use } from "react";
import { tokenService } from "../services/tokenServices";
import apiClient from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ childer }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = tokenService.getAccessToken();
    if (accessToken) {
      setUser({ loggedIn: true });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post("/api/v1/authorize", credentials);

      const { accessToken, refreshToken, user: userData } = response.data;

      tokenService.setTokens(accessToken, refreshToken);

      setUser(userData || { loggedIn: true });
      return { success: true };
    } catch (error) {
      console.error("Login failed: ", error);
      return {
        succes: false,
        error: error.response?.data?.message || "Invalid credentials",
      };
    }
  };

  const logout = () => {
    tokenService.clearTokens();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && childer}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
