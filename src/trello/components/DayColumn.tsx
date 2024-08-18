import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Box, Typography, TextField, Button } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";

import { addTask, moveTask } from "../../store/trello/trelloSlice";
import { RootState } from "../../store/store";

const DayColumn: React.FC<{ day: string }> = ({ day }) => {
  const dispatch = useDispatch();
  const tasks =
    useSelector((state: RootState) => state.trello.tasksByDay[day]) || []; // Agregado || []

  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; fromDay: string }) => {
      // Despachar la acción moveTask usando los datos del objeto drop
      dispatch(
        moveTask({
          sourceDay: item.fromDay,
          destinationDay: day,
          taskId: item.id,
          hoverIndex: 0,
        })
      );
    },
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({ day, title: newTaskTitle, description: newTaskDescription })
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  return (
    <Box
      ref={dropRef}
      sx={{
        width: "14%",
        minHeight: "20%",
        maxHeight: "60%",
        padding: 2,
        color: "white",
        // backgroundColor: "linear-gradient(to right, #4e4e4e, #222222)",
        backgroundColor: "rgb(34, 29, 36)",
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {day}
      </Typography>
      {tasks.map((task) => (
        <TaskCard key={task.id} id={task.id} />
      ))}
      <TextField
        label="Nueva Tarea"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        fullWidth
        sx={{ color: "white" }}
      />
      <TextField
        label="Descripción"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        multiline
        fullWidth
        sx={{ color: "white" }}
      />
      <Button
        variant="contained"
        sx={{ color: "#3f51b5" }}
        onClick={handleAddTask}
        disabled={!newTaskTitle}
      >
        Añade una tarjeta
      </Button>
    </Box>
  );
};

export default DayColumn;
