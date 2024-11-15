import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import './index.css';

interface Task {
  id: number;
  proyecto: string;
  tipoTarea: string;
  personaAsignada: string;
  storyPoints: string;
  prioridad: string;
  fechaCreacion: string;
  resumen: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    proyecto: '',
    tipoTarea: '',
    personaAsignada: '',
    storyPoints: '',
    prioridad: '',
    fechaCreacion: '',
    resumen: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(newTask).every(field => field !== '')) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({
        proyecto: '',
        tipoTarea: '',
        personaAsignada: '',
        storyPoints: '',
        prioridad: '',
        fechaCreacion: '',
        resumen: ''
      });
    } else {
      alert('Todos los campos son obligatorios');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas de Requerimientos de Software</h1>
      
      <form onSubmit={addTask} className="mb-8 space-y-4">
        <Input
          name="proyecto"
          value={newTask.proyecto}
          onChange={handleInputChange}
          placeholder="Proyecto"
          required
        />
        <Select
          name="tipoTarea"
          value={newTask.tipoTarea}
          onValueChange={(value) => handleSelectChange('tipoTarea', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo de tarea" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="feature" value="feature">Feature</SelectItem>
            <SelectItem key="bug" value="bug">Bug</SelectItem>
            <SelectItem key="improvement" value="improvement">Mejora</SelectItem>
          </SelectContent>
        </Select>
        <Input
          name="personaAsignada"
          value={newTask.personaAsignada}
          onChange={handleInputChange}
          placeholder="Persona asignada"
          required
        />
        <Input
          name="storyPoints"
          value={newTask.storyPoints}
          onChange={handleInputChange}
          placeholder="Story points"
          type="number"
          required
        />
        <Select
          name="prioridad"
          value={newTask.prioridad}
          onValueChange={(value) => handleSelectChange('prioridad', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="alta" value="alta">Alta</SelectItem>
            <SelectItem key="media" value="media">Media</SelectItem>
            <SelectItem key="baja" value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Input
          name="fechaCreacion"
          value={newTask.fechaCreacion}
          onChange={handleInputChange}
          placeholder="Fecha de creación"
          type="date"
          required
        />
        <Input
          name="resumen"
          value={newTask.resumen}
          onChange={handleInputChange}
          placeholder="Resumen"
          required
        />
        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Agregar Tarea
        </Button>
      </form>
      
      < ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between">
            <span>{task.proyecto}</span>
            <Button type="button" onClick={() => deleteTask(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;