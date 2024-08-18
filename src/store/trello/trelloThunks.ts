import { Dispatch } from "redux";
import {
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  removeTask as removeTaskAction,
  setError,
  setLoading,
} from "./trelloSlice";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";
import { Task } from "../../helpers/interfacesTrello";

// Acción para obtener todas las tareas
export const fetchTasksAction = async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks: Task[] = await fetchTasks();

    tasks.forEach((task) => {
      dispatch(addTaskAction(task));
    });

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Acción para agregar una nueva tarea
export const addTaskActionCreator = async (task: Task, dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const newTask = await addTask(task);
    dispatch(addTaskAction(newTask));
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Acción para actualizar una tarea existente
export const updateTaskActionCreator = async (
  id: string,
  updatedTask: Task,
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading(true));
    const task = await updateTask(id, updatedTask);
    dispatch(updateTaskAction(task)); // Actualizar la tarea en el estado global
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Acción para eliminar una tarea
export const deleteTaskAction = async (
  id: string,
  day: string,
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading(true));
    await deleteTask(id);
    dispatch(removeTaskAction({ day, taskId: id }));
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};
