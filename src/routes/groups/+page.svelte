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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main class="app">
    <div class="container">
        <!-- Шапка -->
        <header class="header">
            <div class="header-top">
                <div>
                    <h1>Группы и студенты</h1>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-label">Группы</span>
                            <span class="stat-value">{totalGroups}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Студенты</span>
                            <span class="stat-value">{totalStudents}</span>
                        </div>
                    </div>
                </div>

                <div class="header-actions">
                    <button class="btn btn-outline" on:click={openImportModal}>Импорт</button>
                    <button class="btn btn-outline" on:click={openExportModal}>Экспорт</button>
                    <button class="btn btn-outline" on:click={() => groupsStore.clearAll()}>Очистить</button>
                    <button class="btn btn-outline" on:click={() => groupsStore.resetToInitial()}>Сброс</button>
                    <button class="btn btn-primary" on:click={handleAddGroup}>+ Новая группа</button>
                </div>
            </div>

            <div class="save-banner">
                <span class="save-dot"></span>
                <span>Автоматическое сохранение</span>
            </div>
        </header>

        <!-- Список групп -->
        <GroupList 
    onEditGroup={handleEditGroup}
    onAddStudent={handleAddStudent}
        />

        <!-- Модальные окна -->
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

        {#if showExportModal}
            <div class="modal-overlay" on:click|self={closeModals}>
                <div class="modal modal-lg">
                    <button class="modal-close" on:click={closeModals}>×</button>
                    <h2 class="modal-title">Экспорт данных</h2>
                    <div class="export-preview">
                        <pre>{JSON.stringify($groupsStore, null, 2)}</pre>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-outline" on:click={closeModals}>Отмена</button>
                        <button class="btn btn-primary" on:click={exportData}>Скачать</button>
                    </div>
                </div>
            </div>
        {/if}

        {#if showImportModal}
            <div class="modal-overlay" on:click|self={closeModals}>
                <div class="modal">
                    <button class="modal-close" on:click={closeModals}>×</button>
                    <h2 class="modal-title">Импорт данных</h2>
                    
                    <div class="import-area">
                        <div class="file-upload">
                            <label class="btn btn-outline">
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
                            Импорт заменит все текущие данные
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button class="btn btn-outline" on:click={closeModals}>Отмена</button>
                        <button 
                            class="btn btn-primary" 
                            on:click={handleImport}
                            disabled={!importData}
                        >
                            Импортировать
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        font-family: 'Inter', sans-serif;
        background: #f8fafc;
        min-height: 100vh;
        color: #0f172a;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    /* Шапка */
    .header {
        background: white;
        border-radius: 24px;
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        border: 1px solid #e2e8f0;
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #0f172a, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .stats {
        display: flex;
        gap: 2rem;
    }

    .stat {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .stat-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: #0f172a;
        line-height: 1;
    }

    /* Кнопки */
    .header-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        font-family: inherit;
    }

    .btn-primary {
        background: #3b82f6;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:hover {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 6px 10px -1px rgba(59, 130, 246, 0.4);
    }

    .btn-outline {
        background: white;
        color: #1e293b;
        border: 1px solid #e2e8f0;
    }

    .btn-outline:hover {
        background: #f8fafc;
        border-color: #94a3b8;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* Баннер сохранения */
    .save-banner {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        border-radius: 100px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #0369a1;
        border: 1px solid #7dd3fc;
    }

    .save-dot {
        width: 8px;
        height: 8px;
        background: #0284c7;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }

    /* Модальные окна */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.2s;
    }

    .modal {
        background: white;
        border-radius: 32px;
        padding: 2.5rem;
        width: 90%;
        max-width: 550px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s;
        border: 1px solid #e2e8f0;
    }

    .modal-lg {
        max-width: 750px;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: white;
        border: 1px solid #e2e8f0;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        transition: all 0.2s;
    }

    .modal-close:hover {
        background: #f1f5f9;
        color: #0f172a;
        transform: rotate(90deg);
    }

    .modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
        color: #0f172a;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
    }

    /* Экспорт/Импорт */
    .export-preview {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.5rem;
        max-height: 300px;
        overflow: auto;
        margin: 1.5rem 0;
    }

    .export-preview pre {
        margin: 0;
        font-size: 0.875rem;
        color: #1e293b;
        font-family: 'Monaco', 'Menlo', monospace;
    }

    .import-area {
        margin: 1.5rem 0;
    }

    .file-upload {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .file-name {
        color: #64748b;
        font-size: 0.9375rem;
        font-weight: 500;
    }

    .divider {
        text-align: center;
        color: #94a3b8;
        margin: 1.5rem 0;
        position: relative;
        font-size: 0.9375rem;
        font-weight: 500;
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
        padding: 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 0.9375rem;
        resize: vertical;
        margin-bottom: 1.5rem;
        transition: all 0.2s;
    }

    .import-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    .error-message {
        color: #b91c1c;
        font-size: 0.9375rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #fee2e2;
        border-radius: 12px;
        border: 1px solid #fecaca;
        font-weight: 500;
    }

    .warning {
        padding: 1rem;
        background: #fffbeb;
        border: 1px solid #fde68a;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 500;
        color: #b45309;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .header {
            padding: 1.5rem;
        }

        .header-top {
            flex-direction: column;
            gap: 1.5rem;
        }

        .header-actions {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        .header-actions .btn {
            width: 100%;
            text-align: center;
            padding: 0.75rem;
        }

        .stats {
            gap: 1.5rem;
        }

        .stat-value {
            font-size: 1.5rem;
        }

        .modal {
            padding: 1.5rem;
        }

        .modal-close {
            top: 1rem;
            right: 1rem;
        }
    }
</style>