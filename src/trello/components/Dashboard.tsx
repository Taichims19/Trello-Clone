import React, { useState } from "react";
import { useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { Grid, Box } from "@mui/material";

import DayColumn from "./DayColumn";
import { BoxSesionTwo } from "./BoxSesionTwo";
import { HeaderDashboard } from "./HeaderDashboard";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const Dashboard: React.FC = () => {
  const tasksByDay = useSelector((state: any) => state.trello.tasksByDay);
  const [open, setOpen] = useState(false);

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
      <Box sx={{ height: "100%" }}>
        <HeaderDashboard getInitials={getInitials} handleOpen={handleOpen} />

        <BoxSesionTwo open={open} handleClose={handleClose} />

        <DndProvider backend={HTML5Backend}>
          <Grid container sx={{ height: "80%" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: 4,
                background: "rgb(143, 63, 101)",
              }}
            >
              {daysOfWeek.map((day) => (
                <DayColumn key={uuidv4()} day={day} />
              ))}
            </Box>
          </Grid>
        </DndProvider>
      </Box>
    </Grid>
  );
};

export default Dashboard;
