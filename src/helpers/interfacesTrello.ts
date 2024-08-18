export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: number; // Timestamp en milisegundos
  day: string; // Añadimos la propiedad day
}
