import React, { useEffect, useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";

import DayColumn from "./DayColumn";
import { BoxSesionTwo } from "./BoxSesionTwo";
import { HeaderDashboard } from "./HeaderDashboard";
import { RootState } from "../../store/store";
import {
  loadTasksFromLocalStorage,
  setTasks,
} from "../../store/trello/trelloSlice";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles", // Con acento
  "Jueves",
  "Viernes",
  "Sábado", // Con acento
  "Domingo",
];

const Dashboard: React.FC = () => {
  // Obtener tasksByDay desde el estado global de Redux
  const tasksByDay = useSelector((state: RootState) => state.trello.tasksByDay);
  const { isAuthenticated, id: userId } = useSelector(
    (state: RootState) => state.auth
  ); // Aquí obtienes tanto `isAuthenticated` como `userId`

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const tasks = loadTasksFromLocalStorage(userId); // Asumiendo que puedes cargar tareas con un `userId`
      dispatch(setTasks(tasks)); // Actualiza el estado en Redux con las tareas del usuario
    }
  }, [isAuthenticated, userId, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names
      .map((name) => name[0].toUpperCase()) // Convertimos a mayúsculas la primera letra
      .join(" ");
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <HeaderDashboard getInitials={getInitials} handleOpen={handleOpen} />

        <BoxSesionTwo open={open} handleClose={handleClose} />

        <DndProvider backend={HTML5Backend}>
          <Grid container sx={{ height: "80%" }}>
            <Box
              sx={{
                height: "90vh",
                display: "flex",
                // flexWrap: "wrap",

                justifyContent: "space-between",
                padding: 4,
                background: "rgb(143, 63, 101)",
                overflow: "scroll",
              }}
            >
              {daysOfWeek.map((day) => (
                <DayColumn key={day} day={day} tasks={tasksByDay[day]} />
              ))}
            </Box>
          </Grid>
        </DndProvider>
      </Box>
    </Grid>
  );
};

export default Dashboard;
