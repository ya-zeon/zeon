<script lang="ts">
    import { groupsStore } from '$lib/stores/groupsStore';
    import type { Group, NewGroup } from '$lib/types';

    export let group: Group | null = null;
    export let onClose: () => void;

    let formData: NewGroup = {
        name: group?.name || '',
        description: group?.description || '',
        year: group?.year || new Date().getFullYear()
    };

    function handleSubmit() {
        if (formData.name && formData.year) {
            if (group) {
                groupsStore.updateGroup(group.id, formData);
            } else {
                groupsStore.addGroup(formData);
            }
            onClose();
        }
    }
</script>

<div class="form">
    <h2>{group ? 'Редактировать' : 'Новая группа'}</h2>
    
    <form on:submit|preventDefault={handleSubmit}>
        <div class="field">
            <label>Название</label>
            <input 
                type="text" 
                bind:value={formData.name}
                placeholder="Например: CS-2024"
                required
            >
        </div>

        <div class="field">
            <label>Год</label>
            <input 
                type="number" 
                bind:value={formData.year}
                min="2000"
                max="2030"
                required
            >
        </div>

        <div class="field">
            <label>Описание</label>
            <textarea 
                bind:value={formData.description}
                placeholder="Описание группы..."
                rows="2"
            ></textarea>
        </div>

        <div class="actions">
            <button type="button" class="button button-outline" on:click={onClose}>
                Отмена
            </button>
            <button type="submit" class="button button-primary">
                {group ? 'Сохранить' : 'Создать'}
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
        margin: 0 0 1.5rem 0;
        color: #0f172a;
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

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.95rem;
        box-sizing: border-box;
    }

    input:focus, textarea:focus {
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