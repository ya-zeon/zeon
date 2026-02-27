<script lang="ts">
    import { groupsStore } from '$lib/stores/groupsStore';
    import StudentList from './StudentList.svelte';
    import type { Group } from '$lib/types';

    export let onEditGroup: (group: Group) => void;
    export let onAddStudent: (group: Group) => void;

    let expandedGroups = new Set<number>();

    function toggleGroup(groupId: number) {
        if (expandedGroups.has(groupId)) {
            expandedGroups.delete(groupId);
        } else {
            expandedGroups.add(groupId);
        }
        expandedGroups = expandedGroups;
    }

    function handleDeleteGroup(groupId: number) {
        if (confirm('Удалить группу?')) {
            groupsStore.deleteGroup(groupId);
        }
    }


	function onAddGroup(): any {
		throw new Error('Function not implemented.');
	}
</script>

<div class="groups">
    {#each $groupsStore as group (group.id)}
        <div class="group-card">
            <div class="group-header">
                <div class="group-title" on:click={() => toggleGroup(group.id)}>
                    <span class="expand-btn" class:expanded={expandedGroups.has(group.id)}>
                        {expandedGroups.has(group.id) ? '−' : '+'}
                    </span>
                    <div class="group-info">
                        <h2>{group.name}</h2>
                        <span class="year-badge">{group.year}</span>
                    </div>
                    <span class="student-badge">
                        {group.students.length} студент{group.students.length !== 1 ? 'ов' : ''}
                    </span>
                </div>
                
                <div class="group-actions">
                    <button class="action-btn" on:click={() => onAddStudent(group)}>
                        Добавить студента
                    </button>
                    <button class="action-btn" on:click={() => onEditGroup(group)}>
                        Редактировать
                    </button>
                    <button class="action-btn delete" on:click={() => handleDeleteGroup(group.id)}>
                        Удалить
                    </button>
                </div>
            </div>
            
            {#if group.description}
                <div class="description">{group.description}</div>
            {/if}
            
            {#if expandedGroups.has(group.id)}
                <StudentList {group} />
            {/if}
        </div>
    {:else}
        <div class="empty-state">
            <h3>Нет групп</h3>
            <p>Создайте первую группу, чтобы начать работу</p>
            <button class="btn btn-primary" on:click={() => onAddGroup?.()}>
                Создать группу
            </button>
        </div>
    {/each}
</div>

<style>
    .groups {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .group-card {
        background: white;
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
    }

    .group-card:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-color: #94a3b8;
    }

    .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .group-title {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        color: inherit;
    }

    .expand-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: #f1f5f9;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #3b82f6;
        transition: all 0.2s;
    }

    .expand-btn.expanded {
        background: #3b82f6;
        color: white;
    }

    .group-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: #0f172a;
    }

    .year-badge {
        padding: 0.25rem 0.75rem;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .student-badge {
        padding: 0.25rem 0.75rem;
        background: #f1f5f9;
        color: #475569;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .group-actions {
        display: flex;
        gap: 0.5rem;
    }

    .action-btn {
        padding: 0.5rem 1rem;
        border: none;
        background: #f8fafc;
        color: #1e293b;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        transition: all 0.2s;
        border: 1px solid #e2e8f0;
    }

    .action-btn:hover {
        background: #f1f5f9;
        border-color: #94a3b8;
        transform: translateY(-1px);
    }

    .action-btn.delete:hover {
        background: #fee2e2;
        border-color: #fecaca;
        color: #b91c1c;
    }

    .description {
        margin: 1rem 0 0 3rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 12px;
        color: #475569;
        font-size: 0.9375rem;
        border: 1px solid #e2e8f0;
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: white;
        border-radius: 20px;
        border: 2px dashed #cbd5e1;
    }

    .empty-state h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #0f172a;
    }

    .empty-state p {
        color: #64748b;
        margin-bottom: 1.5rem;
    }

    .btn-primary {
        padding: 0.75rem 2rem;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:hover {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 6px 10px -1px rgba(59, 130, 246, 0.4);
    }
</style>