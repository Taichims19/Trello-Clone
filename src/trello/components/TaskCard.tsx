import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const TaskCard: React.FC<{ id: string }> = ({ id }) => {
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

  if (!task) {
    return null; // Si no se encuentra la tarea
  }

  return (
    <Card ref={dragRef} sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {task.description && (
          <Typography variant="body2">{task.description}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
