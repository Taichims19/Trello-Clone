import React from "react";
import { AppTheme } from "./themes/AppTheme";
import AppRouter from "./router/AppRouter";

export const TrelloApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
