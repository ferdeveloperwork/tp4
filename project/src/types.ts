export interface Task {
  id: string;
  proyecto: string;
  tipoTarea: string;
  personaAsignada: string;
  storyPoints: number;
  prioridad: string;
  fechaCreacion: string;
  resumen: string;
}

export type TaskFormData = Omit<Task, 'id'>;