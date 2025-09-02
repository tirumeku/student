'use server';

import type { Student } from '@/types';
import { initialStudents } from './seed';

// In-memory data store, initialized with seed data
let students: Student[] = initialStudents.map((student, index) => ({
  ...student,
  id: (index + 1).toString(),
  createdAt: new Date(`2023-09-0${index + 1}T10:00:00Z`),
  updatedAt: new Date(`2023-09-0${index + 1}T10:00:00Z`),
}));


// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  // Sort by createdAt in descending order to show newest first
  return [...students].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const addStudent = async (studentData: {
  name: string;
  studentId: string;
  course: string;
  interests: string;
}): Promise<Student> => {
  const newStudent: Student = {
    id: crypto.randomUUID(),
    ...studentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  students.unshift(newStudent); // Add to the beginning of the array
  return newStudent;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    return students.find((student) => student.id === id) || null;
}
