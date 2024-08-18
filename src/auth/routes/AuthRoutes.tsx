import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const AuthRoutes = () => {
  const { status } = useSelector((state: RootState) => state.auth);

  if (status === "authenticated") {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      {/* Ruta de Logueo */}
      <Route path="login" element={<LoginPage />} />
      {/* Ruta de Registro */}
      <Route path="register" element={<RegisterPage />} />

      {/* Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
