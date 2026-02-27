<script lang="ts">
  export let todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  
  export let onToggle: (id: number) => void;
  export let onDelete: (id: number) => void;
  export let onSave: (id: number, text: string) => void;

  let editing = false;
  let editedText = todo.text;

  function startEdit() {
    editing = true;
    editedText = todo.text;
  }

  function saveEdit() {
    if (editedText.trim()) {
      onSave(todo.id, editedText);
      editing = false;
    }
  }

  function cancelEdit() {
    editing = false;
    editedText = todo.text;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }
</script>

<li class="todo-item {todo.completed ? 'completed' : ''}">
  {#if editing}
    <div class="edit-form">
      <!-- svelte-ignore a11y_autofocus -->
      <input
        type="text"
        bind:value={editedText}
        on:keydown={handleKeydown}
        on:blur={saveEdit}
        autofocus
      />
      <div class="edit-actions">
        <button class="save-btn" on:click={saveEdit}>✓</button>
        <button class="cancel-btn" on:click={cancelEdit}>✕</button>
      </div>
    </div>
  {:else}
    <div class="todo-content">
      <label class="checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          on:change={() => onToggle(todo.id)}
        />
        <span class="checkmark"></span>
      </label>
      
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span 
        class="todo-text"
        on:dblclick={startEdit}
      >
        {todo.text}
      </span>
      
      <button 
        class="delete-btn"
        on:click={() => onDelete(todo.id)}
      >
        Удалить
      </button>
    </div>
  {/if}
</li>

<style>
  .todo-item {
    background: white;
    border-radius: 12px;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid #eaeef2;
    transition: all 0.2s ease;
  }

  .todo-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #cdd9e6;
  }

  .todo-item.completed {
    background: #f8fafc;
    opacity: 0.8;
  }

  .todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #8b9eb0;
  }

  .todo-content {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    gap: 14px;
  }

  .checkbox {
    position: relative;
    width: 22px;
    height: 22px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: white;
    border: 2px solid #cbd5e0;
    border-radius: 6px;
    transition: all 0.15s ease;
  }

  .checkbox:hover .checkmark {
    border-color: #4361ee;
    background-color: #f0f4ff;
  }

  .checkbox input:checked ~ .checkmark {
    background-color: #4361ee;
    border-color: #4361ee;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  .todo-text {
    flex: 1;
    font-size: 16px;
    color: #1e293b;
    cursor: pointer;
    padding: 4px 0;
    line-height: 1.5;
    font-weight: 450;
  }

  .todo-text:hover {
    color: #4361ee;
  }

  .delete-btn {
    padding: 6px 14px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    color: #64748b;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
  }

  .delete-btn:hover {
    background: #fef2f2;
    border-color: #f87171;
    color: #dc2626;
  }

  .edit-form {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    gap: 10px;
    background: white;
  }

  .edit-form input {
    flex: 1;
    padding: 10px 14px;
    border: 2px solid #4361ee;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    background: white;
  }

  .edit-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .save-btn, .cancel-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .save-btn {
    background: #4361ee;
    color: white;
  }

  .save-btn:hover {
    background: #3046c7;
    transform: scale(1.02);
  }

  .cancel-btn {
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  .cancel-btn:hover {
    background: #e2e8f0;
    color: #334155;
  }
</style>