import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { useSelector } from "react-redux";

import { TrelloAppRoutes } from "../trello/routes/TrelloAppRoutes";
import { RootState } from "../store/store";

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/*" element={<TrelloAppRoutes />} />
          <Route path="/auth/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter; // Asegúrate de exportar AppRouter como default
