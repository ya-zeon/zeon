<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import TodoItem from './TodoItem.svelte';

	let { data, form } = $props();
	
	// В Svelte 5 используем $derived вместо $:
	let todos = $derived(data.todos || []);
	let activeCount = $derived(todos.filter(t => !t.completed).length);
	let completedCount = $derived(todos.filter(t => t.completed).length);
</script>

<div class="centered">
	<h1>todos</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.success}
		<p class="success">✓ Saved</p>
	{/if}

	<div class="stats">
		<span>{activeCount} active</span>
		<span>{completedCount} completed</span>
	</div>

	<!-- Форма создания новой задачи -->
	<form 
		method="POST" 
		action="?/create" 
		use:enhance
		class="add-form"
	>
		<label>
			add a todo:
			<input
				name="description"
				value={form?.description ?? ''}
				placeholder="what needs to be done?"
				autocomplete="off"
				required
			/>
		</label>
	</form>

	<!-- Список задач -->
	{#if todos.length > 0}
		<ul class="todos">
			{#each todos as todo (todo.id)}
				<TodoItem {todo} />
			{/each}
		</ul>
	{:else}
		<p class="empty">no todos yet</p>
	{/if}
</div>

<style>
	.centered {
		max-width: 30em;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	h1 {
		font-size: 4rem;
		font-weight: 300;
		color: #e0e0e0;
		text-align: center;
		margin: 0 0 1rem 0;
		letter-spacing: -2px;
	}

	.error {
		color: #c00;
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
		padding: 0.5rem;
		background: #fff0f0;
		border-radius: 4px;
	}

	.success {
		color: #090;
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
		padding: 0.5rem;
		background: #f0fff0;
		border-radius: 4px;
		text-align: center;
	}

	.stats {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		font-size: 0.85rem;
		color: #999;
		margin-bottom: 1rem;
	}

	.add-form {
		margin-bottom: 2rem;
	}

	label {
		display: block;
		font-size: 0.85rem;
		color: #666;
		margin-bottom: 0.25rem;
	}

	input {
		width: 100%;
		padding: 0.75rem 0.5rem;
		font-size: 1.2rem;
		border: none;
		border-bottom: 2px solid #e0e0e0;
		background: transparent;
		transition: border-color 0.2s;
		font-family: inherit;
	}

	input:focus {
		outline: none;
		border-color: #666;
	}

	input::placeholder {
		color: #e0e0e0;
		font-style: italic;
	}

	.empty {
		text-align: center;
		color: #999;
		font-style: italic;
		padding: 2rem 0;
	}

	.todos {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>