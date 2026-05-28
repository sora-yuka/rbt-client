import { useState } from "react";
import { AuthContext } from "./authContext";
import { tokenService } from "../services/tokenServices";
import apiClient from "../services/apiClient";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    tokenService.getAccessToken() ? { loggedIn: true } : null,
  );

  const login = async (credentials) => {
    try {
      const response = await apiClient.post(
        "/api/v1/users/authenticate/",
        credentials,
      );

      const { access, refresh, user: userData } = response.data;

      tokenService.setTokens(access, refresh);

      setUser(userData || { loggedIn: true, phoneNumber: credentials.phone_number });
      return { success: true };
    } catch (error) {
      console.error("Login failed: ", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Invalid credentials",
      };
    }
  };

  const logout = () => {
    tokenService.clearTokens();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
