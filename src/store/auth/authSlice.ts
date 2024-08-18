import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findUserByEmail, saveUser } from "../../hooks/userService";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  displayName: string | null;
  errorMessage: string | null;
  status: "authenticated" | "not_authenticated" | "checking";
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  displayName: null,
  errorMessage: null,
  status: "not_authenticated",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; displayName: string }>
    ) => {
      const user = findUserByEmail(action.payload.email);
      if (user) {
        state.isAuthenticated = true;
        state.email = user.email;
        state.displayName = user.displayName;
        state.errorMessage = null;
        state.status = "authenticated";
        localStorage.setItem("auth", JSON.stringify(state)); // Guardar en localStorage
      } else {
        state.errorMessage = "User not found.";
      }
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.displayName = null;
      state.errorMessage = null;
      state.status = "not_authenticated";
      localStorage.removeItem("auth"); // Eliminar de localStorage
    },
    registerSuccess: (
      state,
      action: PayloadAction<{
        email: string;
        displayName: string;
        password: string;
      }>
    ) => {
      const { email, displayName, password } = action.payload;
      state.isAuthenticated = true;
      state.email = email;
      state.displayName = displayName;
      state.errorMessage = null;
      state.status = "authenticated";

      // Guardar en TrelloClone_users usando UserService
      saveUser({ email, displayName, password });

      // Guardar en localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    loadSession: (state) => {
      const storedState = localStorage.getItem("auth");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        state.isAuthenticated = parsedState.isAuthenticated;
        state.email = parsedState.email;
        state.displayName = parsedState.displayName;
        state.errorMessage = parsedState.errorMessage;
        state.status = parsedState.status;
      } else {
        state.status = "not_authenticated";
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  loadSession,
  setError,
} = authSlice.actions;
export default authSlice.reducer;
