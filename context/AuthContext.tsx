"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AuthUser,
  getCurrentUser,
  loginUser,
  registerUser,
  updateCurrentUser,
} from "@/services/api";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; password?: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem("auth_token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        localStorage.removeItem("auth_token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);
    localStorage.setItem("auth_token", data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    const data = await registerUser(name, email, password);
    localStorage.setItem("auth_token", data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
  }

  async function updateProfile(data: { name?: string; email?: string; password?: string }) {
    const updatedUser = await updateCurrentUser(data);
    setUser(updatedUser);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, token, loading, login, register, updateProfile, logout }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider nao encontrado");
  return context;
}
