import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; //
import { Task } from "../../helpers/interfacesTrello";
import { AUTH_STORAGE_KEY } from "../../helpers/variableTrello";

interface TrelloState {
  tasksByDay: Record<string, Task[]>; // Map string (día) a Task[]
  loading: boolean;
  error: string | null;
  daysOrder: string[]; // Nuevo estado para el orden de los días
}

const initialState: TrelloState = {
  tasksByDay: {
    Lunes: [],
    Martes: [],
    Miércoles: [], // Con acento
    Jueves: [],
    Viernes: [],
    Sábado: [], // Con acento
    Domingo: [],
  },
  loading: false,
  error: null,
  daysOrder: [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ], // Orden inicial de los días
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
  taskId: string;
  sourceDay: string;
  destinationDay: string;
  destinationIndex: number;
}

interface MoveDayPayload {
  sourceDayIndex: number;
  destinationDayIndex: number;
}

const getUserId = (): string => {
  // Intenta obtener el objeto 'auth' desde localStorage
  const authString = localStorage.getItem(AUTH_STORAGE_KEY);

  if (authString) {
    try {
      // Intenta parsear el objeto 'auth'
      const auth = JSON.parse(authString);

      // Verifica si el objeto 'auth' tiene un campo 'id'
      if (auth && typeof auth.id === "string") {
        return auth.id;
      }
    } catch (error) {
      // Maneja el caso en el que el parseo falle
      console.error("Error parsing auth from localStorage:", error);
    }
  }

  // Devuelve un valor por defecto si no se puede obtener el 'id'
  return "";
};

// Función para cargar el estado desde el localStorage
export const loadTasksFromLocalStorage = (
  userId: string
): Record<string, Task[]> => {
  if (userId) {
    const storedTasks = localStorage.getItem(`tasks_Trello_${userId}`);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  }
  return initialState.tasksByDay;
};

// Función para cargar el orden de los días desde localStorage
export const loadDaysOrderFromLocalStorage = (userId: string): string[] => {
  if (userId) {
    const storedDaysOrder = localStorage.getItem(`daysOrder_Trello_${userId}`);
    if (storedDaysOrder) {
      return JSON.parse(storedDaysOrder);
    }
  }
  return initialState.daysOrder;
};

// Función para guardar el orden de los días en el localStorage
const saveDaysOrderToLocalStorage = (userId: string, daysOrder: string[]) => {
  if (userId) {
    localStorage.setItem(
      `daysOrder_Trello_${userId}`,
      JSON.stringify(daysOrder)
    );
  }
};

export const trelloSlice = createSlice({
  name: "trello",
  initialState: {
    ...initialState,
    tasksByDay: initialState.tasksByDay, // Evitar cargar tareas específicas en la inicialización
    daysOrder: initialState.daysOrder,
  },
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
      if (state.tasksByDay[day]) {
        state.tasksByDay[day].push(newTask);
      } else {
        state.tasksByDay[day] = [newTask];
      }
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(
          `tasks_Trello_${userId}`,
          JSON.stringify(state.tasksByDay)
        );
      }
    },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const { day, taskId, title, description } = action.payload;
      const task = state.tasksByDay[day].find((task) => task.id === taskId);
      if (task) {
        if (title) task.title = title;
        if (description) task.description = description;
      }
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(
          `tasks_Trello_${userId}`,
          JSON.stringify(state.tasksByDay)
        );
      }
    },
    removeTask: (state, action: PayloadAction<RemoveTaskPayload>) => {
      const { day, taskId } = action.payload;
      state.tasksByDay[day] = state.tasksByDay[day].filter(
        (task) => task.id !== taskId
      );
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(
          `tasks_Trello_${userId}`,
          JSON.stringify(state.tasksByDay)
        );
      }
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const { taskId, sourceDay, destinationDay, destinationIndex } =
        action.payload;
      const task = state.tasksByDay[sourceDay].find(
        (task) => task.id === taskId
      );

      if (!task) return;

      // Remueve la tarea del día original
      state.tasksByDay[sourceDay] = state.tasksByDay[sourceDay].filter(
        (task) => task.id !== taskId
      );

      // Inserta la tarea en la nueva posición del nuevo día
      state.tasksByDay[destinationDay].splice(destinationIndex, 0, task);

      const userId = getUserId();
      if (userId) {
        localStorage.setItem(
          `tasks_Trello_${userId}`,
          JSON.stringify(state.tasksByDay)
        );
      }
    },
    moveDay: (state, action: PayloadAction<MoveDayPayload>) => {
      const { sourceDayIndex, destinationDayIndex } = action.payload;
      const days = [...state.daysOrder];
      const [movedDay] = days.splice(sourceDayIndex, 1);
      days.splice(destinationDayIndex, 0, movedDay);
      state.daysOrder = days;

      const userId = getUserId();
      saveDaysOrderToLocalStorage(userId, days);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTasks: (state, action: PayloadAction<Record<string, Task[]>>) => {
      state.tasksByDay = action.payload;
    },
    setDaysOrder: (state, action: PayloadAction<string[]>) => {
      state.daysOrder = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  removeTask,
  moveTask,
  moveDay,
  setLoading,
  setError,
  setTasks,
  setDaysOrder,
} = trelloSlice.actions;
export default trelloSlice.reducer;
