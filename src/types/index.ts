
import type { Timestamp } from 'firebase/firestore';

export type Student = {
    id: string;
    name: string;
    studentId: string;
    course: string;
    interests: string;
    createdAt: Date;
    updatedAt: Date;
};

// This type is used for Firestore operations, as it uses Timestamps
export type StudentFirestore = Omit<Student, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export type Branding = {
    logoUrl: string | null;
};
