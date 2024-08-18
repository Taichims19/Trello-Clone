import { Task } from "../helpers/interfacesTrello";
import apiClient from "./axiosConfig";

export const fetchTasks = async () => {
  const response = await apiClient.get("/tasks"); // Cambia "/tasks" según tu backend
  return response.data;
};

export const addTask = async (task: Task) => {
  const response = await apiClient.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, updatedTask: Task) => {
  const response = await apiClient.put(`/tasks/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await apiClient.delete(`/tasks/${id}`);
};
