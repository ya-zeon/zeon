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

<div>
    <h2>{group ? 'Редактировать группу' : 'Новая группа'}</h2>
    
    <form on:submit|preventDefault={handleSubmit}>
        <div class="field">
            <label>Название</label>
            <input 
                type="text" 
                bind:value={formData.name}
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
                rows="3"
            ></textarea>
        </div>

        <div class="actions">
            <button type="button" class="btn" on:click={onClose}>
                Отмена
            </button>
            <button type="submit" class="btn primary">
                {group ? 'Сохранить' : 'Создать'}
            </button>
        </div>
    </form>
</div>

<style>
    h2 {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 0 1.5rem 0;
    }

    .field {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
        color: #666;
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        font-size: 0.95rem;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        background: white;
        font-size: 0.9rem;
        cursor: pointer;
    }

    .btn.primary {
        background: #0066cc;
        border-color: #0066cc;
        color: white;
    }

    .btn.primary:hover {
        background: #0052a3;
    }

    .btn:hover {
        background: #f0f0f0;
    }
</style>