<script lang="ts">
    import { groupsStore } from '$lib/stores/groupsStore';
    import GroupList from '$lib/components/GroupList.svelte';
    import GroupForm from '$lib/components/GroupForm.svelte';
    import StudentForm from '$lib/components/StudentForm.svelte';
    import type { Group } from '$lib/types';

    let showGroupForm = false;
    let showStudentForm = false;
    let selectedGroup: Group | null = null;
    let selectedGroupForStudent: Group | null = null;
    let showExportModal = false;
    let showImportModal = false;
    let importData: string = '';
    let importError: string = '';

    function handleAddGroup() {
        selectedGroup = null;
        showGroupForm = true;
    }

    function handleEditGroup(group: Group) {
        selectedGroup = group;
        showGroupForm = true;
    }

    function handleAddStudent(group: Group) {
        selectedGroupForStudent = group;
        showStudentForm = true;
    }

    function closeModals() {
        showGroupForm = false;
        showStudentForm = false;
        selectedGroup = null;
        selectedGroupForStudent = null;
        showExportModal = false;
        showImportModal = false;
        importData = '';
        importError = '';
    }

    function exportData() {
        const data = JSON.stringify($groupsStore, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `groups-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showExportModal = false;
    }

    function handleImport() {
        try {
            const parsed = JSON.parse(importData);
            if (Array.isArray(parsed)) {
                const isValid = parsed.every(item => 
                    item.id && 
                    item.name && 
                    typeof item.year === 'number' &&
                    Array.isArray(item.students)
                );
                
                if (isValid) {
                    groupsStore.set(parsed);
                    closeModals();
                } else {
                    importError = 'Неверный формат данных';
                }
            } else {
                importError = 'Данные должны быть массивом';
            }
        } catch (err) {
            importError = 'Ошибка в JSON';
        }
    }

    function onFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                importData = e.target?.result as string;
                importError = '';
            };
            reader.readAsText(file);
        }
        input.value = '';
    }

    function openExportModal() {
        showExportModal = true;
    }

    function openImportModal() {
        showImportModal = true;
        importData = '';
        importError = '';
    }

    const totalGroups = $groupsStore.length;
    const totalStudents = $groupsStore.reduce((acc, group) => acc + group.students.length, 0);
</script>

<svelte:head>
    <title>Группы и студенты</title>
</svelte:head>

<main class="app">
    <!-- Шапка -->
    <header class="header">
        <div class="header-top">
            <h1>Группы и студенты</h1>
            <div class="stats">
                <span class="stat">Групп: {totalGroups}</span>
                <span class="stat">Студентов: {totalStudents}</span>
            </div>
        </div>

        <div class="header-actions">
            <button class="button button-outline" on:click={openImportModal}>
                Импорт
            </button>
            <button class="button button-outline" on:click={openExportModal}>
                Экспорт
            </button>
            <button class="button button-outline" on:click={() => groupsStore.clearAll()}>
                Очистить
            </button>
            <button class="button button-outline" on:click={() => groupsStore.resetToInitial()}>
                Сброс
            </button>
            <button class="button button-primary" on:click={handleAddGroup}>
                + Новая группа
            </button>
        </div>

        <div class="save-hint">
            <span class="hint-icon">💾</span>
            <span>Все изменения сохраняются автоматически</span>
        </div>
    </header>

    <!-- Список групп -->
    <GroupList 
    onEditGroup={handleEditGroup}
    onAddStudent={handleAddStudent}
/>

    <!-- Модалка группы -->
    {#if showGroupForm}
        <div class="modal-overlay" on:click|self={closeModals}>
            <div class="modal">
                <button class="modal-close" on:click={closeModals}>×</button>
                <GroupForm 
                    group={selectedGroup}
                    onClose={closeModals}
                />
            </div>
        </div>
    {/if}

    <!-- Модалка студента -->
    {#if showStudentForm && selectedGroupForStudent}
        <div class="modal-overlay" on:click|self={closeModals}>
            <div class="modal">
                <button class="modal-close" on:click={closeModals}>×</button>
                <StudentForm 
                    group={selectedGroupForStudent}
                    onClose={closeModals}
                />
            </div>
        </div>
    {/if}

    <!-- Модалка экспорта -->
    {#if showExportModal}
        <div class="modal-overlay" on:click|self={closeModals}>
            <div class="modal modal-lg">
                <button class="modal-close" on:click={closeModals}>×</button>
                <h2 class="modal-title">Экспорт данных</h2>
                <div class="export-preview">
                    <pre>{JSON.stringify($groupsStore, null, 2)}</pre>
                </div>
                <div class="modal-actions">
                    <button class="button button-outline" on:click={closeModals}>Отмена</button>
                    <button class="button button-primary" on:click={exportData}>Скачать</button>
                </div>
            </div>
        </div>
    {/if}

    <!-- Модалка импорта -->
    {#if showImportModal}
        <div class="modal-overlay" on:click|self={closeModals}>
            <div class="modal">
                <button class="modal-close" on:click={closeModals}>×</button>
                <h2 class="modal-title">Импорт данных</h2>
                
                <div class="import-area">
                    <div class="file-upload">
                        <label class="button button-outline">
                            Выбрать файл
                            <input type="file" accept=".json" on:change={onFileSelect} hidden>
                        </label>
                        <span class="file-name">
                            {importData ? 'Файл загружен' : 'Файл не выбран'}
                        </span>
                    </div>

                    <div class="divider">или</div>

                    <textarea 
                        class="import-textarea" 
                        placeholder="Вставьте JSON..."
                        bind:value={importData}
                        rows="6"
                    ></textarea>

                    {#if importError}
                        <div class="error-message">
                            {importError}
                        </div>
                    {/if}

                    <div class="warning">
                        <span class="warning-icon">⚠️</span>
                        <span>Импорт заменит все текущие данные</span>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="button button-outline" on:click={closeModals}>Отмена</button>
                    <button 
                        class="button button-primary" 
                        on:click={handleImport}
                        disabled={!importData}
                    >
                        Импортировать
                    </button>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    /* Базовые стили */
    .app {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #1e293b;
        background: #ffffff;
    }

    /* Шапка */
    .header {
        margin-bottom: 2.5rem;
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 500;
        margin: 0;
        color: #0f172a;
        letter-spacing: -0.01em;
    }

    .stats {
        display: flex;
        gap: 1rem;
    }

    .stat {
        font-size: 0.9rem;
        color: #64748b;
        background: #f8fafc;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
    }

    /* Кнопки */
    .header-actions {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
        flex-wrap: wrap;
    }

    .button {
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.2s;
        background: transparent;
    }

    .button-outline {
        background: transparent;
        border: 1px solid #e2e8f0;
        color: #475569;
    }

    .button-outline:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .button-primary {
        background: #0f172a;
        color: white;
    }

    .button-primary:hover {
        background: #1e293b;
    }

    .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Подсказка о сохранении */
    .save-hint {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    .hint-icon {
        font-size: 1.1rem;
    }

    /* Модальные окна */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(2px);
    }

    .modal {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .modal-lg {
        max-width: 700px;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #94a3b8;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }

    .modal-close:hover {
        background: #f1f5f9;
        color: #475569;
    }

    .modal-title {
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0 0 1.5rem 0;
        color: #0f172a;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    /* Экспорт/Импорт */
    .export-preview {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1rem;
        max-height: 300px;
        overflow: auto;
        margin: 1rem 0;
    }

    .export-preview pre {
        margin: 0;
        font-size: 0.85rem;
        color: #334155;
        font-family: 'Monaco', 'Menlo', monospace;
    }

    .import-area {
        margin: 1rem 0;
    }

    .file-upload {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .file-name {
        color: #64748b;
        font-size: 0.9rem;
    }

    .divider {
        text-align: center;
        color: #94a3b8;
        margin: 1rem 0;
        position: relative;
        font-size: 0.9rem;
    }

    .divider::before,
    .divider::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 45%;
        height: 1px;
        background: #e2e8f0;
    }

    .divider::before { left: 0; }
    .divider::after { right: 0; }

    .import-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 0.9rem;
        resize: vertical;
        margin-bottom: 1rem;
        box-sizing: border-box;
    }

    .import-textarea:focus {
        outline: none;
        border-color: #0f172a;
    }

    .error-message {
        color: #b91c1c;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: #fef2f2;
        border-radius: 6px;
    }

    .warning {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: #fffbeb;
        border: 1px solid #fef3c7;
        border-radius: 6px;
        font-size: 0.9rem;
        color: #92400e;
    }

    .warning-icon {
        font-size: 1rem;
    }

    /* Адаптивность */
    @media (max-width: 640px) {
        .app {
            padding: 1rem;
        }

        .header-top {
            flex-direction: column;
            gap: 0.5rem;
        }

        .header-actions {
            flex-direction: column;
        }

        .header-actions .button {
            width: 100%;
            text-align: center;
        }

        .modal {
            padding: 1rem;
        }
    }
</style>