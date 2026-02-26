<script lang="ts">
    import { groupsStore } from '$lib/stores/groupsStore';
    import type { Group, Student } from '$lib/types';

    export let group: Group;

    let editingStudent: Student | null = null;
    let editForm: Partial<Student> = {};

    function startEdit(student: Student) {
        editingStudent = student;
        editForm = { ...student };
    }

    function cancelEdit() {
        editingStudent = null;
        editForm = {};
    }

    function saveEdit() {
        if (editingStudent && editForm.name && editForm.email) {
            groupsStore.updateStudent(group.id, editingStudent.id, {
                name: editForm.name,
                email: editForm.email
            });
            cancelEdit();
        }
    }

    function handleDeleteStudent(studentId: number) {
        if (confirm('Удалить студента?')) {
            groupsStore.deleteStudent(group.id, studentId);
        }
    }
</script>

<div class="students">
    <h3>Студенты</h3>
    
    {#if group.students.length > 0}
        <div class="list">
            {#each group.students as student (student.id)}
                <div class="student">
                    {#if editingStudent?.id === student.id}
                        <div class="edit-form">
                            <input 
                                type="text" 
                                bind:value={editForm.name}
                                placeholder="Имя"
                                class="edit-input"
                            >
                            <input 
                                type="email" 
                                bind:value={editForm.email}
                                placeholder="Email"
                                class="edit-input"
                            >
                            <div class="edit-actions">
                                <button class="save-btn" on:click={saveEdit}>✓</button>
                                <button class="cancel-btn" on:click={cancelEdit}>×</button>
                            </div>
                        </div>
                    {:else}
                        <div class="info">
                            <span class="name">{student.name}</span>
                            <span class="email">{student.email}</span>
                            <div class="actions">
                                <button class="icon-btn" on:click={() => startEdit(student)}>✎</button>
                                <button class="icon-btn" on:click={() => handleDeleteStudent(student.id)}>×</button>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <p class="empty">Нет студентов</p>
    {/if}
</div>

<style>
    .students {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
    }

    h3 {
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0 0 0.75rem 0;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .student {
        background: #f8fafc;
        border-radius: 6px;
        padding: 0.5rem;
    }

    .info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .name {
        font-weight: 500;
        color: #1e293b;
        min-width: 120px;
    }

    .email {
        color: #64748b;
        font-size: 0.9rem;
        flex: 1;
    }

    .actions {
        display: flex;
        gap: 0.25rem;
    }

    .icon-btn {
        background: none;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        color: #94a3b8;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
    }

    .icon-btn:hover {
        background: #e2e8f0;
        color: #475569;
    }

    .edit-form {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .edit-input {
        padding: 0.4rem 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.9rem;
        flex: 1;
    }

    .edit-input:focus {
        outline: none;
        border-color: #0f172a;
    }

    .edit-actions {
        display: flex;
        gap: 0.25rem;
    }

    .save-btn, .cancel-btn {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .save-btn {
        background: #0f172a;
        color: white;
    }

    .save-btn:hover {
        background: #1e293b;
    }

    .cancel-btn {
        background: #e2e8f0;
        color: #475569;
    }

    .cancel-btn:hover {
        background: #cbd5e1;
    }

    .empty {
        color: #94a3b8;
        font-style: italic;
        margin: 0.5rem 0;
        font-size: 0.9rem;
    }
</style>