import { Navigate, Route, Routes } from "react-router-dom";
import { TrelloAppPage } from "../pages/TrelloAppPage";

export const TrelloAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrelloAppPage />} />
      {/* Maneja todas las rutas debajo de la raíz */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
