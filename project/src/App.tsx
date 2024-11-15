import React from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task, TaskFormData } from './types';

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const handleCreateTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Gestión de Tareas de Software
          </h1>
          
          <TaskForm onSubmit={handleCreateTask} />
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
}

export default App;