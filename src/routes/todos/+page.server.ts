import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Хранилище данных (в реальном проекте здесь будет БД)
let todos = [
  {
    id: 1,
    description: 'Купить продукты',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    description: 'Сделать зарядку',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Загрузка данных для страницы
export const load: PageServerLoad = async () => {
  return {
    todos: todos.map(t => ({ ...t })) // Возвращаем копию
  };
};

// Actions для работы с формами
export const actions: Actions = {
  // Создание новой задачи
  create: async ({ request }) => {
    const data = await request.formData();
    const description = data.get('description')?.toString();

    if (!description?.trim()) {
      return fail(400, { 
        error: 'Description is required',
        description: '' 
      });
    }

    const newTodo = {
      id: Math.max(0, ...todos.map(t => t.id)) + 1,
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);

    return { 
      success: true,
      description: '' // очищаем поле
    };
  },

  // Переключение статуса задачи
  toggle: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return fail(404, { error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();

    return { success: true };
  },

  // Редактирование задачи
  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const description = data.get('description')?.toString();

    if (!description?.trim()) {
      return fail(400, { error: 'Description is required' });
    }

    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return fail(404, { error: 'Todo not found' });
    }

    todo.description = description.trim();
    todo.updatedAt = new Date().toISOString();

    return { success: true };
  },

  // Удаление задачи
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return fail(404, { error: 'Todo not found' });
    }

    todos.splice(index, 1);

    return { success: true };
  }
};