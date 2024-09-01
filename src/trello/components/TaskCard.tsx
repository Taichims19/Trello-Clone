import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Añadimos el icono de eliminar

import { RootState } from "../../store/store";
import { removeTask } from "../../store/trello/trelloSlice";

interface TaskCardProps {
  id: string;
  title: string;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, onEdit }) => {
  const dispatch = useDispatch();

  // Usamos Redux para obtener los datos de la tarea
  const task = useSelector((state: RootState) => {
    for (const day in state.trello.tasksByDay) {
      const taskFound = state.trello.tasksByDay[day].find(
        (task) => task.id === id
      );
      if (taskFound) return taskFound;
    }
    return null;
  });

  const [, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id, fromDay: task?.day },
  }));

  const handleDelete = () => {
    if (task) {
      dispatch(removeTask({ day: task.day, taskId: id }));
    }
  };

  if (!task) {
    return null; // Si no se encuentra la tarea
  }

  return (
    <Card
      ref={dragRef}
      sx={{
        margin: "10px 0px",
        padding: "0px 0px",
        height: "auto",
        maxHeight: "150px",
        background: "rgb(34, 39, 43)",
        color: "white",
        boxSizing: "border-box",
        position: "relative", // Para el icono de edición
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {task.description && (
          <Typography sx={{ color: "white" }} variant="body2">
            {task.description}
          </Typography>
        )}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            "&:hover": {
              color: "#ff4081",
            },
          }}
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 40,
            color: "white",
            "&:hover": {
              color: "#ff4081",
            },
          }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
