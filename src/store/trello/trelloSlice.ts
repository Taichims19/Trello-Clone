import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; //
import { Task } from "../../helpers/interfacesTrello";

interface TrelloState {
  tasksByDay: Record<string, Task[]>; // Map string (día) a Task[]
  loading: boolean;
  error: string | null;
}

const initialState: TrelloState = {
  tasksByDay: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  loading: false,
  error: null,
};

interface AddTaskPayload {
  day: string;
  title: string;
  description?: string;
}

interface UpdateTaskPayload {
  day: string;
  taskId: string;
  title?: string;
  description?: string;
}

interface RemoveTaskPayload {
  day: string;
  taskId: string;
}

interface MoveTaskPayload {
  sourceDay: string;
  destinationDay: string;
  taskId: string;
  hoverIndex: number;
}

export const trelloSlice = createSlice({
  name: "trello",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { day, title, description } = action.payload;
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        createdAt: Date.now(),
        day,
      };
      // Verifica si el día existe en tasksByDay antes de hacer push
      if (state.tasksByDay[day]) {
        state.tasksByDay[day].push(newTask);
      } else {
        // Si no existe, puedes inicializarlo con una nueva array de tareas
        state.tasksByDay[day] = [newTask];
      }
    },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const { day, taskId, title, description } = action.payload;
      const task = state.tasksByDay[day].find((task) => task.id === taskId);
      if (task) {
        if (title) task.title = title;
        if (description) task.description = description;
      }
    },
    removeTask: (state, action: PayloadAction<RemoveTaskPayload>) => {
      const { day, taskId } = action.payload;
      state.tasksByDay[day] = state.tasksByDay[day].filter(
        (task) => task.id !== taskId
      );
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const { sourceDay, destinationDay, taskId, hoverIndex } = action.payload;
      const sourceTasks = state.tasksByDay[sourceDay];
      const destinationTasks = state.tasksByDay[destinationDay];

      const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;

      const [removedTask] = sourceTasks.splice(taskIndex, 1);
      destinationTasks.splice(hoverIndex, 0, removedTask);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  removeTask,
  moveTask,
  setLoading,
  setError,
} = trelloSlice.actions;
export default trelloSlice.reducer;
