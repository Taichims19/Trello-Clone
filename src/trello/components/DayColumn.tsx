import React, { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close"; // Importamos el icono de Close
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { addTask, moveTask, updateTask } from "../../store/trello/trelloSlice";
// import { RootState } from "../../store/store";
import { Task } from "../../helpers/interfacesTrello";

interface DayColumnProps {
  day: string;
  tasks: Task[];
}

const DayColumn: React.FC<DayColumnProps> = ({ day, tasks }) => {
  const dispatch = useDispatch();

  // const tasks = useSelector(
  //   (state: RootState) => state.trello.tasksByDay[day.toLowerCase()] || []
  // );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({ day, title: newTaskTitle, description: "" }) // Descripción vacía porque eliminamos el campo
      );
      setNewTaskTitle("");
      setIsAddingTask(false); // Cerrar el cuadro de texto después de añadir la tarea
    }
  };

  const handleEditTask = (id: string, title: string) => {
    setEditingTaskId(id);
    setEditingTaskTitle(title);
  };

  const handleSaveEdit = () => {
    if (editingTaskId && editingTaskTitle.trim()) {
      dispatch(
        updateTask({
          day,
          taskId: editingTaskId,
          title: editingTaskTitle,
        })
      );
      setEditingTaskId(null);
      setEditingTaskTitle("");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid sx={{ height: "75vh" }} item xs={12} sm={6} md={4}>
      <Box
        sx={{
          width: "300px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          margin: "0 8px",
          padding: 2,
          backgroundColor: "rgb(16, 18, 4)",
          color: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          maxHeight: "80vh",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            {day}
          </Typography>
          <Box>
            <IconButton
              size="small"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Opción 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Opción 2</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Droppable droppableId={day}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: "0 16px",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
                background: "rgba(16, 18, 4, 1)",
                minHeight: "5px",
              }}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingTaskId === task.id ? (
                        <Box>
                          <TextField
                            value={editingTaskTitle}
                            onChange={(e) =>
                              setEditingTaskTitle(e.target.value)
                            }
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{
                              input: { color: "white" },
                              label: { color: "white" },
                              borderRadius: 3,
                              marginBottom: 1,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#616161",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#757575",
                                },
                                backgroundColor: "rgb(34, 39, 43)",
                              },
                              maxHeight: "200px",
                              overflow: "auto",
                            }}
                          />
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Button
                              variant="contained"
                              onClick={handleSaveEdit}
                              startIcon={<AddIcon />}
                              sx={{
                                backgroundColor: "#3f51b5",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "rgb(133, 184, 255)",
                                },
                                "&:disabled": {
                                  backgroundColor: "rgb(133, 184, 255)",
                                  opacity: 1,
                                },
                              }}
                              disabled={!editingTaskTitle}
                            >
                              Guardar Cambios
                            </Button>
                            <IconButton
                              onClick={handleCancelEdit}
                              sx={{ color: "white" }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      ) : (
                        <TaskCard
                          id={task.id}
                          title={task.title}
                          onEdit={() => handleEditTask(task.id, task.title)}
                        />
                      )}
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        {!isAddingTask && (
          <Button
            onClick={() => setIsAddingTask(true)}
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              color: "white",
              textTransform: "none",
              padding: "8px",
              mt: 2,
            }}
          >
            Añade una tarjeta
          </Button>
        )}
        {isAddingTask && (
          <Box
            p={2}
            sx={{
              backgroundColor: "rgba(200, 200, 200, 0.15)",
              borderRadius: 1,
            }}
          >
            <TextField
              label="Introduce un nombre para esta tarjeta"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              minRows={2}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                borderRadius: 3,
                marginBottom: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#616161",
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575",
                  },
                  backgroundColor: "rgb(34, 39, 43)",
                },
                maxHeight: "200px",
                overflow: "auto",
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={handleAddTask}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgb(133, 184, 255)",
                  },
                  "&:disabled": {
                    backgroundColor: "rgb(133, 184, 255)",
                    opacity: 1,
                  },
                }}
                disabled={!newTaskTitle}
              >
                Añadir tarjeta
              </Button>
              <IconButton
                onClick={() => setIsAddingTask(false)}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default DayColumn;
