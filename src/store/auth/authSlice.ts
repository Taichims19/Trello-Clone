import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { findUserByEmail, saveUser } from "../../hooks/userService";
import { User } from "../../helpers/interfacesTrello";
import { AUTH_STORAGE_KEY } from "../../helpers/variableTrello";

interface AuthState {
  isAuthenticated: boolean;
  id: string | null; // Agregar el id del usuario autenticado
  email: string | null;
  displayName: string | null;
  errorMessage: string | null;
  status: "authenticated" | "not_authenticated" | "checking";
}

const initialState: AuthState = {
  isAuthenticated: false,
  id: null, // Iniciar como null
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
        state.id = user.id; // Guardar el id del usuario
        state.email = user.email;
        state.displayName = user.displayName;
        state.errorMessage = null;
        state.status = "authenticated";
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state)); // Guardar en `localStorage` con la clave específica
      } else {
        state.errorMessage = "User not found.";
      }
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.id = null; // Reiniciar id
      state.email = null;
      state.displayName = null;
      state.errorMessage = null;
      state.status = "not_authenticated";
      localStorage.removeItem(AUTH_STORAGE_KEY); // Eliminar de `localStorage`
      authSlice.caseReducers.clearUserData(state); // Llamar a `clearUserData`
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

      // Crear un nuevo usuario con un id único
      const newUser: User = {
        id: uuidv4(),
        email,
        displayName,
        password,
      };

      state.isAuthenticated = true;
      state.id = newUser.id; // Guardar el id del usuario registrado
      state.email = email;
      state.displayName = displayName;
      state.errorMessage = null;
      state.status = "authenticated";

      // Guardar en TrelloClone_users usando UserService
      saveUser(newUser);

      // Guardar en localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state)); // Guardar en `localStorage`
    },
    loadSession: (state) => {
      const storedState = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedState) {
        const sessionData = JSON.parse(storedState) as AuthState;
        if (sessionData.isAuthenticated) {
          return {
            ...state,
            isAuthenticated: true,
            id: sessionData.id,
            email: sessionData.email,
            displayName: sessionData.displayName,
            status: "authenticated",
          };
        }
      }
      // Si no hay estado válido en localStorage, retorna el estado de no autenticado
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        email: null,
        displayName: null,
        status: "not_authenticated",
      };
    },

    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearUserData: (state) => {
      // Aquí podrías limpiar otros slices relacionados
      // Reiniciamos el estado de la autenticación
      state.isAuthenticated = false;
      state.id = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = null;
      state.status = "not_authenticated";
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  loadSession,
  setError,
  clearUserData,
} = authSlice.actions;
export default authSlice.reducer;
