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

<div class="students-section">
    <div class="section-header">
        <h3>Студенты группы</h3>
        <span class="count-badge">{group.students.length}</span>
    </div>
    
    {#if group.students.length > 0}
        <div class="students-grid">
            {#each group.students as student (student.id)}
                <div class="student-card">
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
                                <button class="edit-btn save" on:click={saveEdit}>Сохранить</button>
                                <button class="edit-btn cancel" on:click={cancelEdit}>Отмена</button>
                            </div>
                        </div>
                    {:else}
                        <div class="student-info">
                            <div class="student-avatar">
                                {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="student-details">
                                <span class="student-name">{student.name}</span>
                                <span class="student-email">{student.email}</span>
                            </div>
                            <div class="student-actions">
                                <button class="icon-btn" on:click={() => startEdit(student)}>
                                    ✎
                                </button>
                                <button class="icon-btn delete" on:click={() => handleDeleteStudent(student.id)}>
                                    ×
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <div class="empty-students">
            <p>В этой группе пока нет студентов</p>
        </div>
    {/if}
</div>

<style>
    .students-section {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 2px solid #e2e8f0;
    }

    .section-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        color: #0f172a;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .count-badge {
        padding: 0.2rem 0.6rem;
        background: #3b82f6;
        color: white;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .students-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 0.75rem;
    }

    .student-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1rem;
        transition: all 0.2s;
    }

    .student-card:hover {
        background: white;
        border-color: #3b82f6;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
    }

    .student-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .student-avatar {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
        flex-shrink: 0;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }

    .student-details {
        flex: 1;
        min-width: 0;
    }

    .student-name {
        font-weight: 600;
        color: #0f172a;
        font-size: 1rem;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.2rem;
    }

    .student-email {
        font-size: 0.875rem;
        color: #64748b;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .student-actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .icon-btn {
        width: 36px;
        height: 36px;
        border: none;
        background: white;
        border-radius: 10px;
        cursor: pointer;
        color: #64748b;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        border: 1px solid #e2e8f0;
    }

    .icon-btn:hover {
        background: #f1f5f9;
        color: #3b82f6;
        border-color: #3b82f6;
        transform: translateY(-1px);
    }

    .icon-btn.delete:hover {
        background: #fee2e2;
        color: #b91c1c;
        border-color: #fecaca;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .edit-input {
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 0.9375rem;
        transition: all 0.2s;
    }

    .edit-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .edit-actions {
        display: flex;
        gap: 0.5rem;
    }

    .edit-btn {
        flex: 1;
        padding: 0.6rem;
        border: none;
        border-radius: 10px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .edit-btn.save {
        background: #3b82f6;
        color: white;
    }

    .edit-btn.save:hover {
        background: #2563eb;
    }

    .edit-btn.cancel {
        background: #f1f5f9;
        color: #475569;
    }

    .edit-btn.cancel:hover {
        background: #e2e8f0;
    }

    .empty-students {
        text-align: center;
        padding: 2rem;
        background: #f8fafc;
        border-radius: 16px;
        color: #94a3b8;
        font-style: italic;
        border: 2px dashed #e2e8f0;
    }
</style>