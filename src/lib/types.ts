// src/lib/types.ts
export interface Student {
    id: number;
    name: string;
    email: string;
    groupId: number;
    avatar?: string;
    birthDate?: string;
}

export interface Group {
    id: number;
    name: string;
    description?: string;
    year: number;
    students: Student[];
}

export type NewStudent = Omit<Student, 'id'>;
export type NewGroup = Omit<Group, 'id' | 'students'>;