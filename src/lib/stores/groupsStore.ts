import { writable } from 'svelte/store';
import type { Group, Student, NewStudent, NewGroup } from '$lib/types';

// Ключ для хранения в localStorage
const STORAGE_KEY = 'student-groups-data';

// Начальные данные
const initialGroups: Group[] = [
    {
        id: 1,
        name: 'ИД-301ис',
        description: 'Прикладная информатика 3 курс',
        year: 2022,
        students: [
            { id: 1, name: 'Ежов Вадим', email: 'vadime338@gmail.com', groupId: 1 },
            { id: 2, name: 'Жуков Антон', email: 's1lentboy@gmail.com', groupId: 1 },
            { id: 3, name: 'Сухарев Егор', email: 'egor4eeex@gmail.com', groupId: 1 },
            { id: 4, name: 'Цветков Денис', email: 'klorofit@gmail.com', groupId: 1 }
        ]
    },
    {
        id: 2,
        name: 'ИД-201',
        description: 'Прикладная информатика 2 курс',
        year: 2023,
        students: [
            { id: 5, name: 'Алексей Смирнов', email: 'alex@example.com', groupId: 2 }
        ]
    }
];

// Функция для загрузки данных из localStorage
function loadFromStorage(): Group[] {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Ошибка загрузки из localStorage:', e);
            }
        }
    }
    return initialGroups;
}

// Функция для сохранения в localStorage
function saveToStorage(groups: Group[]) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    }
}

function createGroupsStore() {
    // Загружаем сохраненные данные при инициализации
    const storedGroups = loadFromStorage();
    const { subscribe, update, set } = writable<Group[]>(storedGroups);

    // Подписываемся на изменения и сохраняем в localStorage
    subscribe((groups) => {
        saveToStorage(groups);
    });

    return {
        subscribe,
        set,
        
        // Группы
        addGroup: (group: NewGroup) => update(groups => {
            const newId = Math.max(...groups.map(g => g.id), 0) + 1;
            const newGroups = [...groups, { ...group, id: newId, students: [] }];
            return newGroups;
        }),

        updateGroup: (id: number, updatedGroup: Partial<Group>) => update(groups =>
            groups.map(group => group.id === id ? { ...group, ...updatedGroup } : group)
        ),

        deleteGroup: (id: number) => update(groups => 
            groups.filter(group => group.id !== id)
        ),

        // Студенты
        addStudent: (student: NewStudent) => update(groups => {
            const newId = Math.max(...groups.flatMap(g => g.students.map(s => s.id)), 0) + 1;
            return groups.map(group => {
                if (group.id === student.groupId) {
                    return {
                        ...group,
                        students: [...group.students, { ...student, id: newId }]
                    };
                }
                return group;
            });
        }),

        updateStudent: (groupId: number, studentId: number, updatedStudent: Partial<Student>) => 
            update(groups => groups.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        students: group.students.map(student =>
                            student.id === studentId 
                                ? { ...student, ...updatedStudent } 
                                : student
                        )
                    };
                }
                return group;
            })),

        deleteStudent: (groupId: number, studentId: number) => 
            update(groups => groups.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        students: group.students.filter(student => student.id !== studentId)
                    };
                }
                return group;
            })),

        // Очистить все данные
        clearAll: () => {
            if (confirm('Вы уверены, что хотите удалить все данные?')) {
                set([]);
            }
        },

        // Сбросить к начальным данным
        resetToInitial: () => {
            if (confirm('Восстановить начальные данные?')) {
                set(initialGroups);
            }
        }
    };
}

export const groupsStore = createGroupsStore();