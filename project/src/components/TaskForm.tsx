import React from 'react';
import { ClipboardList } from 'lucide-react';
import type { TaskFormData } from '../types';

const PRIORIDADES = ['Alta', 'Media', 'Baja'];
const TIPOS_TAREA = ['Bug', 'Feature', 'Mejora', 'Documentación'];

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = React.useState<TaskFormData>({
    proyecto: '',
    tipoTarea: '',
    personaAsignada: 'Fernando Hirschfeld',
    storyPoints: 1,
    prioridad: '',
    fechaCreacion: new Date().toISOString().split('T')[0],
    resumen: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      ...formData,
      proyecto: '',
      tipoTarea: '',
      storyPoints: 1,
      prioridad: '',
      resumen: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Nueva Tarea</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="proyecto" className="block text-sm font-medium text-gray-700 mb-1">
            Proyecto *
          </label>
          <input
            required
            type="text"
            id="proyecto"
            name="proyecto"
            value={formData.proyecto}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="tipoTarea" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Tarea *
          </label>
          <select
            required
            id="tipoTarea"
            name="tipoTarea"
            value={formData.tipoTarea}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar tipo...</option>
            {TIPOS_TAREA.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="personaAsignada" className="block text-sm font-medium text-gray-700 mb-1">
            Persona Asignada
          </label>
          <input
            disabled
            type="text"
            id="personaAsignada"
            name="personaAsignada"
            value={formData.personaAsignada}
            className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="storyPoints" className="block text-sm font-medium text-gray-700 mb-1">
            Story Points *
          </label>
          <input
            required
            type="number"
            id="storyPoints"
            name="storyPoints"
            min="1"
            max="13"
            value={formData.storyPoints}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad *
          </label>
          <select
            required
            id="prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar prioridad...</option>
            {PRIORIDADES.map(prioridad => (
              <option key={prioridad} value={prioridad}>
                {prioridad}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fechaCreacion" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Creación
          </label>
          <input
            disabled
            type="date"
            id="fechaCreacion"
            name="fechaCreacion"
            value={formData.fechaCreacion}
            className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="resumen" className="block text-sm font-medium text-gray-700 mb-1">
            Resumen *
          </label>
          <textarea
            required
            id="resumen"
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Crear Tarea
        </button>
      </div>
    </form>
  );
}