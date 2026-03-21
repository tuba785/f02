import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  rememberMe: boolean;
}

const loadAuthState = (): {
  isLoggedIn: boolean;
  rememberMe: boolean;
  user: User | null;
} => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const userJson = localStorage.getItem("user");

  return {
    isLoggedIn: rememberMe && !!userJson,
    rememberMe,
    user: userJson ? JSON.parse(userJson) : null,
  };
};

const { isLoggedIn, rememberMe, user } = loadAuthState();

const initialState: AuthState = {
  isLoggedIn,
  user,
  rememberMe,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; rememberMe: boolean }>,
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.rememberMe = action.payload.rememberMe;

      if (action.payload.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.rememberMe = false;
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
