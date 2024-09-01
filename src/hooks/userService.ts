import { v4 as uuidv4 } from "uuid";

interface User {
  id: string; // Identificador único
  email: string;
  password: string;
  displayName: string;
}

// Función para obtener todos los usuarios del localStorage
const getAllUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem("TrelloClone_users") || "[]");
  } catch (error) {
    console.error("Error al obtener usuarios de localStorage:", error);
    return [];
  }
};

// Función para guardar todos los usuarios en el localStorage
const saveAllUsers = (users: User[]): void => {
  try {
    localStorage.setItem("TrelloClone_users", JSON.stringify(users));
  } catch (error) {
    console.error("Error al guardar usuarios en localStorage:", error);
  }
};

// Función para encontrar un usuario por email
export const findUserByEmail = (email: string): User | undefined => {
  const users = getAllUsers();
  return users.find((user) => user.email === email);
};

// Función para encontrar un usuario por ID
export const findUserById = (id: string): User | undefined => {
  const users = getAllUsers();
  return users.find((user) => user.id === id);
};

// Función para guardar o actualizar un usuario
export const saveUser = (user: Omit<User, "id">): void => {
  try {
    const users = getAllUsers();
    const existingUserIndex = users.findIndex((u) => u.email === user.email);

    if (existingUserIndex >= 0) {
      // Actualiza el usuario existente sin cambiar el ID
      users[existingUserIndex] = { ...user, id: users[existingUserIndex].id };
    } else {
      // Agrega un nuevo usuario con ID generado
      const newUser = { ...user, id: uuidv4() };
      users.push(newUser);
    }
    saveAllUsers(users);
  } catch (error) {
    console.error("Error al guardar o actualizar el usuario:", error);
  }
};
// const users = JSON.parse(localStorage.getItem("users") || "[]");
// const uniqueUsers = Array.from(new Map(users.map(user => [user.email, user])).values());
// localStorage.setItem("users", JSON.stringify(uniqueUsers));

// console.log(JSON.parse(localStorage.getItem("users") || "[]"));  codigo para resetear user en console de navegador
