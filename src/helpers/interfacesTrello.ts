export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: number; // Timestamp en milisegundos
  day: string; // Añadimos la propiedad day
}

export interface User {
  id: string; // Identificador único
  email: string;
  password: string;
  displayName: string;
}
