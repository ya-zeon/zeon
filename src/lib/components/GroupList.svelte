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
</script>

<div class="groups">
    {#each $groupsStore as group (group.id)}
        <div class="group">
            <div class="group-header">
                <div class="group-title" on:click={() => toggleGroup(group.id)}>
                    <span class="expand-icon">
                        {expandedGroups.has(group.id) ? '−' : '+'}
                    </span>
                    <h2>{group.name}</h2>
                    <span class="year">{group.year}</span>
                    <span class="count">{group.students.length} студ.</span>
                </div>
                
                <div class="group-actions">
                    <button class="icon-btn" on:click={() => onAddStudent(group)} title="Добавить студента">+</button>
                    <button class="icon-btn" on:click={() => onEditGroup(group)} title="Редактировать">✎</button>
                    <button class="icon-btn" on:click={() => handleDeleteGroup(group.id)} title="Удалить">×</button>
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
        <div class="empty">
            <p>Нет групп</p>
        </div>
    {/each}
</div>

<style>
    .groups {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .group {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1rem;
    }

    .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group-title {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        flex: 1;
    }

    .expand-icon {
        font-size: 1.2rem;
        color: #94a3b8;
        width: 20px;
        text-align: center;
    }

    h2 {
        font-size: 1.1rem;
        font-weight: 500;
        margin: 0;
        color: #0f172a;
    }

    .year {
        color: #64748b;
        font-size: 0.9rem;
        background: #f1f5f9;
        padding: 0.15rem 0.5rem;
        border-radius: 12px;
    }

    .count {
        color: #64748b;
        font-size: 0.9rem;
    }

    .group-actions {
        display: flex;
        gap: 0.25rem;
    }

    .icon-btn {
        background: none;
        border: none;
        font-size: 1.1rem;
        cursor: pointer;
        color: #94a3b8;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }

    .icon-btn:hover {
        background: #f1f5f9;
        color: #475569;
    }

    .description {
        margin: 0.75rem 0 0 2rem;
        color: #64748b;
        font-size: 0.9rem;
    }

    .empty {
        text-align: center;
        padding: 3rem;
        background: #f8fafc;
        border: 1px dashed #e2e8f0;
        border-radius: 8px;
        color: #94a3b8;
    }
</style>