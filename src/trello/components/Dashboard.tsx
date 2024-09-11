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
  loadDaysOrderFromLocalStorage,
  loadTasksFromLocalStorage,
  moveDay,
  moveTask,
  setDaysOrder,
  setTasks,
} from "../../store/trello/trelloSlice";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

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
  const daysOrder = useSelector((state: RootState) => state.trello.daysOrder);
  const { isAuthenticated, id: userId } = useSelector(
    (state: RootState) => state.auth
  ); // Aquí obtienes tanto `isAuthenticated` como `userId`

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const tasks = loadTasksFromLocalStorage(userId); // Asumiendo que puedes cargar tareas con un `userId`
      const daysOrder = loadDaysOrderFromLocalStorage(userId);
      dispatch(setTasks(tasks)); // Actualiza el estado en Redux con las tareas del usuario
      dispatch(setDaysOrder(daysOrder)); // Actualiza el estado en Redux con el orden de los días
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

  // Lógica principal del drag and drop
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;

    // Si no hay destino (se soltó fuera de un droppable), salir.
    if (!destination) return;

    // Mover un día completo
    if (type === "day") {
      dispatch(
        moveDay({
          sourceDayIndex: source.index,
          destinationDayIndex: destination.index,
        })
      );
      return;
    }

    // Mover una tarea dentro del mismo día o entre días
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        moveTask({
          taskId: draggableId,
          sourceDay: source.droppableId,
          destinationDay: destination.droppableId,
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <HeaderDashboard getInitials={getInitials} handleOpen={handleOpen} />

        <BoxSesionTwo open={open} handleClose={handleClose} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-days" direction="horizontal" type="day">
            {(provided) => (
              <Grid
                container
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ height: "80%" }}
              >
                <Box
                  sx={{
                    height: "90vh",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 4,
                    background: "rgb(143, 63, 101)",
                    overflow: "scroll",
                  }}
                >
                  {daysOrder.map((day, index) => (
                    <Draggable draggableId={day} index={index} key={day}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DayColumn day={day} tasks={tasksByDay[day]} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Grid>
  );
};

export default Dashboard;
