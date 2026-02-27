<script lang="ts">
  import TodoItem from './TodoItem.svelte';
  
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  let todos: Todo[] = [
    { id: 1, text: 'Первая задача', completed: false },
    { id: 2, text: 'Вторая задача', completed: false }
  ];
  let newTodo: string = '';

  function addTodo(): void {
    if (newTodo.trim()) {
      todos = [...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }];
      newTodo = '';
    }
  }

  function toggleTodo(id: number): void {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
  }

  function saveTodo(id: number, newText: string): void {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
  }

  $: completedCount = todos.filter(t => t.completed).length;
  $: activeCount = todos.filter(t => !t.completed).length;
</script>

<div class="app">
  <div class="container">
    <div class="header">
      <h1>Задачи</h1>
      <div class="stats">
        <span class="stat active">{activeCount} активных</span>
        <span class="stat completed">{completedCount} выполненных</span>
      </div>
    </div>
    
    <div class="add-section">
      <input 
        type="text" 
        bind:value={newTodo} 
        placeholder="Что нужно сделать?"
        class="todo-input"
        on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && addTodo()}
      />
      <button class="add-btn" on:click={addTodo} disabled={!newTodo.trim()}>
        + Добавить задачу
      </button>
    </div>

    {#if todos.length > 0}
      <div class="todos-wrapper">
        <ul class="todo-list">
          {#each todos as todo (todo.id)}
            <TodoItem
              {todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onSave={saveTodo}
            />
          {/each}
        </ul>
      </div>
    {:else}
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>Здесь пока пусто</h3>
        <p>Добавьте первую задачу, чтобы начать</p>
      </div>
    {/if}
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(145deg, #f6f9fc 0%, #edf2f7 100%);
    padding: 30px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .container {
    max-width: 700px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.15), 0 5px 12px -4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .header {
    padding: 28px 32px;
    background: white;
    border-bottom: 1px solid #eef2f6;
  }

  .header h1 {
    font-size: 28px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .stats {
    display: flex;
    gap: 16px;
  }

  .stat {
    font-size: 14px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 30px;
  }

  .stat.active {
    background: #e8f0fe;
    color: #4361ee;
  }

  .stat.completed {
    background: #f0f3f8;
    color: #475569;
  }

  .add-section {
    padding: 24px 32px;
    background: #fafcff;
    border-bottom: 1px solid #eef2f6;
    display: flex;
    gap: 16px;
  }

  .todo-input {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    font-size: 15px;
    transition: all 0.2s ease;
    background: white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  .todo-input:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
  }

  .todo-input::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  .add-btn {
    padding: 14px 28px;
    background: #4361ee;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 6px 14px rgba(67, 97, 238, 0.25);
    white-space: nowrap;
    letter-spacing: 0.3px;
  }

  .add-btn:hover:not(:disabled) {
    background: #3046c7;
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(67, 97, 238, 0.3);
  }

  .add-btn:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.6;
  }

  .todos-wrapper {
    padding: 24px 32px;
    background: white;
  }

  .todo-list {
    list-style: none;
  }

  .empty-state {
    padding: 60px 32px;
    text-align: center;
    background: white;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-state h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 6px;
  }

  .empty-state p {
    color: #64748b;
    font-size: 15px;
  }

  @media (max-width: 640px) {
    .app {
      padding: 15px 10px;
    }

    .header {
      padding: 20px 24px;
    }

    .header h1 {
      font-size: 24px;
    }

    .add-section {
      padding: 20px 24px;
      flex-direction: column;
    }

    .add-btn {
      width: 100%;
    }

    .todos-wrapper {
      padding: 20px 24px;
    }

    .stats {
      flex-wrap: wrap;
    }
  }
</style>