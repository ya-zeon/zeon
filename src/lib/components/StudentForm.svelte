<script lang="ts">
    import { groupsStore } from '$lib/stores/groupsStore';
    import type { Group, NewStudent } from '$lib/types';

    export let group: Group;
    export let onClose: () => void;

    let formData: NewStudent = {
        name: '',
        email: '',
        groupId: group.id
    };

    function handleSubmit() {
        if (formData.name && formData.email) {
            groupsStore.addStudent(formData);
            onClose();
        }
    }
</script>

<div class="form">
    <h2>Новый студент</h2>
    <p class="group-name">{group.name}</p>
    
    <form on:submit|preventDefault={handleSubmit}>
        <div class="field">
            <label>Имя</label>
            <input 
                type="text" 
                bind:value={formData.name}
                placeholder="Имя студента"
                required
            >
        </div>

        <div class="field">
            <label>Email</label>
            <input 
                type="email" 
                bind:value={formData.email}
                placeholder="student@example.com"
                required
            >
        </div>

        <div class="actions">
            <button type="button" class="button button-outline" on:click={onClose}>
                Отмена
            </button>
            <button type="submit" class="button button-primary">
                Добавить
            </button>
        </div>
    </form>
</div>

<style>
    .form {
        width: 100%;
    }

    h2 {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 0 0.25rem 0;
        color: #0f172a;
    }

    .group-name {
        color: #64748b;
        font-size: 0.9rem;
        margin: 0 0 1.5rem 0;
    }

    .field {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
        color: #475569;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.95rem;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #0f172a;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1.5rem;
    }

    .button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .button-primary {
        background: #0f172a;
        color: white;
    }

    .button-primary:hover {
        background: #1e293b;
    }

    .button-outline {
        background: transparent;
        border: 1px solid #e2e8f0;
        color: #475569;
    }

    .button-outline:hover {
        background: #f8fafc;
    }
</style>