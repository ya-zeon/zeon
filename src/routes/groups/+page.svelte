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
    }

    $: totalGroups = $groupsStore.length;
</script>

<svelte:head>
    <title>Группы и студенты</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main style="font-family: 'Inter', sans-serif; background: #f8fafc; min-height: 100vh; color: #0f172a; width: 100%; margin: 0; padding: 2rem;">
    <!-- Шапка - убираем внутренние отступы, они будут на контенте -->
    <div style="background: white; margin-bottom: 2rem; border-radius: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; width: 100%;">
        <!-- Контент шапки с отступами -->
        <div style="padding: 2rem 2.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div>
                    <h1 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(135deg, #0f172a, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Группы и студенты</h1>
                    <div style="display: flex; gap: 2.5rem;">
                        <div>
                            <div style="font-size: 0.9rem; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Группы</div>
                            <div style="font-size: 2.2rem; font-weight: 700; color: #0f172a; line-height: 1;">{totalGroups}</div>
                        </div>
                    </div>
                </div>

                <button onclick={handleAddGroup} style="padding: 0.875rem 2rem; border-radius: 16px; font-size: 1rem; font-weight: 600; cursor: pointer; border: none; background: #3b82f6; color: white; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3); transition: all 0.2s; white-space: nowrap;">+ Новая группа</button>
            </div>

            <div style="display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #e0f2fe, #bae6fd); border-radius: 100px; font-size: 0.9rem; font-weight: 500; color: #0369a1; border: 1px solid #7dd3fc;">
                <span style="width: 8px; height: 8px; background: #0284c7; border-radius: 50%; animation: pulse 2s infinite;"></span>
                <span>Автоматическое сохранение</span>
            </div>
        </div>
    </div>

    <!-- Список групп -->
    <GroupList 
        onEditGroup={handleEditGroup}
        onAddStudent={handleAddStudent}
    />

    <!-- Модальные окна -->
    {#if showGroupForm}
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 32px; padding: 2.5rem; width: 90%; max-width: 550px; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0;">
                <button onclick={closeModals} style="position: absolute; top: 1.5rem; right: 1.5rem; background: white; border: 1px solid #e2e8f0; font-size: 1.5rem; cursor: pointer; color: #64748b; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: all 0.2s;">×</button>
                <GroupForm 
                    group={selectedGroup}
                    onClose={closeModals}
                />
            </div>
        </div>
    {/if}

    {#if showStudentForm && selectedGroupForStudent}
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 32px; padding: 2.5rem; width: 90%; max-width: 550px; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0;">
                <button onclick={closeModals} style="position: absolute; top: 1.5rem; right: 1.5rem; background: white; border: 1px solid #e2e8f0; font-size: 1.5rem; cursor: pointer; color: #64748b; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: all 0.2s;">×</button>
                <StudentForm 
                    group={selectedGroupForStudent}
                    onClose={closeModals}
                />
            </div>
        </div>
    {/if}
</main>

<style>
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 10px -1px rgba(59, 130, 246, 0.4) !important;
    }
</style>