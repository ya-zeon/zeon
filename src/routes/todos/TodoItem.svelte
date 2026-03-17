<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	
	// Используем $props() для получения пропсов в Svelte 5
	let { todo }: {
		todo: {
			id: number;
			description: string;
			completed: boolean;
		}
	} = $props();

	// Состояния
	let editing = $state(false);
let editedText = $state(todo.description);

	function startEdit() {
		editing = true;
		editedText = todo.description;
	}

	function cancelEdit() {
		editing = false;
		editedText = todo.description;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') cancelEdit();
	}
</script>

<li in:fly={{ y: 20 }} out:slide>
	{#if editing}
		<form 
			method="POST" 
			action="?/update" 
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						editing = false;
					}
				};
			}}
			class="edit-form"
		>
			<input type="hidden" name="id" value={todo.id} />
			<!-- svelte-ignore event_directive_deprecated -->
			<!-- svelte-ignore a11y_autofocus -->
			<!-- svelte-ignore event_directive_deprecated -->
			<input
				type="text"
				name="description"
				value={editedText}
				on:keydown={handleKeydown}
				on:blur={(e) => {
					// Если поле не пустое и не равно исходному, отправляем форму
					if (e.currentTarget.value.trim() && e.currentTarget.value !== todo.description) {
						e.currentTarget.form?.requestSubmit();
					} else {
						cancelEdit();
					}
				}}
				autofocus
				required
			/>
			<!-- svelte-ignore event_directive_deprecated -->
			<button type="button" on:click={cancelEdit} class="cancel-edit">✕</button>
		</form>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<form method="POST" action="?/toggle" use:enhance>
			<input type="hidden" name="id" value={todo.id} />
			<!-- svelte-ignore event_directive_deprecated -->
			<input 
				type="checkbox" 
				name="completed" 
				checked={todo.completed}
				on:change={(e) => e.currentTarget.form?.requestSubmit()}
				aria-label="Mark as complete"
			/>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore event_directive_deprecated -->
			<span class="todo-text {todo.completed ? 'completed' : ''}" on:dblclick={startEdit}>
				{todo.description}
			</span>
			<!-- svelte-ignore event_directive_deprecated -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button 
				type="button"
				on:click={startEdit}
				class="edit-btn"
			></button>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button 
				type="submit"
				formaction="?/delete"
				class="delete-btn"
			></button>
		</form>
	{/if}
</li>

<style>
	li {
		list-style: none;
	}

	form {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	input[type="checkbox"] {
		width: 1.2rem;
		height: 1.2rem;
		cursor: pointer;
		accent-color: #666;
	}

	.todo-text {
		flex: 1;
		font-size: 1.1rem;
		color: #333;
		cursor: text;
	}

	.todo-text.completed {
		text-decoration: line-through;
		color: #ccc;
	}

	.edit-btn, .delete-btn, .cancel-edit {
		border: none;
		background: transparent;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		opacity: 0.5;
		transition: opacity 0.2s;
		padding: 0;
		background-size: 1.2rem 1.2rem;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		font-size: 0;
	}

	.edit-btn {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'%3E%3C/path%3E%3C/svg%3E");
	}

	.delete-btn {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E");
	}

	.cancel-edit {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M18 6L6 18M6 6l12 12'%3E%3C/path%3E%3C/svg%3E");
	}

	.edit-btn:hover, .delete-btn:hover, .cancel-edit:hover {
		opacity: 1;
	}

	.edit-form {
		display: flex;
		gap: 0.5rem;
	}

	.edit-form input {
		flex: 1;
		padding: 0.5rem;
		font-size: 1.1rem;
		border: 2px solid #666;
		border-radius: 4px;
		font-family: inherit;
	}

	.edit-form input:focus {
		outline: none;
	}

	@media (max-width: 640px) {
		.edit-btn, .delete-btn {
			opacity: 1;
		}
	}
</style>